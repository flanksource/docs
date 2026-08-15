---
title: Event Triggers
---

Playbook can be triggered when specific occurs, e.g. you can trigger a playbook to run when a component becomes unhealthy.

Multiple playbooks could be listening to the same event and likewise a playbook can be listening to multiple events. If a playbook is listening on multiple events then it is triggered when any of those events occur.

Filters can give you fine-grained control over the events that can trigger the playbook.

| Field    | Description                                                                           | Scheme                               | Required |
| -------- | ------------------------------------------------------------------------------------- | ------------------------------------ | -------- |
| `event`  | Event to listen for.                                                                  | `string`                             | `true`   |
| `filter` | Filter events to trigger on                                                           | [CEL](/docs/reference/scripting/cel) | `true`   |
| `labels` | Labels specifies the key-value pairs that the associated event's resource must match. | `map[string]string`                  | `false`  |

## Canary

Canary events relate to activities on health checks.

## Component

Component events relate to changes in component health status.

| Event       | Description                             |
| ----------- | --------------------------------------- |
| `healthy`   | When a component becomes healthy        |
| `unhealthy` | When a component becomes unhealthy      |
| `warning`   | When a component enters a warning state |

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

```yaml title="notify-unhealthy-/docs/guide/canary-checker/reference/database-component.yaml"
apiVersion: mission-control.flanksource.com/v1
kind: Playbook
metadata:
  name: notify-unhealthy-/docs/guide/canary-checker/reference/database-component
spec:
  description: Notify when a /docs/guide/canary-checker/reference/database component goes unhealthy
  on:
    component:
      - event: unhealthy
        filter: component.type == '/docs/guide/canary-checker/reference/database'
        labels:
          env: production
  actions:
    - name: Send notification
      notification:
        connection: connection://telegram/playbook-alerts
        title: 'Database {{.component.name}} has become unhealthy'
        message: 'Description: {{.component.description}}'
```

## Schedule

Playbooks can be triggered on a recurring cron-based schedule using the `on.schedule` trigger.

| Field        | Description                                                                                                                                                                                           | Scheme              | Required |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------- | -------- |
| `schedule`   | Cron expression. Supports standard cron (`0 9 * * MON`), `@every <duration>` (e.g. `@every 1h`), and aliases (`@hourly`, `@daily`, `@weekly`, `@monthly`). Prefix with `CRON_TZ=<timezone>` to set timezone. Evaluated in UTC by default. | `string`            | `true`   |
| `parameters` | Default parameters passed to each scheduled run (supports template expressions evaluated at run time)                                                                                                | `map[string]string` |          |

```yaml title="scheduled-every-hour.yaml"
apiVersion: mission-control.flanksource.com/v1
kind: Playbook
metadata:
  name: hourly-cleanup
spec:
  on:
    schedule:
      - schedule: "@every 1h"
  actions:
    - name: cleanup
      exec:
        script: /opt/scripts/cleanup.sh
```

```yaml title="scheduled-cron-with-timezone.yaml"
apiVersion: mission-control.flanksource.com/v1
kind: Playbook
metadata:
  name: daily-morning-report
spec:
  on:
    schedule:
      - schedule: "CRON_TZ=America/New_York 0 9 * * MON-FRI"
        parameters:
          environment: production
  actions:
    - name: generate-report
      report:
        view: default/daily-summary
        format: pdf
```

## Config

Config events relate to activities on config items.

| Event     | Description                   |
| --------- | ----------------------------- |
| `created` | when a config item is created |
| `updated` | when a config item is updated |
| `deleted` | when a config item is deleted |

```yaml title="notify-newly-scraped-pod.yaml"
apiVersion: mission-control.flanksource.com/v1
kind: Playbook
metadata:
  name: Notify on pod config creation
spec:
  description: Notify when a new pod is discovered
  on:
    component:
      - event: config.created
        filter: config.class == 'Pod'
  actions:
    - name: Send notification
      notification:
        connection: connection://telegram/playbook-alerts
        title: 'A new kubernetes pod {{.config.name}} was scraped'
        message: 'Namespace: {{.config.namespace}}'
```
