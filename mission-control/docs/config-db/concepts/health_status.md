---
title: Health & Status
---

A config item has two key attributes associated with it: health and status. These attributes are assigned by the scrapers by evaluating the config.

The health attribute represents the overall condition or well-being of the config item. It can have one of the following values: healthy, unhealthy, unknown, or warning. This attribute provides a high-level indication of whether the config item is functioning as expected or if there are any issues that need attention.

The status attribute, on the other hand, provides more granular information about the current state or phase of the config item. The possible values for the status attribute can vary widely depending on the type of config item being monitored. For example, a Kubernetes Pod config could have statuses like "Running", "Pending", "Terminating", and so on.

To illustrate with an example, consider an AWS EC2 instance that is currently in the process of shutting down. In this case, the scrapers would assign an "Unknown" health and a "Deleting" status to this config item.

## Health

- healthy
- unhealthy
- unknown
- warning

## Status

Here's a list of all the possible statuses (subject to change):

- Completed
- CrashLoopBackOff
- Creating
- Degraded
- Deleted
- Deleting
- Error
- Healthy
- Inaccesible
- Info
- Maintenance
- Missing
- Pending
- Progressing
- Restarting
- Rolling Out
- Rollout Failed
- Running
- Scaled to Zero
- Scaling
- Scaling Down
- Scaling Up
- Starting
- Stopped
- Stopping
- Suspended
- Terminating
- Unhealthy
- Unknown
- Unschedulable
- Updating
- UpgradeFailed
- Warning
