# Config Item

| Field             | Description                            | Scheme              |
| ----------------- | -------------------------------------- | ------------------- |
| `id`              | ID of the config item                  | `uuid`              |
| `scraper_id`      | ID of the scraper                      | `*string`           |
| `agent_id`        | ID of the agent                        | `uuid`              |
| `config_class`    | The class of the config item           | `string`            |
| `external_id`     | The external ID of the config item     | `[]string`          |
| `type`            | The type of the config item            | `*string`           |
| `status`          | The status of the config item          | `*string`           |
| `name`            | The name of the config item            | `*string`           |
| `namespace`       | The namespace of the config item       | `*string`           |
| `description`     | The description of the config item     | `*string`           |
| `config`          | The config of the config item          | `*string`           |
| `source`          | The source of the config item          | `*string`           |
| `parent_id`       | The parent ID of the config item       | `*uuid`             |
| `path`            | The path of the config item            | `string`            |
| `cost_per_minute` | The cost per minute of the config item | `float64`           |
| `cost_total_1d`   | The cost total 1d of the config item   | `float64`           |
| `cost_total_7d`   | The cost total 7d of the config item   | `float64`           |
| `cost_total_30d`  | The cost total 30d of the config item  | `float64`           |
| `tags`            | The tags of the config item            | `map[string]string` |
| `created_at`      | The created at of the config item      | `time`              |
| `updated_at`      | The updated at of the config item      | `time`              |
| `deleted_at`      | The deleted at of the config item      | `*time`             |
| `delete_reason`   | The delete reason of the config item   | `string`            |
