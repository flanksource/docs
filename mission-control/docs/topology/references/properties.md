# Properties

| Field            | Description                                                  | Scheme                                  | Required   |
| ---------------- | ------------------------------------------------------------ | --------------------------------------- | ---------- |
| `name`           | Set name for component property.                             | `string`                                |            |
| `value`          | Mutually exclusive with `text`                             | `int64`                                 |            |
| `text`           | Mutually exclusive with `value` | `string`                                |            |
| `type`           | Specify type of component property, one of `currency`, `number`, `url` | `string`                                |            |
| `unit`           | Unit for component property e.g. milliseconds, bytes, millicores, epoch etc. | `string`                                |            |
| `color`          | Set color for component property.                            | `string`                                |            |
| `headline`       | Toggle headline for component property.                      | `bool`                                  |            |
| `icon`           | Specify icon for component.                                  | `string`                                |            |
| `label`          | Specify label for component property.                        | `string`                                |            |
| `links`          | Set links pertaining to component.                           | [`[]Link`](#link)                       |            |
| `max`            | Set maximum value for components to display.                 | `int64`                                 | `optional` |
| `min`            | Set minimum value for components to display.                 | `int64`                                 |            |
| `order`          | Set integer value order for component property.              | `int`                                   |            |
| `status`         | Specify status for component property.                       | `string`                                |            |
| `summary`        | Set Summary for component property e.g Healthy, Unhealthy, Warning, and Info. | [`Template`](../concepts/templating.md) | `optional` |
| `tooltip`        | Set tooltip outlining information pertaining to the component. | `string`                                |            |
| `configLookup`   | Specify lookup for component config.                         | [`ConfigLookup`](#config)         | `optional` |

## Config

| Field       | Description                               | Scheme              | Required   |
| ----------- | ----------------------------------------- | ------------------- | ---------- |
| `name`      | Specify the name of the config item.      | `string`            | `optional` |
| `type`      | Specify type of config item.              | `string`            | `optional` |
| `labels`      | Specify tags of config item.              | `map[string]string` | `optional` |

## Link

| Field     | Description                                                 | Scheme   | Required |
| --------- | ----------------------------------------------------------- | -------- | -------- |
| `icon`    | Set icon for link.                                          | `string` |          |
| `label`   | Set label for link.                                         | `string` |          |
| `text`    | Set text of choice for link.                                | `string` |          |
| `tooltip` | Set tooltip outlining information pertaining to the link.   | `string` |          |
| `type`    | Specify type of link e.g. documentation, support, playbook. | `string` |          |
| `url`     | Specify URL for link.                                       | `string` |          |
