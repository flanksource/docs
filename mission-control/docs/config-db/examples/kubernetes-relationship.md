This example demonstrates 2 different ways you can form relationships between config items.

The first relationship is formed between a Kubernetes service and its corresponding deployment using the inline relationship selector _(type & name)_ while the second relationship is formed between Pods and PVCs using the `expr` way.

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
          # Link a service to a deployment (adjust the label selector accordingly)
          - filter: config_type == "Kubernetes::Service"
            type:
              value: 'Kubernetes::Deployment'
            name:
              expr: |
                has(config.spec.selector) && has(config.spec.selector.name) ? config.spec.selector.name : ''
          # Link Pods to PVCs
          - filter: config_type == 'Kubernetes::Pod'
            expr: |
              config.spec.volumes.
                filter(item, has(item.persistentVolumeClaim)).
                map(item, {"type": "Kubernetes::PersistentVolumeClaim", "name": item.persistentVolumeClaim.claimName}).
                toJSON()
```
