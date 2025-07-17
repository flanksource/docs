---
title: Panel Types
sidebar_position: 3
sidebar_custom_props:
  icon: material-symbols:dashboard
---

Views support different panel types for visualizing aggregated data. Panels create interactive visualizations from your data sources and can be configured with various display options.

## Panel Types

Views support the following panel types:

- `piechart` - Pie chart visualizations for distribution analysis
- `table` - Tabular data presentations
- `number` - Single metric displays with units
- `gauge` - Gauge visualizations with thresholds

## Basic Panel Structure

All panels share a common structure:

```yaml
panels:
  - name: 'Panel Name'
    description: 'Panel description'
    type: piechart
    source: configs
    query:
      # Query configuration
```

## Panel Configuration

### Piechart

Pie charts show data distribution across categories:

```yaml
panels:
  - name: 'Health Distribution'
    description: 'Services grouped by health status'
    type: piechart
    source: configs
    piechart:
      showLabels: true
      colors:
        healthy: '#28C19B'
        unhealthy: '#F04E6E'
        warning: '#F4B23C'
    query:
      groupBy:
        - health
      aggregates:
        - function: COUNT
          alias: count
          field: '*'
      types:
        - 'Kubernetes::Service'
```

#### Piechart Properties

- `showLabels`: Display labels on pie slices
- `colors`: Custom color mapping for categories

### Gauge

Gauges display metrics with threshold-based color coding:

```yaml
panels:
  - name: 'Resource Usage'
    description: 'CPU usage percentage'
    type: gauge
    source: configs
    gauge:
      min: 0
      max: 100
      thresholds:
        - value: 70
          color: yellow
        - value: 90
          color: red
    query:
      groupBy:
        - type
      aggregates:
        - function: COUNT
          alias: value
          field: '*'
```

#### Gauge Properties

- `min`: Minimum value for the gauge
- `max`: Maximum value for the gauge
- `thresholds`: Array of threshold objects with `value` and `color`

#### Supported Threshold Colors

- `green` - Success/healthy state
- `yellow` - Warning state
- `red` - Critical/error state
- `blue` - Info state
- Custom hex colors (e.g., `#28C19B`)

### Number

Number panels display single metrics with units:

```yaml
panels:
  - name: 'Average Duration'
    description: 'Average pipeline duration'
    type: number
    source: changes
    number:
      unit: seconds
      precision: 2
    query:
      search: change_type=PipelineRun
      aggregates:
        - function: AVG
          alias: value
          field: 'duration'
```

#### Number Properties

- `unit`: Display unit (e.g., "seconds", "MB", "%")
- `precision`: Number of decimal places

### Table

Tables display aggregated data in rows and columns:

```yaml
panels:
  - name: 'Repository Activity'
    type: table
    source: changes
    query:
      search: change_type=GitHubActionRun
      groupBy:
        - repository
      aggregates:
        - function: COUNT
          alias: runs
          field: '*'
        - function: AVG
          alias: avg_duration
          field: 'duration'
```

## Data Sources

Panels support two main data sources:

### Config Source (`configs`)

Query configuration items from your catalog:

```yaml
source: configs
query:
  types:
    - 'Kubernetes::Deployment'
    - 'Kubernetes::Service'
  groupBy:
    - namespace
  aggregates:
    - function: COUNT
      alias: count
      field: '*'
```

### Change Source (`changes`)

Query change tracking and audit data:

```yaml
source: changes
query:
  search: change_type=GitHubActionRun
  types:
    - 'GitHubAction::Workflow'
  groupBy:
    - repository
  aggregates:
    - function: COUNT
      alias: runs
      field: '*'
```

## Query Configuration

### Aggregation Functions

- `COUNT` - Count of items
- `AVG` - Average value
- `SUM` - Sum of values
- `MIN` - Minimum value
- `MAX` - Maximum value

### Grouping and Filtering

- `groupBy`: Array of fields to group results by
- `types`: Filter by resource types
- `search`: Search query string
- `tagSelector`: Tag-based filtering
- `labelSelector`: Label-based filtering
