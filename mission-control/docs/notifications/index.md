# Notifications

Notification allows you to receive alerts on a preferred channel when a particular set of events occur.

| Category                                                                 | event                        | Description                                                                                |
| ------------------------------------------------------------------------ | ---------------------------- | ------------------------------------------------------------------------------------------ |
| [Health Check](events/health-checks)                               | `check.passed`               | when a previously failing check passes                                                     |
|                                                                          | `check.failed`               | when a previously passing check fails                                                      |
| [Component](events/components)                                     | `component.status.<status>`  | When a component's status changes                                                          |

<!-- | [Incident](../events/incidents.md#incidents)                             | `incident.created`           | when an incident is created                                                                |
| [Incident Statuses](../events/incidents.md#status)                       | `incident.status.<status>`   | When an incident's status changes. See the [list of statuses](./incident/overview/#status) |
| [Incident Comment](../events/incidents.md#comments)                      | `incident.comment.added`     | When a new comment is added to an incident.                                                |
| [Incident Responder](../events/incidents.md#responders)                  | `incident.responder.created` | when a responder is added to an incident                                                   |
|                                                                          | `incident.responder.removed` | when a responder is removed from an incident                                               |
| [Incident Definition of Done](../events/incidents.md#definition-of-done) | `incident.dod.added`         | when a dod is added                                                                        |
|                                                                          | `incident.dod.removed`       | when an existing dod is removed                                                            |
|                                                                          | `incident.dod.passed`        | when a previously failing dod passes                                                       |
|                                                                          | `incident.dod.regressed`     | when a previously passing dod fails                                                        | -->



## Examples

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

## Spec

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

:::info
    One of `person_id`, `team_id` or `custom_services` is required.
:::

## Supported Channels

Mission control uses [Shoutrrr](https://github.com/containrrr/shoutrrr/) under the hood to deliver notifications. Most of the services in the Shoutrrr are supported. Here's the complete list:

| Services    | URL Format                                                                               |
| ----------- | ---------------------------------------------------------------------------------------- |
| Bark        | `bark://devicekey@host`                                                                  |
| Discord     | `discord://token@id `                                                                    |
| Email       | `smtp://username:password@host:port/?from=fromAddress&to=recipient1[,recipient2,...]`    |
| Gotify      | `gotify://gotify-host/token`                                                             |
| Google Chat | `googlechat://chat.googleapis.com/v1/spaces/FOO/messages?key=bar&token=baz `             |
| IFTTT       | `ifttt://key/?events=event1[,event2,...]&value1=value1&value2=value2&value3=value3   `   |
| Join        | `join://shoutrrr:api-key@join/?devices=device1[,device2, ...][&icon=icon][&title=title]` |
| Mattermost  | `mattermost://[username@]mattermost-host/token[/channel]`                                |
| Matrix      | `matrix://username:password@host:port/[?rooms=!roomID1[,roomAlias2]] `                   |
| Ntfy        | `ntfy://username:password@ntfy.sh/topic`                                                 |
| OpsGenie    | `opsgenie://host/token?responders=responder1[,responder2]     `                          |
| Pushbullet  | `pushbullet://api-token[/device/#channel/email]`                                         |
| Pushover    | `pushover://shoutrrr:apiToken@userKey/?devices=device1[,device2, ...]`                   |
| Rocketchat  | `rocketchat://[username@]rocketchat-host/token[/channel\| @recipient]`                   |
| Slack       | `slack://[botname@]token-a/token-b/token-c`                                              |
| Teams       | `teams://group@tenant/altId/groupOwner?host=organization.webhook.office.com`             |
| Telegram    | `telegram://token@telegram?chats=@channel-1[,chat-id-1,...]`                             |
| Zulip Chat  | `zulip://bot-mail:bot-key@zulip-domain/?stream=name-or-id&topic=name`                    |

For more details please visit: [https://containrrr.dev/shoutrrr/0.8/services/overview/](https://containrrr.dev/shoutrrr/0.7/services/overview/)
