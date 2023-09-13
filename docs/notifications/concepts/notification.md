Notification allows you to receive alerts on a preferred channel when a particular set of events occur.

## Notification Spec

| Field             | Description                      | Scheme              | Required |
| ----------------- | -------------------------------- | ------------------- | -------- |
| `events`          | Events of notification.          | `[]string`          | `true`   |
| `title`           | Title of notification.           | `string`            | `false`  |
| `template`        | Template of notification.        | `string`            | `false`  |
| `filter`          | Filter of notification.          | `string`            | `false`  |
| `person_id`       | Person ID of notification.       | `uuid`              | `false`  |
| `team_id`         | Team ID of notification.         | `uuid`              | `false`  |
| `properties`      | Properties of notification.      | `map[string]string` | `false`  |
| `custom_services` | Custom services of notification. | `JSON`              | `false`  |

!!! Note

    One of `person_id`, `team_id` or `custom_services` is required.

## Examples:

```yaml title="http-check-passed.yaml"
events:
  - check.passed
title: Check as {{.check.status}}
template: 'Canary: {{.canary.name}} Message: {{.status.message}} '
filter: "check.type == 'http'"
person_id: d87243c9-3183-4ab9-9df9-c77c8278df11
```

```yaml title="check-failure.yaml"
events:
  - check.failed
title: Check as {{.check.status}}
template: 'Canary: {{.canary.name}} Error: {{.status.error}}'
filter: "check.type == 'http'"
custom_services:
  - connection: connection://slack://<api-token>@health-check-notifications
    name: Slack-health-checks
```
