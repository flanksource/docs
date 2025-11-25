---
title: Decimal
sidebar_custom_props:
  icon: mdi:decimal
---

The `decimal` column type displays precise floating-point numbers with configurable decimal places. Use it for calculated values, percentages, ratios, and other decimal numbers.

## Basic Usage

```yaml
columns:
  - name: cost_per_hour
    type: decimal
    precision: 2
```

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | string | Column name (used in mapping) |
| `type` | string | Set to `"decimal"` |
| `description` | string | Help text for column |
| `precision` | integer | Number of decimal places |
| `unit` | string | Display unit (e.g., "$", "%") |
| `filter` | object | Enable filtering on this column |
| `card` | object | Configure card layout position |

## Example Usage

### Cost Display

```yaml
columns:
  - name: monthly_cost
    type: decimal
    precision: 2
    unit: "$"

mapping:
  monthly_cost: "row.cost_total_30d"
```

### Percentage Calculation

```yaml
columns:
  - name: error_rate
    type: decimal
    precision: 2
    unit: "%"

mapping:
  error_rate: "(row.errors / row.total_requests) * 100"
```

### Ratio Display

```yaml
columns:
  - name: memory_ratio
    type: decimal
    precision: 3

mapping:
  memory_ratio: "row.used_memory / row.total_memory"
```

## Common Patterns

### Financial Calculations
```yaml
columns:
  - name: unit_price
    type: decimal
    precision: 2
    unit: "$"

  - name: total_price
    type: decimal
    precision: 2
    unit: "$"

mapping:
  unit_price: "row.properties.price"
  total_price: "row.properties.price * row.quantity"
```

### Performance Metrics
```yaml
columns:
  - name: response_time_avg
    type: decimal
    precision: 2
    unit: "ms"

  - name: throughput
    type: decimal
    precision: 1
    unit: "req/s"

mapping:
  response_time_avg: "row.total_response_time / row.request_count"
  throughput: "row.requests_per_second"
```

### Efficiency Metrics
```yaml
columns:
  - name: cache_hit_ratio
    type: decimal
    precision: 3

  - name: compression_ratio
    type: decimal
    precision: 2

mapping:
  cache_hit_ratio: "row.cache_hits / (row.cache_hits + row.cache_misses)"
  compression_ratio: "row.original_size / row.compressed_size"
```

## Real-World Examples

### Cost Analysis Dashboard
```yaml
columns:
  - name: resource_id
    type: string
    primaryKey: true

  - name: hourly_rate
    type: decimal
    precision: 4
    unit: "$"

  - name: daily_cost
    type: decimal
    precision: 2
    unit: "$"

  - name: monthly_cost
    type: decimal
    precision: 2
    unit: "$"

  - name: yearly_cost
    type: decimal
    precision: 2
    unit: "$"

queries:
  resources:
    configs:
      types: ["AWS::EC2Instance"]

mapping:
  resource_id: "row.id"
  hourly_rate: "row.properties.hourly_cost"
  daily_cost: "row.properties.hourly_cost * 24"
  monthly_cost: "row.cost_total_30d"
  yearly_cost: "row.cost_total_30d * 12"
```

### API Performance Metrics
```yaml
columns:
  - name: endpoint
    type: string
    primaryKey: true

  - name: avg_response_ms
    type: decimal
    precision: 2
    unit: "ms"

  - name: p95_response_ms
    type: decimal
    precision: 2
    unit: "ms"

  - name: p99_response_ms
    type: decimal
    precision: 2
    unit: "ms"

  - name: error_rate_percent
    type: decimal
    precision: 3
    unit: "%"

queries:
  metrics:
    prometheus:
      connection: prod
      query: |
        {
          avg: http_request_duration_seconds,
          p95: histogram_quantile(0.95, http_request_duration_seconds),
          p99: histogram_quantile(0.99, http_request_duration_seconds),
          errors: rate(http_errors_total[5m])
        }
      columns:
        endpoint: string
        avg: decimal
        p95: decimal
        p99: decimal
        errors: decimal

mapping:
  endpoint: "row.endpoint"
  avg_response_ms: "row.avg * 1000"
  p95_response_ms: "row.p95 * 1000"
  p99_response_ms: "row.p99 * 1000"
  error_rate_percent: "row.errors * 100"
```

### Database Performance Metrics
```yaml
columns:
  - name: query_name
    type: string
    primaryKey: true

  - name: avg_duration_ms
    type: decimal
    precision: 2
    unit: "ms"

  - name: avg_cpu_percent
    type: decimal
    precision: 1
    unit: "%"

  - name: avg_memory_mb
    type: decimal
    precision: 1
    unit: "MB"

queries:
  queries:
    configs:
      types: ["Database::QueryStatistic"]

mapping:
  query_name: "row.name"
  avg_duration_ms: "row.properties.avg_duration_ms"
  avg_cpu_percent: "row.properties.avg_cpu_percent"
  avg_memory_mb: "row.properties.avg_memory_bytes / 1024 / 1024"
```

