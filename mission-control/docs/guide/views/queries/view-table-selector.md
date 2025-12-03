---
title: View Table Selector Queries
sidebar_custom_props:
  icon: view-details
---

View table selector queries fetch data from other views that have already been cached. This allows you to reuse view data and build composite views without re-querying underlying data sources.

## Overview

Instead of fetching data directly from configs, metrics, or changes, view table selectors query previously cached view results. This is useful for:

- Building views on top of other views (composition)
- Reusing expensive query results
- Creating drill-down dashboards
- Reducing database load

**Example**:

```yaml
queries:
  pod_data:
    viewTableSelector:
      name: pod-inventory
      namespace: default
```

## Query Properties

| Property    | Type    | Description                                |
| ----------- | ------- | ------------------------------------------ |
| `name`      | string  | Name of the view to query                  |
| `namespace` | string  | Namespace of the view (default: `default`) |
| `filter`    | object  | Optional: filter rows by column values     |
| `limit`     | integer | Maximum rows to return                     |

## Query Examples

### Query Another View

```yaml
queries:
  pods:
    viewTableSelector:
      name: pod-inventory
      namespace: default
```

Returns all rows from the cached `pod-inventory` view.

### Filter Results

```yaml
queries:
  prod_pods:
    viewTableSelector:
      name: pod-inventory
      namespace: default
      filter:
        environment: 'production'
        health: 'critical'
```

Return rows where environment=production AND health=critical.

### Limit Results

```yaml
queries:
  top_pods:
    viewTableSelector:
      name: pod-inventory
      namespace: default
      limit: 50
```

Return the first 50 rows from the view.

### Combine Filters and Limits

```yaml
queries:
  recent_changes:
    viewTableSelector:
      name: change-summary
      namespace: monitoring
      filter:
        severity: 'warning'
        resource_type: 'Kubernetes::Deployment'
      limit: 100
```

## Using Variables with View Table Selectors

Make view queries dynamic with templating variables:

```yaml
templating:
  - key: environment
    label: 'Environment'
    values: ['dev', 'staging', 'prod']
    default: 'prod'

queries:
  data:
    viewTableSelector:
      name: resource-inventory
      filter:
        environment: '$(var.environment)'
```

## Performance Benefits

View table selectors are more efficient than re-querying sources:

| Operation               | Time        | Data Transfer      |
| ----------------------- | ----------- | ------------------ |
| Config query (uncached) | 1-5 seconds | Large              |
| Config query (cached)   | "< 100ms"    | Large              |
| View table selector     | "< 100ms"    | Only filtered rows |

## Use Cases

### Drill-Down Dashboards

Create a hierarchy of views where higher-level views query lower-level views:

```yaml
# Level 1: Simple pod inventory (queries configs)
kind: View
metadata:
  name: pod-inventory
# queries configs directly

---
# Level 2: Pod metrics (queries pod-inventory + prometheus)
kind: View
metadata:
  name: pod-metrics
queries:
  pods:
    viewTableSelector:
      name: pod-inventory # Query cached pods

  metrics:
    prometheus:
      query: 'container_memory_usage_bytes'

---
# Level 3: Pod troubleshooting (queries pod-metrics)
kind: View
metadata:
  name: pod-troubleshoot
queries:
  data:
    viewTableSelector:
      name: pod-metrics # Query cached metrics
```

### Filter by Context Variables

```yaml
# Resource inventory view with namespace filter
apiVersion: mission-control.flanksource.com/v1
kind: View
metadata:
  name: namespace-resources
spec:
  templating:
    - key: namespace
      label: 'Namespace'
      values: ['default', 'kube-system']

  queries:
    data:
      viewTableSelector:
        name: all-resources
        filter:
          namespace: '$(var.namespace)'
```

### Combine Multiple Views

When building a view that needs data from multiple other views, use both viewTableSelector queries and merge:

```yaml
queries:
  configs:
    viewTableSelector:
      name: config-summary
      filter:
        status: 'critical'

  changes:
    viewTableSelector:
      name: recent-changes
      filter:
        severity: 'warning'

merge: |
  SELECT
    c.id,
    c.name,
    c.status,
    COUNT(ch.id) as change_count
  FROM configs c
  LEFT JOIN changes ch ON c.id = ch.config_id
  GROUP BY c.id, c.name, c.status
```

## Column Mapping

Columns from view table selectors work like any other query:

```yaml
columns:
  - name: name
    type: string
    primaryKey: true
  - name: status
    type: status

queries:
  data:
    viewTableSelector:
      name: resource-inventory

mapping:
  name: 'row.name'
  status: 'row.status'
```

## Real-World Examples

### High-Level Resource Status Dashboard

First, create the base view that queries configs:

```yaml
apiVersion: mission-control.flanksource.com/v1
kind: View
metadata:
  name: resource-inventory
spec:
  columns:
    - name: id
      type: string
      primaryKey: true
      hidden: true
    - name: name
      type: string
    - name: type
      type: string
    - name: status
      type: status
    - name: health
      type: health

  queries:
    resources:
      configs:
        types: ['Kubernetes::Pod', 'Kubernetes::Node']

  mapping:
    id: 'row.id'
    name: 'row.name'
    type: 'row.type'
    status: 'row.status'
    health: 'row.health'
```

Then create a summary view using viewTableSelector:

