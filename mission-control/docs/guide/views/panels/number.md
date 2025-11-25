---
title: Number
sidebar_custom_props:
  icon: mdi:numeric
---

The `number` panel displays a single numeric value with optional unit formatting.

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `unit` | string | Unit label (e.g., "bytes", "seconds", "pods") |
| `precision` | int | Decimal places to display |

## Expected Columns

| Column | Type | Description |
|--------|------|-------------|
| `value` or `count` | number | The numeric value to display (required) |
| `label` | string | Label for the panel (optional, defaults to panel name) |

## Example

```yaml title="number.yaml" file=<rootDir>/modules/mission-control/fixtures/views/panels/number.yaml

```

## With Unit and Precision

```yaml title="resource-usage.yaml" file=<rootDir>/modules/mission-control/fixtures/views/panels/resource-usage.yaml

```
