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

| Field        | Description                                                                  | Scheme                                       | Required |
| ------------ | ---------------------------------------------------------------------------- | -------------------------------------------- | -------- |
| `logLevel`   | Specify the level of logging.                                                | `string`                                     |          |
| `schedule`   | Specify the interval to scrape in cron format. Defaults to every 60 minutes. | `string`                                     |          |
| `retention`  | Settings for retaining changes, analysis and scraped items                   | [`Retention`](/config-db/concepts/retention) |          |
| `kubernetes` | Specifies the list of Kubernetes configurations to scrape.                   | [`[]Kubernetes`](#kubernetes-1)              |          |

### Kubernetes

| Field             | Description                                                                                      | Scheme                                           | Required |
| ----------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------ | -------- |
| `allowIncomplete` | Show partial results when fetching of API resources fails                                        | `bool`                                           |          |
| `clusterName`     | Specify cluster name                                                                             | `string`                                         |          |
| `event`           | Specify configuration to handle Kubernetes events.                                               | [`Event`](#events)                               |          |
| `exclusions`      | Specify Kubernetes resources to be excluded from scraping                                        | `[]string`                                       |          |
| `fieldSelector`   | Specify Kubernetes resource based on value of resource fields. e.g `status.Phase=Running`        | `string`                                         |          |
| **`kubeconfig`**  | Specify kubeconfig for access to your Kubernetes Cluster                                         | <CommonLink to="secrets">[]_EnvVar_</CommonLink> |          |
| `maxInFlight`     | restrict parallelism to X inflight requests                                                      | `int64`                                          |          |
| `namespace`       | Specify namespace for scraping of Kubernetes resources                                           | `string`                                         |          |
| `relationships`   | Create relationships between kubernetes objects.                                                 | [`[]Relationship`](#kubernetes-relationship)     |          |
| `scope`           | Specify scope for scrape. e.g `cluster` for scraping at Cluster level                            | `string`                                         |          |
| `selector`        | Specify Kubernetes resource to scrape based on selector. e.g `matchLabels`                       | `string`                                         |          |
| `since`           | Set time constraint for scraping resources within the set period                                 | `string`                                         |          |
| `useCache`        | Specify boolean value to toggle fetching results from Kube-apiserver or fetch response from etcd | `bool`                                           |          |
| `properties`      | Custom templatable properties for the scraped config items.                                      | [`[]ConfigProperty`](../../reference/property)   |          |
| `transform`       | Field to transform result                                                                        | [`Transform`](#transform)                        |          |
| `tags`            | set custom tags on the scraped config items                                                      | `map[string]string`                              |          |

#### Transform

<ConfigTransform></ConfigTransform>

#### Events

`Config DB` maps Kubernetes Event objects to config changes unlike other objects that are mapped to config items. This configuration allows you to exclude or include the Kubernetes Event objects based on the reason.

In addition, you can also specify keywords used to identify the severity of the Kubernetes Event based on the reason.

| Field              | Description                                                                                | Scheme                                  | Required |
| ------------------ | ------------------------------------------------------------------------------------------ | --------------------------------------- | -------- |
| `exclusions`       | A list of keywords used to exclude event objects based on the reason                       | `[]string`                              |          |
| `severityKeywords` | Specify keywords used to identify the severity of the Kubernetes Event based on the reason | [`SeverityKeywords`](#severitykeywords) |          |

#### SeverityKeywords

| Field   | Description                                                                                                                                                            | Scheme     | Required |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | -------- |
| `warn`  | A list of keywords used to identify a warning severity from the reason. It could also be a match pattern: example "\*" to match all or "!badword" to exclude "badword" | `[]string` |          |
| `error` | Same as `warn` but used to map to error severity.                                                                                                                      | `[]string` |          |

#### Kubernetes Relationship

You can create relationships between kubernetes objects on the basis of `kind`, `name` and `namespace`.
Kubernetes scraper offers a more tailored relationship selector in addition to the [general relationship selector](../concepts/transform.md#relationshipconfig).

```yaml title="kubernetes-relationship.yaml"
kubernetes:
  - clusterName: 'eks'
    relationships:
      # If object has spec.claimRef field, use its kind, name and namespace
      - kind:
          expr: "has(spec.claimRef) ? spec.claimRef.kind : ''"
        name:
          expr: "has(spec.claimRef) ? spec.claimRef.name : ''"
        namespace:
          expr: "has(spec.claimRef) ? spec.claimRef.namespace : ''"

      # If object flux kustomize labels, link it to the parent Kustomization object
      - kind:
          value: Kustomization
        name:
          label: kustomize.toolkit.fluxcd.io/name
        namespace:
          label: kustomize.toolkit.fluxcd.io/namespace

      # If object helm kustomize labels, link it to the parent HelmRelease object
      - kind:
          value: HelmRelease
        name:
          label: helm.toolkit.fluxcd.io/name
        namespace:
          label: helm.toolkit.fluxcd.io/namespace
```

| Field       | Description                      | Scheme                                       | Required |
| ----------- | -------------------------------- | -------------------------------------------- | -------- |
| `kind`      | `kind` of Kubernetes Object      | [`RelationshipLookup`](#relationship-lookup) | `true`   |
| `name`      | `name` of Kubernetes Object      | [`RelationshipLookup`](#relationship-lookup) | `true`   |
| `namespace` | `namespace` of Kubernetes Object | [`RelationshipLookup`](#relationship-lookup) | `true`   |

##### Relationship Lookup

RelationshipLookup offers different ways to specify a lookup value

| Field   | Description                        | Scheme   | Required |
| ------- | ---------------------------------- | -------- | -------- |
| `expr`  | Use an expression to get the value | `string` |          |
| `value` | Specify a static value             | `string` |          |
| `label` | Get the value from a label         | `string` |          |
