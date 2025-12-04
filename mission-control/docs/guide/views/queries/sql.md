---
title: SQL Queries
sidebar_custom_props:
  icon: mdi:database
---

Use `sql` to run queries against external databases (PostgreSQL, MySQL, or SQL Server) and feed the results into a view. SQL queries share the same templating and mapping capabilities as other data sources.

## Configuration

| Field         | Description                                                   |
| ------------- | ------------------------------------------------------------- |
| `connection`  | Name or URL of a stored SQL connection (recommended)          |
| `type`        | Connection type when not using `connection` (`postgres`, `mysql`, `sqlserver`) |
| `url`         | Database DSN/URL (supports env var references)                |
| `username`    | Database username (supports env var references)               |
| `password`    | Database password (supports env var references)               |
| `query`       | SQL statement to execute                                      |

Mission Control hydrates the connection details before executing the query, so secrets can stay in stored connections or environment variables.

## Example

```yaml title="sql-incidents.yaml" file=<rootDir>/modules/mission-control/fixtures/views/sql-incidents.yaml {7-28}

```

## Tips

- Prefer `connection` to reuse managed credentials instead of embedding URLs and passwords.
- Declare query `columns` and `mapping` to control types when the upstream query could return empty results.
- Use templating to parameterize queries (`$(var.cluster)`) just like other view data sources.
- Keep SQL focused on selection/aggregation; use `merge` to combine SQL results with other data sources.
