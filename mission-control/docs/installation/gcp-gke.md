# Install Mission Control on GCP GKE cluster

## Prerequisites

1. Kubernetes 1.22+ with Identity Federation enabled
2. [cert-manager](https://cert-manager.io/docs/)


## Quickstart

1. `helm repo add flanksource https://flanksource.github.io/charts`
2. `helm repo update`
3. `helm install flanksource flanksource/mission-control -n flanksource`
4. To set custom values file for your mission-control helm chart installation, override existing values in [mission-control-chart](https://github.com/flanksource/mission-control-chart/tree/main/chart). Some common values that can be changed can be found [here](https://docs.flanksource.com/#install-chart)


## Deploy the k8s bundle

To quickly get the catalog of all the resources in your k8s cluster, deploy the k8s bundle helm chart

1. `helm repo add flanksource https://flanksource.github.io/charts`
2. `helm repo update`
3. `helm install k8s-bundle flanksource/mission-control-kubernetes -n flanksource`

## Using the GCP Cloud SQL Instance instead of the default Postgres Statefulset

The `flanksource/mission-control` chart deploys a postgres statefulset in the cluster by default. Instead you can choose a cloud SQL instance and connect to it using a cloud sql proxy. The cloud sql proxy uses a GCP service account to authenticate to cloud SQL instance using IAM authentication. To disable the postgres statefulset and deploy the cloud sql proxy instead, follow these steps: 


1. Enable [IAM Authentication](https://cloud.google.com/sql/docs/postgres/create-edit-iam-instances#configure_existing_instances_for) in the cloud postgresSQL instance and [add a service account as a user](https://cloud.google.com/sql/docs/postgres/add-manage-iam-users#creating-a-database-user)

2. Create a postgres db `mission_control` in GCP Cloud SQL Instance

3. Create a gcp service account

4. Attach the role `container.viewer` to the gcp service account

5. Allow WIF between cloud sql proxy KSA and GSA

6. Create the secret with a connection string to allow mission control microservices to connect to Cloud SQL Instance via cloud sql proxy.

```
apiVersion: v1
kind: Secret
metadata:
  name: mission-control-postgres-connection
  namespace: flanksource
type: Opaque
stringData:
  DB_URL: {{ (printf "postgres://mission-control-wrapper-sa%40<gcp-project-id>.iam@mission-control-cloud-sql-proxy.%s.svc.cluster.local/mission_control?sslmode=disable" (include "chart.urlencodePostgresUser" .) .Release.Namespace ) }} # Note that '@' has been replaced with '%40'
```
The format of the connection string is: `postgres://<iam user email without gserviceaccount.com>@<cloud sql proxy svc name>.<namespace of svc>.svc.cluster.local/<db>?sslmode=disable`

7. Now deploy `flanksource/mission-control` chart with the following values

```
global:
  api:
    host: "mission-control.your.domain"
  ui:
    host: "mission-control.your.domain"
  db:
    connectionPooler:
      enabled: false
flanksource-ui:
  ingress:
    annotations: {}
      # kubernetes.io/ingress.class: 
      # kubernetes.io/tls-acme: "true"
db:
    create: false
    secretKeyRef:
        name: mission-control-postgres-connection
```

## Monitoring Multiple Clusters

When you want to monitor more than one k8s cluster in a centralized manner, you must create a secret containing the kubeconfig of the child cluster. This secret must be created in the parent cluster where Mission Control is deployed:

```
apiVersion: v1
kind: Secret
metadata:
  name: child-cluster-kubeconfig
  namespace: flanksource
type: Opaque
data:
kubeconfig: |
  apiVersion: v1
  kind: Config
  preferences: {}

  clusters:
  - cluster:
    name: child-cluster

  contexts:
  - name: child-cluster
    context:
      cluster: child-cluster
      user: child-cluster-user

  users:                                                                                                                                     
  - name: child-cluster-user
    user:
      exec:
        apiVersion: client.authentication.k8s.io/v1beta1
        command: gke-gcloud-auth-plugin
        args: [] # Add any required arguments here
        installHint: "Install gke-gcloud-auth-plugin for use with kubectl by following https://cloud.google.com/kubernetes-engine/docs/how-to cluster-access-for-kubectl#install_plugin"                                                                                                  
        provideClusterInfo: true                                                                                                           
```

Install a new bundle and specify the kubeconfig secret name in the values as shown below:

`helm install child-cluster-k8s-bundle flanksource/mission-control-kubernetes -n flanksource -f custom-values.yaml`

```
# custom-values.yaml

clusterName: child-cluster
kubeconfig:
    name: child-cluster
    valueFrom:
      secretKeyRef:
        name: child-cluster-kubeconfig
        key: kubeconfig
topology:
  name: child-cluster
scraper:
  name: child-cluster
  retention:
    staleItemAge: 1d
```