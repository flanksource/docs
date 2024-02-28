# <Icon name="mysql" /> MySQL

This check will try to connect to a specified MySQL database, run a query against it and verify the results.

```yaml title="mysql-check.yml"
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: mysql-check
spec:
  interval: 30
  spec:
    mysql:
      - connection: '$(username):$(password)@tcp(mysql.default.svc:3306)/mysqldb'
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

| Field            | Description                                                                      | Scheme                                            | Required |
| ---------------- | -------------------------------------------------------------------------------- | ------------------------------------------------- | -------- |
| `auth`           | Username and password value, configMapKeyRef or SecretKeyRef for Postgres server | [_Authentication_](../concepts/authentication.md) |          |
| **`connection`** | Connection string to connect to the MySQL server                                 | _string_                                          | Yes      |
| `display`        | Template to display query results in text (overrides default bar format for UI)  | [_Template_](../concepts/templating.md)           |          |
| **`query`**      | query that needs to be executed on the server                                    | _string_                                          | Yes      |
| **`results`**    | Number rows to check for                                                         | _int_                                             | Yes      |
