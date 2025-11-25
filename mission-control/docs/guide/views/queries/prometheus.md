---
title: Prometheus Queries
sidebar_custom_props:
  icon: prometheus
---

Prometheus queries fetch metrics directly from Prometheus using PromQL. They allow you to display real-time and historical metrics in your views.

## Overview

Prometheus queries execute PromQL expressions against your Prometheus instance and return time series data. Results can be visualized as tables, gauges, charts, and other panel types.

**Example**:
```yaml
queries:
  metrics:
    prometheus:
      connection: prometheus-prod
      query: 'up{job="kubernetes-nodes"}'
```

## Query Properties

| Property | Type | Description |
|----------|------|-------------|
| `connection` | string | Name of the Prometheus connection to use |
| `query` | string | PromQL query expression |
| `columns` | object | Optional: define column types for the results |

## Connection Configuration

Before using Prometheus queries, ensure you have a Prometheus connection configured in your Mission Control instance. Connections are typically defined at the system level.

Reference a connection by its name:

```yaml
prometheus:
  connection: prometheus-prod
  query: 'up{job="kubernetes"}'
```

## PromQL Queries

Prometheus queries use standard PromQL syntax. The query results return:
- **Labels** from the metric as columns
- **Value** as a numeric column

### Instant Queries

Return the current value of metrics:

```yaml
queries:
  node_up:
    prometheus:
      connection: prod
      query: 'up{job="kubernetes-nodes"}'
```

Returns: One row per node with `up` value and labels like `node`, `job`, `instance`.

### Range Queries

Return values over a time range (in panels/merge):

```yaml
queries:
  cpu_usage:
    prometheus:
      connection: prod
      query: 'rate(node_cpu_seconds_total[5m])'
```

### Aggregation Queries

Aggregate metrics across dimensions:

```yaml
queries:
  namespace_memory:
    prometheus:
      connection: prod
      query: |
        sum(container_memory_usage_bytes) by (namespace)
```

## Column Type Definitions

For Prometheus queries, you can optionally define column types. This is useful when:
- You want to control how metrics are displayed
- The metric has no results yet (type inference would fail)
- You want to ensure specific formatting

```yaml
queries:
  metrics:
    prometheus:
      connection: prod
      query: 'container_memory_usage_bytes{namespace="default"}'
      columns:
        pod: string
        container: string
        value: bytes
```

If you don't specify columns, types are inferred from the query results.

## Query Examples

### CPU Usage by Node

```yaml
queries:
  cpu_usage:
    prometheus:
      connection: prod
      query: |
        rate(node_cpu_seconds_total{mode="system"}[5m]) * 100
      columns:
        node: string
        value: decimal
```

### Memory Availability

```yaml
queries:
  memory_available:
    prometheus:
      connection: prod
      query: |
        node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes * 100
      columns:
        instance: string
        value: gauge
```

### Pod Count by Namespace

```yaml
queries:
  pods_per_ns:
    prometheus:
      connection: prod
      query: |
        count(kube_pod_info) by (namespace)
      columns:
        namespace: string
        value: number
```

### Disk Usage Percentage

```yaml
queries:
  disk_usage:
    prometheus:
      connection: prod
      query: |
        (node_filesystem_size_bytes - node_filesystem_avail_bytes)
        / node_filesystem_size_bytes * 100
      columns:
        device: string
        mountpoint: string
        value: gauge
```

### Network Traffic

```yaml
queries:
  network_io:
    prometheus:
      connection: prod
      query: |
        rate(node_network_receive_bytes_total[5m])
      columns:
        device: string
        instance: string
        value: bytes
```

## Using Variables in Prometheus Queries

Make Prometheus queries dynamic with templating variables:

```yaml
templating:
  - key: job
    label: "Job"
    values: ["kubernetes-nodes", "kubernetes-pods", "prometheus"]
    default: "kubernetes-nodes"

  - key: namespace
    label: "Namespace"
    values: ["default", "kube-system", "monitoring"]
    default: "default"

queries:
  metrics:
    prometheus:
      connection: prod
      query: |
        up{job="$(var.job)",namespace="$(var.namespace)"}
```

## Column Mapping Examples

### Simple Metric Display

```yaml
columns:
  - name: instance
    type: string
    primaryKey: true
  - name: cpu_percent
    type: gauge
    gauge:
      max: "100"

queries:
  cpu:
    prometheus:
      connection: prod
      query: 'rate(node_cpu_seconds_total[5m]) * 100'

mapping:
  instance: "row.instance"
  cpu_percent: "row.value"
```

