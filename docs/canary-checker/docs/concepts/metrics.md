---
title: Metrics
---
# Dashboard

Canary checker comes with a built-in dashboard for displaying canary results, it can be turned off using

```
--set flanksource-ui.enabled=false
```

![](https://github.com/flanksource/docs/blob/85bdd4875d0d3ded16b7aa6c132d423852fcad90/docs/images/dashboard-http-pass-canary.png?raw=true)

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
