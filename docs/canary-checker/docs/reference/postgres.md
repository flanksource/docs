---
title: Postgres
---

# <Icon name="postgres"/> Postgres

This check will try to connect to a specified Postgres database, run a query against it and verify the results.

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: postgres-check
spec:
  interval: 30
  postgres:
    - name: postgres schemas check
      url: "postgres://$(username):$(password)@postgres.default.svc:5432/postgres?sslmode=disable"
      username:
        valueFrom:
          secretKeyRef:
            name: postgres-credentials
            key: USERNAME
      password:
        valueFrom:
          secretKeyRef:
            name: postgres-credentials
            key: PASSWORD
      query: SELECT current_schemas(true)
      display:
        template: |
          {{- range $r := .results.rows }}
          {{- $r.current_schemas}}
          {{- end}}
      results: 1
```

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| **`query`** | query that needs to be executed on the server | *string* | Yes |
| **`results`** | Number rows to check for | *int* | Yes |
| **`name`**    | Name of the check, must be unique within the canary         | `string`                                     | Yes      |
| `description` | Description for the check                                   | `string`                                     |          |
| `icon`        | Icon for overwriting default icon on the dashboard          | `string`                                     |          |
| `labels`      | Labels for check                                            | `map[string]string`                          |          |
| `test`        | Evaluate whether a check is healthy                         | [`Expression`](/concepts/health-evaluation)  |          |
| `display`     | Expression to change the formatting of the display          | [`Expression`](/concepts/display-formatting) |          |
| `transform`   | Transform data from a check into multiple individual checks | [`Expression`](/concepts/transforms)          |          |
| `metrics`     | Metrics to export from                                      | [`[]Metrics`](/concepts/metrics-exporter)    |          |
| **Connection** |  |  | |
| `connection` | Path of existing connection e.g. `connection://postgres/instance` Mutually exclusive with `username`, `password` <br/> <Commercial/> | [Connection](../../concepts/connections) | |
| `url` | If the url is specifed in both the `connection` and in the `url` field, the `url` field takes precedence |  | |
| `username` | Mutually exclusive with `connection` | [*EnvVar*](../../concepts/authentication/#envvar) | |
| `password` | Mutually exclusive with `connection` | [*EnvVar*](../../concepts/authentication/#envvar) | |

## Result Variables

| Name    | Description             | Scheme                     |
| ------- | ----------------------- | -------------------------- |
| `rows`  |                         | *[]map[string]interface{}* |
| `count` | Number of rows returned | *int*                      |
