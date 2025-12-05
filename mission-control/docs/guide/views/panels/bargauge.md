---
title: Bar Gauge
sidebar_custom_props:
  icon: mdi:chart-bar
---

The `bargauge` panel displays multiple values as horizontal bars with configurable thresholds. Useful for comparing related metrics like CPU real usage vs requests vs limits.

## Properties

| Property     | Type   | Description                                                                                                                                      |
| ------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `min`        | string | Minimum value (can be a number or CEL expression)                                                                                                |
| `max`        | string | Maximum value (can be a number or CEL expression)                                                                                                |
| `precision`  | int    | Decimal places to display                                                                                                                        |
| `unit`       | string | Unit label (e.g., "%", "bytes")                                                                                                                  |
| `group`      | string | Name of a group. When multiple bargauges have the same group, they are placed together. This is useful when each bar needs different properties. |
| `format`     | string | Display format: `percentage` or `multiplier`                                                                                                     |
| `thresholds` | array  | Color thresholds based on percentage                                                                                                             |

## Expected Columns

| Column                             | Type   | Description                           |
| ---------------------------------- | ------ | ------------------------------------- |
| `value`                            | number | Numeric value for each bar (required) |
| `name` or first non-`value` column | string | Bar label (required)                  |

## Thresholds

Thresholds define colors at percentage breakpoints:

| Property  | Type   | Description                                |
| --------- | ------ | ------------------------------------------ |
| `percent` | int    | Percentage at which this threshold applies |
| `color`   | string | Color name or hex code (e.g., "#10b981")   |

## Example

```yaml title="bargauge.yaml" file=<rootDir>/modules/mission-control/fixtures/views/panels/bargauge.yaml

```
