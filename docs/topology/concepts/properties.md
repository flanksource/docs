A topology view can be customized using properties.

## Property

| Field            | Description                                                                        | Scheme                                                        | Required   |
| ---------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------- | ---------- |
| `color`          | Set color for component property                                                   | `string`                                                      |            |
| `configLookup`   | Specify lookup for component config                                                | [`ConfigLookup`](#configlookup)                               | `optional` |
| `headline`       | Toggle headline for component property                                             | `bool`                                                        |            |
| `icon`           | Specify icon for component                                                         | `string`                                                      |            |
| `label`          | Specify label for component property                                               | `string`                                                      |            |
| `lastTransition` | Set transition for component property                                              | `string`                                                      |            |
| `links`          | Set links pertaining to component                                                  | [`[]Link`](#link)                                             |            |
| `lookup`         | Set based on Canary checks as documented in [Check reference](/reference/checks/). | [`CanarySpec`](../../canary-checker/reference/canary-spec.md) | `optional` |
| `max`            | Set maximum value for components to display                                        | `int64`                                                       | `optional` |
| `min`            | Set minimum value for components to display                                        | `int64`                                                       |            |
| `name`           | Set name for component property                                                    | `string`                                                      |            |
| `order`          | Set integer value order for component property                                     | `int`                                                         |            |
| `status`         | Specify status for component property                                              | `string`                                                      |            |
| `summary`        | Set Summary for component property e.g Healthy, Unhealthy, Warning, and Info       | [`Template`](#template)                                       | `optional` |
| `text`           | Set description or text of choice pertaining to component property                 | `string`                                                      |            |
| `tooltip`        | Set tooltip outlining information pertaining to the component                      | `string`                                                      |            |
| `type`           | Specify type of component property                                                 | `string`                                                      |            |
| `unit`           | Unit for component property e.g. milliseconds, bytes, millicores, epoch etc.       | `string`                                                      |            |
| `value`          |                                                                                    | `int64`                                                       |            |

### ConfigLookup

| Field     | Description                                             | Scheme                            | Required |
| --------- | ------------------------------------------------------- | --------------------------------- | -------- |
| `id`      | Specify unique ID for config                            | `string`                          |          |
| `config`  | Specify config for lookup                               | [`Configs`](./configs.md#configs) |          |
| `field`   | A JSONPath expression to lookup the value in the config | `string`                          |          |
| `display` | Apply transformations to the value                      | [`Display`](#display)             |          |

### Display

| Field        | Description                                                  | Scheme   | Required |
| ------------ | ------------------------------------------------------------ | -------- | -------- |
| `expr`       | Specify expression for use as template for display           | `string` |          |
| `javascript` | Specify javascript syntax for use as template for display    | `string` |          |
| `jsonPath`   | Specify path to JSON element for use as template for display | `string` |          |
| `template`   | Specify Go template for use as template for display          | `string` |          |

### Link

| Field     | Description                                                | Scheme   | Required |
| --------- | ---------------------------------------------------------- | -------- | -------- |
| `icon`    | Set icon for link                                          | `string` |          |
| `label`   | Set label for link                                         | `string` |          |
| `text`    | Set text of choice for link                                | `string` |          |
| `tooltip` | Set tooltip outlining information pertaining to the link   | `string` |          |
| `type`    | Specify type of link e.g. documentation, support, playbook | `string` |          |
| `url`     | Specify URL for link                                       | `string` |          |

### Template

| Field        | Description                                | Scheme   | Required |
| ------------ | ------------------------------------------ | -------- | -------- |
| `expr`       | Specify expression for ID                  | `string` |          |
| `javascript` | Specify javascript syntax to generate ID   | `string` |          |
| `jsonPath`   | Specify path to JSON element for use in ID | `string` |          |
| `template`   | Specify Go template for use in ID          | `string` |          |
