---
title: Gauge
sidebar_custom_props:
  icon: mdi:gauge
---

The `gauge` column type displays numeric values (typically 0-100) as visual progress bars or gauge visualizations with customizable thresholds and colors.

## Basic Usage

```yaml
columns:
  - name: cpu_usage
    type: gauge
    gauge:
      max: "100"
```

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | string | Column name |
| `type` | string | Set to `"gauge"` |
| `gauge` | object | Gauge configuration |

## Gauge Configuration

```yaml
gauge:
  # Required: maximum value for the gauge
  max: "100"

  # Optional: minimum value (default: 0)
  min: "0"

  # Optional: decimal precision
  precision: 1

  # Optional: display unit
  unit: "%"

  # Optional: color thresholds
  thresholds:
    - percent: 50
      color: "yellow"
    - percent: 80
      color: "red"

  # Optional: show percentage
  showPercent: true

  # Optional: show value
  showValue: true
```

## Example Usage

### CPU Usage Percentage

```yaml
columns:
  - name: cpu_percent
    type: gauge
    gauge:
      max: "100"
      unit: "%"
      thresholds:
        - percent: 50
          color: "yellow"
        - percent: 80
          color: "red"

mapping:
  cpu_percent: "row.cpu_usage"
```

### Memory Usage with Thresholds

```yaml
columns:
  - name: memory_usage
    type: gauge
    gauge:
      max: "100"
      precision: 1
      unit: "%"
      thresholds:
        - percent: 70
          color: "yellow"
        - percent: 90
          color: "red"

mapping:
  memory_usage: "(row.memory_used / row.memory_total) * 100"
```

### Disk Space Percentage

```yaml
columns:
  - name: disk_usage
    type: gauge
    gauge:
      max: "100"
      unit: "%"
      showPercent: true

mapping:
  disk_usage: "(row.disk_used / row.disk_total) * 100"
```

### Custom Scale Gauge

```yaml
columns:
  - name: connection_pool
    type: gauge
    gauge:
      min: "0"
      max: "100"  # Max connections
      unit: " connections"
      showValue: true

mapping:
  connection_pool: "row.active_connections"
```

## Common Patterns

### Resource Utilization
```yaml
columns:
  - name: cpu_usage
    type: gauge
    gauge:
      max: "100"
      unit: "%"
      thresholds:
        - percent: 75
          color: "yellow"
        - percent: 90
          color: "red"

  - name: memory_usage
    type: gauge
    gauge:
      max: "100"
      unit: "%"
      thresholds:
        - percent: 75
          color: "yellow"
        - percent: 90
          color: "red"

mapping:
  cpu_usage: "row.cpu_percent"
  memory_usage: "row.memory_percent"
```

### Health Score
```yaml
columns:
  - name: health_score
    type: gauge
    gauge:
      max: "100"
      unit: " points"
      thresholds:
        - percent: 50
          color: "red"
        - percent: 75
          color: "yellow"

mapping:
  health_score: "row.computed_health_score"
```

### Capacity Planning
```yaml
columns:
  - name: utilization
    type: gauge
    gauge:
      max: "100"
      unit: "%"
      thresholds:
        - percent: 80
          color: "orange"
        - percent: 95
          color: "red"

mapping:
  utilization: "(row.used / row.capacity) * 100"
```

## Threshold Configuration

Thresholds define when the gauge color changes:

```yaml
gauge:
  max: "100"
  thresholds:
    # At 0%, start with green (default)
    # At 50%, change to yellow
    - percent: 50
      color: "yellow"
    # At 80%, change to red
    - percent: 80
      color: "red"
```

The gauge automatically:
- Shows green (healthy) from 0 to first threshold
- Transitions through colors as value increases
- Shows red (critical) above the last threshold

## Real-World Examples

### Node Resource Monitoring
```yaml
columns:
  - name: node_name
    type: string
    primaryKey: true

  - name: cpu_usage
    type: gauge
    gauge:
      max: "100"
      unit: "%"
      thresholds:
        - percent: 70
          color: "yellow"
        - percent: 85
          color: "red"

  - name: memory_usage
    type: gauge
    gauge:
      max: "100"
      unit: "%"
      thresholds:
        - percent: 70
          color: "yellow"
        - percent: 85
          color: "red"

  - name: disk_usage
    type: gauge
    gauge:
      max: "100"
      unit: "%"
      thresholds:
        - percent: 80
          color: "yellow"
        - percent: 90
          color: "red"

queries:
  nodes:
    prometheus:
      connection: prod
      query: |
        {
          cpu: rate(node_cpu_seconds_total[5m]) * 100,
          memory: (node_memory_MemTotal_bytes - node_memory_MemFree_bytes) / node_memory_MemTotal_bytes * 100,
          disk: (node_filesystem_size_bytes - node_filesystem_avail_bytes) / node_filesystem_size_bytes * 100
        }
      columns:
        node: string
        cpu: decimal
        memory: decimal
        disk: decimal

mapping:
  node_name: "row.node"
  cpu_usage: "row.cpu"
  memory_usage: "row.memory"
  disk_usage: "row.disk"
```

### Database Connection Pool Status
```yaml
columns:
  - name: pool_name
    type: string
    primaryKey: true

  - name: utilization
    type: gauge
    gauge:
      max: "100"
      unit: "%"
      thresholds:
        - percent: 70
          color: "yellow"
        - percent: 90
          color: "red"

  - name: connections_used
    type: number

  - name: connections_max
    type: number

queries:
  pools:
    configs:
      types: ["Database::ConnectionPool"]

mapping:
  pool_name: "row.name"
  utilization: "(row.properties.active / row.properties.max_connections) * 100"
  connections_used: "row.properties.active"
  connections_max: "row.properties.max_connections"
```

