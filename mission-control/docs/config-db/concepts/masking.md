# Masking

Masking allows replacing sensitive fields with hash of that field or with a static string.
The field to mask is specified by the `jsonPath` config and `value` field defines the hash function or the static value.
[See example](../examples/masking-fields).

| Field      | Description                                                                                                         | Scheme                          | Required |
| ---------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------- | -------- |
| `selector` | Selector helps in choosing which configs should use the mask.                                                       | [`MaskSelector`](#maskselector) | `true`   |
| `jsonpath` | Specify JSONPath expression for the fields                                                                          | `string`                        | `true`   |
| `value`    | Value can be a name of a hash function or just a string. See [supported hash functions](#supported-hash-functions). | `string`                        | `true`   |

### MaskSelector

| Field  | Description                               | Scheme   | Required |
| ------ | ----------------------------------------- | -------- | -------- |
| `type` | Type is the config type to apply the mask | `string` | `true`   |

`Config DB` allows selectively applying masks to certain types of configs. So you could apply a mask to all the `Config` types and another mask to all the `Secret` types.

:::info
Masks are applied in the order they are specified in the configuration file.
:::

### Supported hash functions

At the moment, only `md5sum` is supported. More hash functions will be added in the future.

- md5sum
