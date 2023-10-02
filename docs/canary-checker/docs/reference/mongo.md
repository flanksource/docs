---
title: MongoDB
---

# <Icon name="mongo"/> MongoDB

The Mongo check tries to connect to a specified Mongo Database to ensure connectivity.

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: mongo-check
spec:
  interval: 30
  mongodb:
    - name: mongo password
      url: mongodb://$(username):$(password)@mongo.default.svc:27017/?authSource=admin
      username:
        valueFrom:
          secretKeyRef:
            name: mongo-credentials
            key: USERNAME
      password:
        valueFrom:
          secretKeyRef:
            name: mongo-credentials
            key: PASSWORD

```

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `connection` | Path of existing connection e.g. `connection://mongo/instance` or connection url <br/> <Commercial/> | [Connection](../../concepts/connections) | |
| `url` | mongodb://:27017/?authSource=admin, See [connection-string](https://docs.mongodb.com/manual/reference/connection-string/) |  | |
| `username` | Mutually exclusive with `connection` | [*EnvVar*](../../concepts/authentication/#envvar) | |
| `password` | Mutually exclusive with `connection` | [*EnvVar*](../../concepts/authentication/#envvar) | |
| **`name`**    | Name of the check, must be unique within the canary         | `string`                                     | Yes      |
| `description` | Description for the check                                   | `string`                                     |          |
| `icon`        | Icon for overwriting default icon on the dashboard          | `string`                                     |          |
| `labels`      | Labels for check                                            | `map[string]string`                          |          |
| `test`        | Evaluate whether a check is healthy                         | [`Expression`](/concepts/health-evaluation)  |          |
| `display`     | Expression to change the formatting of the display          | [`Expression`](/concepts/display-formatting) |          |
| `transform`   | Transform data from a check into multiple individual checks | [`Expression`](/concepts/transforms)          |          |
| `metrics`     | Metrics to export from                                      | [`[]Metrics`](/concepts/metrics-exporter)    |          |
