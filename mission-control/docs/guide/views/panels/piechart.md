---
title: Piechart
sidebar_custom_props:
  icon: mdi:chart-pie
---

The `piechart` panel displays data distribution as a pie chart with customizable colors and labels.

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `showLabels` | bool | Whether to display value labels on pie slices |
| `colors` | map | Custom color mapping by label name |

## Expected Columns

| Column | Type | Description |
|--------|------|-------------|
| `count` | number | The size of each pie slice (required) |
| Any other column | string | Used as the label for each slice (e.g., `health`, `status`) |

## Colors

The `colors` property maps label values to hex color codes. If not specified, colors are automatically assigned based on semantic meaning (e.g., "healthy" gets green, "error" gets red).

## Example

```yaml title="piechart.yaml" file=<rootDir>/modules/mission-control/fixtures/views/panels/piechart.yaml

```
