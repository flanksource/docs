# <img src='https://raw.githubusercontent.com/flanksource/flanksource-ui/main/src/icons/mysql.svg' style='height: 32px'/> MySQL

This check will try to connect to a specified MySQL database, run a query against it and verify the results.

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: mysql-check
spec:
  interval: 30
  mysql:
    - connection: "$(username):$(password)@tcp(mysql.default.svc:3306)/mysqldb"
      name: mysql ping check
      auth:
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
| `auth` | Username and password value, configMapKeyRef or SecretKeyRef for Postgres server | [*Authentication*](../concepts/authentication.md) |  |
| **`connection`** | Connection string to connect to the MySQL server | *string* | Yes |
| **`query`** | query that needs to be executed on the server | *string* | Yes |
| **`results`** | Number rows to check for | *int* | Yes |
| `*` | All other common fields | [*Common*](../common) |  |
