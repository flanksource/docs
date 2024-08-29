---
title: Check
---

| Field                  | Description                                                 | Scheme                          |
| ---------------------- | ----------------------------------------------------------- | ------------------------------- |
| `id`                   | ID of the check                                             | `uuid`                          |
| `canary_id`            | ID of the canary                                            | `uuid`                          |
| `agent_id`             | ID of the agent                                             | `uuid`                          |
| `type`                 | The type of the check                                       | `string`                        |
| `name`                 | The name of the check                                       | `string`                        |
| `namespace`            | The namespace of the check                                  | `string`                        |
| `labels`               | The labels of the check                                     | `map[string]string`             |
| `description`          | The description of the check                                | `string`                        |
| `status`               | The status of the check _(healthy/unhealthy)_               | `string`                        |
| `owner`                | The owner of the check                                      | `string`                        |
| `severity`             | The severity of the check _(info/low/medium/high/critical)_ | `string`                        |
| `icon`                 | The icon of the check                                       | [`Icon`](/reference/types#icon) |
| `transformed`          | The transformed of the check                                | `bool`                          |
| `last_runtime`         | The last runtime of the check                               | `*time`                         |
| `next_runtime`         | The next runtime of the check                               | `*time`                         |
| `last_transition_time` | The last transition time of the check                       | `*time`                         |
| `created_at`           | The created at of the check                                 | `time`                          |
| `updated_at`           | The updated at of the check                                 | `time`                          |
| `deleted_at`           | The deleted at of the check                                 | `*time`                         |
| `silenced_at`          | The silenced at of the check                                | `*time`                         |
