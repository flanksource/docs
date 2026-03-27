---
title: Health
sidebar_custom_props:
  icon: health
---

The `health` column type displays health status with color-coded indicators. Supports three states: `healthy` (green), `warning` (yellow), and `unhealthy`/`critical` (red).

## Properties

| Property            | Type   | Description                                                                   |
| ------------------- | ------ | ----------------------------------------------------------------------------- |
| `type`              | string | Must be `health`                                                              |
| `card.useForAccent` | bool   | Set to `true` to use the health value as the accent color for the card layout |

See [Common Properties](/guide/views/table/columns) for the full list of fields available on all column types.

## Example

```yaml title="ingress.yaml" file=<rootDir>/modules/mission-control/fixtures/views/ingress.yaml {41-47}

```
