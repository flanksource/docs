# <img src='https://raw.githubusercontent.com/flanksource/flanksource-ui/main/src/icons/prometheus.svg' style='height: 32px'/> AlertManager

This checks [Prometheus AlertManager](https://prometheus.io/docs/alerting/latest/alertmanager/) ...

```yaml
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

| Field         | Description                                        | Scheme                              | Required |
| ------------- | -------------------------------------------------- | ----------------------------------- | -------- |
| `name`        | Name of the check                                  | `string`                            |          |
| `description` | Description for the check                          | `string`                            |          |
| `icon`        | Icon for overwriting default icon on the dashboard | `string`                            |          |
| `labels`      | Labels for check                                   | `map[string]string`                 |          |
| `test`        | Template to test the result against                | [`Template`](../concepts/templating.md)             |          |
| `display`     | Template to display the result in                  | [`Template`](../concepts/templating.md)             |          |
| `transform`   | Template for transformation                        | [`Template`](../concepts/templating.md)             |          |
| `host`        | Host endpoint                                      | `string`                            |          |
| `auth`        | Credentials for AlertManager                       | [`Authentication`](#../concepts/authentication.md) |          |
| `alerts`      | Cloudwatch HTTP Endpoint to establish connection   | `[]string`                          |          |
| `filters`     | Used to filter the objects                         | `map[string]string`                 |          |
| `ignore`      | Region for cloudwatch                              | `[]string`                          |          |