### Metric with Multiple Labels

```yaml
columns:
  - name: pod
    type: string
    primaryKey: true
  - name: namespace
    type: string
  - name: memory_mb
    type: gauge

queries:
  memory:
    prometheus:
      connection: prod
      query: |
        container_memory_usage_bytes{pod!=""} / 1024 / 1024

mapping:
  pod: "row.pod"
  namespace: "row.namespace"
  memory_mb: "row.value"
```

### Multiple Metrics Combined

When combining multiple Prometheus queries:

```yaml
columns:
  - name: instance
    type: string
    primaryKey: true
  - name: cpu_percent
    type: gauge
  - name: memory_percent
    type: gauge

queries:
  cpu_usage:
    prometheus:
      connection: prod
      query: 'rate(node_cpu_seconds_total[5m]) * 100'
      columns:
        instance: string
        value: decimal

  memory_usage:
    prometheus:
      connection: prod
      query: |
        (node_memory_MemTotal_bytes - node_memory_MemFree_bytes)
        / node_memory_MemTotal_bytes * 100
      columns:
        instance: string
        value: decimal

merge: |
  SELECT
    c.instance,
    c.value as cpu_percent,
    m.value as memory_percent
  FROM cpu_usage c
  LEFT JOIN memory_usage m ON c.instance = m.instance

mapping:
  instance: "row.instance"
  cpu_percent: "row.cpu_percent"
  memory_percent: "row.memory_percent"
```

## Real-World Examples

### Node Resource Dashboard

```yaml
apiVersion: mission-control.flanksource.com/v1
kind: View
metadata:
  name: node-metrics
spec:
  display:
    title: "Node Resources"
    sidebar: true

  columns:
    - name: node
      type: string
      primaryKey: true
    - name: cpu_percent
      type: gauge
      gauge:
        max: "100"
    - name: memory_percent
      type: gauge
      gauge:
        max: "100"
    - name: disk_percent
      type: gauge
      gauge:
        max: "100"

  queries:
    cpu:
      prometheus:
        connection: prod
        query: |
          rate(node_cpu_seconds_total{mode="system"}[5m]) * 100
        columns:
          node: string
          value: decimal

    memory:
      prometheus:
        connection: prod
        query: |
          (node_memory_MemTotal_bytes - node_memory_MemFree_bytes)
          / node_memory_MemTotal_bytes * 100
        columns:
          node: string
          value: decimal

    disk:
      prometheus:
        connection: prod
        query: |
          (node_filesystem_size_bytes - node_filesystem_avail_bytes)
          / node_filesystem_size_bytes * 100
        columns:
          node: string
          value: decimal

  merge: |
    SELECT
      c.node,
      c.value as cpu_percent,
      m.value as memory_percent,
      d.value as disk_percent
    FROM cpu c
    LEFT JOIN memory m ON c.node = m.node
    LEFT JOIN disk d ON c.node = d.node

  mapping:
    node: "row.node"
    cpu_percent: "row.cpu_percent"
    memory_percent: "row.memory_percent"
    disk_percent: "row.disk_percent"
```

### Pod Metrics by Namespace

```yaml
apiVersion: mission-control.flanksource.com/v1
kind: View
metadata:
  name: pod-metrics
spec:
  display:
    title: "Pod Resource Usage"

  templating:
    - key: namespace
      label: "Namespace"
      values: ["default", "kube-system", "monitoring"]
      default: "default"

  columns:
    - name: pod
      type: string
      primaryKey: true
    - name: container
      type: string
    - name: cpu_cores
      type: decimal
    - name: memory_mb
      type: decimal

  queries:
    pod_metrics:
      prometheus:
        connection: prod
        query: |
          {
            cpu: rate(container_cpu_usage_seconds_total{namespace="$(var.namespace)",pod!=""}[5m]),
            memory: container_memory_usage_bytes{namespace="$(var.namespace)",pod!=""} / 1024 / 1024
          }
        columns:
          pod: string
          container: string
          cpu: decimal
          memory: decimal

  mapping:
    pod: "row.pod"
    container: "row.container"
    cpu_cores: "row.cpu"
    memory_mb: "row.memory"
```

### Alert Metrics Dashboard

