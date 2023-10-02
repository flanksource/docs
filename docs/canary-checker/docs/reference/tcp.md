---
title: TCP
---

# <Icon name="network"/> TCP

This checks whether the given address is reachable within the specified timeout period.

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: tcp-check
spec:
  schedule: "*/1 * * * *"
  tcp:
    - name: "flanksource website"
      endpoint: www.flanksource.com:80
      thresholdMillis: 1200
```

| Field             | Description                            | Scheme                | Required |
| ----------------- | -------------------------------------- | --------------------- | -------- |
| **`endpoint`**    | `host:port`  to connect to             | `string`              | Yes      |
| `thresholdMillis` | Expected response time threshold in ms | `int64`               |          |
| **`name`**    | Name of the check, must be unique within the canary         | `string`                                     | Yes      |
| `description` | Description for the check                                   | `string`                                     |          |
| `icon`        | Icon for overwriting default icon on the dashboard          | `string`                                     |          |
| `labels`      | Labels for check                                            | `map[string]string`                          |          |
| `test`        | Evaluate whether a check is healthy                         | [`Expression`](/concepts/health-evaluation)  |          |
| `display`     | Expression to change the formatting of the display          | [`Expression`](/concepts/display-formatting) |          |
| `transform`   | Transform data from a check into multiple individual checks | [`Expression`](/concepts/transforms)          |          |
| `metrics`     | Metrics to export from                                      | [`[]Metrics`](/concepts/metrics-exporter)    |          |
