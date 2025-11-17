---
title: Event Triggers
---

Playbook can be triggered when specific occurs, e.g. you can trigger a playbook to run when a component becomes unhealthy.

Multiple playbooks could be listening to the same event and likewise a playbook can be listening to multiple events. If a playbook is listening on multiple events then it is triggered when any of those events occur.

Filters can give you fine-grained control over the events that can trigger the playbook.

| Field    | Description                                                                           | Scheme                          | Required |
| -------- | ------------------------------------------------------------------------------------- | ------------------------------- | -------- |
| `event`  | Event to listen for.                                                                  | `string`                        | `true`   |
| `filter` | Filter events to trigger on                                                           | [CEL](/docs/reference/scripting/cel) | `true`   |
| `labels` | Labels specifies the key-value pairs that the associated event's resource must match. | `map[string]string`             | `false`  |

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
