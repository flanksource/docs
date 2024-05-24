---
title: Channels
---

Mission control uses [Shoutrrr](https://github.com/containrrr/shoutrrr/) under the hood to deliver notifications. Most of the services in the Shoutrrr are supported. Here's the complete list:

| Services    | URL Format                                                                               |
| ----------- | ---------------------------------------------------------------------------------------- |
| Bark        | `bark://devicekey@host`                                                                  |
| Discord     | `discord://token@id`                                                                    |
| Email       | `smtp://username:password@host:port/?from=fromAddress&to=recipient1[,recipient2,...]`    |
| Gotify      | `gotify://gotify-host/token`                                                             |
| Google Chat | `googlechat://chat.googleapis.com/v1/spaces/FOO/messages?key=bar&token=baz`             |
| IFTTT       | `ifttt://key/?events=event1[,event2,...]&value1=value1&value2=value2&value3=value3`   |
| Join        | `join://shoutrrr:api-key@join/?devices=device1[,device2, ...][&icon=icon][&title=title]` |
| Mattermost  | `mattermost://[username@]mattermost-host/token[/channel]`                                |
| Matrix      | `matrix://username:password@host:port/[?rooms=!roomID1[,roomAlias2]]`                   |
| Ntfy        | `ntfy://username:password@ntfy.sh/topic`                                                 |
| OpsGenie    | `opsgenie://host/token?responders=responder1[,responder2]`                          |
| Pushbullet  | `pushbullet://api-token[/device/#channel/email]`                                         |
| Pushover    | `pushover://shoutrrr:apiToken@userKey/?devices=device1[,device2, ...]`                   |
| Rocketchat  | `rocketchat://[username@]rocketchat-host/token[/channel\| @recipient]`                   |
| Slack       | `slack://[botname@]token-a/token-b/token-c`                                              |
| Teams       | `teams://group@tenant/altId/groupOwner?host=organization.webhook.office.com`             |
| Telegram    | `telegram://token@telegram?chats=@channel-1[,chat-id-1,...]`                             |
| Zulip Chat  | `zulip://bot-mail:bot-key@zulip-domain/?stream=name-or-id&topic=name`                    |

For more details please visit: [https://containrrr.dev/shoutrrr/0.8/services/overview/](https://containrrr.dev/shoutrrr/0.8/services/overview/)
