# Self host Mission Control using Kind

## Prerequisites

- Container runtime (docker/containerd)
- kubectl
- [helm](https://helm.sh/docs/intro/install/)
- [kind](https://kind.sigs.k8s.io/docs/user/quick-start/)

## Create Kind cluster

The demo requires access to mission control via an ingress configuration. To route traffic into the kind cluster, it must be configured with a binding to a port on the host. Create a kind.config file:

```yaml title="kind.config"
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
  - role: control-plane
    kubeadmConfigPatches:
      - |
        kind: InitConfiguration
        nodeRegistration:
          kubeletExtraArgs:
            node-labels: "ingress-ready=true"        
    extraPortMappings:
      - containerPort: 80
        hostPort: 8080
        protocol: TCP
      - containerPort: 443
        hostPort: 8443
        protocol: TCP
```
A single node cluster will be provisioned, hosting both the control plane and workloads.  Configure the hostPort bindings onto free ports, in this case 8080 and 8443 are used.

Provision the kind cluster with

```bash
kind create cluster --config kind.config
```

verify the cluster is running by using `kubectl get nodes`

## Provision Ingress controller

The Kubernetes Nginx Ingress Controller maintains a kind-compatible manifest - deploy this to the cluster using:

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/kind/deploy.yaml
```

Confirm that the ingress controller pod is running with `kubectl get pods -n ingress-nginx`

## Configure Flanksource Helm repository

Add the Flanksource repository to helm:

```bash
helm repo add flanksource https://flanksource.github.io/charts
```

then fetch the latest chart list with

```bash
helm repo update
```

## Deploy Mission Control

The following minimal config is recommended to deploy Mission Control into the Kind cluster:

```yaml title="kind-values.yaml"
db:
  create: true
  storageClass: standard
  storage: 10Gi
flanksource-ui:
  enabled: true
  ingress:
    host: "127.0.0.1.nip.io"
    tls:
    - hosts:
      - "127.0.0.1.nip.io"
```

for a full list of configuration options, see https://github.com/flanksource/mission-control-chart/blob/main/chart/values.yaml

This configuration sets the storage for the database to use the kind default local-path storage, and sets the ingress address to use [nip.io](nip.io)'s dummy DNS response to return localhost.  Save the configuration to a `kind-values.yaml` file, then deploy using

```bash
helm upgrade -i mission-control-demo flanksource/mission-control -f kind-values.yaml
```
Monitor that the deployment has application has successfully intialised by checking `kubectl get pods`, it may take some time for the database to initialise for the first time after installation.

## Verify UI

Once all pods report running, visit [https://127.0.0.1.nip.io:8443](https://127.0.0.1.nip.io:8443) in a browser to view the Flanksource UI.  Accept the self-signed certificate to proceed, installing valid certificates for the ingress is outside the scope of this guide.

Log into the UI using the local admin credentials

username: admin@local
password: admin

## Create example checks

Create a file containing canary defintions, for example:

```yaml title=canaries.yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: http-pass
spec:
  interval: 30
  http:
    - endpoint: https://httpstat.us/200
      thresholdMillis: 3000
      responseCodes: [201, 200, 301]
      responseContent: ""
      maxSSLExpiry: 7
      name: "httpstat healthy"
---
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: dns-present
spec:
  interval: 30
  dns:
    - server: 8.8.8.8
      name: "DNS healthly"
      port: 53
      query: "flanksource.com"
      querytype: "A"
      minrecords: 1
      exactreply: ["99.83.190.102", "75.2.70.75"]
      timeout: 10
```

and apply to the cluster with `kubectl apply -f canaries.yaml`.  Select the `Health` screen in the UI navigation bar.  The check list should indicate that two checks are running, as well as indicate their health.  To view the details of a healthy check, you may need to toggle the `Hide Passing` filter.  Selecting the check will open a window with details of the check and recent statistics.




