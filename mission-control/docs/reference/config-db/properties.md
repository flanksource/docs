---
title: Property
description: Property fields for config items

---

| Field          | Description                                                                   | Scheme                                  | Required   |
| -------------- | ----------------------------------------------------------------------------- | --------------------------------------- | ---------- |
| `name`         | Set name for component property.                                              | `string`                                |            |
| `value`        | Mutually exclusive with `text`                                                | `int64`                                 |            |
| `text`         | Mutually exclusive with `value`                                               | `string`                                |            |
| `type`         | Specify type of component property, one of `currency`, `number`, `url`        | `string`                                |            |
| `unit`         | Unit for component property e.g. milliseconds, bytes, millicores, epoch etc.  | `string`                                |            |
| `color`        | Set color for component property.                                             | `string`                                |            |
| `headline`     | Toggle headline for component property.                                       | `bool`                                  |            |
| `icon`         | Specify icon for component.                                                   | [`Icon`](/reference/types#icon)                                 |            |
| `label`        | Specify label for component property.                                         | `string`                                |            |
| `links`        | Set links pertaining to component.                                            | [`[]Link`](#link)                       |            |
| `max`          | Set maximum value for components to display.                                  | `int64`                                 | `optional` |
| `min`          | Set minimum value for components to display.                                  | `int64`                                 |            |
| `order`        | Set integer value order for component property.                               | `int`                                   |            |
| `tooltip`      | Set tooltip outlining information pertaining to the component.                | `string`                                |            |

## Link

| Field     | Description              | Schema   | Required |
| --------- | ------------------------ | -------- | -------- |
| `type`    | The type of the link.    | `string` |          |
| `url`     | The url of the link.     | `string` |          |
| `tooltip` | The tooltip of the link. | `string` |          |
| `icon`    | The icon of the link.    | [`Icon`](/reference/types#icon) |          |
| `text`    | The text of the link.    | `string` |          |
| `label`   | The label of the link.   | `string` |          |