### Resource Efficiency Report
```yaml
columns:
  - name: resource_name
    type: string
    primaryKey: true

  - name: requested_cpu
    type: decimal
    precision: 2
    unit: " cores"

  - name: actual_cpu_avg
    type: decimal
    precision: 2
    unit: " cores"

  - name: utilization_percent
    type: decimal
    precision: 1
    unit: "%"

  - name: waste_factor
    type: decimal
    precision: 2

mapping:
  resource_name: "row.name"
  requested_cpu: "row.properties.cpu_request / 1000"
  actual_cpu_avg: "row.properties.cpu_avg / 1000"
  utilization_percent: "(row.properties.cpu_avg / row.properties.cpu_request) * 100"
  waste_factor: "row.properties.cpu_request / row.properties.cpu_avg"
```

## Decimal Expressions in CEL

### Simple Division
```yaml
mapping:
  ratio: "row.used / row.total"
  percentage: "(row.used / row.total) * 100"
```

### Rounding
```yaml
mapping:
  # Round to 2 decimal places
  price: "round(row.calculated_price, 2)"

  # Round to nearest 0.5
  rating: "round(row.score * 2) / 2"
```

### Conditional Decimals
```yaml
mapping:
  adjusted_rate: "
    row.tier == 'enterprise' ? row.base_rate * 0.9 :
    row.tier == 'premium' ? row.base_rate * 0.95 :
    row.base_rate
  "
```

### Range Normalization
```yaml
mapping:
  # Normalize to 0-1 range
  normalized: "(row.value - row.min) / (row.max - row.min)"

  # Clamp between 0 and 1
  clamped: "min(max(row.value / row.max, 0), 1)"
```

## Precision Guidelines

Choose precision based on your data:

```yaml
# Currency (cents)
precision: 2
unit: "$"

# Percentages (0.01%)
precision: 2
unit: "%"

# Time (milliseconds)
precision: 2
unit: "ms"

# Ratios (0.001)
precision: 3

# Scientific values
precision: 4 or more
```

## Real-World Precision Examples

### Unit Price
```yaml
- name: unit_price
  type: decimal
  precision: 2
  unit: "$"
# Display: $19.99, $99.99
```

### Efficiency Ratio
```yaml
- name: efficiency
  type: decimal
  precision: 3
# Display: 0.950, 0.987, 1.025
```

### Response Time
```yaml
- name: response_time_ms
  type: decimal
  precision: 2
  unit: "ms"
# Display: 125.43ms, 1250.80ms
```

### Error Rate
```yaml
- name: error_rate_percent
  type: decimal
  precision: 3
  unit: "%"
# Display: 0.123%, 5.456%, 25.000%
```

## Filtering

Enable users to filter by numeric ranges:

```yaml
columns:
  - name: cost_per_month
    type: decimal
    filter:
      type: "range"

mapping:
  cost_per_month: "row.cost_total_30d"
```

## Comparison with Other Numeric Types

| Type | Use Case |
|------|----------|
| `decimal` | Precise floating-point (costs, percentages, ratios) |
| `number` | Integer or decimal counts |
| `gauge` | Percentage 0-100 with visual gauge |
| `bytes` | Storage sizes with auto-formatting |

Use `decimal` for precise calculations. Use `number` for counts. Use `gauge` for percentages with visualization.

## Performance Considerations

- Decimal columns are very efficient
- Decimal calculations in CEL are fast
- Can handle large datasets
- Minimal UI rendering overhead

## Null/Zero Handling

```yaml
mapping:
  # Default to 0 if unknown
  rate: "has(row.rate) ? row.rate : 0"

  # Show as "N/A" if not applicable
  ratio: "row.total > 0 ? row.used / row.total : null"

  # Prevent division by zero
  percentage: "row.total > 0 ? (row.used / row.total) * 100 : 0"
```

## Unit Display

Units display after the value:
- `19.99 $` (currency)
- `125.43 ms` (milliseconds)
- `0.987` (ratio, no unit)
- `45.50 %` (percentage)

Configure with the `unit` property in your column definition.

## Common Decimal Calculations

### Percentage
```yaml
mapping:
  percent: "(row.value / row.total) * 100"
```

### Ratio
```yaml
mapping:
  ratio: "row.value / row.target"
```

### Moving Average
```yaml
mapping:
  avg: "(row.sum_1d / row.count_1d)"
```

### Growth Rate
```yaml
mapping:
  growth: "((row.current - row.previous) / row.previous) * 100"
```

### Cost Projection
```yaml
mapping:
  monthly_estimate: "row.daily_cost * 30"
```

## Best Practices

1. **Set appropriate precision** - Match your data accuracy
   ```yaml
   # ✓ Currency needs 2 decimal places
   precision: 2
   unit: "$"

   # ✗ Too many decimals for currency
   precision: 5
   ```

2. **Include units** - Make values understandable
   ```yaml
   # ✓ Clear what unit represents
   unit: "$"
   unit: "%"
   unit: "ms"

   # ✗ No context
   unit: ""
   ```

3. **Prevent division by zero** - Use conditional logic
   ```yaml
   mapping:
     ratio: "row.denominator > 0 ? row.numerator / row.denominator : 0"
   ```

4. **Round appropriately** - Use round() for display
   ```yaml
   mapping:
     price: "round(row.calculated, 2)"  # Always 2 decimal places
   ```

5. **Document calculations** - Add descriptions
   ```yaml
   - name: utilization_percent
     type: decimal
     precision: 1
     unit: "%"
     description: "Actual usage divided by requested resources"
   ```
