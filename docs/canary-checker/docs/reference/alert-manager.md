---
title: Alertmanager
---

# <img src='<https://raw.githubusercontent.com/flanksource/flanksource-ui/main/src/icons/prometheus.svg>' style={{height: '32px'}}/> Alertmanager

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
| `*` | All other commons field | [*Common*](common) | |

<Connection example="alertmanager"/>
