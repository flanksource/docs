# <Icon name="mysql" /> MySQL

This check will try to connect to a specified MySQL database, run a query against it and verify the results.

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: mysql-check
spec:
  interval: 30
  spec:
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
| `description` | Description for the check | string |  |
| `display` | Template to display query results in text (overrides default bar format for UI) | [*Template*](../concepts/templating.md) |  |
| `icon` | Icon for overwriting default icon on the dashboard | *string* |  |
| `name` | Name of the check | *string* |  |
| **`query`** | query that needs to be executed on the server | *string* | Yes |
| **`results`** | Number rows to check for | *int* | Yes |
| `test` | Template to test the result against | [*Template*](../concepts/templating.md) |  |
