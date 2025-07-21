---
title: Queries
sidebar_position: 1
sidebar_custom_props:
  icon: material-symbols:query-stats
---

Views use a powerful query system to aggregate and transform data from multiple sources. You can query configuration items, changes, and metrics to populate your views.

## Query Types

### Config Queries

Query configuration items from your catalog:

```yaml
queries:
  helm_releases:
    selector:
      search: '@order=name'
      types:
        - Kubernetes::HelmRelease
      tagSelector: namespace in (monitoring,media)
mapping:
  application: row.name
  namespace: row.tags.namespace
  status: row.status
  health: row.health
```

### Change Queries

Query configuration changes and audit data:

```yaml
queries:
  backups:
    changes:
      search: change_type=BackupSuccessful
    max: 10
mapping:
  database: row.name
  date: row.created_at
  status: row.details.status
  source: row.source
```

### Metric Queries

Query time-series data from Prometheus and other sources. Metric queries are not yet implemented in the current version, but the structure would be:

```yaml
queries:
  metrics:
    - name: cpu_usage
      query: |
        avg(rate(container_cpu_usage_seconds_total[5m])) by (pod)
      mapping:
        pod_name: labels.pod
        cpu_usage: value * 100
```

## Data Mapping

Map source data to view columns using CEL expressions:

```yaml
mapping:
  application: row.name
  namespace: row.tags.namespace
  chart: row.config.status.history[0].chartName
  version: row.config.status.history[0].chartVersion
  status: row.status
  health: row.health
  lastUpdated: row.updated_at
```

### Advanced CEL Expressions

You can use complex CEL expressions for data transformation:

```yaml
mapping:
  # Conditional mapping with default values
  cost: "has(row.cost_total_30d) ? row.cost_total_30d : 10"
  # Duration calculations
  duration: "timestamp(row.details.updated_at) - timestamp(row.details.run_started_at)"
  # Nested object access
  repository: "row.details.repository.full_name"
```

## Multi-Source Queries

Views can combine data from different sources and use SQL queries in panels to aggregate and analyze the data:

```yaml title="pipelines.yaml" file=<rootDir>/modules/mission-control/fixtures/views/pipelines.yaml
```

This example shows:
- **Multiple query sources**: Combining workflow runs from changes
- **Panel queries**: Using SQL to aggregate repository data  
- **CEL expressions**: Complex duration calculations in mappings
- **Data aggregation**: COUNT and AVG functions in panel queries
