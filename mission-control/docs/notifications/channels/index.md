---
title: Channels
sidebar_position: 4
collapsed: false
---

:::tip Shoutrr
 Notifications in Mission Control are powered by [github.com/containrrr/shoutrrr](https://github.com/containrrr/shoutrrr)
:::


When creating a notification you can either specify a connection or a custom URL


## Custom URLs


| Service                           | URL format                                                                                                                                      |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| [Bark](./bark)                 | *bark://__`devicekey`__@__`host`__*                                                                                                             |
| [Discord](./discord)           | *discord://__`token`__@__`id`__*                                                                                                                |
| [Email](./email)               | *smtp://__`username`__:__`password`__@__`host`__:__`port`__/?from=__`fromAddress`__&to=__`recipient1`__[,__`recipient2`__,...]*                 |
| [Google Chat](./googlechat)    | *googlechat://chat.googleapis.com/v1/spaces/FOO/messages?key=bar&token=baz*                                                                     |
| [IFTTT](./ifttt)               | *ifttt://__`key`__/?events=__`event1`__[,__`event2`__,...]&value1=__`value1`__&value2=__`value2`__&value3=__`value3`__*                         |
| [Join](./join)                 | *join://shoutrrr:__`api-key`__@join/?devices=__`device1`__[,__`device2`__, ...][&icon=__`icon`__][&title=__`title`__]*                          |
| [Mattermost](./mattermost)     | *mattermost://[__`username`__@]__`mattermost-host`__/__`token`__[/__`channel`__]*                                                               |
| [Matrix](./matrix)             | *matrix://__`username`__:__`password`__@__`host`__:__`port`__/[?rooms=__`!roomID1`__[,__`roomAlias2`__]]*                                       |
| [Ntfy](./ntfy)                 | *ntfy://__`username`__:__`password`__@ntfy.sh/__`topic`__*                                                                                      |
| [OpsGenie](./opsgenie)         | *opsgenie://__`host`__/token?responders=__`responder1`__[,__`responder2`__]*                                                                    |
| [Pushbullet](./pushbullet)     | *pushbullet://__`api-token`__[/__`device`__/#__`channel`__/__`email`__]*                                                                        |
| [Pushover](./pushover)         | *pushover://shoutrrr:__`apiToken`__@__`userKey`__/?devices=__`device1`__[,__`device2`__, ...]*                                                  |
| [Rocketchat](./rocketchat)     | *rocketchat://[__`username`__@]__`rocketchat-host`__/__`token`__[/__`channel`&#124;`@recipient`__]*                                             |
| [Slack](./slack)               | *slack://[__`botname`__@]__`token-a`__/__`token-b`__/__`token-c`__*                                                                             |
| [Teams](./teams)               | *teams://__`group`__@__`tenant`__/__`altId`__/__`groupOwner`__?host=__`organization`__.webhook.office.com*                                      |
| [Telegram](./telegram)         | *telegram://__`token`__@telegram?chats=__`@channel-1`__[,__`chat-id-1`__,...]*                                                                  |
| [Zulip Chat](./zulip)          | *zulip://__`bot-mail`__:__`bot-key`__@__`zulip-domain`__/?stream=__`name-or-id`__&topic=__`name`__*                                             |
| [Generic Webhook](./generic)   | Sends notifications directly to a webhook                                                                                                       |

