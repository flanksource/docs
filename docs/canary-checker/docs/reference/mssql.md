---
title: MSSQL
---

# <Icon name="mssql"/> MSSQL

This check will try to connect to a specified SQL Server database, run a query against it and verify the results.

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: mssql-check
spec:
  interval: 30
  mssql:
    - name: mssql pass
      url: "server=mssql.default.svc;user id=$(username);password=$(password);port=1433;database=master"
      username:
        valueFrom:
          secretKeyRef:
            name: mssql-credentials
            key: USERNAME
      password:
        valueFrom:
          secretKeyRef:
            name: mssql-credentials
            key: PASSWORD
      query: SELECT 1
      results: 1
```

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| **`url`** | Connection string to connect to the SQL Server server | *string* | Yes |
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
| `connection` | Path of existing connection e.g. `connection://mssql/instance`/ Mutually exclusive with `username`, `password` <br/> <Commercial/> | [Connection](../../concepts/connections) | |
| `username` | Mutually exclusive with `connection` | [*EnvVar*](../../concepts/authentication/#envvar) | |
| `password` | Mutually exclusive with `connection` | [*EnvVar*](../../concepts/authentication/#envvar) | |
| `url` | If the url is specifed in both the `connection` and in the `url` field, the `url` field takes precedence |  | |


## Result Variables

| Name    | Description             | Scheme                     |
| ------- | ----------------------- | -------------------------- |
| `rows`  |                         | *[]map[string]interface{}* |
| `count` | Number of rows returned | *int*                      |
