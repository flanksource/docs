---
title: Redis
---

# <Icon name="redis"/> Redis

The Redis check connects to a specified Redis database instance to check its availability.

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: redis-check
spec:
  interval: 30
  redis:
    - name: redis-check
      addr: "redis.default.svc:6379"
      db: 0
      username:
        valueFrom:
          secretKeyRef:
            name: redis-credentials
            key: USERNAME
      password:
        valueFrom:
          secretKeyRef:
            name: redis-credentials
            key: PASSWORD
```

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| **`addr`** | Deprecated, use `url` | string | Yes |
| **`db`** | Database to be selected after connecting to the server | *int* | Yes |
| **`name`**    | Name of the check, must be unique within the canary         | `string`                                     | Yes      |
| `description` | Description for the check                                   | `string`                                     |          |
| `icon`        | Icon for overwriting default icon on the dashboard          | `string`                                     |          |
| `labels`      | Labels for check                                            | `map[string]string`                          |          |
| `test`        | Evaluate whether a check is healthy                         | [`Expression`](/concepts/health-evaluation)  |          |
| `display`     | Expression to change the formatting of the display          | [`Expression`](/concepts/display-formatting) |          |
| `transform`   | Transform data from a check into multiple individual checks | [`Expression`](/concepts/transforms)          |          |
| `metrics`     | Metrics to export from                                      | [`[]Metrics`](/concepts/metrics-exporter)    |          |

## Redis Connection

| Field        | Description                                                  | Scheme                                            |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------- |
| `connection` | Path of existing connection e.g. `connection://redis/instance` <br/>Mutually exclusive with `url` <br/><Commercial/> | [Connection](../../concepts/connections)          |
| `url`        | Redis hostname and port                                      |                                                   |
| `username`   | Mutually exclusive with `connection`                         | [*EnvVar*](../../concepts/authentication/#envvar) |
| `password`   | Mutually exclusive with `connection`                         | [*EnvVar*](../../concepts/authentication/#envvar) |
