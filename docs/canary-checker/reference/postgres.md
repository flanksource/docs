# <img src='https://raw.githubusercontent.com/flanksource/flanksource-ui/main/src/icons/postgres.svg' style='height: 32px'/> Postgres

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
      connection: "postgres://$(username):$(password)@postgres.default.svc:5432/postgres?sslmode=disable"
      auth:
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
| `auth` | username and password value, configMapKeyRef or SecretKeyRef for Postgres server | [*Authentication*](../concepts/authentication.md) |  |
| **`connection`** | connection string to connect to the server | *string* | Yes |
| **`query`** | query that needs to be executed on the server | *string* | Yes |
| **`results`** | Number rows to check for | *int* | Yes |
| `*` | All other common fields | [*Common*](../common) |  |
