# Playbook Events

Playbook events are triggers that cause a Playbook to run. Events are triggered when specific activity on Mission Control occurs.
For example: you can trigger a Playbook to run when a component goes unhealthy.

Multiple playbooks could be listening to the same event and likewise a playbook can be listening to multiple events. If a playbook is listening on multiple events then it is triggered when any of those events occur.

## Types

At this point, there's only support for events on canaries and components.

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

Filters can give you fine-grained control over the events that can trigger the playbook.

| Field    | Description                                                                           | Scheme              | Required |
| -------- | ------------------------------------------------------------------------------------- | ------------------- | -------- |
| `event`  | Event to listen for.                                                                  | `string`            | `true`   |
| `filter` | CEL expression for additional event filtering. ([See Expressions](./expression.md))   | `string`            | `true`   |
| `labels` | Labels specifies the key-value pairs that the associated event's resource must match. | `map[string]string` | `false`  |
