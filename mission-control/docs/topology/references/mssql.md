---
title: MSSQL
---

# <Icon name="mssql" /> MSSQL

The MSSQL component lookup allows you to form components from the records in a Postgres database.

In this example below, we form components from all the tables in the `incident_commander` database.

```yaml title="mssql-check.yml"
apiVersion: canaries.flanksource.com/v1
kind: Topology
metadata:
  name: mssql-tables
  namespace: default
spec:
  schedule: '@every 30s'
  components:
    - name: MSSQL
      type: Table
      icon: mssql
      // highlight-start
      lookup:
        mssql:
          - connection: mssql://sa:yourStrong(!)Password@localhost:1433/incident_commander
            query: |
              SELECT 
                s.name AS schema_name,
                t.name AS table_name,
                p.rows AS num_rows
              FROM 
                sys.tables t
                INNER JOIN sys.schemas s ON t.schema_id = s.schema_id
                INNER JOIN sys.partitions p ON p.object_id = t.object_id
                INNER JOIN sys.allocation_units a ON p.partition_id = a.container_id
              WHERE
                t.is_ms_shipped = 0
              ORDER BY
                p.rows DESC;
            display:
              expr: |
                results.rows.map(row, {
                  'name': row.schema_name + '.' + row.table_name,
                  'type': "Table",
                  'properties': [{
                    "name": "Records",
                    "headline": true,
                    "value": double(row.num_rows),
                  }]
                }).toJSON()
      // highlight-end
```

| Field            | Description                                                                      | Scheme                                            | Required |
| ---------------- | -------------------------------------------------------------------------------- | ------------------------------------------------- | -------- |
| `auth`           | Username and password value, configMapKeyRef or SecretKeyRef for Postgres server | [_Authentication_](../concepts/authentication.md) |          |
| **`connection`** | Connection string to connect to the SQL Server server                            | _string_                                          | Yes      |
| `display`        | Template to display query results in text (overrides default bar format for UI)  | [_Template_](../concepts/templating.md)           |          |
| **`query`**      | query that needs to be executed on the server                                    | _string_                                          | Yes      |
| **`results`**    | Number rows to check for                                                         | _int_                                             | Yes      |
