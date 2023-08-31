# Playbook Events

Playbook events are triggers that cause a Playbook to run. Events are triggered when specific activity on Mission Control occurs.

## Types

Events are categorized into two classes:

1. Canary events
2. Component events

### Canary events

Canary events relate to activities on health checks.

| Event    | Description                           |
| -------- | ------------------------------------- |
| `passed` | When a previously failed check passes |
| `failed` | When a previously passed check fails  |

#### Example

```yaml
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
  actions: ...
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

```yaml
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
          industry: e-commerce
  actions: ...
```

## Filtering Events

Events can be further filtered by the following fields:

| Field    | Description                                                                           | Scheme              | Required |
| -------- | ------------------------------------------------------------------------------------- | ------------------- | -------- |
| `event`  | Event to listen for.                                                                  | `string`            | `true`   |
| `filter` | CEL expression for additional event filtering.                                        | `string`            | `true`   |
| `labels` | Labels specifies the key-value pairs that the associated event's resource must match. | `map[string]string` | `false`  |
