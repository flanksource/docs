---
title: Duration
sidebar_custom_props:
  icon: mdi:timer-outline
---

The `duration` column type displays time spans in human-readable format (e.g., `2h 30m`, `1d`). Values are expected in nanoseconds.

## Properties

| Property | Type   | Description                                                     |
| -------- | ------ | --------------------------------------------------------------- |
| `type`   | string | Must be `duration`                                              |
| `unit`   | string | Override the display unit (optional; auto-formatted by default) |

See [Common Properties](/guide/views/table/columns) for the full list of fields available on all column types.

## Example

```yaml title="pipelines.yaml" file=<rootDir>/modules/mission-control/fixtures/views/pipelines.yaml {49-51}

```
