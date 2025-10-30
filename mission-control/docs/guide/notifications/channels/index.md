---
title: Channels
sidebar_position: 4
collapsed: false

sidebar_custom_props:
  icon: octicon:broadcast-24
---

:::tip Shoutrrr
Notifications in Mission Control are powered by [github.com/containrrr/shoutrrr](https://github.com/containrrr/shoutrrr)
:::

When creating a notification you can either specify a connection or a custom URL

## Custom URLs

| Service                      | URL format                                                                                                                      |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| [Bark](./bark)               | _bark://**`devicekey`**@**`host`**_                                                                                             |
| [Discord](./discord)         | _discord://**`token`**@**`id`**_                                                                                                |
| [Email](./email)             | _smtp://**`username`**:**`password`**@**`host`**:**`port`**/?from=**`fromAddress`**&to=**`recipient1`**[,__`recipient2`__,...]_ |
| [Google Chat](./googlechat)  | _googlechat://chat.googleapis.com/v1/spaces/**`FOO`**/messages?key=**`bar`**&token=**`baz`**_                                   |
| [Gotify](./gotify)           | _gotify://**`host`**/**`token`**_                                                                                               |
| [IFTTT](./ifttt)             | _ifttt://**`key`**/?events=**`event1`**[,__`event2`__,...]&value1=**`value1`**&value2=**`value2`**&value3=**`value3`**_         |
| [Join](./join)               | _join://shoutrrr:**`api-key`**@join/?devices=**`device1`**[,__`device2`__,...]_                                                 |
| [Mattermost](./mattermost)   | _mattermost://[__`username`__@]**`mattermost-host`**/**`token`**[/__`channel`__]_                                               |
| [Matrix](./matrix)           | _matrix://**`username`**:**`password`**@**`host`**:**`port`**/[?rooms=**`!roomID1`**[,__`roomAlias2`__]]_                       |
| [Ntfy](./ntfy)               | _ntfy://**`username`**:**`password`**@ntfy.sh/**`topic`**_                                                                      |
| [OpsGenie](./opsgenie)       | _opsgenie://**`host`**/token?responders=**`responder1`**[,__`responder2`__]_                                                    |
| [Pushbullet](./pushbullet)   | _pushbullet://**`api-token`**[/__`device`__/#__`channel`__/__`email`__]_                                                        |
| [Pushover](./pushover)       | _pushover://shoutrrr:**`apiToken`**@**`userKey`**/?devices=**`device1`**[,__`device2`__, ...]_                                  |
| [Rocketchat](./rocketchat)   | _rocketchat://[__`username`__@]**`rocketchat-host`**/**`token`**[/__`channel`&#124;`@recipient`__]_                             |
| [Slack](./slack)             | _slack://[__`botname`__@]**`token-a`**/**`token-b`**/**`token-c`**_                                                             |
| [Teams](./teams)             | _teams://**`group`**@**`tenant`**/**`altId`**/**`groupOwner`**?host=**`organization`**.webhook.office.com_                      |
| [Telegram](./telegram)       | _telegram://**`token`**@telegram?chats=**`@channel-1`**[,__`chat-id-1`__,...]_                                                  |
| [Zulip Chat](./zulip)        | _zulip://**`bot-mail`**:**`bot-key`**@**`zulip-domain`**/?stream=**`name-or-id`**&topic=**`name`**_                             |
| [Generic Webhook](./generic) | Sends notifications directly to a webhook                                                                                       |
