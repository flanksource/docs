---
title: Configs
description: Events that fire on config changes and health
---

Configs emit events when their health changes or when they are created, modified, or removed.

**Health events**

- `config.healthy`
- `config.unhealthy`
- `config.warning`
- `config.unknown`

**State events**

- `config.created`
- `config.updated`
- `config.deleted` _(Soft Delete)_

```yaml title="ec2-instance-updates.yaml"
apiVersion: mission-control.flanksource.com/v1
kind: Notification
metadata:
  name: ec2-instance-changes
  namespace: default
spec:
  events:
    - config.created
    - config.updated
    - config.deleted
  filter: config.type == 'AWS::EC2::Instance'
  to:
    email: alerts@acme.com
```

```yaml title="ec2-health-notification.yaml"
apiVersion: mission-control.flanksource.com/v1
kind: Notification
metadata:
  name: ec2-instance-health-alerts
  namespace: default
spec:
  events:
    - config.unhealthy
    - config.warning
  filter: config.type == 'AWS::EC2::Instance'
  to:
    email: alerts@acme.com
```

## Default Templates

The default notification template for health events is:

### Health notifications

#### Title

```
{{ if ne channel "slack"}}{{.config.type}} {{.config.name}} is {{.config.health}}{{end}}
```

#### Template

```txt file=../../../modules/mission-control/notification/templates/config.health

```

### State change notifications

#### Title

```
{{ if ne channel "slack"}}{{.config.type}} {{.config.name}} was {{.new_state}}{{end}}
```

#### Template

```txt file=../../../modules/mission-control/notification/templates/config.db.update

```

## Template Variables

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
