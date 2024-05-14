---
pagination_next: registry/index
pagination_prev: canary-checker/health-checks
title: Notifications
---

Notification allows you to receive alerts on a preferred channel when a particular set of events occur.

```yaml title="http-check.yaml"
---
apiVersion: mission-control.flanksource.com/v1
kind: Notification
metadata:
  name: http-check
  namespace: default
spec:
  events:
    - check.passed
    - check.failed
  filter: check.type == 'http'
  to:
    connection: connection://slack/flanksource
```

## Spec

| Field      | Description                                                        | Scheme                    | Required | Templatable |
| ---------- | ------------------------------------------------------------------ | ------------------------- | -------- | ----------- |
| `events`   | [List of events](./events/) that trigger this notification.        | `[]string`                | `true`   |
| `to`       | Specify the recipients.                                           | [`Recipient`](#recipient) | `true`   |
| `title`    | Title of the notification. [See templating](./concepts/templating) | `string`                  |          | `true`      |
| `template` | Body of the notification. [See templating](./concepts/templating)  | `string`                  |          | `true`      |
| `filter`   | Filter of notification.                                            | `string`                  |          |             |

:::info
The title and body _(template)_ have default templates based on the event. Eg: [Component](./events/components.md#notification-defaults)
:::

### Recipient

| Field        | Description                                                      | Schema              |
| ------------ | ---------------------------------------------------------------- | ------------------- |
| `person`     | ID or email of the person                                        | `string`            |
| `team`       | ID or name of the team                                           | `string`            |
| `email`      | Email of the recipient                                           | `string`            |
| `connection` | connection string for an external service                        | `string`            |
| `url`        | Specify shoutrrr URL directly                                    | `string`            |
| `properties` | Properties for Shoutrrr (applicable if shoutrrr url is provided) | `map[string]string` |

:::note
You can only specify one recipient
:::
