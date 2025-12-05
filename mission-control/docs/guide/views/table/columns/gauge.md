---
title: Gauge
sidebar_custom_props:
  icon: mdi:gauge
---

The `gauge` column type displays numeric values as visual gauges with configurable thresholds and colors.

## Gauge Configuration

| Property     | Type   | Description                                        |
| ------------ | ------ | -------------------------------------------------- |
| `max`        | string | Maximum value (can be CEL like `row.memory_limit`) |
| `min`        | string | Minimum value                                      |
| `precision`  | int    | Decimal places                                     |
| `thresholds` | array  | Color thresholds by percent                        |

## Example

```yaml title="namespace.yaml" file=<rootDir>/modules/mission-control/fixtures/views/namespace.yaml {25-38}

```
