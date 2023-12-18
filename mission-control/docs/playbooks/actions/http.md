---
title: HTTP Action
---

# <Icon name="http"/> HTTP Action

HTTP action makes an HTTP request.

```yaml title="check-failure-webhook-alert.yaml"
apiVersion: mission-control.flanksource.com/v1
kind: Playbook
metadata:
  name: check-failure-webhook-alert
spec:
  description: Notify check failures via webhook
  on:
    check:
      - event: failed
        filter: check.type == 'http'
  actions:
    - name: Notify webhook about check failure
      http:
        url: https://mywebhook
        thresholdMillis: 5000
        method: POST
        body: |
          {
            "check": {
              "name": "{{.check.name}}",
              "status": "{{.check.status}}"
            }
          }
        templateBody: true
        headers:
          - name: X-Token
            value: secret123
```

| Field          | Description                                                                                                     | Scheme                                                                          | Required | Templatable |
| -------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | -------- | ----------- |
| `connection`   | Connection name. e.g. connection://http/google                                                                  | `string`                                                                        |          |
| `url`          | Url to make the request to                                                                                      | `string`                                                                        |          |
| `username`     | Username to authenticate with                                                                                   | [`types.EnvVar`](https://pkg.go.dev/github.com/flanksource/duty/types#EnvVar)   |          |
| `password`     | Password to authenticate with                                                                                   | [`types.EnvVar`](https://pkg.go.dev/github.com/flanksource/duty/types#EnvVar)   |          |
| `method`       | HTTP method to use _(default: GET)_                                                                             | `string`                                                                        |          |
| `ntlm`         | NTLM when set to true will perform authentication using NTLM v1 protocol                                        | `bool`                                                                          |          |
| `ntlmv2`       | NTLM when set to true will perform authentication using NTLM v2 protocol                                        | `bool`                                                                          |          |
| `headers`      | Header fields to be used in the request                                                                         | [`[]types.EnvVar`](https://pkg.go.dev/github.com/flanksource/duty/types#EnvVar) |          |
| `body`         | Request Body Contents                                                                                           | `string`                                                                        |          | `true`      |
| `templateBody` | When set to true the request body is templated _(default: `false`)_. [Read more ...](../concepts/templating.md) | `bool`                                                                          |          |

:::note
Either the `connection` or the `url` is required.
:::

## Templating

The body of the HTTP request is templatable. The script template receives a environment variable that contain details about the corresponding config, check or component and the parameter(if applicable).

| Field       | Description                              | Schema                                       |
| ----------- | ---------------------------------------- | -------------------------------------------- |
| `config`    | Config passed to the playbook            | [`ConfigItem`](../references/config_item.md) |
| `component` | Component passed to the playbook         | [`Component`](../references/component.md)    |
| `check`     | Canary Check passed to the playbook      | [`Check`](../references/check.md)            |
| `params`    | User provided parameters to the playbook | `map[string]string`                          |
