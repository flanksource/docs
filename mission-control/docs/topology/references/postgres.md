---
title: Postgres
---

# <Icon name="postgres" /> Postgres

This check will try to connect to a specified Postgres database, run a query against it, and verify the results.

```yaml title="postgres-check.yml"
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: postgres-check
spec:
  interval: 30
  spec:
    postgres:
      - connection: 'postgres://$(username):$(password)@postgres.default.svc:5432/postgres?sslmode=disable'
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

| Field            | Description                                                                       | Scheme                                            | Required |
| ---------------- | --------------------------------------------------------------------------------- | ------------------------------------------------- | -------- |
| `auth`           | username and password value, configMapKeyRef, or SecretKeyRef for Postgres server | [_Authentication_](../concepts/authentication.md) |          |
| **`connection`** | connection string to connect to the server                                        | _string_                                          | Yes      |
| `display`        | Template to display query results in text (overrides default bar format for UI)   | [_Template_](../concepts/templating.md)           |          |
| **`query`**      | query that needs to be executed on the server                                     | _string_                                          | Yes      |
