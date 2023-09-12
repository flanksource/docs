Component status updates emit the following events

1. `component.status.healthy`
2. `component.status.unhealthy`
3. `component.status.warning`
4. `component.status.error`
5. `component.status.info`

## Environment variables

| Field       | Description                   | Schema                    | Optional |
| ----------- | ----------------------------- | ------------------------- | -------- |
| `component` | The component object          | [`Component`](#component) |          |
| `agent`     | Agent details (if applicable) | [`Agent`](#check)         | `true`   |
| `permalink` | A link to the health check    | `string`                  |          |

### Component

| Field                | Description                                          | Schema              | Optional |
| -------------------- | ---------------------------------------------------- | ------------------- | -------- |
| `id`                 | The id of the component                              | `uuid`              |          |
| `topology_id`        | The id of the topology that generated this component | `uuid`              |          |
| `agent_id`           | The id of the agent that created this component      | `uuid`              |          |
| `external_id`        | The external id of the component                     | `string`            |          |
| `parent_id`          | The id of the parent component                       | `uuid`              | `true`   |
| `name`               | The name of the component                            | `string`            |          |
| `text`               | The text of the component                            | `string`            |          |
| `topology_type`      | The type of the topology                             | `string`            |          |
| `namespace`          | The namespace of the component                       | `string`            |          |
| `labels`             | The labels of the component                          | `map[string]string` | `true`   |
| `hidden`             | Whether the component is hidden                      | `bool`              |          |
| `silenced`           | Whether the component is silenced                    | `bool`              |          |
| `status`             | The status of the component                          | `string`            |          |
| `description`        | The description of the component                     | `string`            |          |
| `lifecycle`          | The lifecycle of the component                       | `string`            |          |
| `log_selectors`      | The log selectors of the component                   | `map[string]string` | `true`   |
| `tooltip`            | The tooltip of the component                         | `string`            |          |
| `status_reason`      | The status reason of the component                   | `string`            |          |
| `schedule`           | The schedule of the component                        | `string`            |          |
| `icon`               | The icon of the component                            | `string`            |          |
| `type`               | The type of the component                            | `string`            |          |
| `owner`              | The owner of the component                           | `string`            |          |
| `resource_selectors` | The resource selectors of the component              | `map[string]string` | `true`   |
| `configs`            | The configs of the component                         | `map[string]string` | `true`   |
| `component_checks`   | The component checks of the component                | `map[string]string` | `true`   |
| `properties`         | The properties of the component                      | `map[string]string` | `true`   |
| `path`               | The path of the component                            | `string`            |          |
| `summary`            | The summary of the component                         | `map[string]string` | `true`   |
| `is_leaf`            | Whether the component is a leaf                      | `bool`              |          |
| `cost_per_minute`    | The cost per minute of the component                 | `float64`           |          |
| `cost_total_1d`      | The cost total 1d of the component                   | `float64`           |          |
| `cost_total_7d`      | The cost total 7d of the component                   | `float64`           |          |
| `cost_total_30d`     | The cost total 30d of the component                  | `float64`           |          |
| `created_by`         | Id of the person that created this component         | `uuid`              |          |
| `created_at`         | Created timestamp                                    | `time.Time`         |          |
| `updated_at`         | Updated timestamp                                    | `time.Time`         |          |
| `deleted_at`         | Deleted timestamp                                    | `time.Time`         | `true`   |

### Agent

| Field         | Description                           | Schema              | Optional |
| ------------- | ------------------------------------- | ------------------- | -------- |
| `id`          | The id of the agent                   | `uuid`              |          |
| `name`        | The name of the agent                 | `string`            |          |
| `hostname`    | The hostname of the agent             | `string`            |          |
| `description` | Short description of the agent        | `string`            |          |
| `ip`          | The ip of the agent                   | `string`            |          |
| `version`     | The version of the agent              | `string`            |          |
| `username`    | The username of the agent             | `string`            |          |
| `person_id`   | The person associated with this agent | `uuid`              | `true`   |
| `properties`  | The properties of the agent           | `map[string]string` | `true`   |
| `tls`         | The tls of the agent                  | `string`            |          |
| `created_by`  | The created by of the agent           | `uuid`              |          |
| `created_at`  | The created at of the agent           | `time.Time`         |          |
| `updated_at`  | The updated at of the agent           | `time.Time`         |          |
