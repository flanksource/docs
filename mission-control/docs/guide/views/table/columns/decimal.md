---
title: Decimal
sidebar_custom_props:
  icon: mdi:decimal
---

The `decimal` column type displays numeric values with support for high precision. Use it for floats, ratios, costs, and any value where decimal accuracy matters.

## Properties

| Property | Type   | Description                                            |
| -------- | ------ | ------------------------------------------------------ |
| `type`   | string | Must be `decimal`                                      |
| `unit`   | string | Display unit appended to the value (e.g. `$`, `req/s`) |

See [Common Properties](/guide/views/table/columns) for the full list of fields available on all column types.

## Example

```yaml
columns:
  - name: error_rate
    type: decimal
  - name: cost
    type: decimal
    unit: '$'
```
