---
title: Gauge
sidebar_custom_props:
  icon: mdi:gauge
---

The `gauge` column type displays numeric values as visual gauges with configurable thresholds and colors.

## Properties

| Property                     | Type   | Description                                                                           |
| ---------------------------- | ------ | ------------------------------------------------------------------------------------- |
| `type`                       | string | Must be `gauge`                                                                       |
| `unit`                       | string | Unit label appended to the displayed value (e.g. `%`, `MB`)                           |
| `gauge`                      | object | Gauge visualization configuration (required)                                          |
| `gauge.min`                  | string | Minimum value for the gauge range (number or CEL expression, e.g. `row.memory_limit`) |
| `gauge.max`                  | string | Maximum value for the gauge range (number or CEL expression)                          |
| `gauge.precision`            | int    | Number of decimal places to display                                                   |
| `gauge.thresholds[].percent` | int    | Percentage of the range at which this threshold applies (0–100)                       |
| `gauge.thresholds[].color`   | string | Color at this threshold (name or hex, e.g. `green`, `#ef4444`)                        |

See [Common Properties](/guide/views/table/columns) for the full list of fields available on all column types.

## Example

```yaml title="namespace.yaml" file=<rootDir>/modules/mission-control/fixtures/views/namespace.yaml {25-38}

```
