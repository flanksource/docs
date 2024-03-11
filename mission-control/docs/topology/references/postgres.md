---
title: Postgres
---

# <Icon name="postgres" /> Postgres

The postgres component lookup allows you to form components from the records in a Postgres database.

In this example below, we form components from all the tables in the `incident_commander` database.

```yaml title="postgres-tables.yml"
apiVersion: canaries.flanksource.com/v1
kind: Topology
metadata:
  name: postgres-tables
  namespace: default
spec:
  schedule: '@every 30s'
  components:
    - name: Postgres
      type: Table
      icon: postgres
      lookup:
        postgres:
          - connection: postgres://postgres:gunners@localhost:5432/incident_commander?sslmode=disable
            query: |
              SELECT
                schemaname || '.' || relname AS table_name,
                n_live_tup AS num_rows
              FROM
                pg_catalog.pg_stat_user_tables
              ORDER BY
                n_live_tup DESC;
            display:
              expr: |
                results.rows.map(row, {
                  'name': row.table_name,
                  'type': "Table",
                  'properties': [{
                    "name": "Records",
                    "headline": true,
                    "value": double(row.num_rows),
                  }]
                }).toJSON()
```

| Field            | Description                                                                       | Scheme                                            | Required |
| ---------------- | --------------------------------------------------------------------------------- | ------------------------------------------------- | -------- |
| `auth`           | username and password value, configMapKeyRef, or SecretKeyRef for Postgres server | [_Authentication_](../concepts/authentication.md) |          |
| **`connection`** | connection string to connect to the server                                        | _string_                                          | Yes      |
| `display`        | Template to display query results in text (overrides default bar format for UI)   | [_Template_](../concepts/templating.md)           |          |
| **`query`**      | query that needs to be executed on the server                                     | _string_                                          | Yes      |
