---
title: Local Testing
description: Run Mission Control Locally using minikube or kind
sidebar_custom_props:
  icon: lab
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info Prerequisites

- kubectl
- [helm](https://helm.sh/docs/intro/install/) v3+
- [kind](https://kind.sigs.k8s.io/docs/user/quick-start/) or [minikube](https://minikube.sigs.k8s.io/docs/start/)
- 20GB+ free space for docker volumes
  :::

<Tabs>

<TabItem label="Kind" value="Kind">

<Step step={1} name="Create kind cluster">

The demo requires access to mission control via an ingress configuration. To route traffic into the kind cluster, it must be configured with a binding to a port on the host.

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

A single node cluster is provisioned, hosting both the control plane and workloads. Configure the `hostPort` bindings onto free ports, in this case `8080` and `8443`

Provision the kind cluster with

```bash
kind create cluster --config kind.config
```

verify the cluster is running by using:

```bash
kubectl get nodes
```

</Step>

<Step step={2} name="Provision Ingress controller">

Install [ingress-nginx](https://github.com/kubernetes/ingress-nginx) controller with:

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/kind/deploy.yaml
```

Confirm that the ingress controller pod is running with:

```bash
kubectl get pods -n ingress-nginx
```

</Step>

</TabItem>

<TabItem label="Minikube" value="minikube">
<Step step={1} name="Create minikube cluster">

```
minikube start
```

</Step>

<Step step={2} name="Provision Ingress controller">

```
minikube addons configure ingress
minikube addons enable ingress
```

</Step>
</TabItem>

</Tabs>

<Step step={3} name="Install Mission Control">

[nip.io](http://nip.io) is a wildcard DNS server that returns the ip provided in the host name, e.g.

```bash
❯ nslookup  127.0.0.1.nip.io
Address: 127.0.0.1
```

By using nip you can access mission-control without any further networking / configuration setup.

```yaml title="values.yaml"
global:
  ui:
    host: 127.0.0.1.nip.io
resources:
  requests:
    cpu: 10m
    memory: 100Mi
db:
  conf:
    shared_buffers: 128MB
    work_mem: 10MB
  resources:
    requests:
      cpu: 10m
      memory: 256Mi
canary-checker:
  resources:
    requests:
      cpu: 10m
      memory: 128Mi
config-db:
  resources:
    requests:
      cpu: 10m
      memory: 128Mi
```

```bash
helm repo add flanksource https://flanksource.github.io/charts
helm repo update
helm install mission-control  \
  flanksource/mission-control  \
 -n mission-control \
 --create-namespace \
 --wait \
 -f values.yaml
```

See [values.yaml](/installation/helm#self-hosted) for more options.

</Step>

<Step step={4} name="Login">

The default username is `admin@local` and the password can be retrieved with:

```
kubectl get secret  mission-control-admin-password \
  -n mission-control \
  --template='{{.data.password | base64decode}}'
```

You can then go to [https://127.0.0.1.nip.io:8443](https://127.0.0.1.nip.io:8443) to login.

:::info Self-Signed Certificate
This example uses a self-signed certificate created by nginx, We recommend using [cert-manager.io](https://cert-manager.io/).
:::

</Step>

<Step step={5} name="Taking your first step, creating a health check">

Create a file containing canary definitions, for example:

```yaml title=canaries.yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: http
spec:
  interval: 30
  http:
    - url: https://httpstat.us/200
      name: 'httpstat healthy'
```

and apply to the cluster with:

```bash
kubectl apply -f canaries.yaml
```

Navigate to the [Health](https://127.0.0.1.nip.io:8443/health) tab you can then see the check running:

</Step>
