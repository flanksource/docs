---
title: Components
---

Component status updates emit the following events

- `component.status.healthy`
- `component.status.unhealthy`
- `component.status.warning`
- `component.status.error`
- `component.status.info`

## Environment variables

| Field       | Description                   | Schema                    | Optional |
| ----------- | ----------------------------- | ------------------------- | -------- |
| `component` | The component object          | [`Component`](#component) |          |
| `agent`     | Agent details (if applicable) | [`Agent`](#check)         | `true`   |
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

## Notification Defaults

```
# Title
Component {{.component.name}} status updated to {{.component.status}}

# Body
[Reference]({{.permalink}})
```
