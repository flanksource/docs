---
title: Property
---

| Field          | Description                                                                  | Scheme                           | Required   |
| -------------- | ---------------------------------------------------------------------------- | -------------------------------- | ---------- |
| `name`         | Set name for component property.                                             | `string`                         |            |
| `value`        | Mutually exclusive with `text`                                               | `int64`                          |            |
| `text`         | Mutually exclusive with `value`                                              | `string`                         |            |
| `type`         | Specify type of component property, one of `currency`, `number`, `url`       | `string`                         |            |
| `unit`         | Unit for component property e.g. milliseconds, bytes, millicores, epoch etc. | `string`                         |            |
| `color`        | Set color for component property.                                            | `string`                         |            |
| `headline`     | Toggle headline for component property.                                      | `bool`                           |            |
| `icon`         | Specify icon for component.                                                  | [`Icon`](/reference/types#icon)  |            |
| `label`        | Specify label for component property.                                        | `string`                         |            |
| `links`        | Set links pertaining to component.                                           | [`[]Link`](#link)                |            |
| `max`          | Set maximum value for components to display.                                 | `int64`                          | `optional` |
| `min`          | Set minimum value for components to display.                                 | `int64`                          |            |
| `order`        | Set integer value order for component property.                              | `int`                            |            |
| `status`       | Specify status for component property.                                       | `string`                         |            |
| `tooltip`      | Set tooltip outlining information pertaining to the component.               | `string`                         |            |
| `configLookup` | Specify lookup for component config.                                         | [`ConfigLookup`](#config-lookup) | `optional` |

## Link

| Field     | Description              | Schema                          | Required |
| --------- | ------------------------ | ------------------------------- | -------- |
| `type`    | The type of the link.    | `string`                        |          |
| `url`     | The url of the link.     | `string`                        |          |
| `tooltip` | The tooltip of the link. | `string`                        |          |
| `icon`    | The icon of the link.    | [`Icon`](/reference/types#icon) |          |
| `text`    | The text of the link.    | `string`                        |          |
| `label`   | The label of the link.   | `string`                        |          |

## Config Lookup

| Field           | Description                                              | Scheme                             | Required |
| --------------- | -------------------------------------------------------- | ---------------------------------- | -------- |
| `config.name`   | The name of the config item.                             | `string`                           |          |
| `config.type`   | The type of config item.                                 | `string`                           |          |
| `config.labels` | Match labels of the config item, all labels must match   | `map[string]string`                |          |
| `field`         | A JSONPath expression to lookup the value in the config. | `string`                           | `true`   |
| `display`       | Apply transformations to the value.                      | [`Display`](/guide/topology/concepts/templating) |          |
| `id`            | The UUID of config item, rarely used                     | `string`                           |          |
