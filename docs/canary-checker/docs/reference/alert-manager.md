---
title: Alertmanager
---

# <Icon name="prometheus"/> Alertmanager

Checks [Prometheus AlertManager](https://prometheus.io/docs/alerting/latest/alertmanager/) for any firing alerts.

The following example [transforms](../concepts/transforms.md) the list of alerts so that each alert becomes a single check result. Without the transform the health check will fail if any alerts are firing.

```yaml title="alert-manager-check.yaml"
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: alertmanager-check
spec:
  schedule: "*/5 * * * *"
  alertmanager:
    - url: alertmanager.monitoring.svc
      alerts:
        - .*
      ignore:
        - KubeScheduler.*
        - Watchdog
      transform:
        javascript: |
          var out = _.map(results, function(r) {
            return {
              name: r.name,
              labels: r.labels,
              icon: 'alert',
              message: r.message,
              description: r.message,
            }
          })
          JSON.stringify(out);
```

| Field         | Description                                                  | Scheme                                             | Required |
| ------------- | ------------------------------------------------------------ | -------------------------------------------------- | -------- |
| `alerts` | A list of alert prefix names to include | `[]string` |          |
| `ignore` | A list of alert prefix names to exclude | `[]string` | |
| `filters` | A map of label to value prefixes to find alerts on | `map[string]string` | |
| **`name`**    | Name of the check, must be unique within the canary         | `string`                                     | Yes      |
| `description` | Description for the check                                   | `string`                                     |          |
| `icon`        | Icon for overwriting default icon on the dashboard          | `string`                                     |          |
| `labels`      | Labels for check                                            | `map[string]string`                          |          |
| `test`        | Evaluate whether a check is healthy                         | [`Expression`](/concepts/health-evaluation)  |          |
| `display`     | Expression to change the formatting of the display          | [`Expression`](/concepts/display-formatting) |          |
| `transform`   | Transform data from a check into multiple individual checks | [`Expression`](/concepts/transforms)          |          |
| `metrics`     | Metrics to export from                                      | [`[]Metrics`](/concepts/metrics-exporter)    |          |
