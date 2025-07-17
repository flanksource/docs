---
slug: /guide/views
title: Views
sidebar_position: 6
sidebar_custom_props:
  icon: view-details
---

Views are a powerful feature that allows you to create custom, dynamic dashboards from your Mission Control data. They enable you to transform and present data from various sources (configs, changes, metrics, etc.) in a structured, tabular format with rich visualizations.

## Overview

Views solve the challenge of creating custom dashboards and reports by providing:

- **Dynamic Data Aggregation**: Combine data from multiple sources using flexible query mechanisms
- **Rich Visualizations**: Display data with gauges, charts, status indicators, and more
- **Structured Schema**: Define column types and constraints for consistent data presentation
- **Real-time Updates**: Automatically refresh data based on configurable schedules
- **GitOps Integration**: Define views as Kubernetes Custom Resources for version control

## Key Features

### Data Sources
Views can query data from multiple sources:
- **Config Items**: Infrastructure components and configurations
- **Changes**: Configuration change tracking and audit data
- **Metrics**: Time-series data from Prometheus and other sources
- **Custom Queries**: SQL queries for complex data joins and transformations

### Column Types
Views support various column types for rich data presentation:
- `string` - Text data
- `number` - Numeric values
- `boolean` - True/false values
- `datetime` - Timestamp data
- `duration` - Time duration values
- `health` - Health status indicators with color coding
- `status` - Status information with visual indicators
- `gauge` - Gauge visualizations with thresholds
- `bytes` - Byte data with automatic formatting
- `decimal` - Decimal numbers with precision control
- `millicore` - CPU millicore values

### Visualization Panels
Generate interactive panels from your data:
- **Pie Charts**: Distribution visualizations with custom colors
- **Gauges**: Threshold-based metrics with min/max ranges
- **Number Displays**: Single metric displays with units
- **Tables**: Tabular data breakdowns
- **Text Displays**: Formatted text presentations

## How Views Work

Views follow a simple but powerful pattern:

1. **Define** your view schema with columns and data sources
2. **Query** data from multiple sources (configs, changes, metrics)
3. **Transform** the data using CEL expressions and mappings
4. **Present** the results in tables and visualizations
5. **Refresh** automatically based on your schedule

## Basic Example

Here's a simple view that shows deployment status:

```yaml title="deployments.yaml" file=<rootDir>/modules/mission-control/fixtures/views/deployments.yaml
```

This view creates a dashboard showing Helm releases with their current status, health, and deployment information.

## Advanced Features

### Multi-Source Queries
Views can combine data from multiple sources including configs, changes, and metrics. See the [Queries Guide](./queries) for detailed examples.

### Rich Visualizations
Create interactive panels with pie charts, gauges, and tables. The deployments example above shows pie charts for health and status distribution.

### Custom Panels
Generate visualization panels with aggregated data from your queries. Views support pie charts, gauges, number displays, and tables.

## Getting Started

1. **Define Your View**: Create a View Custom Resource with your desired schema
2. **Configure Data Sources**: Set up queries for configs, changes, or metrics
3. **Map Your Data**: Transform source data to match your column schema
4. **Deploy**: Apply your view to your Kubernetes cluster
5. **Access**: View your dashboard through the Mission Control UI

## Best Practices

- **Start Simple**: Begin with basic views and add complexity gradually
- **Use Primary Keys**: Define primary keys for efficient data updates
- **Leverage Types**: Use appropriate column types for better visualization
- **Regular Refresh**: Set appropriate refresh intervals for your data
- **Test Queries**: Validate your queries return expected data structures

## Next Steps

- Learn about [Column Types](./column-types) for rich data presentation
- Explore [Query Patterns](./queries) for advanced data aggregation
- See [Visualization Examples](./examples) for common use cases
- Check [API Reference](../../reference/views) for complete configuration options