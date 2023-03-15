The `kubernetes` config type scrapes the configurations of your Kubernetes resources as specified with the fields; `namespace`, `selector`, `fieldSelector` and more.

```yaml
kubernetes:
  - clusterName: local-kind-cluster
    exclusions:
      - Secret
      - ReplicaSet
      - APIService
      - endpoints.discovery.k8s.io
      - endpointslices.discovery.k8s.io
      - leases.coordination.k8s.io
      - podmetrics.metrics.k8s.io
      - nodemetrics.metrics.k8s.io
      - customresourcedefinition
      - controllerrevision
      - certificaterequest
      - orders.acme.cert-manager.io
    event:
      exclusions:
        - SuccessfulCreate
        - Created
        - DNSConfigForming
      severityKeywords:
        error:
          - failed
          - error
        warn:
          - backoff
          - nodeoutofmemory
```

### Kubernetes

| Field             | Description                                                                                      | Scheme                                                                       | Required |
| ----------------- | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- | -------- |
| -                 | Specify inline fields, `id`, `name`, `items`, etc, See [BaseScraper](#basescraper)               | [**`BaseScraper`**](./base.md#basescraper)                                   |          |
| `clusterName`     | Specify cluster name                                                                             | `string`                                                                     |          |
| `namespace`       | Specify namespace for scraping of Kubernetes resources                                           | `string`                                                                     |          |
| `useCache`        | Specify boolean value to toggle fetching results from Kube-apiserver or fetch response from etcd | `bool`                                                                       |          |
| `allowIncomplete` |                                                                                                  | `bool`                                                                       |          |
| `scope`           | Specify scope for scrape. e.g `cluster` for scraping at Cluster level                            | `string`                                                                     |          |
| `since`           | Set time constraint for scraping resources within the set period                                 | `string`                                                                     |          |
| `selector`        | Specify Kubernetes resource to scrape based on selector. e.g `matchLabels`                       | `string`                                                                     |          |
| `fieldSelector`   | Specify Kubernetes resource based on value of resource fields. e.g `status.Phase=Running`        | `string`                                                                     |          |
| `maxInflight`     | Set value for maximum inflight requests                                                          | `int64`                                                                      |          |
| `exclusions`      | Specify Kubernetes resources to be excluded from scraping                                        | `[]string`                                                                   |          |
| **`kubeconfig`**  | Specify kubeconfig for access to your Kubernetes Cluster                                         | [`kommons.EnvVar`](https://pkg.go.dev/github.com/flanksource/kommons#EnvVar) | yes      |
| `event`           | Specify configuration to handle kubernetes events. See [**KubernetesEvent**](#kubernetesevent)   | [`KubernetesEvent`](#kubernetesevent)                                        | yes      |

### KubernetesEvent

`config-db` maps Kuberenetes Event objects to config changes unlike other objects that are mapped to config items. This configuration allows you to exclude or include the Kubernetes Event objects based on the reason.

In addition, you can also specify keywords used to identify the severity of the Kubernetes Event based on the reason.

| Field              | Description                                                                                | Scheme                                  | Required |
| ------------------ | ------------------------------------------------------------------------------------------ | --------------------------------------- | -------- |
| `exclusions`       | A list of keywords used to exclude event objects based on the reason                       | `[]string`                              | `false`  |
| `severityKeywords` | Specify keywords used to identify the severity of the Kubernetes Event based on the reason | [`SeverityKeywords`](#severitykeywords) | `false`  |

### SeverityKeywords

| Field   | Description                                                                                                                                                            | Scheme     | Required |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | -------- |
| `warn`  | A list of keywords used to identify a warning severity from the reason. It could also be a match pattern: example "\*" to match all or "!badword" to exclude "badword" | `[]string` | `false`  |
| `error` | Same as `warn` but used to map to error severity.                                                                                                                      | `[]string` | `false`  |
