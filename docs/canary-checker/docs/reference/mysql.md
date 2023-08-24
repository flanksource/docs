---
title: MySQL
---

# <img src='https://raw.githubusercontent.com/flanksource/flanksource-ui/main/src/icons/mysql.svg' style={{height: '32px'}}/> MySQL

This check will try to connect to a specified MySQL database, run a query against it and verify the results.

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: mysql-check
spec:
  interval: 30
  mysql:
    - url: "$(username):$(password)@tcp(mysql.default.svc:3306)/mysqldb"
      name: mysql ping check
      username:
        valueFrom:
          secretKeyRef:
            name: mysql-credentials
            key: USERNAME
      password:
        valueFrom:
          secretKeyRef:
            name: mysql-credentials
            key: PASSWORD
      query: <insert-query>
      results: 1
```

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| **`query`** | query that needs to be executed on the server | *string* | Yes |
| **`results`** | Number rows to check for | *int* | Yes |
| `*` | All other common fields | [*Common*](common) |  |
| **Connection** |  |  | |
| `connection` | Path of existing connection e.g. `connection://mysql/instance` Mutually exclusive with `username`, `password` <br/> <Commercial/> | [Connection](../../concepts/connections) | |
| `username` | Mutually exclusive with `connection` | [*EnvVar*](../../concepts/authentication/#envvar) | |
| `password` | Mutually exclusive with `connection` | [*EnvVar*](../../concepts/authentication/#envvar) | |
| `url` | If the url is specifed in both the `connection` and in the `url` field, the `url` field takes precedence |  | |
