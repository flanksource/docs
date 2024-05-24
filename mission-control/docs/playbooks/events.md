---
title: Event Triggers
sidebar_position: 5
---

Playbook events are triggers that cause a Playbook to run. Events are triggered when specific activity on Mission Control occurs.
For example: you can trigger a Playbook to run when a component goes unhealthy.

Multiple playbooks could be listening to the same event and likewise a playbook can be listening to multiple events. If a playbook is listening on multiple events then it is triggered when any of those events occur.

## Event Spec

Filters can give you fine-grained control over the events that can trigger the playbook.

| Field    | Description                                                                                   | Scheme              | Required |
| -------- | --------------------------------------------------------------------------------------------- | ------------------- | -------- |
| `event`  | Event to listen for.                                                                          | `string`            | `true`   |
| `filter` | CEL expression for additional event filtering. ([See Expressions](../concepts/expression)) | `string`            | `true`   |
| `labels` | Labels specifies the key-value pairs that the associated event's resource must match.         | `map[string]string` | `false`  |

## Types

### Canary events

Canary events relate to activities on health checks.

| Event    | Description                           |
| -------- | ------------------------------------- |
| `passed` | When a previously failed check passes |
| `failed` | When a previously passed check fails  |

#### Example

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

### Component events

Component events relate to activities on Topology components.

| Event       | Description                        |
| ----------- | ---------------------------------- |
| `healthy`   | when a component becomes healthy   |
| `unhealthy` | when a component becomes unhealthy |
| `info`      | when a component has info          |
| `warning`   | when a component has warning       |
| `error`     | when a component has error         |

#### Example

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

### Config events

Config events relate to activities on config items.

| Event     | Description                   |
| --------- | ----------------------------- |
| `created` | when a config item is created |
| `updated` | when a config item is updated |
| `deleted` | when a config item is deleted |

#### Example

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
