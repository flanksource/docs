---
title: Catalog
---

You can link components with configs. The linked config items appears in the component page in the right hand side panel.

To establish this relationship, you need to specify which config items to link with using the `config` field.

![Component Config relationship](/img/component-config-relationship.png)

```yaml title="kubernetes-cluster.yaml"
apiVersion: canaries.flanksource.com/v1
kind: Topology
metadata:
  name: kubernetes-cluster
spec:
  schedule: '@every 10m'
  components:
    - icon: pods
      lookup:
        kubernetes:
          - display:
              javascript: JSON.stringify(k8s.getPodTopology(results))
            kind: Pod
            name: k8s-pods
      configs:
        - type: Kubernetes::Pod
```

## Config Selector

| Field         | Description                               | Scheme              | Required |
| ------------- | ----------------------------------------- | ------------------- | -------- |
| `id`          | Specify the name of the config item.      | `[]string`          |          |
| `name`        | Specify the name of the config item.      | `string`            |          |
| `namespace`   | Specify the namespace of the config item. | `string`            |          |
| `type`        | Specify type of config item.              | `string`            |          |
| `class`       | Specify type of config item.              | `string`            |          |
| `external_id` | Specify type of config item.              | `string`            |          |
| `tags`        | Specify tags of config item.              | `map[string]string` |          |

This `Config` object is used to find config items to associate with the component. It's important to note that there can be multiple config items that can match the same `Config` object. The first match is used in that case.

To get a better result, you can provide more information in the `Config` object; example: provide name, namespace and type instead of just providing the namespace.
