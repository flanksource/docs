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
                  url: https://httpbin.demo.aws.flanksource.com/status/202
                  responseCodes:
                    - 202
          name: http-component-canary
        - checks:
          - inline:
              schedule: "@every 1m"
              http:
                - name: http-202
                  url: https://httpbin.demo.aws.flanksource.com/status/201
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
                    endpoint: "<http://status.savanttools.com/?code=200>"
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
| `checks` | Specify checks based on `inline` and `selector` | [*Checks*](#checks-checks)
| `components` | RawMessage is a raw encoded JSON value. It implements Marshaler and Unmarshaler and can be used to delay JSON decoding or precompute a JSON encoding. | *byte* |
| `configs` | Set configuration used by the specified component | [*Configs*](#configs-configs)
| `icon` | Specify icon for component | *string* |
| `id` | Specify unique ID for component | [*Id*](#id-id)
| `lifecycle` | The lifecycle state of the component e.g. production, staging, dev, etc. | string |
| `lookup` | Set based on Canary checks as documented in [Check reference](/reference/checks/). |
| `name` | Set name for component | *string* |
| `order` | Set integer order value for component  | *int* |
| `owner` | Specify owner of component | *string* |
| `properties` | Customize component properties as to be visualized on Mission control UI | [*Properties*](#properties-properties) |
| `relationships` | Specify relationship of component | [*Relationships*](#relationships-relationships)
| `selectors` | Specify component for topology based on `fieldSelector` and `labelSelector` | [*Selectors*](#selector-selector)
| `summary` | Set summary for component | [*Summary*](#summary)
| `tooltip` | Set tooltip outlining information pertaining to the component | *string* |
| `type` | Set type of component e.g. service, API, website, library, database, etc. | *string* |

### Relationships

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `ref` | Set reference for components relationship | *string* |
| `type` | Set the type of relationship, e.g. dependsOn, subcomponentOf, providesApis, consumesApis | *string*

### Configs

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `id` | Set unique ID for config | *\[\]string* |
| `name` | Set name for config | *string* |
| `namespace` | Set namespace for config  | *string* |
| `type` |  Specify type of config | *string* |

### Display

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `expr` | Specify expression for use as template for display | *string* |
| `javascript` | Specify javascript syntax for use as template for display  | *string* |
| `jsonPath` | Specify path to JSON element for use as template for display  | *string* |
| `template` | Specify Go template for use as template for display  | *string* |

### Id

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `expr` | Specify expression for ID | *string* |
| `javascript` | Specify javascript syntax to generate ID | *string* |
| `jsonPath` | Specify path to JSON element for use in ID | *string* |
| `template` | Specify Go template for use in ID | *string* |

### Properties

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `color` | Set color for component property | *string* |
| `configLookup` | Specify lookup for component config | [*ConfigLookup*](#configlookup)
| `headline` | Toggle headline for component property | *bool* |
| `icon` | Specify icon for component | *string* |
| `label` | Specify label for component property | *string*
| `lastTransition` | Set transition for component property | *string* |
| `links` | Set links pertaining to component | [*Links*](#links-links)
| `lookup` | Set based on Canary checks as documented in [Check reference](/reference/checks/).
| `max` | Set maximum value for components to display | *int64*
| `min` | Set minimum value for components to display | *int64*
| `name` | Set name for component property | *string*
| `order` | Set integer value order for component property | *int*
| `status` | Specify status for component property | *string*
| `summary` | Set Summary for component property e.g Healthy, Unhealthy, Warning, and Info | [*Summary*](#summary-summary)
| `text` | Set description or text of choice pertaining to component property | *string* |
| `tooltip` | Set tooltip outlining information pertaining to the component | *string* |
| `type` | Specify type of component property | *string* |
| `unit` | Unit for component property e.g. milliseconds, bytes, millicores, epoch etc. | *string*
| `value` |  | *int64* |

### ConfigLookup

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `id` | Specify unique ID for config | *string*
| `config` | Specify config for lookup | [*Configs*](#configs)
| `field` | Specify field for config lookup | *string*
| `display` | Set display format for config | [*Display*](#display)

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
| `icon` | Set icon for link | *string* |
| `label` | Set label for link | *string* |
| `text` | Set text of choice for link  | *string* |
| `tooltip` | Set tooltip outlining information pertaining to the link | *string* |
| `type` | Specify type of link e.g. documentation, support, playbook | string
| `url` | Specify URL for link | *string* |

### Selector

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `fieldSelector` | Select Kubernetes or Canary object based on the value of specified resource field | *string* |
| `labelSelector` | Select Kubernetes or Canary object based on label. e.g. app, canary. | *string* |
| `name` | Set name for selector | *string* |

### Summary

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `healthy` | Set threshold integer value for healthy component  | *int* |
| `info` | Set integer value for info for component  | *int* |
| `unhealthy` | Set threshold integer value for healthy component | *int* |
| `warning` | Set threshold integer value for warning for component | *int* |
