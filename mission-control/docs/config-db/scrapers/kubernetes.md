# Kubernetes

The `kubernetes` config type scrapes the configurations of your Kubernetes resources as specified with the fields; `namespace`, `selector`, `fieldSelector` and more.

Create a ScrapeConfig Custom Resource with the following manifest

```yaml
apiVersion: configs.flanksource.com/v1
kind: ScrapeConfig
metadata:
  name: kubernetes-scraper
spec:
  kubernetes:
    - clusterName: local-kind-cluster
      exclusions:
        - Secret
        - ReplicaSet
        - APIService
        - PodMetrics
        - NodeMetrics
        - endpoints.discovery.k8s.io
        - endpointslices.discovery.k8s.io
        - leases.coordination.k8s.io
        - podmetrics.metrics.k8s.io
        - nodemetrics.metrics.k8s.io
        - customresourcedefinition
        - controllerrevision
        - certificaterequest
        - orders.acme.cert-manager.io
      relationships:
        - kind:
            expr: "has(spec.claimRef) ? spec.claimRef.kind : ''"
          name:
            expr: "has(spec.claimRef) ? spec.claimRef.name : ''"
          namespace:
            expr: "has(spec.claimRef) ? spec.claimRef.namespace : ''"
        - kind:
            value: Kustomization
          name:
            label: kustomize.toolkit.fluxcd.io/name
          namespace:
            label: kustomize.toolkit.fluxcd.io/namespace
        - kind:
            value: HelmRelease
          name:
            label: helm.toolkit.fluxcd.io/name
          namespace:
            label: helm.toolkit.fluxcd.io/namespace
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

Or from the UI add the spec:

```yaml
kubernetes:
  - clusterName: local-kind-cluster
    exclusions:
      - Secret
      - ReplicaSet
      - APIService
      - PodMetrics
      - NodeMetrics
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
    relationships:
      - kind:
          expr: "has(spec.claimRef) ? spec.claimRef.kind : ''"
        name:
          expr: "has(spec.claimRef) ? spec.claimRef.name : ''"
        namespace:
          expr: "has(spec.claimRef) ? spec.claimRef.namespace : ''"
      - kind:
          value: Kustomization
        name:
          label: kustomize.toolkit.fluxcd.io/name
        namespace:
          label: kustomize.toolkit.fluxcd.io/namespace
      - kind:
          value: HelmRelease
        name:
          label: helm.toolkit.fluxcd.io/name
        namespace:
          label: helm.toolkit.fluxcd.io/namespace
```

### Kubernetes

| Field             | Description                                                                                                                                                             | Scheme                                                                       | Required |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | -------- |
| `id`              | A static value or JSONPath expression to use as the ID for the resource.                                                                                                | `string`                                                                     | `true`   |
| `name`            | A static value or JSONPath expression to use as the Name for the resource. Default value is the `id`.                                                                   | `string`                                                                     | `false`  |
| `items`           | A JSONPath expression to use to extract individual items from the resource                                                                                              | `string`                                                                     | `false`  |
| `type`            | A static value or JSONPath expression to use as the type for the resource.                                                                                              | `string`                                                                     | `true`   |
| `transform`       | Specify field to transform result                                                                                                                                       | [`Transform`](../concepts/transform.md)                                      | `false`  |
| `format`          | Format of config item, defaults to JSON, available options are JSON                                                                                                     | `string`                                                                     | `false`  |
| `timestampFormat` | TimestampFormat is a Go time format string used to parse timestamps in createFields and DeletedFields. If not specified, the default is `RFC3339`.                      | `string`                                                                     | `false`  |
| `createFields`    | CreateFields is a list of JSONPath expression used to identify the created time of the config. If multiple fields are specified, the first non-empty value will be used | `[]string`                                                                   | `false`  |
| `deleteFields`    | DeleteFields is a JSONPath expression used to identify the deleted time of the config. If multiple fields are specified, the first non-empty value will be used         | `[]string`                                                                   | `false`  |
| `clusterName`     | Specify cluster name                                                                                                                                                    | `string`                                                                     |          |
| `namespace`       | Specify namespace for scraping of Kubernetes resources                                                                                                                  | `string`                                                                     |          |
| `useCache`        | Specify boolean value to toggle fetching results from Kube-apiserver or fetch response from etcd                                                                        | `bool`                                                                       |          |
| `allowIncomplete` |                                                                                                                                                                         | `bool`                                                                       |          |
| `scope`           | Specify scope for scrape. e.g `cluster` for scraping at Cluster level                                                                                                   | `string`                                                                     |          |
| `since`           | Set time constraint for scraping resources within the set period                                                                                                        | `string`                                                                     |          |
| `selector`        | Specify Kubernetes resource to scrape based on selector. e.g `matchLabels`                                                                                              | `string`                                                                     |          |
| `fieldSelector`   | Specify Kubernetes resource based on value of resource fields. e.g `status.Phase=Running`                                                                               | `string`                                                                     |          |
| `maxInflight`     | Set value for maximum inflight requests                                                                                                                                 | `int64`                                                                      |          |
| `exclusions`      | Specify Kubernetes resources to be excluded from scraping                                                                                                               | `[]string`                                                                   |          |
| **`kubeconfig`**  | Specify kubeconfig for access to your Kubernetes Cluster                                                                                                                | [`kommons.EnvVar`](https://pkg.go.dev/github.com/flanksource/kommons#EnvVar) | yes      |
| `event`           | Specify configuration to handle Kubernetes events. See [**KubernetesEvent**](#kubernetesevent)                                                                          | [`KubernetesEvent`](#kubernetesevent)                                        | yes      |
| `relationships`   | Helps the user to understand relationships amongst components, configurations and health checks.                                                                       | [`Relationships`](#Relationships)                                        |    |


### Relationships

Checks if a kubernetes source has the labels specified in `name` and `namespace` fields. Then based on the labels it looks up the matching resource config specified in `kind` and adds a relationship to it.

| Field              | Description                                                                                | Scheme                                  | Required |
| ------------------ | ------------------------------------------------------------------------------------------ | --------------------------------------- | -------- |
| `name` | The label with the name of the relative | `string` | Yes  |
| `namespace` | The label with the namespace of the relative | `string` | Yes  |
| `kind`       | The resource type of the relative | `string`                              | Yes  |

### KubernetesEvent

`Config DB` maps Kubernetes Event objects to config changes unlike other objects that are mapped to config items. This configuration allows you to exclude or include the Kubernetes Event objects based on the reason.

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
