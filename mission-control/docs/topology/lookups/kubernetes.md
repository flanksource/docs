---
title: Kubernetes
---

# <Icon name="k8s" /> Kubernetes

The Kubernetes component lookup fetches kubernetes resources to be used as components.

```yaml title="kube-check.yml"
---
apiVersion: canaries.flanksource.com/v1
kind: Topology
metadata:
  name: kubernetes-configs
spec:
  type: Config
  icon: kubernetes
  schedule: '@every 30s'
  components:
    - name: configs
      icon: server
      type: ConfigMap
      // highlight-start
      lookup:
        kubernetes:
          - kind: ConfigMap
        display:
          expr: |
            dyn(results).map(c, {
              'name': c.name,
              'type': 'ConfigMap',
            }).toJSON()
      // highlight-end
```

| Field     | Description                                                                         | Scheme                                  | Required |
| --------- | ----------------------------------------------------------------------------------- | --------------------------------------- | -------- |
| display   | Template to display query results in text (overrides default bar format for UI)     | [_Template_](../concepts/templating)    |          |
| ignore    | Ignore the specified resources from the fetched resources. Can be a glob pattern.   | _[]string_                              |          |
| **kind**  | Specifies the kind of Kubernetes object for interaction                             | _string_                                | Yes      |
| labels    | Labels for the check                                                                | _string_                                |          |
| namespace | Specifies namespace for Kubernetes object                                           | [_ResourceSelector_](#resourceselector) |          |
| ready     | Boolean value of true or false to query and display resources based on availability | _bool_                                  |          |
| resource  | Queries resources related to specified Kubernetes object                            | [_ResourceSelector_](#resourceselector) |          |
| transform | Template to transform results to                                                    | [_Template_](../concepts/templating)    |          |

## ResourceSelector

| Field         | Description                                                               | Scheme   | Required |
| ------------- | ------------------------------------------------------------------------- | -------- | -------- |
| name          | Name of Kubernetes resource                                               | _string_ |          |
| labelSelector | Select Kubernetes resource based on label. e.g. app, canary.              | _string_ |          |
| fieldSelector | Select Kubernetes resource based on the value of specified resource field | _string_ |          |

## Results

The `results` variable in the template is itself a list of all the kubernetes resources.
