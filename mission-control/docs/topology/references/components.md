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
| `selectors`     | Specify component for topology based on `fieldSelector` and `labelSelector`                                                                                          | [`[]ResourceSelector`](#resourceselector) |            |
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

### ResourceSelector

We use resource selectors to link components with each other

| Field         | Description                                                                                                                            | Scheme   | Required |
|---------------|----------------------------------------------------------------------------------------------------------------------------------------|----------|----------|
| id            | ID of the component                                                                                                                    | string   |          |
| name          | Name of the component                                                                                                                  | string   |          |
| namespace     | Namespace of the component                                                                                                             | string   |          |
| types         | List of types of the component                                                                                                         | []string |          |
| statuses      | List of statuses of the component                                                                                                      | []string |          |
| labelSelector | Labels to select the component in kubernetes format                                                                                    | string   |          |
| fieldSelector | Property fields of the component in kubernetes format (or database columns: owner, topology_id, parent_id)                             | string   |          |
| agent         | ID or name of the agent (Default: local agent). Use 'all' to select all the agents                                                     | string   |          |
| cache         | One of 'no-cache' (should not fetch from cache but can be cached), 'no-store' (should not cache) or 'max-age=X' (cache for X duration) | string   |          |


A resource selector fetches components that satisfy all the parameters, you can use multiple selectors to aggregate

## Example
```yaml
kind: Topology
metadata:
  name: Example
spec:
  components:
  - name: Components with healthy status in kube-system namespace of all agents
    selectors:
    - statuses: ['healthy']
      namespace: kube-system
      agent: all

  - name: Components with Node type with spot instance property labelled with gpu tag
    selectors:
    - types: ['Kubernetes::Node']
      fieldSelector: 'instance-type=spot'
      labelSelector: 'sku-type=gpu'

  - name: Components with labels of team payments and team orders
    # Using multiple selectors to aggregate
    selectors:
    - labelSelector: 'team=payments'
    - labelSelector: 'team=orders'
```

### ForEach

| Field           | Description               | Scheme                                    | Required |
| --------------- | ------------------------- | ----------------------------------------- | -------- |
| `components`    | Set name for component    | [`[]Component`](#component)               |          |
| `properties`    | Set name for property     | [`[]Property`](#property)                 |          |
| `configs`       | Set name for config       | [`[]Config`](#config)                     |          |
| `relationshisp` | Set name for relationship | [`[]RelationshipSpec`](#relationshipspec) |          |
| `checks`        | Set name for check        | [`[]Check`](./health-checks.md#check)     |          |
