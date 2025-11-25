---
title: Duration
sidebar_custom_props:
  icon: mdi:timer-outline
---

The `duration` panel displays time duration values in a human-readable format (e.g., "2h 30m"). It has no additional configuration properties.

## Expected Columns

| Column | Type | Description |
|--------|------|-------------|
| `value` | number | Duration in **nanoseconds** (required) |
| `label` | string | Label for the panel (optional, defaults to panel name) |

## Example

```yaml title="pipelines.yaml" file=<rootDir>/modules/mission-control/fixtures/views/pipelines.yaml

```
