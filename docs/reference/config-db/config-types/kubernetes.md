## Kubernetes 
The `kubernetes` config type scrapes the configurations of your Kubernetes resources as specified with the fields; `namespace`, `selector`, `fieldSelector` and more. 

??? example
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

### Kubernetes (`kubernetes`)
| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| [BaseScraper](#BaseScraper) | Specify inline fields, `id`, `name`, `items`, `type`, `transform`, and `format` | inline |
| `namespace` | Specify namespace for scraping of Kubernetes resources |  |
| `useCache` |
| `allowIncomplete` |
| `scope` |
| `since` |
| `selector` | Specify Kubernetes resource to scrape based on selector. e.g `matchLabels` |  |
| `fieldSelector` | Specify Kubernetes resource based on value of resource fields. e.g `status.Phase=Running` |  |
| `maxInflight` |
| `exclusions` | Specify Kubernetes resources to be excluded from scraping |  |
| `kubeconfig` | Specify kubeconfig for access to your Kubernetes Cluster | kommons.EnvVar](https://pkg.go.dev/github.com/flanksource/kommons#EnvVar) |

### BaseScraper
| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `id` | A static value or JSONPath expression to use as the ID for the resource. | string |  |
| `name` | A static value or JSONPath expression to use as the Name for the resource. | string |  |
| `items` | A JSONPath expression to use to extract individual items from the resource | string |  |
| `type` | A static value or JSONPath expression to use as the type for the resource. | string |  |
| [`transform`](#transform) | 
| `format` |
