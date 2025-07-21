---
slug: /guide/views
title: Views
sidebar_position: 6
sidebar_custom_props:
  icon: view-details
---

Views are a SQL-powered feature that allows you to create custom, dynamic dashboards from your Mission Control data. They collect data from multiple sources into an in-memory SQLite database, enabling you to run any SQL query for filtering, joining, and aggregating your observability data.

<Screenshot img="/img/views.svg" className="h-auto" alt="Views Concept" shadow="false" size="800px"/>

This view creates a dashboard showing Helm releases with their current status, health, and deployment information.

## Overview

Views solve the challenge of creating custom dashboards and reports by providing:

- **Dynamic Data Aggregation**: Combine data from multiple sources using SQL
- **Rich Visualizations**: Display data with gauges, charts, status indicators, and more
- **Structured Schema**: Define column types and constraints for consistent data presentation
- **Cached Results**: Views work like materialized views, caching query results in dedicated database tables for fast retrieval

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
- Table schema is dynamically generated from the query results
- Example: queries named `deployments`, `pipelines`, `metrics` create 3 SQL tables

### 3. SQL-Powered Data Processing

Once data is loaded, you can run **any SQL query** against it to combine data from multiple sources:

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
