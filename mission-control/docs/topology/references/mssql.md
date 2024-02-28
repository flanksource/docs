# <Icon name="mssql" /> MSSQL

This check will try to connect to a specified SQL Server database, run a query against it and verify the results.

```yaml title="mssql-check.yml"
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: mssql-check
spec:
  interval: 30
  spec:
    mssql:
      - connection: 'server=mssql.default.svc;user id=$(username);password=$(password);port=1433;database=master'
        auth:
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
        query: <insert-query>
        results: 1
```

| Field            | Description                                                                      | Scheme                                            | Required |
| ---------------- | -------------------------------------------------------------------------------- | ------------------------------------------------- | -------- |
| `auth`           | Username and password value, configMapKeyRef or SecretKeyRef for Postgres server | [_Authentication_](../concepts/authentication.md) |          |
| **`connection`** | Connection string to connect to the SQL Server server                            | _string_                                          | Yes      |
| `display`        | Template to display query results in text (overrides default bar format for UI)  | [_Template_](../concepts/templating.md)           |          |
| **`query`**      | query that needs to be executed on the server                                    | _string_                                          | Yes      |
| **`results`**    | Number rows to check for                                                         | _int_                                             | Yes      |
