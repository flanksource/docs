
## Quick Start

How to Install Mission control with helm

### Prerequisite

To properly install and run the Mission Control chart on your Kubernetes Cluster, you need to have the following prerequisites;

- A Kubernetes installation of version 1.21 or higher.

### Install Chart

```console
helm install [RELEASE_NAME] flanksource/mission-control
```

To set custom values file for your mission-control helm chart installation to override existing values in [`mission-control-chart`](https://github.com/flanksource/mission-control-chart/blob/main/chart/values.yaml).

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
    host: mission-control.canary.lab.flanksource.com
    tls:
      - secretName: mission-control-tls
        hosts:
          - mission-control.canary.lab.flanksource.com
db:
  storageClass: gp2
  storage: 50Gi
EOT

helm install [RELEASE_NAME] -f myvalues.yaml flanksource/mission-control
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
helm upgrade [RELEASE_NAME] [CHART] --install
```

_See [helm upgrade](https://helm.sh/docs/helm/helm_upgrade/) for command documentation._

### Configuration

See [Customizing the Chart Before Installing](https://helm.sh/docs/intro/using_helm/#customizing-the-chart-before-installing). To see all configurable options with detailed comments, visit the chart's [values.yaml](https://github.com/flanksource/config-db/blob/main/chart/values.yaml), or run these configuration commands:

```console
helm show values flanksource/mission-control
```
