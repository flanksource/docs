# Relationships

Relationships associate two different configs. They help in visualizing the connection of a config above and below in a hierarchy. Example: A kubernetes pod is linked to a Deployment and ReplicaSet and also to the persistent volumes.



![Kubernetes Relationship](/img/config-relationships.png)

```yaml title="kubernetes-scraper.yaml"
apiVersion: configs.flanksource.com/v1
kind: ScrapeConfig
metadata:
  name: kubernetes-scraper
spec:
  kubernetes:
    - clusterName: local-kind-cluster
      transform:
        relationship:
          # Link a service to a deployment
          - filter: config_type == "Kubernetes::Service"
            type:
              value: 'Kubernetes::Deployment'
            name:
              expr: |
                has(config.spec.selector) && has(config.spec.selector.name) ? config.spec.selector.name : ''
```

:::warning Directionality matters

When creating relationships ensure that you specify the relationship on the parent and not on the child, as this can effect the change graph,
e.g. If you link a pod to a namespace, when you view changes on the pod by default it will show all changes to all resources in the namespace.
When a namespace is linked to a pod, no changes at the namespace level will be shown when using `Outgoing` (the default) option.

You can see changes on the incoming relationships (and their parents) by choosing the `Incoming` option.

:::

## Relationship Config

This transformation function allows you to dynamically form relationships between two different config items using selectors.

Example: You can link a kubernetes deployment with the corresponding pods, or you can link AWS EC2 instances with the AWS Account. It's even possible to link two configs scraped by different scrape configs like: linking a Kubernetes Node in an EKS cluster to the EC2 instance.

| Field    | Description                                                  | Scheme                                       | Required |
| -------- | ------------------------------------------------------------ | -------------------------------------------- | -------- |
|          |                                                              |                                              |          |
| `filter` | Specify the config item with which relationship should be formed | `string`                                     | `true`   |
| `expr`   | cel-expression that returns a list of [relationship selector](#relationshipselector). | [Dynamic Linking](#dyamic-liking)            |          |
| `id`     | id of the config to link to                                  | [`RelationshipLookup`](#relationship-lookup) |          |
| `name`   | name of the config to link to                                | [`RelationshipLookup`](#relationship-lookup) |          |
| `type`   | type of the config to link to                                | [`RelationshipLookup`](#relationship-lookup) |          |
| `agent`  | agent of the config to link to                               | [`RelationshipLookup`](#relationship-lookup) |          |
| `labels` | Labels of the config to link to                              | [`RelationshipLookup`](#relationship-lookup) |          |

:::info
`expr` is an alternative, more flexible, way to define the selectors. Either use `expr` or the other selector fields (`id`, `name`, `type`, `agent`, `labels`) but not both.
:::

### Relationship Lookup

RelationshipLookup offers different ways to specify a lookup value

| Field   | Description                                   | Scheme                                | Variables                                     |
| ------- | --------------------------------------------- | ------------------------------------- | --------------------------------------------- |
| `expr`  | An expression that returns a value to be used | <CommonLink to="cel">CEL</CommonLink> | [`ScrapeResult`](../references/scrape-result) |
| `value` | Specify a static value                        | `string`                              |                                               |
| `label` | Use the value from an existing label          | `string`                              |                                               |



## Dynamic Linking

Expressions can be used to define the linking criteria by return a list of [resource selectors](/reference/resource-selector).

```yaml title=link-pvc-to-pod.yaml
apiVersion: configs.flanksource.com/v1
kind: ScrapeConfig
metadata:
  name: kubernetes-scraper
spec:
  kubernetes:
    - clusterName: local-kind-cluster
      transform:
        relationship:
          - filter: config_type == 'Kubernetes::Pod'
            //highlight-next-line
            expr: |
              config.spec.volumes.
                filter(item, has(item.persistentVolumeClaim)).
                map(item, {
                  "type": "Kubernetes::PersistentVolumeClaim",
                  "name": item.persistentVolumeClaim.claimName
                }).
                toJSON()
```



| Field  | Description                                                  | Scheme                                | Variables                                     |
| ------ | ------------------------------------------------------------ | ------------------------------------- | --------------------------------------------- |
| `expr` | An expression that returns a list of  [ResourceSelectors](/reference/resource-selector) | <CommonLink to="cel">CEL</CommonLink> | [`ScrapeResult`](../references/scrape-result) |

