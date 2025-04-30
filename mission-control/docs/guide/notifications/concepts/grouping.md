---
title: Grouping
sidebar_custom_props:
  icon: group
---

Mission Control may generate multiple related notifications within a short time window. Instead of sending each alert,
you can use notification grouping to merge multiple events into a single message.

_Example_: When multiple Helm releases fail to upgrade because of a common unavailable dependency,
you can use notification grouping to merge the notifications for all the affected helm releases into a single message.

The `groupBy` parameter lets you define how to group notifications.
You can group by:

- `type` (type of the config)
- `description`
- `status_reason`
- `label` in the format `label:app`
- `tag` in the format `tag:namespace`

```yaml title="" file=<rootDir>/modules/mission-control/fixtures/notifications/config-health.yaml {11-12}

```
