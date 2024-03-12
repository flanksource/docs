# Component

Components are the building blocks of a Topology. The component specification provides a way for you to define the properties and characteristics of each Component in the Topology.

| Field           | Description                                                                                                                                                          | Scheme                                                       | Required |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ | -------- |
| `checks`        | Specify checks based on `inline` and `selector`                                                                                                                      | [`[]CheckSelector`](../concepts/health-checks.md#check)      |          |
| `components`    | RawMessage is a raw encoded JSON value. It implements Marshaler and Unmarshaler and can be used to delay JSON decoding or pre-compute a JSON encoding.               | [`[]Component`](#component)                                  |          |
| `configs`       | Specify selectors for config items that should be associated with this component.                                                                                    | [`[]ConfigSelector`](../concepts/catalog.md#config-selector) |          |
| `forEach`       | Only applies when using lookup. When specified, the components and properties specified under ForEach will be templated using the components returned by the lookup. | [`ForEach`](#foreach)                                        |          |
| `icon`          | Specify icon for component                                                                                                                                           | `string`                                                     |          |
| `id`            | Specify unique ID for component                                                                                                                                      | [`ID`](#id)                                                  |          |
| `labels`        | Labels for the component                                                                                                                                             | `map[string]string`                                          |          |
| `lifecycle`     | The lifecycle state of the component e.g. production, staging, dev, etc.                                                                                             | `string`                                                     |          |
| `lookup`        | Lookup component definitions from an external source, use the `forEach` property to iterate over the results to further enrich each component.                       | [`Lookup`](../references/lookup)                             |          |
| `name`          | Set name for component                                                                                                                                               | `string`                                                     |          |
| `namespace`     | Set namespace for component                                                                                                                                          | `string`                                                     |          |
| `order`         | Set integer order value for component                                                                                                                                | `int`                                                        |          |
| `owner`         | Specify owner of component                                                                                                                                           | `string`                                                     |          |
| `properties`    | Customize component properties as to be visualized on Mission control UI                                                                                             | [`[]Property`](../concepts/properties)                       |          |
| `relationships` | Specify relationship of component                                                                                                                                    | [`[]RelationshipSpec`](#relationshipspec)                    |          |
| `selectors`     | Specify component for topology based on `fieldSelector` and `labelSelector`                                                                                          | [`[]ResourceSelector`](../../reference/resource_selector)    |          |
| `tooltip`       | Set tooltip outlining information pertaining to the component                                                                                                        | `string`                                                     |          |
| `type`          | Set type of component e.g. service, API, website, library, database, etc.                                                                                            | `string`                                                     |          |

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

| Field          | Description               | Scheme                                          | Required |
| -------------- | ------------------------- | ----------------------------------------------- | -------- |
| `components`   | Set name for component    | [`[]Component`](#component)                     |          |
| `properties`   | Set name for property     | [`[]Property`](../concepts/properties#property) |          |
| `configs`      | Set name for config       | [`[]Config`](../concepts/config#config)         |          |
| `relationship` | Set name for relationship | [`[]RelationshipSpec`](#relationshipspec)       |          |
| `checks`       | Set name for check        | [`[]Check`](../concepts/health-checks#check)    |          |
