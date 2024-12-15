---
title: Health & Status
sidebar_custom_props:
  icon: mdi-light:heart

---

Each config item has attributes used to determine the health and status of an item.

- `health` can be one of `healthy`, `unhealthy`, `unknown`, `warning` and corresponds with RAG (Red, Amber, Green) status that is associated with an item
- `status` is a config type specific short description of the current running state e.g. `Running`, `Terminating`, `in-use`
- `ready` indicates whether an item is still progressing

:::info Health is orthogonal to readiness
A config item could have a state of `heath: unhealthy, status: failed, ready: true` - this indicates that the item is unlikely to change its state, while an item of `health: healthy, status: rolling-out, ready: false` indicates a healthy item that has not yet finished rolling out.
:::

The [github.com/flanksource/is-healthy](https://github.com/flanksource/is-healthy) is used to derive these conditions.
