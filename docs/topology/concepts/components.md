## Component

| Field           | Description                                                                                                                                                        | Scheme                                                        | Required   |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------- | ---------- |
| `id`            | Specify unique ID for component                                                                                                                                    | [`ID`](#id)                                                   |            |
| `name`          | Set name for component                                                                                                                                             | `string`                                                      |            |
| `tooltip`       | Set tooltip outlining information pertaining to the component                                                                                                      | `string`                                                      |            |
| `type`          | Set type of component e.g. service, API, website, library, database, etc.                                                                                          | `string`                                                      |            |
| `icon`          | Specify icon for component                                                                                                                                         | `string`                                                      |            |
| `lifecycle`     | The lifecycle state of the component e.g. production, staging, dev, etc.                                                                                           | `string`                                                      |            |
| `owner`         | Specify owner of component                                                                                                                                         | `string`                                                      |            |
| `order`         | Set integer order value for component                                                                                                                              | `int`                                                         |            |
| `components`    | RawMessage is a raw encoded JSON value. It implements Marshaler and Unmarshaler and can be used to delay JSON decoding or precompute a JSON encoding.              | `[]JSONObject`                                                |            |
| `summary`       | Set summary for component                                                                                                                                          | [`Summary`](#summary)                                         |            |
| `checks`        | Specify checks based on `inline` and `selector`                                                                                                                    | [`[]Checks`](#componentcheck)                                 |            |
| `configs`       | Set configuration used by the specified component                                                                                                                  | [`[]Config`](./configs.md#configs)                            |            |
| `lookup`        | Lookup component definitions from an external source, use the `forEach` property to iterate over the results to further enrich each component.                     | [`CanarySpec`](../../canary-checker/reference/canary-spec.md) |            |
| `properties`    | Customize component properties as to be visualized on Incident commander UI                                                                                        | [`[]Property`](../reference/properties.md#property)           |            |
| `relationships` | Specify relationship of component                                                                                                                                  | [`[]RelationshipSpec`](#relationshipspec)                     |            |
| `selectors`     | Specify component for topology based on `fieldSelector` and `labelSelector`                                                                                        | [`[]ResourceSelector`](#resourceselector)                     |            |
| `forEach`       | Only applies when using lookup, when specified the components and properties specified under ForEach will be templated using the components returned by the lookup | [`ForEach`](#foreach)                                         | `optional` |

### ID

| Field        | Description                                | Scheme   | Required |
| ------------ | ------------------------------------------ | -------- | -------- |
| `expr`       | Specify expression for ID                  | `string` |          |
| `javascript` | Specify javascript syntax to generate ID   | `string` |          |
| `jsonPath`   | Specify path to JSON element for use in ID | `string` |          |
| `template`   | Specify Go template for use in ID          | `string` |          |

### RelationshipSpec

| Field  | Description                                                                              | Scheme   | Required |
| ------ | ---------------------------------------------------------------------------------------- | -------- | -------- |
| `ref`  | Set reference for components relationship                                                | `string` |          |
| `type` | Set the type of relationship, e.g. dependsOn, subcomponentOf, providesApis, consumesApis | `string` |          |

### ComponentCheck

| Field      | Description | Scheme                                  | Required |
| ---------- | ----------- | --------------------------------------- | -------- |
| `inline`   |             | [`CanarySpec`](../../canary-checker/reference/canary-spec.md)                        |          |
| `selector` |             | [`ResourceSelector`](#resourceselector) |          |

### ResourceSelector

| Field           | Description                                                                       | Scheme   | Required |
| --------------- | --------------------------------------------------------------------------------- | -------- | -------- |
| `name`          | Set name for selector                                                             | `string` |          |
| `fieldSelector` | Select Kubernetes or Canary object based on the value of specified resource field | `string` |          |
| `labelSelector` | Select Kubernetes or Canary object based on label. e.g. app, canary.              | `string` |          |

### Summary

| Field       | Description                                           | Scheme | Required |
| ----------- | ----------------------------------------------------- | ------ | -------- |
| `healthy`   | Set threshold integer value for healthy component     | `int`  |          |
| `info`      | Set integer value for info for component              | `int`  |          |
| `unhealthy` | Set threshold integer value for healthy component     | `int`  |          |
| `warning`   | Set threshold integer value for warning for component | `int`  |          |

### ForEach

| Field           | Description               | Scheme                                    | Required |
| --------------- | ------------------------- | ----------------------------------------- | -------- |
| `components`    | Set name for component    | [`[]Component`](#component)               |          |
| `properties`    | Set name for property     | [`[]Property`](#property)                 |          |
| `configs`       | Set name for config       | [`[]Config`](#config)                     |          |
| `relationshisp` | Set name for relationship | [`[]RelationshipSpec`](#relationshipspec) |          |
| `checks`        | Set name for check        | [`[]Checks`](#componentcheck)             |          |
