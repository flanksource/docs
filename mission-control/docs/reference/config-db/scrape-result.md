---
title: Scrape Result
description: Fields available during scrape transform
---

| Field          | Description                                            | Scheme                          |
| -------------- | ------------------------------------------------------ | ------------------------------- |
| `id`           | Designated id (or the external id) of this config item | `string`                        |
| `config_class` | Class of the config item                               | `string`                        |
| `config_type`  | Type of the config item                                | `string`                        |
| `status`       | Status extracted from the config itself                | `string`                        |
| `name`         | Name of the config item                                | `string`                        |
| `namespace`    | Namespace of the config item                           | `string`                        |
| `description`  | Description of the config item                         | `string`                        |
| `aliases`      | Aliases associated with the config item                | `[]string`                      |
| `source`       | Source of the config item                              | `string`                        |
| `config`       | Configuration details                                  | `interface{}`                   |
| `format`       | Format of the config item                              | `string`                        |
| `icon`         | Icon associated with the config item                   | [`Icon`](/docs/reference/types#icon) |
| `tags`         | Tags associated with the config item                   | `JSONStringMap`                 |
| `analysis`     | Analysis result of the config item                     | `*AnalysisResult`               |
| `action`       | Action related to the config item                      | `string`                        |
| `properties`   | Properties associated with the config item             | `types.Properties`              |
