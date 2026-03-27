---
title: Decimal
sidebar_custom_props:
  icon: mdi:decimal
---

The `decimal` column type displays numeric values with support for high precision. Use it for floats, ratios, costs, and any value where decimal accuracy matters.

<ColumnDef />

## Example

```yaml
columns:
  - name: error_rate
    type: decimal
  - name: cost
    type: decimal
    unit: '$'
```
