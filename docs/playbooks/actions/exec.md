# <img src='https://raw.githubusercontent.com/flanksource/flanksource-ui/main/src/icons/console.svg' style='height: 32px'/> Exec Action

Exec Check executes a command or script file on the target host. The type of scripts executed include:

- Bash scripts
- Powershell scripts

| Field             | Description                                                                                                                                                    | Scheme                | Required |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | -------- |
| **`script`**      | Script can be a inline script or a path to a script that needs to be executed. On windows executed via Powershell and in darwin and linux executed using bash. | _string_              | Yes      |
| **`connections`** | Connections for some CLIs                                                                                                                                      | `map[string]string`   |          |

## ExecConnection

| Field   | Description      | Type                                   | Required |
| ------- | ---------------- | -------------------------------------- | -------- |
| `aws`   | AWS connection   | [`AWSConnection`](#awsconnection)      |          |
| `gcp`   | GCP connection   | [`GCPConnection`](#gcpconnection)      |          |
| `azure` | Azure connection | [`AzureConnection`](#azure-connection) |          |

### AWSConnection

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

### GCPConnection

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

## Templating

The scripts you provide will be templated using the following variables:

| Field       | Description        | Type                                                                                   |
| ----------- | ------------------ | -------------------------------------------------------------------------------------- |
| `config`    | Config item        | [`ConfigItem`](https://github.com/flanksource/duty/blob/main/models/config.go#L68-L90) |
| `component` | Component          | [`Component`](https://github.com/flanksource/duty/blob/main/models/config.go#L68-L90)  |
| `params`    | The run parameters | `map[string]string`                                                                    |
