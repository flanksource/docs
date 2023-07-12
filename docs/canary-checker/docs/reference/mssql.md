---
title: MSSQL
---

# <img src='https://raw.githubusercontent.com/flanksource/flanksource-ui/main/src/icons/mssql.svg' style={{height: '32px'}}/> MSSQL

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
| `*` | All other common fields | [*Common*](common) |  |
| **Connection** |  |  | |
| `connection` | Path of existing connection e.g. `connection://mssql/instance`/ Mutually exclusive with `username`, `password` | [Connection](../../concepts/connections) | |
| `username` | Mutually exclusive with `connection` | [*EnvVar*](../../concepts/authentication/#envvar) | |
| `password` | Mutually exclusive with `connection` | [*EnvVar*](../../concepts/authentication/#envvar) | |
| `url` | If the url is specifed in both the `connection` and in the `url`  field, the field takes precedence |  | |
