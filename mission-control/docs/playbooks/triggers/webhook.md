# Webhook Triggers

Playbooks can also be triggered via webhooks. When a webhook is configured, mission-control listens on the specified endpoint and any calls to the endpoint triggers the playbook.
By default, the webhook calls are not protected via authentication. However, there are various authentication methods available.

```
/webhook/<webhook-path>
```

```yaml title="webhook-trigger.yaml"
apiVersion: mission-control.flanksource.com/v1
kind: Playbook
metadata:
  name: create-file-on-webhook
spec:
  description: Create a file specified by the webhook
  components:
    - type: KubernetesCluster
  'on':
    webhook:
      path: my-webhook
      authentication:
        basic:
          username:
            value: my-username
          password:
            value: my-password
  parameters:
    - name: path
      label: Absolute path of the file to create
  actions:
    - name: Create the file
      exec:
        script: touch {{.params.path}}
```

## Spec

A webhook can simply be defined by a path - which must be unique.

| Field            | Description                      | Scheme                                | Required |
| ---------------- | -------------------------------- | ------------------------------------- | -------- |
| `path`           | Unique endpoint for the webhook. | `string`                              | `true`   |
| `authentication` | Specify approvers of approval.   | [`[]Authentication`](#authentication) |          |

### Authentication

| Field    | Description | Scheme                       | Required |
| -------- | ----------- | ---------------------------- | -------- |
| `basic`  | Basic Auth  | [`BasicAuth`](#basic-auth)   |          |
| `github` | Github Auth | [`GithubAuth`](#github-auth) |          |
| `svix`   | Svix Auth   | [`SvixAuth`](#svix-auth)     |          |
| `jwt`    | JWT Auth    | [`JWTAuth`](#jwt-auth)       |          |

:::note
If multiple authentication methods are specified, all of them will be used.
:::

#### Basic Auth

| Field      | Description | Scheme                                                                        | Required |
| ---------- | ----------- | ----------------------------------------------------------------------------- | -------- |
| `username` | Username    |  <CommonLink to="secrets">*EnvVar*</CommonLink> | `true`   |
| `password` | Path        |  <CommonLink to="secrets">*EnvVar*</CommonLink> | `true`   |

#### Github Auth

If the webhook is being called by Github, you can use [GitHub's webhook verification](https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries) to ensure that the webhook calls are really from GitHub.

| Field   | Description                  | Scheme                                                                        | Required |
| ------- | ---------------------------- | ----------------------------------------------------------------------------- | -------- |
| `token` | Secret token for the webhook |  <CommonLink to="secrets">*EnvVar*</CommonLink> | `true`   |

#### Svix Auth

| Field             | Description                                          | Scheme                                                                        | Required |
| ----------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------- | -------- |
| `secret`          | Signing secret                                       |  <CommonLink to="secrets">*EnvVar*</CommonLink> | `true`   |
| `verifyTimestamp` | Specify the tolerance for the timestamp verification | `string`                                                                      |          |

#### JWT Auth

| Field     | Description | Scheme   | Required |
| --------- | ----------- | -------- | -------- |
| `jwksUri` | JWKS URI    | `string` | `true`   |
