---
title: Config
sidebar_position: 4
---

| Field             | Description                            | Scheme              |               |
| ----------------- | -------------------------------------- | ------------------- | ------------------- |
| `id`              | ID of the config item                  | `uuid`              |               |
| `external_id` | Unique aliases that refer to the same item | `[]string` | `AmazonEC2/i-abcd`, `aws::ec2::instance:/i-abcd` |
| `agent_id` | The agent which scrapped the item | `uuid` |  |
| `name`            | The name of the config item            | `string`           |  |
| `type`            | The type of the config item            | `string`           | `EC2::Instance`, `Kubernetes::Pod`, `Azure:VM` |
| `config_class` | A non-cloud specific class of resources | `string` | `VM` |
| `config`          | The config of the config item          | `JSON`           |            |
| `description`     | The description of the config item     | `string`           |            |
| `namespace`       | The namespace of the config item       | `string`           |            |
| `parent_id`       | The parent ID of the config item       | `uuid`             |              |
| `scraper_id`      | ID of the scraper                      | `uuid`     |            |
| `source`          | The source of the config item          | `string`           |            |
| `status`          | The externally reported status of the item using [is-healthy](https://github.com/flanksource/is-healthy) | `string`           | `Healthy`,`Progressing`, `Terminated` |
| `tags`            | Tags or labels | `map[string]string` |  |
| `created_at`      | When the item was created (could be before the last scrape time) | `time.Date`         |               |
| `updated_at` | When the config item was last materially changed | `time.Date` | |
| `delete_reason` | The reason why an item was deleted, `STALE` items can be "undeleted" | `string` | `STALE`, `FROM_ATTRIBUTE`,  `FROM_EVENT`,`FROM_DELETE_FIELD` |
| `deleted_at` | The time when a config item has been detected as removed | `time` | |
| `last_scraped_at` | When the config item was last scraped | `time.Date` | |

