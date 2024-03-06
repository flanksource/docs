---
title: Kubernetes
---

# <Icon name="k8s" /> Kubernetes

The Kubernetes check performs requests on Kubernetes resources such as Pods to get the desired information.

```yaml title="kube-check.yml"
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: kube-check
spec:
  interval: 30
  spec:
    kubernetes:
      - namespace:
          name: default
        name: k8s-ready pods
        kind: Pod
        resource:
          labelSelector: app=k8s-ready
      - namespace:
          name: default
        kind: Pod
        name: k8s-ready pods
        ready: false
        resource:
          labelSelector: app=k8s-not-ready
```

| Field       | Description                                                                         | Scheme                                  | Required |
| ----------- | ----------------------------------------------------------------------------------- | --------------------------------------- | -------- |
| `display`   | Template to display query results in text (overrides default bar format for UI)     | [_Template_](../concepts/templating.md) |          |
| `ignore`    | Ignore the specified resources from the fetched resources. Can be a glob pattern.   | _[]string_                              |          |
| **`kind`**  | Specifies the kind of Kubernetes object for interaction                             | _string_                                | Yes      |
| `labels`    | Labels for the check                                                                | _string_                                |          |
| `namespace` | Specifies namespace for Kubernetes object                                           | [_ResourceSelector_](#resourceselector) |          |
| `ready`     | Boolean value of true or false to query and display resources based on availability | _bool_                                  |          |
| `resource`  | Queries resources related to specified Kubernetes object                            | [_ResourceSelector_](#resourceselector) |          |
| `transform` | Template to transform results to                                                    | [_Template_](../concepts/templating.md) |          |

## ResourceSelector

| Field           | Description                                                               | Scheme   | Required |
| --------------- | ------------------------------------------------------------------------- | -------- | -------- |
| `name`          | Name of Kubernetes resource                                               | _string_ |          |
| `labelSelector` | Select Kubernetes resource based on label. e.g. app, canary.              | _string_ |
| `fieldSelector` | Select Kubernetes resource based on the value of specified resource field | _string_ |
