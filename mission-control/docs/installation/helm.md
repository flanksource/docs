---
title: Self-Hosted Install With Helm
---

:::info Prerequisites
To install and run Mission Control you need to have the following prerequisites:

- Kubernetes 1.26+ with an Ingress Controller
- 500-1000m of CPU and 2GB of Memory
- Persistent Volumes with 20GB+ of storage or an external postgres database
- (Optional) SMTP Server (For sending notifications and invites)
:::



<Step step={1} name="Install Helm Repository">

```shell
helm repo add flanksource https://flanksource.github.io/charts
helm repo update
```
</Step>
<Step step={2} name="Install Helm Chart">

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
helm install mission-control  \
  flanksource/mission-control  \
 -n mission-control \
 --create-namespace \
 --wait \
 -f values.yaml
```

See [mission-control-chart/values.yaml](https://github.com/flanksource/mission-control-chart/blob/main/chart/values.yaml)  or `helm show values flanksource/mission-control` for a full list of configuration options

</Step>

## Optional Steps

<Step step={3} name="Configure SMTP">

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

</Step>
<Step step={4} name="Single Sign On">

See [SSO](./oidc) for OIDC.

</Step>

<Step step={5} name="External Database">

See [Database](./database) for using an external database like AWS RDS or for tweaking postgres settings.

</Step>
