---
title: Status
sidebar_custom_props:
  icon: mdi:list-status
---

The `status` column type displays status values with appropriate styling. Common values include `Running`, `Pending`, `Failed`, `Succeeded`, etc.

## Properties

| Property            | Type              | Description                                                                          |
| ------------------- | ----------------- | ------------------------------------------------------------------------------------ |
| `type`              | string            | Must be `status`                                                                     |
| `badge`             | object            | Optional badge styling to apply color to the status value                            |
| `badge.color.auto`  | bool              | Use heuristics to determine color from the status value                              |
| `badge.color.map`   | map[string]string | Map specific status values to explicit colors (e.g. `Running: green`, `Failed: red`) |
| `card.useForAccent` | bool              | Set to `true` to use the status value as the accent color for the card layout        |

See [Common Properties](/guide/views/table/columns) for the full list of fields available on all column types.

## Example

```yaml title="cronjobs.yaml" file=<rootDir>/modules/mission-control/fixtures/views/cronjobs.yaml {20-24}

```
