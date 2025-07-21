---
title: Columns
sidebar_position: 2
sidebar_custom_props:
  icon: material-symbols:table-chart
---

Views support a rich set of column types that determine how data is displayed and formatted in your dashboards. Each column type provides specific formatting, validation, and visualization capabilities.

## Column Types

### String

Simple text data with no special formatting.

```yaml
columns:
  - name: application_name
    type: string
```

### Number

Numeric values with automatic formatting.

```yaml
columns:
  - name: replica_count
    type: number
```

### Boolean

True/false values displayed as checkmarks or status indicators.

```yaml
columns:
  - name: is_active
    type: boolean
```

### Datetime

Timestamp values with automatic date/time formatting.

```yaml
columns:
  - name: last_deployed
    type: datetime
```

### Duration

Time duration values with human-readable formatting (e.g., "2h 30m").

```yaml
columns:
  - name: uptime
    type: duration
```

### Health

Health status indicators with color-coded visual representation.

```yaml
columns:
  - name: component_health
    type: health
```

### Status

General status information with visual indicators.

```yaml
columns:
  - name: deployment_status
    type: status
```

### Decimal

Decimal numbers with configurable precision.

```yaml
columns:
  - name: cpu_usage
    type: decimal
```

### Bytes

Byte values with automatic unit conversion (B, KB, MB, GB).

```yaml
columns:
  - name: memory_usage
    type: bytes
```

### Millicore

CPU millicore values with proper formatting.

```yaml
columns:
  - name: cpu_request
    type: millicore
```

### Gauge

Rich gauge visualizations with thresholds and color coding.

```yaml
columns:
  - name: disk_usage
    type: gauge
    gauge:
      min: 0
      max: 100
      unit: '%'
      thresholds:
        - value: 70
          color: 'yellow'
        - value: 85
          color: 'orange'
        - value: 95
          color: 'red'
```

#### Gauge Properties

- `min`: Minimum value for the gauge
- `max`: Maximum value for the gauge
- `unit`: Unit to display (e.g., "%", "MB", "ms")
- `thresholds`: Array of threshold objects with `value` and `color`

## Primary Keys

```yaml
columns:
  - name: resource_id
    type: string
    primaryKey: true
  - name: namespace
    type: string
    primaryKey: true # Composite primary key
```

## Data Mapping

When mapping data to columns, ensure the source data matches the expected type:

```yaml title="database.yaml" file=<rootDir>/modules/mission-control/fixtures/views/database.yaml {20-29}
```
