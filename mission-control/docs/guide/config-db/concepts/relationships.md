---
title: Relationships
sidebar_position: 1
sidebar_custom_props:
  icon: hugeicons:chart-relationship
---

:::tip Integrations

The integration [charts](/docs/integrations) include many common relationships for Argo, Flux, etc out of the box.

:::

Relationships associate two different configs. They help in visualizing the connection of a config above and below in a hierarchy. Example: A kubernetes pod is linked to a Deployment and ReplicaSet and also to the persistent volumes.

For full schema reference, see [Relationships Reference](/docs/reference/config-db/transformation#relationships).

Relationships come in 2 types:

**Hard Links** represent a physical relationship, e.g. A pod is always a child of namespace, hard links are created automatically by the relevant scraper or can be created by specifying `Parent Type` and `ID` in custom scrapers. Use the `parent` field to control whether matched configs become parents or children.

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
When a namespace is linked to a pod, no changes at the namespace level show when using `Outgoing` (the default) option.
You can see changes on the incoming relationships (and their parents) by choosing the `Incoming` option.

:::

## Dynamic Linking

Sometimes the logic for when to form a relationship is complex. A CEL expression can be used to return a list of [ResourceSelectors](/docs/reference/resource-selector) dynamically.

See [Dynamic Relationships](/docs/reference/config-db/transformation#dynamic-relationships) for the schema.

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
