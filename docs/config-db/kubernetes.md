## Kubernetes

The `kubernetes` config type scrapes the configurations of your Kubernetes resources as specified with the fields; `namespace`, `selector`, `fieldSelector` and more.

```yaml
  kubernetes:
    - exclusions:
        - Secret
        - ReplicaSet
        - APIService
        - events
        - endpoints.discovery.k8s.io
        - endpointslices.discovery.k8s.io
        - leases.coordination.k8s.io
        - podmetrics.metrics.k8s.io
        - nodemetrics.metrics.k8s.io
        - customresourcedefinition
        - controllerrevision
        - certificaterequest
        - orders.acme.cert-manager.io
```

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `id` | A static value or JSONPath expression to use as the ID for the resource. | *string* |  |
| `name` | A static value or JSONPath expression to use as the Name for the resource. | *string* |  |
| `items` | A JSONPath expression to use to extract individual items from the resource | *string* |  |
| `type` | A static value or JSONPath expression to use as the type for the resource. | *string* |  |
| [`transform`](#transform) | Specify field to transform result | *string* |
| `format` | Format of config item, defaults to JSON, available options are JSON | *string* |
| `namespace` | Specify namespace for scraping of Kubernetes resources | *string* |
| `useCache` | Specify boolean value to toggle fetching results from Kube-apiserver or fetch response from etcd | *bool* |
| `allowIncomplete` |
| `scope` | Specify scope for scrape. e.g `cluster` for scraping at Cluster level | *string* |  |
| `since` | Set time constraint for scraping resources within the set period | *string* |  |
| `selector` | Specify Kubernetes resource to scrape based on selector. e.g `matchLabels` | *string*  |
| `fieldSelector` | Specify Kubernetes resource based on value of resource fields. e.g `status.Phase=Running` | *string* |
| `maxInflight` | Set value for maximum inflight requests | *int* |
| `exclusions` | Specify Kubernetes resources to be excluded from scraping | *\[\]string* |
| **`kubeconfig`** | Specify kubeconfig for access to your Kubernetes Cluster |[*kommons.EnvVar*](https://pkg.go.dev/github.com/flanksource/kommons#EnvVar) | yes |

### Transform

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| [`script`](#script) | Script to transform scrape result | [*Script*](#script) |
| [`include`](#Filter) | Specify fields to include in the configuration | [*Filter*](#filter)  |  |
| [`exclude`](#filter) | Specify fields to remove from the config. It is useful for removing sensitive data and fields | [*Filter*](#filter) |  |

### Filter

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `jsonPath` | Specify JSONPath expression for the fields | *string* |

### Script

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `gotemplate` | Specify Go template for use in script | *string* |
| `jsonPath` | Specify path to JSON element for use in script | *string* |
| `expr` | Specify expression for use in script | *string* |
| `javascript` | Specify javascript syntax for script | *string* |
