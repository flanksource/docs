---
title: Components
description: Events that fire on topology/component changes
---

Component status updates emit the following events

- `component.healthy`
- `component.unhealthy`
- `component.warning`
- `component.unknown`

```yaml title="unhelthy-component-notification.yaml"
apiVersion: mission-control.flanksource.com/v1
kind: Notification
metadata:
  name: web-api-component-alert
  namespace: default
spec:
  events:
    - component.unhealthy
  filter: component.type == 'WebAPI'
  title: WebAPI {{.component.name}} failing
  body: |
    ## Component Failed
    Status: {{.component.status}} | {{.component.status_reason}}
    Last updated: {{.component.updated_at}}
  to:
    email: alerts@acme.com
```

## Default Templates

The default notification template used is:

### Title

```
{{ if ne channel "slack"}}Component {{.component.name}} is {{.component.health}}{{end}}
```

### Template

```txt file=../../../modules/mission-control/notification/templates/component.health

```

## Template Variables

The notification title and body can be changed using the variables below:

| Field       | Description                   | Schema                    | Optional |
| ----------- | ----------------------------- | ------------------------- | -------- |
| `component` | The component object          | [`Component`](#component) |          |
| `agent`     | Agent details (if applicable) | [`Agent`](#agent)         | `true`   |
| `permalink` | A link to the health check    | `string`                  |          |

### Component

| Field             | Description                                  | Schema              | Optional |
| ----------------- | -------------------------------------------- | ------------------- | -------- |
| `id`              | The id of the component                      | `uuid`              |          |
| `description`     | The description of the component             | `string`            |          |
| `external_id`     | The external id of the component             | `string`            |          |
| `hidden`          | Whether the component is hidden              | `bool`              |          |
| `labels`          | The labels of the component                  | `map[string]string` | `true`   |
| `name`            | The name of the component                    | `string`            |          |
| `namespace`       | The namespace of the component               | `string`            |          |
| `parent_id`       | The id of the parent component               | `uuid`              | `true`   |
| `properties`      | The properties of the component              | `map[string]string` | `true`   |
| `silenced`        | Whether the component is silenced            | `bool`              |          |
| `status_reason`   | The status reason of the component           | `string`            |          |
| `status`          | The status of the component                  | `string`            |          |
| `summary`         | The summary of the component                 | `map[string]string` | `true`   |
| `text`            | The text of the component                    | `string`            |          |
| `topology_type`   | The type of the topology                     | `string`            |          |
| `type`            | The type of the component                    | `string`            |          |
| `cost_per_minute` | The cost per minute of the component         | `float64`           |          |
| `cost_total_1d`   | The cost total 1d of the component           | `float64`           |          |
| `cost_total_7d`   | The cost total 7d of the component           | `float64`           |          |
| `cost_total_30d`  | The cost total 30d of the component          | `float64`           |          |
| `created_by`      | Id of the person that created this component | `uuid`              |          |
| `created_at`      | Created timestamp                            | `time.Time`         |          |
| `updated_at`      | Updated timestamp                            | `time.Time`         |          |
| `deleted_at`      | Deleted timestamp                            | `time.Time`         | `true`   |

### Agent

| Field         | Description                    | Schema   | Optional |
| ------------- | ------------------------------ | -------- | -------- |
| `id`          | The id of the agent            | `uuid`   |          |
| `name`        | The name of the agent          | `string` |          |
| `description` | Short description of the agent | `string` |          |
