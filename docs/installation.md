# Table of Contents
1. [Inital Set up](#initial-set-up)
2. [Health Checks](#canary-checker)
3. [Configuration](#config-db)
---
# Flanksource Helm Charts
---
## Initial Set up

Helm must be installed to use the charts. Refer the Helm documentation to get started.
With Helm installed and running, add the Flanksource Helm repository as shown below:
```
helm repo add flanksource https://flanksource.github.io/charts
helm repo update
```
### Prerequisites
Kubernetes 1.14+
---
## Canary-checker
As per [Canary-checker documentation](/canary-checker/tutorials/overview.md)
> Canary checker is a monitoring system for executing synthetic tests, providing a built-in user interface, CLI and multi-cluster and multi-instance aggregation. Canary checker is designed with multi-tenancy in mind. 

### Install Chart
```console
# Helm 3
helm install [RELEASE_NAME] flanksource/canary-checker

# Helm 2
helm install --name [RELEASE_NAME] flanksource/canary-checker
```

_See [configuration](#configuration) below._

_See [helm install](https://helm.sh/docs/helm/helm_install/) for command documentation._

### Uninstall Chart

```console
# Helm 3
helm uninstall [RELEASE_NAME]

# Helm 2
helm delete --purge [RELEASE_NAME]
```

This removes all the Kubernetes components associated with the chart and deletes the release.

_See [helm uninstall](https://helm.sh/docs/helm/helm_uninstall/) for command documentation._

### Upgrading Chart

```console
# Helm 3 or 2
$ helm upgrade [RELEASE_NAME] [CHART] --install
```

_See [helm upgrade](https://helm.sh/docs/helm/helm_upgrade/) for command documentation._

### Configuration

See [Customizing the Chart Before Installing](https://helm.sh/docs/intro/using_helm/#customizing-the-chart-before-installing). To see all configurable options with detailed comments, visit the chart's [values.yaml](https://github.com/flanksource/canary-checker/blob/master/chart/values.yaml), or run these configuration commands:

```console
# Helm 2
helm inspect values flanksource/canary-checker

# Helm 3
helm show values flanksource/canary-checker
```
---
---
## Config-db
As per [Config-db documentation](/config-db/tutorials/getting-started-config-db.md)
> `config-db` is a straightforward JSON-based configuration management database. It enables you to scrape configuration from several sources on an ongoing basis and navigate that configuration in an easy-to-navigate and search JSON tree.

### Install Chart
```console
# Helm 3
helm install [RELEASE_NAME] flanksource/config-db

# Helm 2
helm install --name [RELEASE_NAME] flanksource/config-db
```

_See [configuration](#configuration) below._

_See [helm install](https://helm.sh/docs/helm/helm_install/) for command documentation._

### Uninstall Chart

```console
# Helm 3
helm uninstall [RELEASE_NAME]

# Helm 2
helm delete --purge [RELEASE_NAME]
```

This removes all the Kubernetes components associated with the chart and deletes the release.

_See [helm uninstall](https://helm.sh/docs/helm/helm_uninstall/) for command documentation._

### Upgrading Chart

```console
# Helm 3 or 2
$ helm upgrade [RELEASE_NAME] [CHART] --install
```

_See [helm upgrade](https://helm.sh/docs/helm/helm_upgrade/) for command documentation._

### Configuration

See [Customizing the Chart Before Installing](https://helm.sh/docs/intro/using_helm/#customizing-the-chart-before-installing). To see all configurable options with detailed comments, visit the chart's [values.yaml](https://github.com/flanksource/config-db/blob/main/chart/values.yaml), or run these configuration commands:

```console
# Helm 2
helm inspect values flanksource/config-db

# Helm 3
helm show values flanksource/config-db
```
---
---
## Incident Commander

### Install Chart
```console
# Helm 3
helm install [RELEASE_NAME] flanksource/incident-commander

# Helm 2
helm install --name [RELEASE_NAME] flanksource/incident-commander
```

Set custom values file for your incident-commander helm chart installation to override existing values in [`incident-commander-chart`](https://github.com/flanksource/incident-commander-chart/blob/main/chart/values.yaml).
```bash
cat > myvalues.yaml << EOT
canary-checker:
  debug: true
  db:
    enabled: true
    external:
      create: false
config-db:
  db:
    enabled: false
    external:
      create: false
flanksource-ui:
  ingress:
    enabled: true
    annotations:
      kubernetes.io/ingress.class: nginx
      kubernetes.io/tls-acme: "true"
    host: incident-commander.canary.lab.flanksource.com
    tls:
      - secretName: incident-commander-tls
        hosts:
          - incident-commander.canary.lab.flanksource.com
db:
  storageClass: gp2
  storage: 50Gi       
EOT

# Helm 3
helm install [RELEASE_NAME] -f myvalues.yaml flanksource/incident-commander

# Helm 2
helm install --name [RELEASE_NAME] -f myvalues.yaml flanksource/incident-commander
```

_See [configuration](#configuration) below._

_See [helm install](https://helm.sh/docs/helm/helm_install/) for command documentation._

### Uninstall Chart

```console
# Helm 3
helm uninstall [RELEASE_NAME]

# Helm 2
helm delete --purge [RELEASE_NAME]
```

This removes all the Kubernetes components associated with the chart and deletes the release.

_See [helm uninstall](https://helm.sh/docs/helm/helm_uninstall/) for command documentation._

### Upgrading Chart

```console
# Helm 2 or 3
$ helm upgrade [RELEASE_NAME] [CHART] --install
```

_See [helm upgrade](https://helm.sh/docs/helm/helm_upgrade/) for command documentation._

### Configuration

See [Customizing the Chart Before Installing](https://helm.sh/docs/intro/using_helm/#customizing-the-chart-before-installing). To see all configurable options with detailed comments, visit the chart's [values.yaml](https://github.com/flanksource/config-db/blob/main/chart/values.yaml), or run these configuration commands:

```console
# Helm 2
helm inspect values flanksource/incident-commander

# Helm 3
helm show values flanksource/incident-commander
```
---
---

