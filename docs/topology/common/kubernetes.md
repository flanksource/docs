## <img src='https://raw.githubusercontent.com/flanksource/flanksource-ui/main/src/icons/kubernetes.svg' style='height: 32px'/> Kubernetes

??? Kube-dns Example
    ```yaml
    apiVersion: canaries.flanksource.com/v1
    kind: SystemTemplate
    metadata:
      name: kube-dns
      labels:
        canary: kube-dns-pods
    spec:
      type: KubernetesCluster
      icon: kubernetes
      schedule: "@every 20m"
      id:
        javascript: properties.id
      components:
        - selectors:
            - labelSelector: "k8s-app=kube-dns"
          name: kube-dns
        - selectors:
            - labelSelector: "component=kube-scheduler"
          name: kube-scheduler

```

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
| `properties` | Customize component properties as to be visualized on Incident commander UI | [*Properties*](#properties-properties) |
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

### Checks

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `inline` |  | [*Inline*](#inline) |
| `selector` |  | [*Selector*](#selector)

### Inline

**`kubernetes`**: Example is set Set based on HTTP check as documented in [HTTP Check reference](/reference/checks/kubernetes/). For other checks see the [Check reference](/reference/checks/) for more information.

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
