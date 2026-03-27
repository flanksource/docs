---
title: String
sidebar_custom_props:
  icon: mdi:format-text
---

The `string` column type displays text values.

## Properties

| Property | Type   | Description                                                                                         |
| -------- | ------ | --------------------------------------------------------------------------------------------------- |
| `type`   | string | Must be `string`                                                                                    |
| `url`    | object | Link to a config, another view, or a custom URL (see [Column URLs](/guide/views/table#column-urls)) |
| `icon`   | string | CEL expression that selects an icon per row (e.g. `row.type`)                                       |
| `badge`  | object | Optional badge styling (`color.auto` or `color.map`) to apply color to the value                    |
| `filter` | object | Enable `filter.type: multiselect` to expose server-side filtering                                   |

See [Common Properties](/guide/views/table/columns) for the full list of fields available on all column types.

## Example

```yaml title="cronjobs.yaml" file=<rootDir>/modules/mission-control/fixtures/views/cronjobs.yaml {18-19}

```
