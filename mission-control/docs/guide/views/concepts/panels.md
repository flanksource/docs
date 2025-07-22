---
title: Panels
sidebar_position: 3
sidebar_custom_props:
  icon: material-symbols:dashboard
---

Views support different panel types for visualizing aggregated data.
Panels create interactive visualizations from your data sources and you can configure them with various display options.

## Panel Types

Views support the following panel types:

- `piechart` - Pie chart visualizations for distribution analysis
- `table` - Tabular data presentations
- `number` - Single metric displays with units
- `gauge` - Gauge visualizations with thresholds

## Basic Panel Structure

All panels share a common structure. Here's an example from the gauge panel fixture:

```yaml title="gauge.yaml" file=<rootDir>/modules/mission-control/fixtures/views/panels/gauge.yaml

```

## Panel Configuration

### Pie Chart

Pie charts show data distribution across categories:

```yaml title="piechart.yaml" file=<rootDir>/modules/mission-control/fixtures/views/panels/piechart.yaml

```

#### Pie Chart Properties

- `showLabels`: Display labels on pie slices
- `colors`: Custom color mapping for categories

### Gauge

Gauges display metrics with threshold-based color coding:

```yaml title="gauge.yaml" file=<rootDir>/modules/mission-control/fixtures/views/panels/gauge.yaml

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

```yaml title="number.yaml" file=<rootDir>/modules/mission-control/fixtures/views/panels/number.yaml

```

#### Number Properties

- `unit`: Display unit (e.g., "seconds", "MB", "%")
- `precision`: Number of decimal places

### Table

Tables display aggregated data in rows and columns:

```yaml title="table.yaml" file=<rootDir>/modules/mission-control/fixtures/views/panels/table.yaml

```

## Panel Queries

Panels use SQL queries to aggregate data from the view's named queries. Each panel executes its SQL query against the data sources defined in the view's `queries` section.

### Query Structure

Panels reference query names as tables in SQL. Here's how the gauge example works:

```yaml title="gauge.yaml" file=<rootDir>/modules/mission-control/fixtures/views/panels/gauge.yaml

```
