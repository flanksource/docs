---
title: Pod
---

# <Icon name="k8s-pod"/> Pod

<Enterprise/>

The Pod check creates a new pod and verifies its reachability.

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: pod-check
spec:
  interval: 30
  pod:
    - name: golang
      spec: |
        apiVersion: v1
        kind: Pod
        metadata:
          name: hello-world-golang
          namespace: default
          labels:
            app: hello-world-golang
        spec:
          containers:
            - name: hello
              image: quay.io/toni0/hello-webserver-golang:latest
      port: 8080
      path: /foo/bar
      scheduleTimeout: 20000
      readyTimeout: 10000
      httpTimeout: 7000
      deleteTimeout: 12000
      ingressTimeout: 10000
      deadline: 60000
      httpRetryInterval: 200
      expectedContent: bar
      expectedHttpStatuses: [200, 201, 202]
      priorityClass: canary-checker-priority

```

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| **`namespace`** | Namespace to create the pod in | *string* | Yes |
| **`spec`** | [*Spec*](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.20/#podspec-v1-core) of pod to be created | string | Yes |
| `scheduleTimeout` | Maximum time between pod created and pod running | *int64* |  |
| `readyTimeout` |  | *int64* |  |
| `httpTimeout` | Maximum time to wait for an HTTP connection to the created pod | *int64* |  |
| `deleteTimeout` | Specify timeout for pod deletion | *int64* |  |
| `ingressTimeout` | Maximum time to create an ingress connected to the pod | *int64* |  |
| `httpRetryInterval` | Interval in ms to retry HTTP connections to the created pod | *int64* |  |
| `deadline` | Overall time before which an HTTP connection to the pod must be established | *int64* |  |
| `port` | Port on which the created pod will serve traffic | *int64* |  |
| `path` | Path on which the created pod will respond to requests | *string* |  |
| **`ingressName`** | Name to use for the ingress object that will expose the created pod | *string* | Yes |
| **`ingressHost`** | URL to be used by the ingress to expose the created pod | *string* |  |
| `expectedContent` | Expected content of an HTTP response from the created pod | *string* |  |
| `expectedHttpStatuses` | Expected HTTP status code of the response from the created pod  | *\[\]int64* |  |
| `priorityClass` | Pod priority class | *string* |  |
| **`name`**    | Name of the check, must be unique within the canary         | `string`                                     | Yes      |
| `description` | Description for the check                                   | `string`                                     |          |
| `icon`        | Icon for overwriting default icon on the dashboard          | `string`                                     |          |
| `labels`      | Labels for check                                            | `map[string]string`                          |          |
| `test`        | Evaluate whether a check is healthy                         | [`Expression`](/concepts/health-evaluation)  |          |
| `display`     | Expression to change the formatting of the display          | [`Expression`](/concepts/display-formatting) |          |
| `transform`   | Transform data from a check into multiple individual checks | [`Expression`](/concepts/transforms)          |          |
| `metrics`     | Metrics to export from                                      | [`[]Metrics`](/concepts/metrics-exporter)    |          |

## Metrics

| **Metric**                                     |           |                                             |
| ---------------------------------------------- | --------- | ------------------------------------------- |
| canary_check_histogram{metric="creation_time"} | Histogram | Time for pod to be `Pending`                |
| canary_check_histogram{metric="delete_time"}   | Histogram | Time to delete pod                          |
| canary_check_histogram{metric="ingress_time"}  | Histogram | Time until ingress is returning requests    |
| canary_check_histogram{metric="request_time"}  | Histogram | Duration of http request once ingress is up |
| canary_check_histogram{metric="schedule_time"} | Histogram | Time for pod to be `Running`                |
