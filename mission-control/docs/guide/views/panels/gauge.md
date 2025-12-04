---
title: Gauge
sidebar_custom_props:
  icon: mdi:gauge
---

The `gauge` panel displays a single numeric value as a visual gauge with configurable min/max bounds and color thresholds.

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `min` | string | Minimum value (can be a number or CEL expression) |
| `max` | string | Maximum value (can be a number or CEL expression) |
| `precision` | int | Decimal places to display |
| `unit` | string | Unit label (e.g., "%", "pods") |
| `thresholds` | array | Color thresholds based on percentage |

## Expected Columns

| Column | Type | Description |
|--------|------|-------------|
| `value` | number | Numeric value to display (required) |
| `label` | string | Optional label; the panel title is used when omitted |

## Thresholds

Thresholds define colors at percentage breakpoints (0-100%):

| Property | Type | Description |
|----------|------|-------------|
| `percent` | int | Percentage at which this threshold applies |
| `color` | string | Color name or hex code (e.g., "green", "#10b981") |

## Example

```yaml title="gauge.yaml" file=<rootDir>/modules/mission-control/fixtures/views/panels/gauge.yaml

```