```yaml
apiVersion: mission-control.flanksource.com/v1
kind: View
metadata:
  name: resource-summary
spec:
  display:
    title: 'Resource Summary'
    card:
      columns: 2

  columns:
    - name: type
      type: string
      primaryKey: true
    - name: total_count
      type: number
    - name: healthy_count
      type: number
    - name: critical_count
      type: number

  queries:
    resources:
      viewTableSelector:
        name: resource-inventory

  merge: |
    SELECT
      type,
      COUNT(*) as total_count,
      SUM(CASE WHEN health = 'healthy' THEN 1 ELSE 0 END) as healthy_count,
      SUM(CASE WHEN health = 'critical' THEN 1 ELSE 0 END) as critical_count
    FROM resources
    GROUP BY type

  mapping:
    type: 'row.type'
    total_count: 'row.total_count'
    healthy_count: 'row.healthy_count'
    critical_count: 'row.critical_count'
```

### Production Resource Drill-Down

```yaml
apiVersion: mission-control.flanksource.com/v1
kind: View
metadata:
  name: prod-resources
spec:
  display:
    title: 'Production Resources'
    sidebar: true

  templating:
    - key: resource_type
      label: 'Resource Type'
      values: ['Pod', 'Deployment', 'Node']
      default: 'Pod'

  columns:
    - name: resource_id
      type: string
      primaryKey: true
      hidden: true
    - name: name
      type: string
    - name: status
      type: status
    - name: health
      type: health

  queries:
    data:
      viewTableSelector:
        name: resource-inventory
        filter:
          type: '$(var.resource_type)'
          status: 'production'

  mapping:
    resource_id: 'row.id'
    name: 'row.name'
    status: 'row.status'
    health: 'row.health'
```

### Composite Metrics View

Base view with Prometheus metrics:

```yaml
apiVersion: mission-control.flanksource.com/v1
kind: View
metadata:
  name: node-metrics
spec:
  columns:
    - name: node
      type: string
      primaryKey: true
    - name: cpu_percent
      type: gauge

  queries:
    metrics:
      prometheus:
        connection: prod
        query: 'rate(node_cpu_seconds_total[5m]) * 100'

  mapping:
    node: 'row.node'
    cpu_percent: 'row.value'
```

Composite view that adds more context:

```yaml
apiVersion: mission-control.flanksource.com/v1
kind: View
metadata:
  name: nodes-with-metrics
spec:
  columns:
    - name: node_name
      type: string
      primaryKey: true
    - name: node_type
      type: string
    - name: status
      type: status
    - name: cpu_usage
      type: gauge

  queries:
    nodes:
      viewTableSelector:
        name: node-inventory

    metrics:
      viewTableSelector:
        name: node-metrics

  merge: |
    SELECT
      n.name as node_name,
      n.type as node_type,
      n.status,
      m.cpu_percent as cpu_usage
    FROM nodes n
    LEFT JOIN metrics m ON n.name = m.node

  mapping:
    node_name: 'row.node_name'
    node_type: 'row.node_type'
    status: 'row.status'
    cpu_usage: 'row.cpu_usage'
```

### Change Impact Analysis

Query cached changes using viewTableSelector:

```yaml
apiVersion: mission-control.flanksource.com/v1
kind: View
metadata:
  name: change-impact
spec:
  display:
    title: 'Change Impact Analysis'

  templating:
    - key: severity
      label: 'Minimum Severity'
      values: ['info', 'warning', 'critical']
      default: 'warning'

  columns:
    - name: change_id
      type: string
      primaryKey: true
      hidden: true
    - name: resource
      type: string
    - name: change_type
      type: string
    - name: impact
      type: health

  queries:
    changes:
      viewTableSelector:
        name: recent-changes
        filter:
          severity: '$(var.severity)'

  mapping:
    change_id: 'row.id'
    resource: 'row.resource_name'
    change_type: 'row.change_type'
    impact: 'row.severity'
```

## Performance Tips

### Use Base Views for Heavy Queries

Let specialized views handle expensive queries, then compose them:

```yaml
# ✓ Good: Heavy query in base view
# pod-inventory (queries all configs once)

# ✓ Good: Light queries on top
# pod-metrics (just adds a column from viewTableSelector)
# pod-summary (just aggregates viewTableSelector results)

# ✗ Bad: Heavy query in composite view
# every-pod-view (duplicates the config query)
```

### Filter Early

Use the `filter` property to reduce data:

```yaml
# ✓ Filter in viewTableSelector
queries:
  data:
    viewTableSelector:
      name: all-resources
      filter:
        status: 'critical' # Reduce data from start

# ✗ Filter in merge query
# queries all rows, then filters
merge: |
  SELECT * FROM data
  WHERE status = 'critical'  # Filters after loading all
```

### Cache Configuration

Ensure base views have appropriate cache settings:

```yaml
# Base view should cache longer
cache:
  maxAge: 15m

# Composite view can cache shorter
cache:
  maxAge: 5m  # Depends on base, but can be fresh more often
```

### Variable Dependency

Use view templating variables for dependent filtering:

```yaml
# ✓ Good: Variables filter viewTableSelector
templating:
  - key: environment
    values: ['prod', 'staging']

queries:
  data:
    viewTableSelector:
      name: resources
      filter:
        environment: '$(var.environment)'
# ✗ Avoid: Multiple views don't coordinate variables
```

## Troubleshooting

### View Not Found

Check:

1. Is the view name correct? (case-sensitive)
2. Is the namespace correct?
3. Has the base view cached data yet? (Run it manually)

### No Results

Check:

1. Does the base view have data?
2. Are filter values correct?
3. Try removing filters temporarily
4. Check column names match exactly

### Stale Data

If you see old data:

1. Verify base view cache timing
2. Check if base view is being refreshed
3. Consider reducing cache TTL on composite view

## Limitations

- Cannot filter on columns that don't exist in the source view
- Filter values must match exactly (case-sensitive)
- Can only query cached view results
- Column types are inherited from source view
