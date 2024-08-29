---
title: Changes
---

When you save a config item to Config DB, it tracks its changes. These changes come from external sources like Kubernetes events or Azure activities. Alternatively, Mission Control can automatically detect changes by comparing the old config with the new one.

Changes are of two types:

- Diff change
- Event based change

### Diff Change

Config DB generates these changes by comparing the old and new config values. The image below shows a change where the port value was modified from 8080 to 3000.

![Kubernetes Deployment Replica change](/img/config-changes.png)

### Event based change

External sources like Kubernetes Events and AWS CloudTrail provide these changes. Event-based changes have an associated type.

![Event-based config changes of a Kubernetes Pod](/img/event-based-config-changes.png)

See [Transformation Changes](./transform#changes).
