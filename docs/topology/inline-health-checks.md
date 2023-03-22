## Inline

The inline topology runs and displays results for Canary check object as specified via the `inline` field.

??? example

| Field        | Description | Scheme                                 | Required |
| ------------ | ----------- | -------------------------------------- | -------- |
| `components` |             | [_Components_](#components-components) |          |
| `configs`    |             | [_Configs_](#configs-configs)          |          |
| `icon`       |             | _string_                               |          |
| `id`         |             | [_Id_](#id-id)                         |          |
| `label`      |             | _string_                               |          |
| `owner`      |             | _string_                               |          |
| `properties` |             | [_Properties_](#properties-properties) |          |
| `schedule`   |             | _string_                               |          |
| `text`       |             | _string_                               |          |
| `tooltip`    |             | _string_                               |          |
| `type`       |             | _string_                               |          |

## Scheme Reference

### Components

| Field           | Description                                                                                                                                           | Scheme                                          | Required |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | -------- |
| `checks`        | Specify checks based on `inline` and `selector`                                                                                                       | [_Checks_](#checks-checks)                      |          |
| `components`    | RawMessage is a raw encoded JSON value. It implements Marshaler and Unmarshaler and can be used to delay JSON decoding or precompute a JSON encoding. | _byte_                                          |          |
| `configs`       | Set configuration used by the specified component                                                                                                     | [_Configs_](#configs-configs)                   |          |
| `icon`          | Specify icon for component                                                                                                                            | _string_                                        |          |
| `id`            | Specify unique ID for component                                                                                                                       | [_Id_](#id-id)                                  |          |
| `lifecycle`     | The lifecycle state of the component e.g. production, staging, dev, etc.                                                                              | string                                          |          |
| `lookup`        | Set based on Canary checks as documented in [Check reference](/reference/checks/).                                                                    |                                                 |          |
| `name`          | Set name for component                                                                                                                                | _string_                                        |          |
| `order`         | Set integer order value for component                                                                                                                 | _int_                                           |          |
| `owner`         | Specify owner of component                                                                                                                            | _string_                                        |          |
| `properties`    | Customize component properties as to be visualized on Incident commander UI                                                                           | [_Properties_](#properties-properties)          |          |
| `relationships` | Specify relationship of component                                                                                                                     | [_Relationships_](#relationships-relationships) |          |
| `selectors`     | Specify component for topology based on `fieldSelector` and `labelSelector`                                                                           | [_Selectors_](#selector-selector)               |          |
| `summary`       | Set summary for component                                                                                                                             | [_Summary_](#summary)                           |          |
| `tooltip`       | Set tooltip outlining information pertaining to the component                                                                                         | _string_                                        |          |
| `type`          | Set type of component e.g. service, API, website, library, database, etc.                                                                             | _string_                                        |          |

### Relationships

| Field  | Description                                                                              | Scheme   | Required |
| ------ | ---------------------------------------------------------------------------------------- | -------- | -------- |
| `ref`  | Set reference for components relationship                                                | _string_ |
| `type` | Set the type of relationship, e.g. dependsOn, subcomponentOf, providesApis, consumesApis | _string_ |

### Configs

| Field       | Description              | Scheme       | Required |
| ----------- | ------------------------ | ------------ | -------- |
| `id`        | Set unique ID for config | _\[\]string_ |
| `name`      | Set name for config      | _string_     |
| `namespace` | Set namespace for config | _string_     |
| `type`      | Specify type of config   | _string_     |

### Display

| Field        | Description                                                  | Scheme   | Required |
| ------------ | ------------------------------------------------------------ | -------- | -------- |
| `expr`       | Specify expression for use as template for display           | _string_ |
| `javascript` | Specify javascript syntax for use as template for display    | _string_ |
| `jsonPath`   | Specify path to JSON element for use as template for display | _string_ |
| `template`   | Specify Go template for use as template for display          | _string_ |

### Id

| Field        | Description                                | Scheme   | Required |
| ------------ | ------------------------------------------ | -------- | -------- |
| `expr`       | Specify expression for ID                  | _string_ |
| `javascript` | Specify javascript syntax to generate ID   | _string_ |
| `jsonPath`   | Specify path to JSON element for use in ID | _string_ |
| `template`   | Specify Go template for use in ID          | _string_ |

### Properties

| Field            | Description                                                                        | Scheme                          | Required |
| ---------------- | ---------------------------------------------------------------------------------- | ------------------------------- | -------- |
| `color`          | Set color for component property                                                   | _string_                        |
| `configLookup`   | Specify lookup for component config                                                | [_ConfigLookup_](#configlookup) |
| `headline`       | Toggle headline for component property                                             | _bool_                          |
| `icon`           | Specify icon for component                                                         | _string_                        |
| `label`          | Specify label for component property                                               | _string_                        |
| `lastTransition` | Set transition for component property                                              | _string_                        |
| `links`          | Set links pertaining to component                                                  | [_Links_](#links-links)         |
| `lookup`         | Set based on Canary checks as documented in [Check reference](/reference/checks/). |
| `max`            | Set maximum value for components to display                                        | _int64_                         |
| `min`            | Set minimum value for components to display                                        | _int64_                         |
| `name`           | Set name for component property                                                    | _string_                        |
| `order`          | Set integer value order for component property                                     | _int_                           |
| `status`         | Specify status for component property                                              | _string_                        |
| `summary`        | Set Summary for component property e.g Healthy, Unhealthy, Warning, and Info       | [_Summary_](#summary-summary)   |
| `text`           | Set description or text of choice pertaining to component property                 | _string_                        |
| `tooltip`        | Set tooltip outlining information pertaining to the component                      | _string_                        |
| `type`           | Specify type of component property                                                 | _string_                        |
| `unit`           | Unit for component property e.g. milliseconds, bytes, millicores, epoch etc.       | _string_                        |
| `value`          |                                                                                    | _int64_                         |

### ConfigLookup

| Field     | Description                     | Scheme                | Required |
| --------- | ------------------------------- | --------------------- | -------- |
| `id`      | Specify unique ID for config    | _string_              |
| `config`  | Specify config for lookup       | [_Configs_](#configs) |
| `field`   | Specify field for config lookup | _string_              |
| `display` | Set display format for config   | [_Display_](#display) |

### Checks

| Field      | Description | Scheme                  | Required |
| ---------- | ----------- | ----------------------- | -------- |
| `inline`   |             | [_Inline_](#inline)     |
| `selector` |             | [_Selector_](#selector) |

### Inline

For including checks as inline, see the [Check reference](/reference/checks/) for more information.

### Links

| Field     | Description                                                | Scheme   | Required |
| --------- | ---------------------------------------------------------- | -------- | -------- |
| `icon`    | Set icon for link                                          | _string_ |
| `label`   | Set label for link                                         | _string_ |
| `text`    | Set text of choice for link                                | _string_ |
| `tooltip` | Set tooltip outlining information pertaining to the link   | _string_ |
| `type`    | Specify type of link e.g. documentation, support, playbook | string   |
| `url`     | Specify URL for link                                       | _string_ |

### Selector

| Field           | Description                                                                       | Scheme   | Required |
| --------------- | --------------------------------------------------------------------------------- | -------- | -------- |
| `fieldSelector` | Select Kubernetes or Canary object based on the value of specified resource field | _string_ |
| `labelSelector` | Select Kubernetes or Canary object based on label. e.g. app, canary.              | _string_ |
| `name`          | Set name for selector                                                             | _string_ |

### Summary

| Field       | Description                                           | Scheme | Required |
| ----------- | ----------------------------------------------------- | ------ | -------- |
| `healthy`   | Set threshold integer value for healthy component     | _int_  |
| `info`      | Set integer value for info for component              | _int_  |
| `unhealthy` | Set threshold integer value for healthy component     | _int_  |
| `warning`   | Set threshold integer value for warning for component | _int_  |
