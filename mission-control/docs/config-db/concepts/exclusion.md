# Exclusions

Exclusions allow you to remove certain fields from the scraped configuration. This is useful when you want to remove sensitive or just useless data from the scraped configuration.

## Exclude

| Field      | Description                                                                | Scheme     | Required |
| ---------- | -------------------------------------------------------------------------- | ---------- | -------- |
| `jsonpath` | Specify JSONPath expression for the fields                                 | `string`   | `true`   |
| `types`    | specify the config types from which the JSONPath fields need to be removed | `[]string` |          |

The `types` field is optional and if left empty, the filter will apply to all config items. [See Example](../examples/exclude-fields)