### Kubernetes Pod Resource Requests
```yaml
columns:
  - name: pod_name
    type: string
    primaryKey: true

  - name: cpu_allocated
    type: gauge
    gauge:
      max: "2"  # 2 CPU cores
      unit: " cores"
      precision: 2
      showValue: true

  - name: memory_allocated
    type: gauge
    gauge:
      max: "8"  # 8 GB
      unit: " GB"
      precision: 1
      showValue: true

queries:
  pods:
    configs:
      types: ["Kubernetes::Pod"]

mapping:
  pod_name: "row.name"
  cpu_allocated: "row.properties.spec.containers[0].resources.requests.cpu / 1000"
  memory_allocated: "row.properties.spec.containers[0].resources.requests.memory / 1024 / 1024 / 1024"
```

### SLA Compliance Score
```yaml
columns:
  - name: service_name
    type: string
    primaryKey: true

  - name: sla_compliance
    type: gauge
    gauge:
      max: "100"
      unit: "%"
      precision: 1
      thresholds:
        - percent: 95
          color: "red"  # Below 95% SLA = warning
        - percent: 99
          color: "yellow"  # 95-99% = yellow

  - name: uptime_percent
    type: gauge
    gauge:
      max: "100"
      unit: "%"

mapping:
  service_name: "row.name"
  sla_compliance: "row.properties.sla_compliance_percent"
  uptime_percent: "row.properties.uptime_percent"
```

### Storage Capacity Planning
```yaml
columns:
  - name: storage_system
    type: string
    primaryKey: true

  - name: capacity_used
    type: gauge
    gauge:
      max: "100"
      unit: "%"
      thresholds:
        - percent: 70
          color: "yellow"
        - percent: 85
          color: "red"

  - name: iops_utilization
    type: gauge
    gauge:
      max: "100"
      unit: "%"
      thresholds:
        - percent: 75
          color: "yellow"
        - percent: 90
          color: "red"

queries:
  storage:
    configs:
      types: ["Storage::Volume"]

mapping:
  storage_system: "row.name"
  capacity_used: "(row.properties.used_capacity / row.properties.total_capacity) * 100"
  iops_utilization: "(row.properties.current_iops / row.properties.max_iops) * 100"
```

## Gauge Expressions in CEL

### Percentage Calculation
```yaml
mapping:
  # Simple percentage
  usage_percent: "(row.used / row.total) * 100"

  # Capped at 100%
  usage_capped: "min(row.used / row.total, 1.0) * 100"

  # With minimum
  usage_min: "max(row.used / row.total, 0.0) * 100"
```

### Conditional Gauge Values
```yaml
mapping:
  # Use different calculation based on condition
  utilization: "
    row.type == 'cpu' ? (row.used / 4) * 100 :
    row.type == 'memory' ? (row.used / 16) * 100 :
    (row.used / row.max) * 100
  "
```

## Best Practices

1. **Set appropriate max values** - Match your scale
   ```yaml
   # CPU percentage
   gauge:
     max: "100"

   # Memory in GB
   gauge:
     max: "16"

   # Connections
   gauge:
     max: "1000"
   ```

2. **Use meaningful thresholds** - Match your SLOs
   ```yaml
   # ✓ Clear thresholds for your use case
   thresholds:
     - percent: 70
       color: "yellow"
     - percent: 85
       color: "red"

   # ✗ Unclear thresholds
   thresholds:
     - percent: 50
       color: "yellow"
   ```

3. **Include units** - Make values understandable
   ```yaml
   gauge:
     unit: "%"      # ✓ Clear
     unit: " GB"    # ✓ Clear
     unit: ""       # ✗ No context
   ```

4. **Add descriptions** - Explain what's being measured
   ```yaml
   - name: cpu_usage
     type: gauge
     description: "CPU utilization (0-100%)"
   ```

5. **Pair with numeric columns** - Show the actual value too
   ```yaml
   - name: cpu_gauge
     type: gauge
   - name: cpu_cores
     type: number
     unit: " cores"  # Show the actual value
   ```

## Color Themes

Standard color progression:
- **Green** - Healthy (0-50%)
- **Yellow** - Warning (50-80%)
- **Red** - Critical (80-100%)

Customize based on your thresholds and needs.

## Display Options

Gauges can show:
- **Bar/Progress bar** - Horizontal gauge visualization
- **Circular gauge** - Speedometer-style visualization
- **Value and unit** - Numeric display with unit
- **Percentage** - Show as percentage

Configuration options:
```yaml
gauge:
  showPercent: true   # Show % value
  showValue: true     # Show numeric value
  # Display style depends on UI implementation
```

## Performance Considerations

- Gauge calculations are very efficient
- Threshold evaluation is fast
- Can handle large datasets
- Minimal UI rendering overhead

## Comparison with Other Numeric Types

| Type | Use Case |
|------|----------|
| `gauge` | Percentage or 0-max range with visual representation |
| `decimal` | Precise numeric values without visualization |
| `number` | Integer or decimal counts |

Use `gauge` for percentages and ratios. Use `number` for counts. Use `decimal` for precise calculations.

## Gauge Formula Examples

### CPU to Percentage
```yaml
mapping:
  cpu_percent: "(row.cpu_nanocores / 1000 / 1000) / row.cpu_cores / 100"
```

### Memory Percentage
```yaml
mapping:
  memory_percent: "(row.memory_bytes / (1024 * 1024 * 1024)) / row.memory_gb * 100"
```

### Normalized Score
```yaml
mapping:
  score: "min(max(row.raw_score, 0), 100)"
```
