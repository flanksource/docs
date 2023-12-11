# EnvVar

EnvVar allows you to pull in data from the environment (eg: Kubernetes configmaps or secrets ...)

| Field       | Description                                 | Type                | Required |
| ----------- | ------------------------------------------- | ------------------- | -------- |
| `name`      | Give an arbitrary unique name to the envvar | `string`            | `true`   |
| `value`     | The value of the envvar                     | `string`            |          |
| `valueFrom` | The source of the envvar value              | [`Source`](#source) |          |

:::note
You can also provide a static value to the envvar with `value`.
:::

## Source

| Field             | Description                                       | Type                                            | Required |
| ----------------- | ------------------------------------------------- | ----------------------------------------------- | -------- |
| `serviceAccount`  | The service account whose token should be fetched | `string`                                        |          |
| `helmRef`         | The helm reference                                | [`HelmRefKeySelector`](#helmrefkeyselector)     |          |
| `configMapKeyRef` | The configmap reference                           | [`ConfigMapKeySelector`](#configmapkeyselector) |          |
| `secretKeyRef`    | The secret reference                              | [`SecretKeySelector`](#secretkeyselector)       |          |

### HelmRefKeySelector

Helm ref allows you to pull in data from the helm values file.

| Field  | Description              | Type     | Required |
| ------ | ------------------------ | -------- | -------- |
| `name` | Name of the helm release | `string` | `true`   |
| `key`  | JSON Path key            | `string` | `true`   |

### ConfigMapKeySelector

| Field  | Description           | Type     | Required |
| ------ | --------------------- | -------- | -------- |
| `name` | ConfigMap name        | `string` | `true`   |
| `key`  | The key in the config | `string` | `true`   |

### SecretKeySelector

| Field  | Description           | Type     | Required |
| ------ | --------------------- | -------- | -------- |
| `name` | Secret name           | `string` | `true`   |
| `key`  | The key in the Secret | `string` | `true`   |
