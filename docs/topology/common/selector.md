## Canary-selector
The selector topology selects and displays results based on the Canary check object as specified with `canarySelector` and `labelSelector`. Inline checks can be specified as well to set the desired state for your Canary check object.

The examples shown below show the possible use cases

??? canary-selector
    ```yaml
    apiVersion: canaries.flanksource.com/v1
    kind: SystemTemplate
    metadata:
      name: canary-selector
      labels:
        canary: canary-selector
    spec:
      type: Website
      icon: Application
      schedule: "@every 5m"

      components:
        - checks:
          - selector:
            labelSelector: "canary=http"
            inline:
              schedule: "@every 1m"
              http:
                - name: http-pass
                  endpoint: http://status.savanttools.com/?code=202
                  responseCodes:
                    - 202
          name: http-component-canary
        - checks:
          - inline:
              schedule: "@every 1m"
              http:
                - name: http-202
                  endpoint: http://status.savanttools.com/?code=201
                  responseCodes:
                    - 202
          name: second-inline-canary
    ```

??? selector
    ```yaml
    apiVersion: canaries.flanksource.com/v1
    kind: SystemTemplate
    metadata:
      name: selector
    spec:
      type: KubernetesCluster
      icon: kubernetes
      schedule: "@every 20m"
      id:
        javascript: properties.id
      components:
        - selectors:
            - labelSelector: "namespace=kube-system"
        - canarySelector:
            - labelSelector: "canary=http-check"
            - inline:
                - http:
                    endpoint: "http://status.savanttools.com/?code=200"
                    test:
                      expr: 'code == 200'        
          name: selector
          type: aggregator
    ```

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `components` |  | [*Components*](#components-components) |
| `configs` |  | [*Configs*](#configs-configs)
| `icon` |  | *string* |
| `id` |  | [*Id*](#id-id)
| `label` |  | *string* |
| `owner` |  | *string* |
| `properties` |  | [*Properties*](#properties-properties)
| `schedule` |  | *string* |
| `text` |  | *string* |
| `tooltip` |  | *string* |
| `type` |  | *string* |


## Scheme Reference 
### Components
| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `checks` |  | [*Checks*](#checks-checks)
| `components` | RawMessage is a raw encoded JSON value. It implements Marshaler and Unmarshaler and can be used to delay JSON decoding or precompute a JSON encoding. | *byte* |
| `configs` |  | [*Configs*](#configs-configs)
| `icon` |  | *string* |
| `id` |  | [*Id*](#id-id) 
| `lifecycle` | The lifecycle state of the component e.g. production, staging, dev, etc. | string |
| `lookup` | Set based on Canary checks as documented in [Check reference](/reference/checks/). |
| `name` |  | *string* |
| `order` |  | *int* |
| `owner` |  | *string* |
| `properties` |  | [*Properties*](#properties-properties) |
| `relationships` |  | [*Relationships*](#relationships-relationships)
| `selectors` |  | [*Selectors*](#selector-selector)
| `summary` |  | [*Summary*](#summary)
| `tooltip` |  | *string* |
| `type` |  | *string* |

### Relationships
| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `ref` |  | *string* | 
| `type` | The type of relationship, e.g. dependsOn, subcomponentOf, providesApis, consumesApis | *string* 

### Configs
| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `id` |  | *\[\]string* |
| `name` |  | *string* |
| `namespace` | *string* |
| `type` |   | *string* |

### Id
| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `expr` |  | *string* |
| `javascript` |  | *string* |
| `jsonPath` |  | *string* |
| `template` |  | *string* |

### Properties
| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `color` |  | *string* |
| `configLookup` |  | [*Config*](#configs-configs)
| `headline` |  | *bool* |
| `icon` |  | *string* |
| `label` |  | *string*
| `lastTransition` |  | *string* |
| `links` |  | [*Links*](#links-links)
| `lookup` | Set based on Canary checks as documented in [Check reference](/reference/checks/).
| `max` |  | *int64*
| `min` |  | *int64*
| `name` |  | *string* 
| `order` |  | *int*
| `status` |  | *string* 
| `summary` |  | [*Summary*](#summary-summary)
| `text` |  | *string* |
| `tooltip` |  | *string* |
| `type` |  | *string* |
| `unit` | e.g. milliseconds, bytes, millicores, epoch etc. | string
| `value` |  | *int64* |


### Checks
| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `inline` |  | [*Inline*](#inline) |
| `selector` |  | [*Selector*](#selector)

### Inline
**`http`**: Example is set Set based on HTTP check as documented in [HTTP Check reference](/reference/checks/http/). For other checks see the [Check reference](/reference/checks/) for more information.

### Links
| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `icon` |  | *string* |
| `label` |  | *string* |
| `text` |  | *string* |
| `tooltip` |  | *string* |
| `type` | e.g. documentation, support, playbook | string 
| `url` |  | *string* |

### Selector
| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `fieldSelector` |  | *string* |
| `labelSelector` |  | *string* |

### Summary
| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `healthy` |  | *int* |
| `info` |  | *int* |
| `unhealthy` |  | *int* |
| `warning` |  | *int* |




