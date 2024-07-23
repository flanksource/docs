---
title: Configs
---

Configs emit events when their health changes or when they are created, modified, or removed.

**Health events**

- `config.healthy`
- `config.unhealthy`
- `config.warning`
- `config.unknown`

The default notification template for health events is:

  * **Title:** `{{.config.type}} {{.config.name}} is {{.config.health}}`
  * **Body:**
      ```
      ### Labels:
      {{range $k, $v := .config.labels}}**{{$k}}**: {{$v}}
      {{end}}
      [Reference]({{.permalink}})
      ```
**State events**

- `config.created`
- `config.updated`
- `config.deleted`

The default notification template for state events is:

  * **Title:** `{{.config.type}} {{.config.name}} was [created/updated/deleted]`
  * **Body:**
      ```
      ### Labels:
      {{range $k, $v := .config.labels}}**{{$k}}**: {{$v}}
      {{end}}
      [Reference]({{.permalink}})
      ```


## Variables

| Field       | Description                   | Schema              | nullable |
| ----------- | ----------------------------- | ------------------- | -------- |
| `config`    | The config object             | [`Config`](#config) |          |
| `agent`     | Agent details (if applicable) | [`Agent`](#agent)   | `true`   |
| `permalink` | A link to the config item     | `string`            |          |

### Config

| Field           | Description                      | Schema          | nullable |
| --------------- | -------------------------------- | --------------- | -------- |
| `id`            | ID of the config item            | `uuid`          |          |
| `agent_id`      | ID of the agent                  | `uuid`          | `true`   |
| `config_class`  | Class of the config item         | `string`        |          |
| `config`        | Configuration                    | `string`        | `true`   |
| `created_at`    | Creation timestamp               | `time.Time`     |          |
| `delete_reason` | Reason for deletion              | `string`        | `true`   |
| `deleted_at`    | Deletion timestamp               | `time.Time`     | `true`   |
| `description`   | Description                      | `string`        | `true`   |
| `external_id`   | External IDs                     | `[]string`      | `true`   |
| `health`        | Health                           | `Health`        | `true`   |
| `labels`        | Labels                           | `JSONStringMap` | `true`   |
| `name`          | Name                             | `string`        | `true`   |
| `properties`    | Properties                       | `Properties`    | `true`   |
| `ready`         | Whether the config item is ready | `bool`          |          |
| `scraper_id`    | ID of the scraper                | `string`        | `true`   |
| `source`        | Source                           | `string`        | `true`   |
| `status`        | Status                           | `string`        | `true`   |
| `tags`          | Tags                             | `JSONStringMap` |          |
| `type`          | Type                             | `string`        |          |
| `updated_at`    | Update timestamp                 | `time.Time`     | `true`   |

### Agent

| Field         | Description                    | Schema   | Optional |
| ------------- | ------------------------------ | -------- | -------- |
| `id`          | The id of the agent            | `uuid`   |          |
| `name`        | The name of the agent          | `string` |          |
| `description` | Short description of the agent | `string` |          |

## Notification Defaults



