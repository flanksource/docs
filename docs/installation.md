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
```console
helm repo add flanksource https://flanksource.github.io/charts
helm repo update
```

### Prerequisites
Kubernetes 1.14+


## Incident Commander

### Install Chart
```console
helm install [RELEASE_NAME] flanksource/incident-commander
```

To set custom values file for your incident-commander helm chart installation to override existing values in [`incident-commander-chart`](https://github.com/flanksource/incident-commander-chart/blob/main/chart/values.yaml).
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

helm install [RELEASE_NAME] -f myvalues.yaml flanksource/incident-commander
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
helm show values flanksource/incident-commander
```

---


