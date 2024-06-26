---
title: Getting Started
show_title: false
sidebar_position: 0
---
This tutorial guides you through setting up and configuring a self-hosted Mission Control environment.


:::info Prerequisites
To install and run Mission Control you need the following:

- Kubernetes 1.26+ with an Ingress Controller
- [cert-manager.io](https://cert-manager.io/docs/) or an existing TLS secret for ingress
- 1 - 2 CPUs and 4GB of Memory
- Persistent Volumes with 20GB+ of storage or an external postgres database
- (Optional) [prometheus operator](https://prometheus-operator.dev/)
- (Optional) SMTP Server (For sending notifications and invites)
:::



<Step step={1} name="Install Helm Repository">

```shell
helm repo add flanksource https://flanksource.github.io/charts
helm repo update
```

</Step>
<Step step={2} name="Install Helm Chart">

```yaml title="values.yaml"
global:
  ui:
    host: "mission-control-ui.local" # hostname
  serviceAccount:
    annotations: # Any annotations required to attach custom IAM policies etc.
```

<details summary="Auto Generate Certificates with Cert-Manager">
You can add annotations to the ingress to have cert-manager generate the TLS certificate:

```yaml
flanksource-ui:
  ingress:
    annotations:
      kubernetes.io/ingress.class: nginx
      kubernetes.io/tls-acme: "true"
```
</details>



```bash
helm install mission-control  \
  flanksource/mission-control  \
 -n mission-control \
 --create-namespace \
 --wait \
 -f values.yaml
```

See [values.yaml](https://github.com/flanksource/mission-control-chart/blob/main/chart/values.yaml)  or `helm show values flanksource/mission-control` for a full list of configuration options.

</Step>

## Optional Steps

<Step step={3} name="Configure Email (SMTP)">

An SMTP server is required for sending notifications, approvals,  user invites and password resets.

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

See [SSO](./sso)

</Step>

<Step step={5} name="External Database">

See [Database](./database) to configure an external database such as AWS RDS or Google Cloud SQL, or to optimize the bundled PostgreSQL settings.


</Step>
