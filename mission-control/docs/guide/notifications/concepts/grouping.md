---
title: Grouping
sidebar_custom_props:
  icon: group
---

Multiple related notifications may be generated within a short time window. Instead of sending each alert separately,
you can use notification grouping to consolidate multiple events into a single message.

_Example_: When a multiple Helm releases are failing to upgrade because of common dependency not being available,
you can use notification grouping to consolidate the notifications for all the affected helm releases into a single message.

The `groupBy` parameter allows you to define how notifications should be grouped.
Grouping can be done via

- `type` (type of the config)
- `description`
- `status_reason`
- `labels` in the format `labels:app`
- `tags` in the format `tag:namespace`

:::info
Grouping only works with waitFor.
Hence, a waitFor duration is required
:::

```yaml title="" file=<rootDir>/modules/mission-control/fixtures/notifications/config-health.yaml {11-12}

```
