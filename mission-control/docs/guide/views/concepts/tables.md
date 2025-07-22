---
title: Tables
sidebar_position: 2
sidebar_custom_props:
  icon: material-symbols:table-chart
---

A view can generate a single table. The table supports a rich set of column types that determine how data is persisted, displayed, and formatted in your dashboards.
Each column type provides specific formatting and visualization capabilities.

## Columns

Columns define the structure and data types of your view table. Each column has a name and type that determines how the data is stored, displayed, and formatted in your dashboards.

:::info
Column names must be valid SQL identifiers as they map directly to table columns in the underlying database.
:::

### Column Types

#### `string`

Text data with no additional formatting.

```yaml
columns:
  - name: application_name
    type: string
```

#### `number`

Numeric values with automatic formatting.

```yaml
columns:
  - name: replica_count
    type: number
```

#### `boolean`

True/false values displayed as checkmarks or status indicators.

```yaml
columns:
  - name: is_active
    type: boolean
```

#### `datetime`

Timestamp values with automatic date/time formatting.

```yaml
columns:
  - name: last_deployed
    type: datetime
```

#### `duration`

Time duration values with human-readable formatting (e.g., "2h 30m").

```yaml
columns:
  - name: uptime
    type: duration
```

#### `health`

Health status indicators with color-coded visual representation.

```yaml
columns:
  - name: component_health
    type: health
```

#### `status`

General status information with visual indicators.

```yaml
columns:
  - name: deployment_status
    type: status
```

#### `decimal`

Decimal numbers with configurable precision.

```yaml
columns:
  - name: cpu_usage
    type: decimal
```

#### `bytes`

Byte values with automatic unit conversion (B, KB, MB, GB).

```yaml
columns:
  - name: memory_usage
    type: bytes
```

#### `millicore`

CPU `millicore` values with proper formatting.

```yaml
columns:
  - name: cpu_request
    type: millicore
```

#### `gauge`

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

##### Gauge Properties

- `min`: Minimum value for the gauge
- `max`: Maximum value for the gauge
- `unit`: Unit to display (e.g., "%", "MB", "ms")
- `thresholds`: Array of threshold objects with `value` and `color`

### Primary Keys

Each view table must specify at least one column as the primary key. Primary keys are used for internal purposes including data `deduplication` and table operations. You can have multiple primary keys to create composite primary keys.

#### Single Primary Key

```yaml
columns:
  - name: pod_name
    type: string
    primaryKey: true
  - name: namespace
    type: string
  - name: status
    type: string
```

#### Composite Primary Keys

When you need multiple columns to uniquely identify a row:

```yaml
columns:
  - name: pod_name
    type: string
    primaryKey: true # First part of composite key
  - name: namespace
    type: string
    primaryKey: true # Second part of composite key
  - name: status
    type: string
```

## Data Mapping

Data mapping is the bridge between your query results and your table structure. It defines how data from your queries gets transformed and assigned to specific table columns. This mapping is essential for tables, as it determines what data appears in each column of your view.

### How Data Mapping Works

When Mission Control executes your queries, it returns raw data objects. The mapping section uses CEL (Common Expression Language) expressions to extract and transform this data into your table columns.

The basic flow is:

1. **Query execution** → Returns data objects (referenced as `row`)
2. **Mapping evaluation** → CEL expressions extract values from `row`
3. **Column population** → Extracted values fill your table columns

### Basic Mapping

Here's an example from the database backup view showing how to map query results to table columns:

```yaml title="database.yaml" file=<rootDir>/modules/mission-control/fixtures/views/database.yaml {25-29}

```

In this example:

- `row.name` extracts the `name` field from each query result into the `database` column
- `row.created_at` maps the creation timestamp into the `date` column
- `row.details.status` navigates into nested objects to get the backup status and maps it to the `status` column
- `row.source` directly maps the source field into the `source` column
