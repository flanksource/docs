---
title: Bar Gauge
sidebar_custom_props:
  icon: mdi:chart-bar
---

The `bargauge` panel displays multiple values as horizontal bars with configurable thresholds. Useful for comparing related metrics like CPU real usage vs requests vs limits.

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `min` | string | Minimum value (can be a number or CEL expression) |
| `max` | string | Maximum value (can be a number or CEL expression) |
| `precision` | int | Decimal places to display |
| `unit` | string | Unit label (e.g., "%", "bytes") |
| `group` | string | Field to group bars by |
| `format` | string | Display format: `percentage` or `multiplier` |
| `thresholds` | array | Color thresholds based on percentage |

## Expected Columns

| Column | Type | Description |
|--------|------|-------------|
| `value` | number | The numeric value for each bar (required) |
| `name` | string | Label for each bar (required, or any other column will be used as label) |

## Thresholds

Thresholds define colors at percentage breakpoints:

| Property | Type | Description |
|----------|------|-------------|
| `percent` | int | Percentage at which this threshold applies |
| `color` | string | Color name or hex code (e.g., "#10b981") |

## Example

```yaml title="bargauge.yaml" file=<rootDir>/modules/mission-control/fixtures/views/panels/bargauge.yaml

```
