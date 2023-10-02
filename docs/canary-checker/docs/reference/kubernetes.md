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
| **`name`**    | Name of the check, must be unique within the canary         | `string`                                     | Yes      |
| `description` | Description for the check                                   | `string`                                     |          |
| `icon`        | Icon for overwriting default icon on the dashboard          | `string`                                     |          |
| `labels`      | Labels for check                                            | `map[string]string`                          |          |
| `test`        | Evaluate whether a check is healthy                         | [`Expression`](/concepts/health-evaluation)  |          |
| `display`     | Expression to change the formatting of the display          | [`Expression`](/concepts/display-formatting) |          |
| `transform`   | Transform data from a check into multiple individual checks | [`Expression`](/concepts/transforms)          |          |
| `metrics`     | Metrics to export from                                      | [`[]Metrics`](/concepts/metrics-exporter)    |          |

## ResourceSelector

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `name` | Name of Kubernetes resource | *string* |  |
| `labelSelector` | Select Kubernetes resource based on label. e.g. app, canary. | *string* |
| `fieldSelector` | Select Kubernetes resource based on the value of specified resource field | *string* |
