---
title: Health
sidebar_custom_props:
  icon: health
---

The `health` column type displays health status with color-coded badges showing three states: healthy (green), warning (yellow), and critical (red).

## Basic Usage

```yaml
columns:
  - name: health_status
    type: health
```

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | string | Column name (used in mapping) |
| `type` | string | Set to `"health"` |
| `description` | string | Help text for column |
| `filter` | object | Enable filtering on this column |
| `card` | object | Configure card layout position |

## Health States

The health column supports three states:

| State | Color | Meaning |
|-------|-------|---------|
| `healthy` | Green | Operating normally, no issues |
| `warning` | Yellow | Minor issues or degradation |
| `critical` | Red | Major issues, needs attention |

## Example Usage

### Direct Health Property

```yaml
columns:
  - name: health
    type: health

mapping:
  health: "row.health"
```

### Health from Status

```yaml
columns:
  - name: pod_health
    type: health

mapping:
  pod_health: "row.properties.status"
```

### Health from Condition

```yaml
columns:
  - name: cluster_health
    type: health

mapping:
  cluster_health: "row.status == 'ready' ? 'healthy' : 'critical'"
```

## Common Patterns

### Simple Health Status
```yaml
mapping:
  health: "row.health"
```

### Health from Replica Mismatch
```yaml
mapping:
  health: "row.replicas == row.ready_replicas ? 'healthy' : row.ready_replicas > 0 ? 'warning' : 'critical'"
```

### Health from Multiple Conditions
```yaml
mapping:
  health: "
    row.cpu_usage > 90 || row.memory_usage > 90 ? 'critical' :
    row.cpu_usage > 75 || row.memory_usage > 75 ? 'warning' :
    'healthy'
  "
```

### Health from Property
```yaml
mapping:
  health: "row.properties.health_check_status"
```

## Real-World Examples

### Kubernetes Pod Health
```yaml
columns:
  - name: pod_name
    type: string
    primaryKey: true

  - name: health
    type: health
    description: "Pod health status"

queries:
  pods:
    configs:
      types: ["Kubernetes::Pod"]

mapping:
  pod_name: "row.name"
  health: "row.health"
```

### Deployment Replica Status
```yaml
columns:
  - name: deployment
    type: string
    primaryKey: true

  - name: replica_health
    type: health
    description: "Replica status"

  - name: desired_replicas
    type: number

  - name: ready_replicas
    type: number

queries:
  deployments:
    configs:
      types: ["Kubernetes::Deployment"]

mapping:
  deployment: "row.name"
  replica_health: "row.properties.spec.replicas == row.properties.status.readyReplicas ? 'healthy' : row.properties.status.readyReplicas > 0 ? 'warning' : 'critical'"
  desired_replicas: "row.properties.spec.replicas"
  ready_replicas: "row.properties.status.readyReplicas"
```

### Database Connection Pool Health
```yaml
columns:
  - name: pool_name
    type: string
    primaryKey: true

  - name: health
    type: health
    description: "Connection pool health"

  - name: active_connections
    type: number

  - name: max_connections
    type: number

queries:
  pools:
    configs:
      types: ["Database::ConnectionPool"]

mapping:
  pool_name: "row.name"
  health: "row.active_connections >= row.max_connections * 0.9 ? 'critical' : row.active_connections >= row.max_connections * 0.75 ? 'warning' : 'healthy'"
  active_connections: "row.properties.active"
  max_connections: "row.properties.max_connections"
```

### Service Health from Multiple Metrics
```yaml
columns:
  - name: service_name
    type: string
    primaryKey: true

  - name: health
    type: health
    description: "Overall service health"

  - name: error_rate
    type: gauge

  - name: response_time
    type: number
    unit: "ms"

queries:
  services:
    configs:
      types: ["Service::Instance"]

mapping:
  service_name: "row.name"
  health: "
    row.properties.error_rate > 5 || row.properties.response_time > 1000 ? 'critical' :
    row.properties.error_rate > 1 || row.properties.response_time > 500 ? 'warning' :
    'healthy'
  "
  error_rate: "row.properties.error_rate"
  response_time: "row.properties.response_time"
```

### Infrastructure Node Health
```yaml
columns:
  - name: node_name
    type: string
    primaryKey: true

  - name: health
    type: health
    description: "Node health"

  - name: cpu_usage
    type: gauge
    gauge:
      max: "100"

  - name: memory_usage
    type: gauge
    gauge:
      max: "100"

  - name: disk_usage
    type: gauge
    gauge:
      max: "100"

queries:
  nodes:
    configs:
      types: ["Kubernetes::Node"]

mapping:
  node_name: "row.name"
  health: "
    row.cpu > 90 || row.memory > 90 || row.disk > 90 ? 'critical' :
    row.cpu > 75 || row.memory > 75 || row.disk > 75 ? 'warning' :
    'healthy'
  "
  cpu_usage: "row.properties.cpu_percent"
  memory_usage: "row.properties.memory_percent"
  disk_usage: "row.properties.disk_percent"
```