```yaml
apiVersion: mission-control.flanksource.com/v1
kind: View
metadata:
  name: alert-metrics
spec:
  display:
    title: "Alert Status"
    card:
      columns: 3

  columns:
    - name: alert_id
      type: string
      primaryKey: true
      hidden: true

  queries:
    alerts:
      prometheus:
        connection: prod
        query: |
          ALERTS{severity=~"critical|warning"}
        columns:
          alertname: string
          severity: string
          instance: string
          value: number

  panels:
    - name: "Critical Alerts"
      type: number
      query: |
        SELECT COUNT(*) as value FROM alerts
        WHERE severity = 'critical'

    - name: "Warning Alerts"
      type: number
      query: |
        SELECT COUNT(*) as value FROM alerts
        WHERE severity = 'warning'

    - name: "Alerts by Severity"
      type: piechart
      query: |
        SELECT severity, COUNT(*) as value FROM alerts
        GROUP BY severity

    - name: "Most Common Alerts"
      type: table
      query: |
        SELECT alertname, COUNT(*) as count
        FROM alerts
        GROUP BY alertname
        ORDER BY count DESC
        LIMIT 10
```

### Service Health Monitoring

```yaml
apiVersion: mission-control.flanksource.com/v1
kind: View
metadata:
  name: service-health
spec:
  display:
    title: "Service Health Status"

  templating:
    - key: job
      label: "Service"
      values: ["api-server", "database", "cache", "queue"]
      default: "api-server"

  columns:
    - name: instance
      type: string
      primaryKey: true
    - name: up
      type: health
    - name: last_scrape
      type: datetime
    - name: scrape_duration_ms
      type: number

  queries:
    service_health:
      prometheus:
        connection: prod
        query: |
          up{job="$(var.job)"}
        columns:
          instance: string
          value: number

    scrape_info:
      prometheus:
        connection: prod
        query: |
          {
            duration: scrape_duration_seconds{job="$(var.job)"} * 1000,
            timestamp: scrape_timestamp{job="$(var.job)"}
          }
        columns:
          instance: string
          duration: decimal
          timestamp: datetime

  merge: |
    SELECT
      s.instance,
      s.value as up,
      sc.timestamp as last_scrape,
      sc.duration as scrape_duration_ms
    FROM service_health s
    LEFT JOIN scrape_info sc ON s.instance = sc.instance

  mapping:
    instance: "row.instance"
    up: "row.up == 1 ? 'healthy' : 'critical'"
    last_scrape: "row.last_scrape"
    scrape_duration_ms: "row.scrape_duration_ms"
```

## Performance Considerations

### Limit Query Scope
Use specific label matchers to reduce data:

```yaml
# ✓ Specific - only relevant metrics
query: 'up{job="kubernetes-nodes",region="us-east-1"}'

# ✗ Broad - gets all data
query: 'up'
```

### Use Appropriate Time Windows
For rate() and other range functions:

```yaml
# ✓ Reasonable 5-minute window
query: 'rate(requests_total[5m])'

# ✗ Too long window
query: 'rate(requests_total[24h])'
```

### Cache Long-Running Queries
Use [cache control](../concepts/cache-control.md) appropriately:

```yaml
cache:
  maxAge: 5m    # Refresh less frequently for expensive queries
  refreshTimeout: 10s
```

### Aggregation Before Query
Aggregate in PromQL rather than after fetching:

```yaml
# ✓ Aggregate in query
query: 'sum(rate(requests_total[5m])) by (job)'

# ✗ Fetch all, aggregate later
query: 'rate(requests_total[5m])'
# then merge to aggregate
```

## Common PromQL Patterns

### Rate of Change (Per Second)
```promql
rate(metric_total[5m])
```

### Percentage
```promql
(used / total) * 100
```

### Convert Units
```promql
bytes_value / 1024 / 1024          # Bytes to MB
milliseconds_value / 1000          # Milliseconds to seconds
```

### Conditional Values
```promql
metric_value > 0.8 or on() vector(1)  # Returns 1 if metric > 0.8
```

### Top N Results
Use `topk()` in PromQL or `LIMIT` in merge query.

## Troubleshooting

### Empty Results
Check:
1. Is the connection name correct?
2. Does the Prometheus instance have the metrics?
3. Try the query directly in Prometheus UI
4. Check label names and values (case-sensitive)

### Wrong Column Types
Ensure column definitions match your PromQL output:
```yaml
columns:
  instance: string      # Label names are strings
  value: decimal       # Metric values are typically decimal
```

### Performance Issues
- Check Prometheus query performance directly
- Reduce time window or add more specific labels
- Consider using [view table selector](./view-table-selector.md) for cached data instead
