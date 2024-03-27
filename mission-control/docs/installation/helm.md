# Self-Hosted Install With Helm

## Prerequisites

To install and run Mission Control you need to have the following prerequisites:

- A Kubernetes installation of version 1.26 or higher.
- (Optional) SMTP Server (For sending notifications and invites)
- (Optional) Connection details for an external Postgres Database

## Install Chart

To set custom values file for your mission-control helm chart installation to override existing values in [`mission-control-chart`](https://github.com/flanksource/mission-control-chart/blob/main/chart/values.yaml).

```yaml title="values.yaml"
global:
  ui:
    host: "mission-control-ui.local" # hostname
  serviceAccount:
    annotations: # Any annotations required to attach custom IAM policies etc.

adminPassword: admin # The default password for the admin@local user

flanksource-ui:
  ingress:
    enabled: true
    annotations:
      kubernetes.io/ingress.class: nginx
      kubernetes.io/tls-acme: "true"
db:
  storageClass: # e.g. gp3
  storage: 50Gi
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

See [mission-control-chart/values.yaml](https://github.com/flanksource/mission-control-chart/blob/main/chart/values.yaml)  or `helm show values flanksource/mission-control` for a full list of configuration options

## SMTP

An SMTP server is required for sending notifications, user invites and password resets.

The format of `connection_uri` is `smtp://hostname:port`

```yaml title="values.yaml"
kratos:
  kratos:
    config:
      courier:
        smtp:
          connection_uri: # smtp://localhost:25
          from_address: noreply@
          from_name: Mission Control
          headers: {} # These headers will be passed in the SMTP conversation -- e.g. when using the AWS SES SMTP interface for cross-account sending.
          local_name: #Identifier used in the SMTP HELO/EHLO command. Some SMTP relays require a unique identifier.
```

Kratos also supports [HTTP Webhooks](https://www.ory.sh/docs/kratos/self-hosted/email-http) for sending emails.

See [Customizing the Chart Before Installing](https://helm.sh/docs/intro/using_helm/#customizing-the-chart-before-installing). To see all configurable options with detailed comments, visit the chart's [values.yaml](https://github.com/flanksource/config-db/blob/main/chart/values.yaml), or run these configuration commands:

```console
helm show values flanksource/mission-control
```

## Single Sign On

See [SSO](./oidc.md) for OIDC.

## Database

See [Database](./database.md) for using an external database like AWS RDS or for tweaking postgres settings.
