---
title: Kubernetes
sidebar_position: 4
---

# <Icon name="k8s"/> Kubernetes

:::tip Registry

The registry has a [Kubernetes](/registry/kubernetes) Helm chart that provides a pre-configured Scraper and Topology with some common defaults

:::

The `kubernetes` scraper collects all of the resources and events in a Kubernetes cluster, and then watches for changes.

```yaml title='kubernetes-scraper.yaml' file=../../../modules/config-db/fixtures/kubernetes.yaml
```

| Field        | Description                                                                  | Scheme                                       | Required |
| ------------ | ---------------------------------------------------------------------------- | -------------------------------------------- | -------- |
| `logLevel`   | Specify the level of logging.                                                | `string`                                     |          |
| `schedule`   | Specify the interval to scrape in cron format. Defaults to every 60 minutes. | `string`                                     |          |
| `retention`  | Settings for retaining changes, analysis and scraped items                   | [`Retention`](/config-db/concepts/retention) |          |
| `kubernetes` | Specifies the list of Kubernetes configurations to scrape.                   | [`[]Kubernetes`](#kubernetes)              |          |

### Kubernetes

| Field             | Description                                                                                      | Scheme                                           | Required |
| ----------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------ | -------- |
| `clusterName`     | Specify cluster name                                                                             | `string`                                         |          |
| `event`           | Specify configuration to handle Kubernetes events.                                               | [`Event`](#events)                               |          |
| `exclusions`      | Resources to be excluded from scraping                                        | `[]string`                                       |          |
| `fieldSelector`   | Resources to be included e.g `status.Phase=Running`        | `string`                                         |          |
| **`kubeconfig`**  | Kubeconfig to connect to the cluster                                         | <CommonLink to="secrets">[]_EnvVar_</CommonLink> |          |
| `namespace`       | Include resources only from this namespace                                         | `string`                                         |          |
| `relationships`   | Create relationships between kubernetes objects.                                                 | [`[]Relationship`](#relationships)     |          |
| `scope`           | Specify scope for scrape. e.g `cluster` for scraping at Cluster level                            | `string`                                         |          |
| `selector`        | Include resources matching this selector only e.g `matchLabels`                       | `string`                                         |          |
| `since`           | Set time constraint for scraping resources within the set period                                 | `string`                                         |          |
| `properties`      | Custom properties to be added for each item                                     | [`[]ConfigProperty`](/reference/config-db/properties)   |          |
| `transform`       | Custom transformations to apply                                                                       | [`Transform`](/config-db/concepts/transform)                        |          |
| `tags`            | Tags to set on each config item. `cluster` and `namespace` are set by default                                                     | `map[string]string`                              |          |


## Events

`Kubernetes::Event` resources are mapped to config changes. Events can be very verbose so they can be excluded or their severity level changed:


| Field              | Description                                                                                | Scheme                                  | Required |
| ------------------ | ------------------------------------------------------------------------------------------ | --------------------------------------- | -------- |
| `exclusions`       | A list of keywords used to exclude event objects based on the reason                       | `[]string`                              |          |
| `severityKeywords` | Specify keywords used to identify the severity of the Kubernetes Event based on the reason | [`SeverityKeywords`](#severitykeywords) |          |

### SeverityKeywords

| Field   | Description                                                                                                                                                            | Scheme     | Required |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | -------- |
| `warn`  | A list of keywords used to identify a warning severity from the reason. It could also be a match pattern: e.g. `*` to match all or `!badword` to exclude `badword` | `[]string` |          |
| `error` | Same as `warn` but used to map to error severity.                                                                                                                      | `[]string` |          |

## Relationships

You can create relationships between kubernetes objects on the basis of

:::info
[Relationships](../concepts/relationships) can also be defined under `transform.relationships`, however defining them under `kubernetes.relationships` is simpler with specific support for `kind`, `name` and `namespace` fields.
:::

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
| `kind`      | `kind` of Kubernetes Object      | [`Lookup`](#lookup) | `true`   |
| `name`      | `name` of Kubernetes Object      | [`Lookup`](#lookup) | `true`   |
| `namespace` | `namespace` of Kubernetes Object | [`Lookup`](#lookup) | `true`   |

##### Lookup

There are 3 different ways to specify which value to use when finding related configs:

| Field   | Description                        | Scheme   | Required |
| ------- | ---------------------------------- | -------- | -------- |
| `expr`  | Use an expression to get the value | `string` |          |
| `value` | Specify a static value             | `string` |          |
| `label` | Get the value from a label         | `string` |          |


## Annotations

Kubernetes resources can be annotated with  annotations that can direct the scraper to certain behaviors.

<Fields
  rows={[
    {
      field: 'config-db.flanksource.com/tags',
      description: 'Add custom tags.  Config items can only have up to `5` tags, so keep the custom tags limited.',
      scheme: '`key1:val1,key2:val2`'
    },
    {
      field: 'config-db.flanksource.com/ignore',
      description: 'Ignore config items',
      scheme: 'bool'
    },
    {
      field: 'config-db.flanksource.com/ignore-changes',
      description: 'Ignore changes by change type',
      scheme: 'MatchPattern'
    },
    {
      field: 'config-db.flanksource.com/ignore-change-severity',
      description: 'Ignore changes by severity ',
      scheme: 'MatchPattern'
    }
  ]}
/>

### Examples

#### Exclude verbose changes from argo application

```yaml title="argo-application.yaml"
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: sock-shop
  namespace: argo
  annotations:
    config-db.flanksource.com/ignore-changes: ReconciliationSucceeded
    config-db.flanksource.com/ignore-change-severity: low
spec:
  ...
```

#### Excluding a particular secret from being scraped

```yaml title="secret.yaml"
apiVersion: v1
kind: Secret
metadata:
  annotations:
    config-db.flanksource.com/ignore: true
  name: slack
  namespace: default
type: Opaque
data:
  token: ...
```
