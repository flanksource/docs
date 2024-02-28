# <Icon name="mssql" /> MSSQL

This check will try to connect to a specified SQL Server database, run a query against it and verify the results.

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: mssql-check
spec:
  interval: 30
  spec:
    mssql:
      - connection: "server=mssql.default.svc;user id=$(username);password=$(password);port=1433;database=master"
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

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `auth` | Username and password value, configMapKeyRef or SecretKeyRef for Postgres server | [*Authentication*](../reference/authentication) |  |
| **`connection`** | Connection string to connect to the SQL Server server | *string* | Yes |
| `description` | Description for the check | string |  |
| `display` | Template to display query results in text (overrides default bar format for UI) | [*Template*](../concepts/templating.md) |  |
| `icon` | Icon for overwriting default icon on the dashboard | *string* |  |
| `name` | Name of the check | string |  |
| **`query`** | query that needs to be executed on the server | *string* | Yes |
| **`results`** | Number rows to check for | *int* | Yes |
| `test` | Template to test the result against | [*Template*](../concepts/templating.md) |  |
