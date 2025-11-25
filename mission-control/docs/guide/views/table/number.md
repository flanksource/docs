---
title: Number
sidebar_custom_props:
  icon: mdi:numeric
---

The `number` column type displays numeric values in a standard number format. This includes integers and decimal values.

## Basic Usage

```yaml
columns:
  - name: pod_count
    type: number
```

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | string | Column name (used in mapping) |
| `type` | string | Set to `"number"` |
| `description` | string | Help text for column |
| `unit` | string | Display unit (e.g., "pods", "requests/sec") |
| `precision` | integer | Decimal places to display |
| `filter` | object | Enable filtering on this column |
| `card` | object | Configure card layout position |

## Example Usage

### Simple Count Display

```yaml
columns:
  - name: replica_count
    type: number

mapping:
  replica_count: "row.properties.replicas"
```

### Number with Precision

```yaml
columns:
  - name: cpu_cores
    type: number
    precision: 2

mapping:
  cpu_cores: "row.properties.cpu_limit / 1000"
```

### Number with Unit

```yaml
columns:
  - name: request_rate
    type: number
    unit: "requests/sec"

mapping:
  request_rate: "row.properties.requests_per_second"
```

### Number from Calculation

```yaml
columns:
  - name: uptime_days
    type: number
    precision: 1

mapping:
  uptime_days: "(now - row.created_at) / duration('24h')"
```

## Common Patterns

### Pod/Replica Counts
```yaml
columns:
  - name: desired_replicas
    type: number
  - name: ready_replicas
    type: number

mapping:
  desired_replicas: "row.properties.spec.replicas"
  ready_replicas: "row.properties.status.readyReplicas"
```

### Resource Quotas
```yaml
columns:
  - name: cpu_allocated
    type: number
    unit: "cores"
  - name: memory_allocated
    type: number
    unit: "GB"

mapping:
  cpu_allocated: "row.properties.cpu_limit / 1000"
  memory_allocated: "row.properties.memory_limit / 1024 / 1024 / 1024"
```

### Calculated Metrics
```yaml
columns:
  - name: average_response_time
    type: number
    unit: "ms"
    precision: 2

mapping:
  average_response_time: "row.total_response_time / row.request_count"
```

## Number Formatting

### Whole Numbers
```yaml
columns:
  - name: pod_count
    type: number
    precision: 0

mapping:
  pod_count: "row.properties.pod_count"
```

### Decimal Values
```yaml
columns:
  - name: cpu_usage
    type: number
    precision: 3
    unit: "cores"

mapping:
  cpu_usage: "row.properties.cpu_usage_cores"
```

## Filtering

Enable users to filter by numeric ranges or exact values:

```yaml
columns:
  - name: replica_count
    type: number
    filter:
      type: "number"  # Enables numeric filtering

mapping:
  replica_count: "row.properties.replicas"
```

## Real-World Examples

### Kubernetes Deployment Status
```yaml
columns:
  - name: deployment
    type: string
    primaryKey: true

  - name: desired_replicas
    type: number

  - name: ready_replicas
    type: number

  - name: available_replicas
    type: number

queries:
  deployments:
    configs:
      types: ["Kubernetes::Deployment"]

mapping:
  deployment: "row.name"
  desired_replicas: "row.properties.spec.replicas"
  ready_replicas: "row.properties.status.readyReplicas"
  available_replicas: "row.properties.status.availableReplicas"
```

### Database Connection Pool
```yaml
columns:
  - name: pool_name
    type: string
    primaryKey: true

  - name: total_connections
    type: number

  - name: active_connections
    type: number

  - name: idle_connections
    type: number

queries:
  pools:
    configs:
      types: ["Database::ConnectionPool"]

mapping:
  pool_name: "row.name"
  total_connections: "row.properties.max_connections"
  active_connections: "row.properties.active"
  idle_connections: "row.properties.idle"
```

### API Request Metrics
```yaml
columns:
  - name: endpoint
    type: string
    primaryKey: true

  - name: total_requests
    type: number
    unit: "requests"

  - name: error_rate_percent
    type: number
    unit: "%"
    precision: 2

  - name: avg_latency_ms
    type: number
    unit: "ms"
    precision: 1

queries:
  metrics:
    prometheus:
      connection: prod
      query: |
        {
          requests: increase(http_requests_total[1h]),
          errors: increase(http_errors_total[1h]),
          latency: histogram_quantile(0.95, http_request_duration_seconds)
        }
      columns:
        endpoint: string
        requests: number
        errors: number
        latency: decimal

mapping:
  endpoint: "row.endpoint"
  total_requests: "row.requests"
  error_rate_percent: "(row.errors / row.requests) * 100"
  avg_latency_ms: "row.latency * 1000"
```

## Comparison with Other Numeric Types

| Type | Use Case |
|------|----------|
| `number` | General numeric values (counts, ratios, metrics) |
| `decimal` | Precise floating-point values (costs, percentages) |
| `gauge` | Percentage or 0-100 values with visual gauge |
| `bytes` | Binary storage sizes (auto-formatted as KB, MB, GB) |
| `millicore` | CPU resources in millicores |

## Best Practices

1. **Use appropriate precision** - Don't display unnecessary decimal places
   ```yaml
   - name: replica_count
     type: number
     precision: 0  # No decimals needed for counts
   ```

2. **Add meaningful units** - Help users understand what they're viewing
   ```yaml
   - name: memory_mb
     type: number
     unit: "MB"
   ```

3. **Validate ranges** - Consider using `gauge` for percentage-like values
   ```yaml
   - name: health_score  # 0-100
     type: gauge  # Better than number
   ```

4. **Round appropriately** - Avoid very large or very small numbers
   ```yaml
   mapping:
     # ✓ Round to reasonable precision
     cpu_cores: "round(row.cpu_millis / 1000, 2)"

     # ✗ Too many decimals
     cpu_cores: "row.cpu_millis / 1000"
   ```

5. **Use negative values carefully** - Number can display negatives but document them
   ```yaml
   columns:
     - name: balance_change
       type: number
       description: "Positive = increase, Negative = decrease"
   ```

## Performance Considerations

- Numeric columns are very efficient
- Numeric filtering can be optimized with database indexes
- Avoid complex calculations for large datasets
- Consider pre-calculating values in queries when possible

## Null and Zero Handling

Numbers default to 0 if null. Use CEL expressions to handle special cases:

```yaml
mapping:
  # ✓ Handle null values
  count: "has(row.count) ? row.count : 0"

  # Display different text for zero
  status_text: "row.count == 0 ? 'No items' : string(row.count) + ' items'"
```
