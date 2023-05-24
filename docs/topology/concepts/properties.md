A topology view can be customized using properties.

```yaml
properties:
  - icon: github
    text: https://github.com/spring-petclinic/spring-petclinic-microservices
    type: url
  - icon: aws
    text: eu-west-1
  - icon: git
    text: vaev6ae (updated 2h ago)
  - headline: true
    name: Pets
    text: '15000'
  - headline: true
    name: Vets
    text: '125'
  - color: green
    headline: true
    name: Visitors
    text: '447'
```

![Properties Displayed](../images/properties-in-mission-control.png)

## Property

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
| `configLookup`   | Specify lookup for component config.                         | [`ConfigLookup`](#configlookup)         | `optional` |

### Configuration Lookup

Property values can be looked up from configuration items using the `configLookup` field:

```yaml title="config-lookup.yaml"
apiVersion: canaries.flanksource.com/v1
kind: SystemTemplate
metadata:
  name: application-config-lookup
spec:
  components:
   - name: Application
     properties:
          - headline: true
            name: Version
            configLookup:
              config:
                labels:
                  namespace: ${.properties.namespace}
                name: Configuration.properties
                type: File
              field: $["application.buildversion"]

```

This `config` object is used to find the config item to lookup a value from, if there are multiple matches, the first match is used.

| Field     | Description                                              | Scheme                         | Required |
| --------- | -------------------------------------------------------- | ------------------------------ | -------- |
| `config.name`      | The name of the config item.      | `string`            |              |
| `config.type`      | The type of config item.              | `string`            |  |
| `config.labels`      | Match labels of the config item, all labels must match              | `map[string]string` |  |
| **`field`** | A JSONPath expression to lookup the value in the config. | `string`                       | **Required** |
| `display` | Apply transformations to the value.                      | [`Display`](../concepts/templating.md)          |          |
| `id`      | The UUID of config item, rarely used                       | `string`                       |          |

### Link

| Field     | Description                                                 | Scheme   | Required |
| --------- | ----------------------------------------------------------- | -------- | -------- |
| `icon`    | Set icon for link.                                          | `string` |          |
| `label`   | Set label for link.                                         | `string` |          |
| `text`    | Set text of choice for link.                                | `string` |          |
| `tooltip` | Set tooltip outlining information pertaining to the link.   | `string` |          |
| `type`    | Specify type of link e.g. documentation, support, playbook. | `string` |          |
| `url`     | Specify URL for link.                                       | `string` |          |
