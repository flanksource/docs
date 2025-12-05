---
title: Health
sidebar_custom_props:
  icon: health
---

The `health` column type displays health status with color-coded indicators. Supports three states: `healthy` (green), `warning` (yellow), and `unhealthy`/`critical` (red).

## Example

```yaml title="ingress.yaml" file=<rootDir>/modules/mission-control/fixtures/views/ingress.yaml {41-47}

```

Use `card.useForAccent: true` to color the card based on health.
