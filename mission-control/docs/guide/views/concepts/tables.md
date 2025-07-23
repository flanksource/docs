---
title: Tables
sidebar_position: 2
sidebar_custom_props:
  icon: material-symbols:table-chart
---

A view can generate a single table. The table supports a rich set of column types that decide how data persists, displays, and formats in your dashboards.
Each column type provides specific formatting and visualization capabilities.

## Columns

Columns define the structure and data types of your view table. Each column has a name and type that determines how the data stores, displays, and formats in your dashboards.

:::info
Column names must be valid SQL identifiers as they map directly to table columns in the underlying database.
:::

### Column Properties

Each column definition supports several properties:

- `name`: Column name (must be a valid SQL identifier)
- `type`: Data type that determines formatting and visualization
- `primaryKey`: Whether this column is part of the primary key (default: false)
- `description`: Human-readable description of the column
- `hidden`: Whether to hide the column from the UI (default: false)
- `for`: Reference to another column this column provides data for (helper columns)
- `gauge`: Configuration for gauge visualization (only for `gauge` type)

### Column Types

#### `string`

Text data with no extra formatting.

```yaml
columns:
  - name: application_name
    type: string
    description: The name of the application
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
- `thresholds`: Array of threshold objects with `value` and `color`

#### `url`

URL values that render as clickable links.

```yaml
columns:
  - name: dashboard_link
    type: url
```

### Helper Columns

Helper columns are special columns that provide additional data for other columns without being rendered directly in the UI. They use the `for` field to reference the column they support.

The most common use case is providing URLs for other columns. When a column has a helper column of type `url`, the main column becomes clickable and links to the URL provided by the helper column.

```yaml
columns:
  - name: component_name
    type: string
    primaryKey: true
  - name: component_url
    type: url
    for: component_name # This URL will make component_name clickable
```

In this example:

- `component_name` displays as a regular string column
- `component_url` provides the URL data but doesn't render as a separate column
- When rendered, `component_name` becomes a clickable link using the URL from `component_url`

### Hidden Columns

Columns can be marked as `hidden: true` to prevent them from appearing as separate columns in the table while still being available for internal operations. Primary keys like UUIDs are good candidates to hide since they're needed for data operations but not useful for display.

```yaml
columns:
  - name: component_name
    type: string
  - name: component_id
    type: string
    primaryKey: true
    hidden: true
    description: Internal UUID for the component
```

### Primary Keys

Each view table must specify at least one column as the primary key. Primary keys support internal purposes including data `deduplication` and table operations. You can have multiple primary keys to create composite primary keys.

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

Data mapping defines how data from your query results gets transformed and assigned to specific table columns.

:::info
Mapping is **optional** - if not specified, Mission Control will automatically look for column names directly in the query results.
:::

### How Data Mapping Works

When Mission Control executes your queries, it returns raw data objects. For each column, the system:

1. **Checks for explicit mapping** → If a CEL expression is defined for the column
2. **Falls back to direct lookup** → Looks for the column name directly in the query results
3. **Defaults to null** → If neither mapping nor direct column name exists

The mapping section uses [CEL (Common Expression Language)](/reference/scripting/cel) expressions where the query result data is available as `row`.

### Mapping Behavior

#### Automatic Column Mapping

If no mapping is specified, columns are automatically populated from query results:

```yaml
columns:
  - name: name
    type: string
    primaryKey: true
  - name: status
    type: string
  - name: created_at
    type: datetime
# No mapping section needed - columns will be populated from query results automatically
```

#### Explicit Mapping

When you need data transformation or the column names don't match query results:

```yaml
mapping:
  name: row.component_name # Map from different field name
  status: row.health # Map from different field name
  created_at: row.created_at # Direct mapping (same as automatic)
```

### CEL Expression Context

In mapping expressions, query result data is available as `row`:

```yaml
mapping:
  database: row.name # Access top-level fields
  date: row.created_at # Direct field access
  status: row.details.status # Navigate nested objects
  source: row.source # Simple field mapping
```
