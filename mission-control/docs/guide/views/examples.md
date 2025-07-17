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

- **Health Status Visualization**: Pie chart showing deployment health distribution
- **Status Tracking**: Monitoring deployment status (InstallSucceeded, UpgradeFailed, etc.)
- **Namespace Grouping**: Organizing deployments by namespace
- **Gauge Metrics**: Using gauges for threshold-based monitoring
- **Column Types**: String, status, health, and datetime columns
- **Data Mapping**: Transforming Helm release data into view columns

## Pipeline Monitoring

Monitor CI/CD pipeline performance and status:

```yaml title="pipelines.yaml" file=<rootDir>/modules/mission-control/fixtures/views/pipelines.yaml

```

This example shows:

- **Change-Based Queries**: Querying GitHub Actions workflow runs
- **Duration Metrics**: Tracking pipeline execution times
- **Repository Grouping**: Organizing pipelines by repository
- **Status Tracking**: Monitoring pipeline success/failure rates
- **Table Panels**: Creating summary tables from aggregated data
- **Number Panels**: Displaying average metrics with units

## Database Operations

Track database backup operations and status:

```yaml title="database.yaml" file=<rootDir>/modules/mission-control/fixtures/views/database.yaml

```

This example demonstrates:

- **Change Events**: Monitoring database backup events
- **Simple Queries**: Using change-based queries for operational data
- **Status Monitoring**: Tracking backup success/failure
- **Datetime Handling**: Displaying backup timestamps
- **Minimal Configuration**: Basic view setup for operational monitoring
