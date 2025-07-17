---
title: Queries
sidebar_position: 2
sidebar_custom_props:
  icon: material-symbols:query-stats
---

Views use a powerful query system to aggregate and transform data from multiple sources. You can query configuration items, changes, and metrics to populate your views.

## Query Types

### Config Queries

Query configuration items from your catalog:

```yaml
queries:
  configs:
    - selector:
        types: ['Kubernetes::Deployment']
        labels:
          environment: production
      mapping:
        app_name: row.name
        namespace: row.namespace
        replicas: row.spec.replicas
```

### Change Queries

Query configuration changes and audit data:

```yaml
queries:
  changes:
    - selector:
        types: ['Kubernetes::Pod']
        since: '24h'
      mapping:
        resource_name: row.config_id
        change_type: row.change_type
        changed_at: row.created_at
```

### Metric Queries

Query time-series data from Prometheus and other sources:

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

Map source data to view columns:

```yaml
mapping:
  pod_name: row.name
  namespace: row.namespace
  ready: row.status.ready
  is_healthy: row.status.phase == "Running"
```

## Multi-Source Queries

### Joining Data

Combine data from multiple sources:

```yaml
queries:
  configs:
    - name: deployments
      selector:
        types: ['Kubernetes::Deployment']
      mapping:
        app_name: row.name
        namespace: row.namespace
        replicas: row.spec.replicas

  changes:
    - name: recent_changes
      selector:
        types: ['Kubernetes::Deployment']
        since: '1h'
      mapping:
        app_name: row.config_id
        last_change: row.created_at
        change_type: row.change_type
```

### Data Merging

Merge results based on common keys:

```yaml
merge:
  - left: deployments
    right: recent_changes
    on:
      - app_name
      - namespace
    type: left # left, right, inner, outer
```
