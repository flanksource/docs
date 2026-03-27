---
title: Badge
sidebar_custom_props:
  icon: mdi:label
---

The `badge` column type displays text values as styled badge/tag elements. Useful for categories, labels, and versions.

## Properties

| Property           | Type              | Description                                                                   |
| ------------------ | ----------------- | ----------------------------------------------------------------------------- |
| `type`             | string            | Must be `badge`                                                               |
| `badge`            | object            | Badge styling configuration                                                   |
| `badge.color.auto` | bool              | Use heuristics to determine the badge color from the value                    |
| `badge.color.map`  | map[string]string | Map specific values to explicit colors (e.g. `Running: green`, `Failed: red`) |

See [Common Properties](/guide/views/table/columns) for the full list of fields available on all column types.

## Example

```yaml title="backups.yaml" file=<rootDir>/modules/mission-control/fixtures/views/backups.yaml {30-32}

```
