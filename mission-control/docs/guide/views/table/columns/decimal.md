---
title: Decimal
sidebar_custom_props:
  icon: mdi:decimal
---

The `decimal` column type displays numeric values with support for high precision. It is similar to `number` but explicitly intended for decimal values.

## Example

```yaml
columns:
  - name: error_rate
    type: decimal
  - name: cost
    type: decimal
    unit: '$'
```
