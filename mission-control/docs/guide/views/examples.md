---
title: Examples
sidebar_custom_props:
  icon: material-symbols:auto-stories
---

This page provides practical examples of Views for common use cases. Each example demonstrates different features and patterns you can apply to your own dashboards.

## Deployment Monitoring

Track Helm releases with health and status indicators:

```yaml title="deployments.yaml" file=<rootDir>/modules/mission-control/fixtures/views/deployments.yaml

```

This example demonstrates:

- **Health Status Visualization**: Pie chart showing deployment health distribution with custom colors
- **Status Tracking**: Monitoring Helm release status (InstallSucceeded, UpgradeFailed, etc.)
- **Multiple Panel Types**: Both health and status pie charts with different color schemes
- **Config Queries**: Querying Kubernetes::HelmRelease components with tag selectors
- **Column Types**: String, status, health, and `datetime` columns with descriptions
- **Data Mapping**: Transforming Helm release data using CEL expressions to access nested config data
- **SQL Panel Queries**: Aggregating data with GROUP BY clauses

## Pipeline Monitoring

Monitor CI/CD pipeline performance and status:

```yaml title="pipelines.yaml" file=<rootDir>/modules/mission-control/fixtures/views/pipelines.yaml

```

This example shows:

- **Change-Based Queries**: Querying GitHubActionRun changes with search filters and ordering
- **JSON Field Access**: Using PostgreSQL JSON operators to extract repository and duration data
- **Duration Calculations**: CEL expressions for timestamp arithmetic
- **Mixed Panel Types**: Table panels for repository counts and number panels for averages
- **Column Mapping**: Complex field mappings from nested JSON structures
- **SQL Aggregations**: COUNT and AVG functions with JSON field extraction

## Database Operations

Track database backup operations and status:

```yaml title="database.yaml" file=<rootDir>/modules/mission-control/fixtures/views/database.yaml

```

This example demonstrates:

- **Change Events**: Querying BackupSuccessful change events with search filters
- **Straightforward Queries**: Direct change-based queries without complex joins
- **Status Monitoring**: Extracting backup status from change details
- **Result Limiting**: Using `max: 10` to limit query results
- **`datetime` Handling**: Direct mapping of created_at timestamps
- **Minimal Configuration**: Basic view setup for operational monitoring without panels
