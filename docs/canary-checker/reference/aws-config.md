# <img src='https://raw.githubusercontent.com/flanksource/flanksource-ui/main/src/icons/aws-config.svg' style='height: 32px'/> AWS Config

AWS Config checks ...

??? example

    ```yaml
    apiVersion: canaries.flanksource.com/v1
    kind: Canary
    metadata:
      name: exec-check
    spec:
      interval: 30
      awsConfig:
        - description: "Check the config"
          name: config check
          query: "SELECT * FROM aws_config_rule"
    ```

| Field            | Description                                        | Scheme                            | Required   |
| ---------------- | -------------------------------------------------- | --------------------------------- | ---------- |
| `name`           | Name of the check                                  | `string`                          |            |
| `description`    | Description for the check                          | `string`                          |            |
| `icon`           | Icon for overwriting default icon on the dashboard | `string`                          |            |
| `labels`         | Labels for check                                   | `map[string]string`               |            |
| `test`           | Template to test the result against                | [`Template`](#template)           |            |
| `display`        | Template to display the result in                  | [`Template`](#template)           |            |
| `transform`      | Template for transformation                        | [`Template`](#template)           |            |
| `query`          | The SQL query SELECT command                       | `string`                          | `true`     |
| `awsConnection`  | AWS connection details.                            | [`AWSConnection`](#awsconnection) |            |
| `aggregatorName` | Specify the name of the configuration aggregator   | `string`                          | `optional` |

---

## Scheme Reference

### Template

| Field        | Description                                      | Scheme   | Required |
| ------------ | ------------------------------------------------ | -------- | -------- |
| `jsonPath`   | Specify path to JSON element for use in template | `string` |          |
| `template`   | Specify Go template for use                      | `string` |          |
| `expr`       | Specify expression for use in template           | `string` |          |
| `javascript` | Specify javascript syntax to run for template    | `string` |          |

### AWSConnection

| Field           | Description                                                                                           | Scheme                                                                       | Required |
| --------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | -------- |
| `accessKey`     | Specify the access key                                                                                | [`kommons.EnvVar`](https://pkg.go.dev/github.com/flanksource/kommons#EnvVar) |          |
| `secretKey`     | Specify the secret key                                                                                | [`kommons.EnvVar`](https://pkg.go.dev/github.com/flanksource/kommons#EnvVar) |          |
| `region`        | Specify the region                                                                                    | `string`                                                                     |          |
| `endpoint`      | Specify the endpoint                                                                                  | `string`                                                                     |          |
| `skipTLSVerify` | Skip TLS verification when connecting to AWS                                                          | `bool`                                                                       |          |
| `objectPath`    | Glob path to restrict matches to a subset                                                             | `string`                                                                     |          |
| `usePathStyle`  | Use path style path: http://s3.amazonaws.com/BUCKET/KEY instead of http://BUCKET.s3.amazonaws.com/KEY | `bool`                                                                       |          |