## Health Filtering

Enable users to filter by health status:

```yaml
columns:
  - name: health
    type: health
    filter:
      type: "multiselect"

mapping:
  health: "row.health"
```

Users can then filter to show:
- All items
- Only healthy items
- Only warning items
- Only critical items
- Any combination of states

## Health Expressions in CEL

### Threshold-Based Health
```yaml
mapping:
  # Simple threshold
  health: "row.cpu_usage > 80 ? 'critical' : 'healthy'"

  # Range-based
  health: "row.cpu_usage > 90 ? 'critical' : row.cpu_usage > 75 ? 'warning' : 'healthy'"

  # Multiple conditions
  health: "
    (row.cpu_usage > 90 || row.memory_usage > 90) ? 'critical' :
    (row.cpu_usage > 75 || row.memory_usage > 75) ? 'warning' :
    'healthy'
  "
```

### State-Based Health
```yaml
mapping:
  # Health from status field
  health: "row.status == 'active' ? 'healthy' : row.status == 'degraded' ? 'warning' : 'critical'"

  # Health from readiness
  health: "row.is_ready ? 'healthy' : 'critical'"
```

### Time-Based Health
```yaml
mapping:
  # Old items are critical
  health: "
    (now - row.last_check) > duration('1h') ? 'critical' :
    (now - row.last_check) > duration('30m') ? 'warning' :
    'healthy'
  "
```

## Best Practices

1. **Use consistent thresholds** - Define thresholds once and reuse across views
   ```yaml
   # Define at the top level
   # CPU: < 75% = healthy, 75-90% = warning, > 90% = critical
   # Memory: similar thresholds
   ```

2. **Document thresholds** - Use descriptions to explain what makes a resource healthy
   ```yaml
   - name: health
     type: health
     description: "CPU < 75% = healthy, < 90% = warning, >= 90% = critical"
   ```

3. **Consider context** - Health meaning may vary by resource type
   ```yaml
   # For critical services, stricter thresholds
   # For development resources, more lenient thresholds
   ```

4. **Combine with details** - Show health alongside relevant metrics
   ```yaml
   - name: health
     type: health
   - name: cpu_usage
     type: gauge  # Show the actual value too
   ```

5. **Avoid overcomplication** - Keep health logic understandable
   ```yaml
   # ✓ Clear and maintainable
   health: "row.status == 'healthy' ? 'healthy' : 'critical'"

   # ✗ Complex and hard to understand
   health: "size([x for x in row.conditions if x.status == 'ok']) == size(row.conditions) ? 'healthy' : size([x for x in row.conditions if x.status == 'ok']) > 0 ? 'warning' : 'critical'"
   ```

## Comparison with Other Status Types

| Type | Use Case |
|------|----------|
| `health` | Three-state health (healthy/warning/critical) |
| `status` | General status badges (any custom status) |
| `boolean` | Binary true/false states |

Use `health` for operational health. Use `status` for custom statuses like "pending", "failed", "queued", etc.

## Performance Considerations

- Health columns are efficient to calculate and display
- Health filtering is fast even with large datasets
- No significant performance overhead for health expressions

## Visual Representation

Health states typically display as:
- **Green checkmark** ✓ for healthy
- **Yellow triangle** ⚠ for warning
- **Red X** ✗ for critical

The exact icons and colors depend on the UI theme.

## Combining Multiple Health Signals

To combine multiple health indicators:

```yaml
columns:
  - name: overall_health
    type: health
  - name: cpu_health
    type: health
  - name: memory_health
    type: health
  - name: disk_health
    type: health

mapping:
  overall_health: "
    (row.cpu_health == 'critical' || row.memory_health == 'critical' || row.disk_health == 'critical') ? 'critical' :
    (row.cpu_health == 'warning' || row.memory_health == 'warning' || row.disk_health == 'warning') ? 'warning' :
    'healthy'
  "
  cpu_health: "row.cpu > 90 ? 'critical' : row.cpu > 75 ? 'warning' : 'healthy'"
  memory_health: "row.memory > 90 ? 'critical' : row.memory > 75 ? 'warning' : 'healthy'"
  disk_health: "row.disk > 90 ? 'critical' : row.disk > 75 ? 'warning' : 'healthy'"
```
