---
title: Kubernetes
---

# <Icon name="k8s"/> Kubernetes

The Kubernetes check performs requests on Kubernetes resources such as Pods to get the desired information.

```yaml
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
        name: k8s-not-ready pods
        ready: false
        resource:
          labelSelector: app=k8s-not-ready
```

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| **`kind`** | Specifies the kind of Kubernetes object for interaction | *string* | Yes |
| `resource` | Queries resources related to specified Kubernetes object | [*ResourceSelector*](#resourceselector) | |
| `namespace` | Specifies namespace for Kubernetes object                    | [*ResourceSelector*](#resourceselector) |          |
| `ignore`    | Ignore the specified resources from the fetched resources. Can be a glob pattern. | *\[\]string*                            |  |
| `ready` | Boolean value of true or false to query and display resources based on availability | *bool* |  |
| `*` | All other common fields | [*Common*](common) |  |

## ResourceSelector

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `name` | Name of Kubernetes resource | *string* |  |
| `labelSelector` | Select Kubernetes resource based on label. e.g. app, canary. | *string* |
| `fieldSelector` | Select Kubernetes resource based on the value of specified resource field | *string* |
