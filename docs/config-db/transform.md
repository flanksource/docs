`config-db` allows you to transform the configuration after they've been scraped from the target. This is useful for removing sensitive data and fields. You can also use it to replace sensitive fields with hash functions or static string.

## Transform

| Field                | Description                                                                                    | Scheme                | Required |
| -------------------- | ---------------------------------------------------------------------------------------------- | --------------------- | -------- |
| [`script`](#script)  | Script to transform scrape result.                                                             | [`Script`](#script)   |          |
| [`include`](#Filter) | Specify fields to include in the configuration.                                                | [`[]Filter`](#filter) | `false`  |
| [`exclude`](#filter) | Specify fields to remove from the config. It is useful for removing sensitive data and fields. | [`[]Filter`](#filter) | `false`  |
| [`mask`](#mask)      | Specify configurations to replace sensitive fields with hash functions or static string.       | [`[]Mask`](#mask)     | `false`  |

### Script

| Field        | Description                                    | Scheme   | Required |
| ------------ | ---------------------------------------------- | -------- | -------- |
| `gotemplate` | Specify Go template for use in script          | `string` |          |
| `jsonpath`   | Specify path to JSON element for use in script | `string` |          |
| `expr`       | Specify expression for use in script           | `string` |          |
| `javascript` | Specify javascript syntax for script           | `string` |          |

### Filter

| Field      | Description                                | Scheme   | Required |
| ---------- | ------------------------------------------ | -------- | -------- |
| `jsonpath` | Specify JSONPath expression for the fields | `string` |          |

### Mask

Mask allows replacing sensitive fields with hash functions or a static string.
Example: You could set the `value` to `***` and all the fields that match the `jsonPath` will be replaced with `***`.

| Field      | Description                                                                                  | Scheme                          | Required |
| ---------- | -------------------------------------------------------------------------------------------- | ------------------------------- | -------- |
| `selector` | Selector helps in choosing which configs should use the mask.                                | [`MaskSelector`](#maskselector) | `true`   |
| `jsonpath` | Specify JSONPath expression for the fields                                                   | `string`                        | `true`   |
| `value`    | Value can be a name of a hash function or just a string. Supported hash functions: `md5sum`. | `string`                        | `true`   |

#### MaskSelector

| Field  | Description                               | Scheme   | Required |
| ------ | ----------------------------------------- | -------- | -------- |
| `type` | Type is the config type to apply the mask | `string` | `true`   |
