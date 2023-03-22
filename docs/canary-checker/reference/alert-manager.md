# <img src='https://raw.githubusercontent.com/flanksource/flanksource-ui/main/src/icons/prometheus.svg' style='height: 32px'/> AlertManager

This checks [Prometheus AlertManager](https://prometheus.io/docs/alerting/latest/alertmanager/) ...

??? example

    ```yaml
    apiVersion: canaries.flanksource.com/v1
    kind: Canary
    metadata:
      name: cloudwatch-check
    spec:
      schedule: "*/5 * * * *"
      alertmanager:
        - auth:
            username:
              value: admin
            password:
              passowrd: secretpassword
    ```

| Field         | Description                                        | Scheme                              | Required |
| ------------- | -------------------------------------------------- | ----------------------------------- | -------- |
| `name`        | Name of the check                                  | `string`                            |          |
| `description` | Description for the check                          | `string`                            |          |
| `icon`        | Icon for overwriting default icon on the dashboard | `string`                            |          |
| `labels`      | Labels for check                                   | `map[string]string`                 |          |
| `test`        | Template to test the result against                | [`Template`](#template)             |          |
| `display`     | Template to display the result in                  | [`Template`](#template)             |          |
| `transform`   | Template for transformation                        | [`Template`](#template)             |          |
| `host`        | Template for transformation                        | `string`                            |          |
| `auth`        | Credentials for AlertManager                       | [`Authentication`](#authentication) |          |
| `alerts`      | Cloudwatch HTTP Endpoint to establish connection   | `[]string`                          |          |
| `filters`     | Used to filter the objects                         | `map[string]string`                 |          |
| `ignore`      | Region for cloudwatch                              | `[]string`                          |          |

## Scheme Reference

### Template

| Field        | Description                                      | Scheme   | Required |
| ------------ | ------------------------------------------------ | -------- | -------- |
| `jsonPath`   | Specify path to JSON element for use in template | `string` |          |
| `template`   | Specify Go template for use                      | `string` |          |
| `expr`       | Specify expression for use in template           | `string` |          |
| `javascript` | Specify javascript syntax to run for template    | `string` |          |

### Authentication

| Field      | Description           | Scheme                                                                       | Required |
| ---------- | --------------------- | ---------------------------------------------------------------------------- | -------- |
| `username` | Specify the username. | [`kommons.EnvVar`](https://pkg.go.dev/github.com/flanksource/kommons#EnvVar) |          |
| `password` | Specify the password. | [`kommons.EnvVar`](https://pkg.go.dev/github.com/flanksource/kommons#EnvVar) |          |
