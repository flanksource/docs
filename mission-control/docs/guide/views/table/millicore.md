---
title: Millicore
sidebar_custom_props:
  icon: mdi:cpu-64-bit
---

The `millicore` column type displays CPU resources in millicores (1000m = 1 CPU core).

## Conversion

| Value | Display | Meaning |
|-------|---------|---------|
| 100 | 100m | 10% of a core |
| 500 | 500m | 50% of a core |
| 1000 | 1000m | 1 full CPU core |

## Example

```yaml title="pods.yaml" file=<rootDir>/modules/mission-control/fixtures/views/pods.yaml {46-48}

```
