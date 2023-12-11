# Connections


### AWS Connection

| Field            | Description     | Type                                                                          | Required |
| ---------------- | --------------- | ----------------------------------------------------------------------------- | -------- |
| `connectionName` | Connection name | `string`                                                                      |          |
| `accessKey`      | Access key      | [`types.EnvVar`](https://pkg.go.dev/github.com/flanksource/duty/types#EnvVar) |          |
| `secretKey`      | Secret key      | [`types.EnvVar`](https://pkg.go.dev/github.com/flanksource/duty/types#EnvVar) |          |
| `region`         | Region          | `string`                                                                      |          |
| `endpoint`       | Endpoint        | `string`                                                                      |          |
| `skipTLSVerify`  | Skip TLS verify | `bool`                                                                        |          |
| `objectPath`     | Object path     | `string`                                                                      |          |
| `usePathStyle`   | Use path style  | `bool`                                                                        |          |

### GCP Connection

| Field            | Description     | Type                                                                          | Required |
| ---------------- | --------------- | ----------------------------------------------------------------------------- | -------- |
| `connectionName` | Connection name | `string`                                                                      |          |
| `endpoint`       | Endpoint        | `string`                                                                      |          |
| `credentials`    | Credentials     | [`types.EnvVar`](https://pkg.go.dev/github.com/flanksource/duty/types#EnvVar) |          |

### Azure Connection

| Field            | Description     | Type                                                                          | Required |
| ---------------- | --------------- | ----------------------------------------------------------------------------- | -------- |
| `connectionName` | Connection name | `string`                                                                      |          |
| `clientID`       | Client ID       | [`types.EnvVar`](https://pkg.go.dev/github.com/flanksource/duty/types#EnvVar) |          |
| `clientSecret`   | Client Secret   | [`types.EnvVar`](https://pkg.go.dev/github.com/flanksource/duty/types#EnvVar) |          |
| `tenantID`       | Tenant ID       | `string`                                                                      |          |
