Route to the correct backend

## Route

| Field      | Description                                                            | Scheme              | Required   |
| ---------- | ---------------------------------------------------------------------- | ------------------- | ---------- |
| `type`     | type should match the type of the query.                               | `string`            | `optional` |
| `idPrefix` | prefix of the query                                                    | `string`            | `optional` |
| `labels`   | configuration for kubernetes                                           | `map[string]string` | `true`     |
| `additive` | specifies whether this backend is exclusively. _(Defaults to `false`)_ | `bool`              | `optional` |


## Example: