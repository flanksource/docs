## Check
The check topology fetches and displays results as set for each Check configured. 

??? example
    ```yaml
    apiVersion: canaries.flanksource.com/v1
    kind: SystemTemplate
    metadata:
      name: single-check
    spec:
      type: Website
      icon: Application
      schedule: "@every 5m"
      components:
        - checks:
           - selector:
              labelSelector: "check=http-200"
          name: single-check
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
| ``color`` |  | *string* |
| ``configLookup`` |  | [*Config*](#configs-configs)
| ``headline`` |  | *bool* |
| ``icon`` |  | *string* |
| ``label`` |  | *string*
| ``lastTransition`` |  | *string* |
| ``links`` |  | [*Links*](#links-links)
| ``lookup`` | Set based on Canary checks as documented in [Check reference](/reference/checks/).
| ``max`` |  | *int64*
| ``min`` |  | *int64*``
| ``name`` |  | *string* 
| ``order`` |  | *int*
| ``status`` |  | *string* 
| ``summary`` |  | [*Summary*](#summary-summary)
| ``text`` |  | *string* |
| ``tooltip`` |  | *string* |
| ``type`` |  | *string* |
| ``unit`` | e.g. milliseconds, bytes, millicores, epoch etc. | string
| ``value`` |  | *int64* |


### Checks
| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `inline` |  | [*Inline*](#inline) |
| `selector` |  | [*Selector*](#selector)

### Inline
For including checks as inline, see the [Check reference](/reference/checks/) for more information.

### Links
| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `icon` |  | *string* |
| `label` |  | *string* |
| `text` |  | *string* |
| `tooltip` |  | *string* |
| `type` | e.g. documentation, support, playbook | *string* 
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