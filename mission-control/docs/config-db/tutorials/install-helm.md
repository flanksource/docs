# Config DB Helm Installation Guide 
## Initial Set up

Helm must be installed to use the charts. Refer the Helm documentation to get started.
With Helm installed and running, add the Flanksource Helm repository as shown below:
```console
helm repo add flanksource https://flanksource.github.io/charts
helm repo update
```

## Prerequisites
A Kubernetes installation of version 1.14 or higher.

!!! note "Note"
    Config DB Helm installation comes with service account configuration. If you are an AWS EKS user, you need to create an IAM role so the So the service account can query the AWS API. See the [IAM roles for service accounts](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html) AWS documentation for more information. 


## Config DB Installation
```console
helm install [RELEASE_NAME] flanksource/config-db
```

_See [configuration](#configuration) below._

_See [helm install](https://helm.sh/docs/helm/helm_install/) for command documentation._

### Uninstall Chart

```console
helm uninstall [RELEASE_NAME]
```

This removes all the Kubernetes components associated with the chart and deletes the release.

_See [helm uninstall](https://helm.sh/docs/helm/helm_uninstall/) for command documentation._

### Upgrading Chart

```console
$ helm upgrade [RELEASE_NAME] [CHART] --install
```

_See [helm upgrade](https://helm.sh/docs/helm/helm_upgrade/) for command documentation._

### Configuration

See [Customizing the Chart Before Installing](https://helm.sh/docs/intro/using_helm/#customizing-the-chart-before-installing). To see all configurable options with detailed comments, visit the chart's [values.yaml](https://github.com/flanksource/config-db/blob/main/chart/values.yaml), or run these configuration commands:

```console
helm show values flanksource/config-db
```

---
