---
title: Event Triggers
---

Playbook can be triggered when specific occurs, e.g. you can trigger a playbook to run when a component becomes unhealthy.

Multiple playbooks could be listening to the same event and likewise a playbook can be listening to multiple events. If a playbook is listening on multiple events then it is triggered when any of those events occur.

Filters can give you fine-grained control over the events that can trigger the playbook.

| Field    | Description                                                                           | Scheme                               | Required |
| -------- | ------------------------------------------------------------------------------------- | ------------------------------------ | -------- |
| `event`  | Event to listen for.                                                                  | `string`                             | `true`   |
| `filter` | Filter events to trigger on                                                           | [CEL](/docs/reference/scripting/cel) | `false`  |
| `labels` | Labels specifies the key-value pairs that the associated event's resource must match. | `map[string]string`                  | `false`  |

## Canary

Canary events relate to activities on health checks.

| Event    | Description                           |
| -------- | ------------------------------------- |
| `passed` | When a previously failed check passes |
| `failed` | When a previously passed check fails  |

```yaml title="notify-passing-http-checks.yaml"
apiVersion: mission-control.flanksource.com/v1
kind: Playbook
metadata:
  name: notify-passing-http-checks
spec:
  description: Notify when any HTTP check passes
  on:
    canary:
      - event: passed
        filter: check.type == 'http'
  actions:
    - name: Send notification
      notification:
        connection: connection://telegram/playbook-alerts
        title: 'Check {{.check.name}} has passed'
        message: 'Description: {{.check.description}}'
```

## Component

Component events relate to changes in component health status.

| Event       | Description                             |
| ----------- | --------------------------------------- |
| `healthy`   | When a component becomes healthy        |
| `unhealthy` | When a component becomes unhealthy      |
| `warning`   | When a component enters a warning state |
| `unknown`   | When a component's health is unknown    |

```yaml title="notify-unhealthy-database-component.yaml"
apiVersion: mission-control.flanksource.com/v1
kind: Playbook
metadata:
  name: notify-unhealthy-database-component
spec:
  description: Notify when a database component goes unhealthy
  on:
    component:
      - event: unhealthy
        filter: component.type == 'database'
        labels:
          env: production
  actions:
    - name: Send notification
      notification:
        connection: connection://telegram/playbook-alerts
        title: 'Database {{.component.name}} has become unhealthy'
        message: 'Description: {{.component.description}}'
```

## Config

Config events relate to activities on config items.

| Event       | Description                                  |
| ----------- | -------------------------------------------- |
| `created`   | When a config item is created                |
| `updated`   | When a config item is updated                |
| `changed`   | When a config change is recorded             |
| `deleted`   | When a config item is deleted                |
| `healthy`   | When a config item becomes healthy           |
| `unhealthy` | When a config item becomes unhealthy         |
| `degraded`  | When a config item becomes degraded          |
| `warning`   | When a config item enters a warning state    |
| `unknown`   | When a config item's health becomes unknown  |

```yaml title="notify-newly-scraped-pod.yaml"
apiVersion: mission-control.flanksource.com/v1
kind: Playbook
metadata:
  name: notify-on-pod-config-creation
spec:
  description: Notify when a new pod is discovered
  on:
    config:
      - event: created
        filter: config.config_class == 'Pod'
  actions:
    - name: Send notification
      notification:
        connection: connection://telegram/playbook-alerts
        title: 'A new kubernetes pod {{.config.name}} was scraped'
        message: 'Namespace: {{.config.tags.namespace}}'
```

## Schedule

A playbook can also run on a recurring cron schedule, without any triggering resource. Specify one or more schedules under `on.schedule`.

| Field        | Description                                                                          | Scheme              | Required |
| ------------ | ------------------------------------------------------------------------------------ | ------------------- | -------- |
| `schedule`   | Cron expression, e.g. `0 9 * * MON` or `@every 1h`                                   | `string`            | `true`   |
| `parameters` | Parameters passed to each run. Supports template expressions evaluated at run time   | `map[string]string` | `false`  |

Schedules are evaluated in UTC by default. Use the `CRON_TZ` prefix to run in another timezone.

```yaml title="daily-cost-report.yaml"
apiVersion: mission-control.flanksource.com/v1
kind: Playbook
metadata:
  name: daily-cost-report
spec:
  description: Email a cost report every weekday morning
  on:
    schedule:
      - schedule: 'CRON_TZ=America/New_York 0 9 * * MON-FRI'
        parameters:
          since: 24h
  actions:
    - name: Send report
      notification:
        connection: connection://smtp/default
        title: 'Daily cost report'
        message: 'Costs for the last {{.params.since}}'
```
