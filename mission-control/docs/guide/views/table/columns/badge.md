---
title: Badge
sidebar_custom_props:
  icon: mdi:label
---

The `badge` column type displays text values as styled badge/tag elements. Useful for categories, labels, and versions.

## Properties

| Property           | Type | Description                                                   |
| ------------------ | ---- | ------------------------------------------------------------- |
| `badge.color.auto` | bool | Use heuristics to determine the badge color from the value    |
| `badge.color.map`  | map  | Map specific values to explicit colors, e.g. `Running: green` |

## Example

```yaml title="backups.yaml" file=<rootDir>/modules/mission-control/fixtures/views/backups.yaml {30-32}

```
