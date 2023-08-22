---
title: Metrics
---
# Dashboard

Canary checker comes with a built-in dashboard for displaying canary results, it can be turned off using

```
--set flanksource-ui.enabled=false
```

![](https://github.com/flanksource/docs/blob/85bdd4875d0d3ded16b7aa6c132d423852fcad90/docs/images/dashboard-http-pass-canary.png?raw=true)

### Custom Metrics

Export custom prometheus metrics from your check results

| Field    | Description                                            | Scheme            | Required |
|----------|--------------------------------------------------------|-------------------|----------|
| `name`   | Name of the metric                                     | string            | Yes      |
| `value`  | Templatable float value of the metric                  | string            | Yes      |
| `type`   | Prometheus Metric Type (counter, guage or histogram)   | string            | Yes      |
| `labels` | Labels for prometheus metric (values can be templated) | map[string]string |          |


**Template input fields**:

| Fields              | Description              | Scheme            |
|---------------------|--------------------------|-------------------|
| **`check`**         |                          | string            |
| `check.name`        | Name                     | string            |
| `check.description` | Description              | string            |
| `check.labels`      | Labels                   | map[string]string |
| `check.endpoint`    | Endpoint                 | string            |
| `check.duration`    | Duration in milliseconds | int64             |
| **`result`**        | Check Result             | Object            |

Sample check with metrics:
```yaml
# http.yml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: http
spec:
  interval: 30
  http:
    - name: http-minimal-check
      url: https://httpbin.demo.aws.flanksource.com/status/200
      metrics:
        - name: httpbin_2xx_count
          type: counter
          value: "{{if eq .result.code 200 }}1{{else}}0{{end}}"
          labels:
            name: httpbin_2xx_count
            check_name: "{{ .check.name }}"
            statusClass: "{{ .result.code | conv.ToString | strings.Trunc 1}}xx"

# junit.yml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: junit
spec:
  interval: 120
  junit:
    - testResults: "/tmp/junit-results/"
      name: junit-pass
      display:
        template: |
          ✅ {{.results.passed}} ❌ {{.results.failed}} in 🕑 {{.results.duration}}
      spec:
        containers:
          - name: jes
            image: docker.io/tarun18/junit-test-pass
            command: ["/start.sh"]
      metrics:
        - name: junit_check_pass_count
          type: gauge
          value: "{{.result.results.Passed}}"
          labels:
            name: junit_check_pass_count
            check_name: "{{ .check.name }}"
        - name: junit_check_failed_count
          type: gauge
          value: "{{.result.results.Failed}}"
          labels:
            name: junit_check_fail_count
            check_name: "{{ .check.name }}"
        - name: junit_check_duration_ms
          type: histogram
          value: "{{.check.duration}}"
          labels:
            name: junit_check_duration_ms
            check_name: "{{ .check.name }}"
```


### Grafana

Default grafana dashboards are available, they can be installed with

```
--set grafanaDashboards=true
```

### Prometheus

The helm chart can install a `ServiceMonitor` for the prometheus operator, by enabling the serviceMonitor flag

```
--set serviceMonitor=true
```

Metrics exposed by canary-checker:

| Metric                                         | Type      | Description                                 |
| ---------------------------------------------- | --------- | ------------------------------------------- |
| canary_check                                   | Guage     | Set to 0 when passing and 1 when failing    |
| canary_check_success_count                     | Counter   |                                             |
| canary_check_failed_count                      | Counter   |                                             |
| canary_check_info                              | Info      |                                             |
| canary_check_duration                          | Histogram | Histogram of canary durations               |
| **Pod Check Metrics**                          |           |                                             |
| canary_check_histogram{metric="creation_time"} | Histogram | Time for pod to be `Pending`                |
| canary_check_histogram{metric="delete_time"}   | Histogram | Time to delete pod                          |
| canary_check_histogram{metric="ingress_time"}  | Histogram | Time until ingress is returning requests    |
| canary_check_histogram{metric="request_time"}  | Histogram | Duration of http request once ingress is up |
| canary_check_histogram{metric="schedule_time"} | Histogram | Time for pod to be `Running`                |
| **HTTP Check Metrics**                         |           |                                             |
| canary_check_http_response_status              | Counter   | Response code counter for each endpoint     |
