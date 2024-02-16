# Component

Components are the building blocks of a Topology. The component specification provides a way for you to define the properties and characteristics of each Component in the Topology.



| Field           | Description                                                                                                                                                          | Scheme                                    | Required   |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ---------- |
| `id`            | Specify unique ID for component                                                                                                                                      | [`ID`](#id)                               |            |
| `name`          | Set name for component                                                                                                                                               | `string`                                  |            |
| `tooltip`       | Set tooltip outlining information pertaining to the component                                                                                                        | `string`                                  |            |
| `type`          | Set type of component e.g. service, API, website, library, database, etc.                                                                                            | `string`                                  |            |
| `icon`          | Specify icon for component                                                                                                                                           | `string`                                  |            |
| `lifecycle`     | The lifecycle state of the component e.g. production, staging, dev, etc.                                                                                             | `string`                                  |            |
| `owner`         | Specify owner of component                                                                                                                                           | `string`                                  |            |
| `order`         | Set integer order value for component                                                                                                                                | `int`                                     |            |
| `components`    | RawMessage is a raw encoded JSON value. It implements Marshaler and Unmarshaler and can be used to delay JSON decoding or precompute a JSON encoding.                | [`[]Component`](#component)               |            |
| `checks`        | Specify checks based on `inline` and `selector`                                                                                                                      | [`[]Check`](./health-checks.md#check)     |            |
| `configs`       | Specify selectors for config items that should be associated with this component.                                                                                    | [`[]Config`](./config#config)          |            |
| `lookup`        | Lookup component definitions from an external source, use the `forEach` property to iterate over the results to further enrich each component.                       | [`Lookup`](lookup#lookup)              |            |
| `properties`    | Customize component properties as to be visualized on Mission control UI                                                                                          | [`[]Property`](./property#property)    |            |
| `relationships` | Specify relationship of component                                                                                                                                    | [`[]RelationshipSpec`](#relationshipspec) |            |
| `selectors`     | Specify component for topology based on `fieldSelector` and `labelSelector`                                                                                          | [`[]ResourceSelector`](/reference/resource_selector) |            |
| `forEach`       | Only applies when using lookup. When specified, the components and properties specified under ForEach will be templated using the components returned by the lookup. | [`ForEach`](#foreach)                     | `optional` |

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


### ForEach

| Field           | Description               | Scheme                                    | Required |
| --------------- | ------------------------- | ----------------------------------------- | -------- |
| `components`    | Set name for component    | [`[]Component`](#component)               |          |
| `properties`    | Set name for property     | [`[]Property`](#property)                 |          |
| `configs`       | Set name for config       | [`[]Config`](#config)                     |          |
| `relationshisp` | Set name for relationship | [`[]RelationshipSpec`](#relationshipspec) |          |
| `checks`        | Set name for check        | [`[]Check`](./health-checks.md#check)     |          |
