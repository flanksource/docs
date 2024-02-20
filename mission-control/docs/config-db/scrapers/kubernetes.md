# Kubernetes

The `kubernetes` config type scrapes the configurations of your Kubernetes resources as specified with the fields; `namespace`, `selector`, `fieldSelector` and more.

```yaml title='kubernetes-scraper.yaml'
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

## Scraper

| Field        | Description                                                                        | Scheme                                       | Required |
| ------------ | ---------------------------------------------------------------------------------- | -------------------------------------------- | -------- |
| `logLevel`   | Specify the level of logging.                                                      | `string`                                     | `false`  |
| `schedule`   | Specify the interval to scrape in cron format. Defaults to every 60 minutes.       | `string`                                     | `false`  |
| `full`       | Set to `true` to extract changes from scraped configurations. Defaults to `false`. | `bool`                                       | `false`  |
| `retention`  | Settings for retaining changes, analysis and scraped items                         | [`Retention`](/config-db/concepts/retention) |          |
| `kubernetes` | Specifies the list of Kubernetes configurations to scrape.                         | [`[]Kubernetes`](#kubernetes-1)              | `false`  |

### Kubernetes

| Field             | Description                                                                                                                                                             | Scheme                                           | Required |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | -------- |
| `id`              | A static value or JSONPath expression to use as the ID for the resource.                                                                                                | `string`                                         | `true`   |
| `name`            | A static value or JSONPath expression to use as the Name for the resource. Default value is the `id`.                                                                   | `string`                                         | `false`  |
| `items`           | A JSONPath expression to use to extract individual items from the resource                                                                                              | `string`                                         | `false`  |
| `type`            | A static value or JSONPath expression to use as the type for the resource.                                                                                              | `string`                                         | `true`   |
| `transform`       | Specify field to transform result                                                                                                                                       | [`Transform`](../concepts/transform.md)          | `false`  |
| `format`          | Format of config item, defaults to JSON, available options are JSON                                                                                                     | `string`                                         | `false`  |
| `timestampFormat` | TimestampFormat is a Go time format string used to parse timestamps in createFields and DeletedFields. If not specified, the default is `RFC3339`.                      | `string`                                         | `false`  |
| `createFields`    | CreateFields is a list of JSONPath expression used to identify the created time of the config. If multiple fields are specified, the first non-empty value will be used | `[]string`                                       | `false`  |
| `deleteFields`    | DeleteFields is a JSONPath expression used to identify the deleted time of the config. If multiple fields are specified, the first non-empty value will be used         | `[]string`                                       | `false`  |
| `clusterName`     | Specify cluster name                                                                                                                                                    | `string`                                         |          |
| `namespace`       | Specify namespace for scraping of Kubernetes resources                                                                                                                  | `string`                                         |          |
| `useCache`        | Specify boolean value to toggle fetching results from Kube-apiserver or fetch response from etcd                                                                        | `bool`                                           |          |
| `scope`           | Specify scope for scrape. e.g `cluster` for scraping at Cluster level                                                                                                   | `string`                                         |          |
| `since`           | Set time constraint for scraping resources within the set period                                                                                                        | `string`                                         |          |
| `selector`        | Specify Kubernetes resource to scrape based on selector. e.g `matchLabels`                                                                                              | `string`                                         |          |
| `fieldSelector`   | Specify Kubernetes resource based on value of resource fields. e.g `status.Phase=Running`                                                                               | `string`                                         |          |
| `exclusions`      | Specify Kubernetes resources to be excluded from scraping                                                                                                               | `[]string`                                       |          |
| **`kubeconfig`**  | Specify kubeconfig for access to your Kubernetes Cluster                                                                                                                | <CommonLink to="secrets">[]_EnvVar_</CommonLink> | yes      |
| `event`           | Specify configuration to handle Kubernetes events.                                                                                                                      | [`Event`](#sevent)                               | yes      |
| `relationships`   | Create relationships between kubernetes objects.                                                                                                                        | [`[]Relationship`](#kubernetes-relationship)     | `false`  |

### Events

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

### Kubernetes Relationship

You can create relationships between kubernetes objects on the basis of kind, name and labels. While relationships between node and pod, deployment and pod, namespace and deployment
are created automatically, there are cases where we want to link objects on the basis of metadata (like linking resources created by a flux object to it). [See Example](../examples/kubernetes-relationship).

We support static values, expressions and label lookups to find the parent

| Field       | Description                      | Scheme                                       | Required |
| ----------- | -------------------------------- | -------------------------------------------- | -------- |
| `kind`      | `kind` of Kubernetes Object      | [`RelationshipLookup`](#relationship-lookup) | `true`   |
| `name`      | `name` of Kubernetes Object      | [`RelationshipLookup`](#relationship-lookup) | `true`   |
| `namespace` | `namespace` of Kubernetes Object | [`RelationshipLookup`](#relationship-lookup) | `true`   |

#### Relationship Lookup

RelationshipLookup offers different ways to specify a lookup value

| Field   | Description                        | Scheme   | Required |
| ------- | ---------------------------------- | -------- | -------- |
| `expr`  | Use an expression to get the value | `string` |          |
| `value` | Specify a static value             | `string` |          |
| `label` | Get the value from a label         | `string` |          |
