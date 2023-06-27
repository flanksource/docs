# <img src='https://raw.githubusercontent.com/flanksource/flanksource-ui/main/src/icons/prometheus.svg' style='height: 32px'/> Alertmanager

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
    - host: alertmanager.example.com
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
| **`name`**    | Name of the check                                            | `string`                                           | Yes      |
| `description` | Description for the check                                    | `string`                                           |          |
| `connection`    | The path of a connection e.g. `connection://alertmanager/internal` mutually exclusive with `auth` and `endpoint` |                                                    |        |
| `auth`        | Credentials for AlertManager, mutually exclusive with `connection` | [`Authentication`](#../concepts/authentication.md) |          |
| `host` | Host endpoint mutually exclusive with `connection` | `string` |          |
| `alerts` | A list of alert prefix names to include | `[]string` |          |
| `ignore` | A list of alert prefix names to exclude | `[]string` | |
| `filters` | A map of label to value prefixes to find alerts on | `map[string]string` | |
| `icon`        | Icon for overwriting default icon on the dashboard           | `string`                                           |          |
| `labels`      | Labels for check                                             | `map[string]string`                                |          |
| `test`        | Template to test the result against                          | [`Template`](../concepts/templating.md)            |          |
| `display`     | Template to display the result in                            | [`Template`](../concepts/templating.md)            |          |
| `transform`   | Template for transformation                                  | [`Template`](../concepts/templating.md)            |          |
