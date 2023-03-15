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

| Field                     | Description                                                                                      | Scheme                                                                       | Required |
| ------------------------- | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- | -------- |
| `id`                      | A static value or JSONPath expression to use as the ID for the resource.                         | _string_                                                                     |          |
| `name`                    | A static value or JSONPath expression to use as the Name for the resource.                       | _string_                                                                     |          |
| `items`                   | A JSONPath expression to use to extract individual items from the resource                       | _string_                                                                     |          |
| `type`                    | A static value or JSONPath expression to use as the type for the resource.                       | _string_                                                                     |          |
| [`transform`](#transform) | Specify field to transform result                                                                | _string_                                                                     |          |
| `format`                  | Format of config item, defaults to JSON, available options are JSON                              | _string_                                                                     |          |
| `namespace`               | Specify namespace for scraping of Kubernetes resources                                           | _string_                                                                     |          |
| `useCache`                | Specify boolean value to toggle fetching results from Kube-apiserver or fetch response from etcd | _bool_                                                                       |          |
| `allowIncomplete`         |                                                                                                  | _bool_                                                                       |          |
| `scope`                   | Specify scope for scrape. e.g `cluster` for scraping at Cluster level                            | _string_                                                                     |          |
| `since`                   | Set time constraint for scraping resources within the set period                                 | _string_                                                                     |          |
| `selector`                | Specify Kubernetes resource to scrape based on selector. e.g `matchLabels`                       | _string_                                                                     |          |
| `fieldSelector`           | Specify Kubernetes resource based on value of resource fields. e.g `status.Phase=Running`        | _string_                                                                     |          |
| `maxInflight`             | Set value for maximum inflight requests                                                          | _int_                                                                        |          |
| `exclusions`              | Specify Kubernetes resources to be excluded from scraping                                        | _\[\]string_                                                                 |          |
| **`kubeconfig`**          | Specify kubeconfig for access to your Kubernetes Cluster                                         | [_kommons.EnvVar_](https://pkg.go.dev/github.com/flanksource/kommons#EnvVar) | yes      |

### Transform

| Field                | Description                                                                                   | Scheme              | Required |
| -------------------- | --------------------------------------------------------------------------------------------- | ------------------- | -------- |
| [`script`](#script)  | Script to transform scrape result                                                             | [_Script_](#script) |          |
| [`include`](#Filter) | Specify fields to include in the configuration                                                | [_Filter_](#filter) |          |
| [`exclude`](#filter) | Specify fields to remove from the config. It is useful for removing sensitive data and fields | [_Filter_](#filter) |          |

### Filter

| Field      | Description                                | Scheme   | Required |
| ---------- | ------------------------------------------ | -------- | -------- |
| `jsonPath` | Specify JSONPath expression for the fields | _string_ |          |

### Script

| Field        | Description                                    | Scheme   | Required |
| ------------ | ---------------------------------------------- | -------- | -------- |
| `gotemplate` | Specify Go template for use in script          | _string_ |          |
| `jsonPath`   | Specify path to JSON element for use in script | _string_ |          |
| `expr`       | Specify expression for use in script           | _string_ |          |
| `javascript` | Specify javascript syntax for script           | _string_ |          |
