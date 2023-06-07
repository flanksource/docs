# Notifications

Each team can have one or more notifications set up. The notification can be setup in the team spec.
Whenever a responder is attached to an incident, the responder team will receive the notifications on matching services.

## Notification Spec

| Field      | Description                                                                                              | Schema              | Required |
| ---------- | -------------------------------------------------------------------------------------------------------- | ------------------- | -------- |
| connection | The connection to use for the notification.                                                              | `string`            | `false`  |
| filter     | Filter is a CEL-expression used to decide whether this notification client should send the notification. | `string`            | `false`  |
| template   | Go template for the notification message.                                                                | `string`            | `true`   |
| url        | URL in the form of Shoutrrr notification service URL schema.                                             | `string`            | `false`  |
| properties | Configuration properties for Shoutrrr. It's Templatable.                                                 | `map[string]string` | `false`  |

**Example:**

```yaml
components:
  - name: Cyza
notifications:
  - connection: connection://googlechat/incident-notifications
    filter: incident.severity == 'High' || incident.severity == "Critical"
    template: |
      Subscribed to new incident: {{.incident.title}}

      Type: {{.incident.type}}
      Severity: {{.incident.severity}}
      Status: {{.incident.status}}

  - url: slack://<api-token>@incident-notifications
    filter: incident.severity != 'Low'
    template: |
      Type: {{.incident.type}}
      Severity: {{.incident.severity}}
      Status: {{.incident.status}}
    properties:
      color: '{{if eq incident.severity "Low"}}good{{else}}danger{{end}}'
      title: 'Subscribed to new incident: {{.incident.title}}'
```

## Supported services

We use [Shoutrrr](https://github.com/containrrr/shoutrrr/) to deliver notifications to various services.

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

For more details please visit: [https://containrrr.dev/shoutrrr/0.7/services/overview/](https://containrrr.dev/shoutrrr/0.7/services/overview/)
