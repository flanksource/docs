# Connections


### AWS Connection

| Field            | Description     | Type                                                                          | Required |
| ---------------- | --------------- | ----------------------------------------------------------------------------- | -------- |
| `connectionName` | Connection name | `string`                                                                      |          |
| `accessKey`      | Access key      |  <CommonLink to="secrets">*EnvVar*</CommonLink> |          |
| `secretKey`      | Secret key      |  <CommonLink to="secrets">*EnvVar*</CommonLink> |          |
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
| `credentials`    | Credentials     |  <CommonLink to="secrets">*EnvVar*</CommonLink> |          |

### Azure Connection

| Field            | Description     | Type                                                                          | Required |
| ---------------- | --------------- | ----------------------------------------------------------------------------- | -------- |
| `connectionName` | Connection name | `string`                                                                      |          |
| `clientID`       | Client ID       |  <CommonLink to="secrets">*EnvVar*</CommonLink> |          |
| `clientSecret`   | Client Secret   |  <CommonLink to="secrets">*EnvVar*</CommonLink> |          |
| `tenantID`       | Tenant ID       | `string`                                                                      |          |
