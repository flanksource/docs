---
title: SQL Action
---

# <Icon name="sql"/> SQL Action

SQL action makes a SQL query on the provided database.

```yaml title="delete-check-statuses.yaml"
apiVersion: mission-control.flanksource.com/v1
kind: Playbook
metadata:
  name: delete-check-statuses
spec:
  description: Deletes all the check statuses of a given check
  checks:
    - type: http
  actions:
    - name: Delete check statuses
      sql:
        connection: connection://Postgres/incident-commander
        database: incident_commander
        driver: postgres
        query: DELETE FROM check_statuses WHERE check_id = {{.check.id}}
```

| Field        | Description                                                                                         | Scheme   | Required |
| ------------ | --------------------------------------------------------------------------------------------------- | -------- | -------- |
| `connection` | Connection identifier e.g. `connection://postgres/flanksource`.                                     | _string_ |          |
| `url`        | URL is the database connection url.                                                                 | _string_ |          |
| `query`      | Query is the sql query to run. It can also be templated. [Read more ...](../concepts/templating.md) | _string_ | `true`   |
| `driver`     | Driver is the name of the underlying database to connect to. Example: postgres, mysql, ...          | _string_ | `true`   |

:::note
Either the `connection` or the `url` is required.
:::

## Templating

The SQL query is templatable. The script template receives a environment variable that contain details about the corresponding config, check or component and the parameter(if applicable).

| Field       | Description                              | Schema                                                                                           |
| ----------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `config`    | Config passed to the playbook            | [`ConfigItem`](../references/config_item.md)    |
| `component` | Component passed to the playbook         | [`Component`](../references/component.md) |
| `check`     | Canary Check passed to the playbook      | [`Check`](../references/check.md)         |
| `params`    | User provided parameters to the playbook | `map[string]string`                                                                              |
