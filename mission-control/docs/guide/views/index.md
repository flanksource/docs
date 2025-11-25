---
slug: /guide/views
title: Views
sidebar_position: 6
sidebar_custom_props:
  icon: view-details
---

import View from "@site/docs/reference/views/\_view.mdx"

Views are dynamic, data-driven dashboards in Mission Control that aggregate and visualize data from multiple sources.
They collect data from multiple sources into an in-memory SQLite database, enabling you to run any SQL query for filtering, joining, and aggregating your observability data.

<Screenshot img="/img/views.svg" className="h-auto" alt="Views Concept" shadow="false" size="800px"/>

Views serve as a powerful data aggregation and visualization layer in Mission Control. They:

- **Aggregate data** from multiple sources including configuration items, changes, and Prometheus metrics
- **Display data** as interactive tables and visualization panels (gauges, pie charts, ...)
- **Support templating** with variables that users can adjust to dynamically filter and update the view
- **Cache results** intelligently to balance data freshness with performance
- **Transform data** using expressions to map raw query results to meaningful display columns

## Key Features

### Data Sources

Views can query data from multiple sources:

- **Config Items**: Infrastructure components and configurations via the `configs` selector
- **Changes**: Configuration change tracking and audit data via the `changes` selector
- **Metrics**: Time-series data from Prometheus using PromQL queries

### Output Types

Views can generate:

- **One Table**: Structured data with typed columns for detailed data presentation
- **Multiple Panels**: Interactive visualizations including pie charts, gauges, numbers, and summary tables

## How Views Work

Views transform your data into an in-memory SQL database, giving you the full power of SQL to slice, dice, and analyze your infrastructure:

### 1. Named Queries (Required)

Every view **must** define queries with unique names:

```yaml
queries:
  deployments: # Table name in SQL
    configs:
      types: ['Kubernetes::Deployment']
  pipelines: # Another table name
    changes:
      search: change_type=GitHubActionRun
```

### 2. In-Memory SQL Database

Views execute your named queries and create an **SQLite database in memory**:

- Each query becomes a **table** with the query's name
- Table schema gets generated dynamically from the query results
- Example: queries named `deployments`, `pipelines`, `metrics` create 3 SQL tables

### 3. SQL-Powered Data Processing

Once you load data, you can run **any SQL query** against it to combine data from multiple sources:

```yaml
# View table data (optional)
merge: |
  SELECT d.name, d.status, p.duration
  FROM deployments d
  LEFT JOIN pipelines p ON d.name = p.app

# Panel queries (required for panels)
panels:
  - name: 'Status Distribution'
    type: piechart
    query: 'SELECT COUNT(*) AS count, status FROM deployments GROUP BY status'
```

This SQL-first approach gives you unlimited flexibility to slice, filter, and aggregate your data.

## API Reference

<View/>
