---
title: MySQL
---

# <Icon name="mysql" /> MySQL

The mysql component lookup allows you to form components from the records in a Postgres database.

In this example below, we form components from all the tables in the `incident_commander` database.

```yaml title="mysql-check.yml"
apiVersion: canaries.flanksource.com/v1
kind: Topology
metadata:
  name: mysql-tables
  namespace: default
spec:
  schedule: '@every 30s'
  components:
    - name: MySQL
      type: Table
      icon: mysql
      lookup:
        mysql:
          - connection: mysql://root:password@localhost:3306/incident_commander
            query: |
              SELECT 
                TABLE_SCHEMA AS database_name,
                TABLE_NAME AS table_name,
                TABLE_ROWS AS num_rows
              FROM 
                information_schema.TABLES
              WHERE
                TABLE_TYPE = 'BASE TABLE'
              ORDER BY
                TABLE_ROWS DESC;
            display:
              expr: |
                results.rows.map(row, {
                  'name': row.database_name + '.' + row.table_name,
                  'type': "Table",
                  'properties': [{
                    "name": "Records",
                    "headline": true,
                    "value": double(row.num_rows),
                  }]
                }).toJSON()
```

| Field            | Description                                                                      | Scheme                                            | Required |
| ---------------- | -------------------------------------------------------------------------------- | ------------------------------------------------- | -------- |
| `auth`           | Username and password value, configMapKeyRef or SecretKeyRef for Postgres server | [_Authentication_](../concepts/authentication.md) |          |
| **`connection`** | Connection string to connect to the MySQL server                                 | _string_                                          | Yes      |
| `display`        | Template to display query results in text (overrides default bar format for UI)  | [_Template_](../concepts/templating.md)           |          |
| **`query`**      | query that needs to be executed on the server                                    | _string_                                          | Yes      |
| **`results`**    | Number rows to check for                                                         | _int_                                             | Yes      |
