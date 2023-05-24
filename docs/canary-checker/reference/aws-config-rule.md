# <img src='https://raw.githubusercontent.com/flanksource/flanksource-ui/main/src/icons/aws-config.svg' style='height: 32px'/> AWS Config Rule

AWS Config Rule checks ...

  ```yaml
  apiVersion: canaries.flanksource.com/v1
  kind: Canary
  metadata:
    name: exec-check
  spec:
    interval: 30
    awsConfigRule:
      - description: "AWS Config Rule Checker"
        name: AWS Config Rule Checker
        rules:
          - "s3-bucket-public-read-prohibited"
        ignoreRules:
          - "s3-bucket-public-write-prohibited"
  ```

| Field             | Description                                                                                                                   | Scheme                            | Required |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | -------- |
| `name`            | Name of the check                                                                                                             | `string`                          |          |
| `description`     | Description for the check                                                                                                     | `string`                          |          |
| `icon`            | Icon for overwriting default icon on the dashboard                                                                            | `string`                          |          |
| `labels`          | Labels for check                                                                                                              | `map[string]string`               |          |
| `test`            | Template to test the result against                                                                                           | [`Template`](../concepts/templating.md)           |          |
| `display`         | Template to display the result in                                                                                             | [`Template`](../concepts/templating.md)           |          |
| `transform`       | Template for transformation                                                                                                   | [`Template`](../concepts/templating.md)           |          |
| `ignoreRules`     | List of rules which would be omitted from the fetch result.                                                                   | `[]string`                        |          |
| `rules`           | Specify one or more Config rule names to filter the results by rule.                                                          | `[]string`                        |          |
| `complianceTypes` | Filters the results by compliance. The allowed values are `INSUFFICIENT_DATA`, `NON_COMPLIANT`, `NOT_APPLICABLE`, `COMPLIANT` | `[]string`                        |          |
| `awsConnection`   | AWS connection details.                                                                                                       | [`AWSConnection`](#awsconnection) | `true`   |

---

## Scheme Reference

### AWSConnection

| Field           | Description                                                                                           | Scheme                                                                       | Required |
| --------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | -------- |
| `accessKey`     | Specify the access key                                                                                | [`kommons.EnvVar`](https://pkg.go.dev/github.com/flanksource/kommons#EnvVar) |          |
| `secretKey`     | Specify the secret key                                                                                | [`kommons.EnvVar`](https://pkg.go.dev/github.com/flanksource/kommons#EnvVar) |          |
| `region`        | Specify the region                                                                                    | `string`                                                                     |          |
| `endpoint`      | Specify the endpoint                                                                                  | `string`                                                                     |          |
| `skipTLSVerify` | Skip TLS verification when connecting to AWS                                                          | `bool`                                                                       |          |
| `objectPath`    | Glob path to restrict matches to a subset                                                             | `string`                                                                     |          |
| `usePathStyle`  | Use path style path: <http://s3.amazonaws.com/BUCKET/KEY> instead of <http://BUCKET.s3.amazonaws.com/KEY> | `bool`                                                                       |          |
