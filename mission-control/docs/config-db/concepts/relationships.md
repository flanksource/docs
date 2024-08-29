---
title: Relationships
sidebar_position: 1
---

:::tip Registry

The [registry](/registry) charts include many common relationships for Argo, Flux, etc out of the box.

:::

Relationships associate two different configs. They help in visualizing the connection of a config above and below in a hierarchy. Example: A kubernetes pod is linked to a Deployment and ReplicaSet and also to the persistent volumes.

Relationships come in 2 types:

**Hard Links** represent a physical relationship, e.g. A pod is always a child of namespace, hard links are created automatically by the relevant scraper or can be created by specifying `Parent Type` and `ID` in custom scrapers.

**Soft Links** represent logical relationships and can have directionality. e.g. Node is related to a pod that runs on it, and a pod is related to an Persistent Volume that is attached the pod. Soft Links are created automatically by some scrapers e.g. Using `ownerRef` in kubernetes and `subnet-id` in AWS. Custom soft links can be created using a `relationship` transform:

In the example below, `Kubernetes::Services` are linked to `Kubernetes::Pod` using a soft link based on the service selector name

```yaml title="relate-services-to-pods.yaml"
apiVersion: configs.flanksource.com/v1
kind: ScrapeConfig
metadata:
  name: kubernetes-scraper
spec:
  kubernetes:
    - clusterName: local-kind-cluster
      transform:
        //highlight-start
        relationship:
          # Link a service to a deployment
          - filter: config_type == "Kubernetes::Service"
            type:
              value: 'Kubernetes::Deployment'
            name:
              expr: |
                has(config.spec.selector) && has(config.spec.selector.name) ? config.spec.selector.name : ''
         //highlight-end
```

:::warning Directionality matters

When creating relationships ensure that you specify the relationship on the parent and not on the child, as this can effect the change graph,
e.g. If you link a pod to a namespace, when you view changes on the pod by default it will show all changes to all resources in the namespace.
When a namespace is linked to a pod, no changes at the namespace level will be shown when using `Outgoing` (the default) option.

You can see changes on the incoming relationships (and their parents) by choosing the `Incoming` option.

:::

## Relationship

| Field    | Description                                            | Scheme                                                                                          | Required |
| -------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------- | -------- |
| `filter` | Which config items to form relationships with          | <CommonLink to="cel">CEL</CommonLink> with [`ScrapeResult`](/reference/config-db/scrape-result) | `true`   |
| `id`     | The ID or Alias (External ID) of the config to link to | [Lookup](#lookup)                                                                               |          |
| `name`   |                                                        | [Lookup](#lookup)                                                                               |          |
| `type`   | Config Type                                            | [Lookup](#lookup)                                                                               |          |
| `agent`  | agent of the config to link to                         | [Lookup](#lookup) that returns an [Agent](/reference/types#agent)                               |          |
| `labels` | Labels of the config to link to                        | `map[string]`[Lookup](#lookup)                                                                  |          |

### Lookup

RelationshipLookup offers different ways to specify a lookup value

| Field   | Description                                   | Scheme                                                                                          | Variables                                            |
| ------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `expr`  | An expression that returns a value to be used | <CommonLink to="cel">CEL</CommonLink> with [`ScrapeResult`](/reference/config-db/scrape-result) | [`ScrapeResult`](/reference/config-db/scrape-result) |
| `value` | A static value to use in the lookup           | `string`                                                                                        |                                                      |
| `label` | Get the value to use from an existing label   | `label name`                                                                                    |                                                      |

## Dynamic Linking

Sometimes the logic for when to a form a relationship is complex, a CEL expression can be used to return a list of selectors dynamically.

| Field  | Description                                                                            | Scheme                                | Variables                                            |
| ------ | -------------------------------------------------------------------------------------- | ------------------------------------- | ---------------------------------------------------- |
| `expr` | An expression that returns a list of [ResourceSelectors](/reference/resource-selector) | <CommonLink to="cel">CEL</CommonLink> | [`ScrapeResult`](/reference/config-db/scrape-result) |

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
            //highlight-start
            expr: |
              config.spec.volumes.
                filter(item, has(item.persistentVolumeClaim)).
                map(item, {
                  "type": "Kubernetes::PersistentVolumeClaim",
                  "name": item.persistentVolumeClaim.claimName
                }).
                toJSON()
            //highlight-end
```
