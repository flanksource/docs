---
title: Queries
sidebar_position: 1
sidebar_custom_props:
  icon: material-symbols:query-stats
---

Views use a powerful query system to aggregate and transform data from multiple sources. You can query configuration items, changes, and metrics to populate your views.

## Query Types

### Config Queries

Query configuration items from your catalog:

```yaml title="deployments.yaml" file=<rootDir>/modules/mission-control/fixtures/views/deployments.yaml {54-60}

```

### Change Queries

Query configuration changes and audit data:

```yaml title="database.yaml" file=<rootDir>/modules/mission-control/fixtures/views/database.yaml {29-33}

```

### Metric Queries

Query time-series data from Prometheus and other sources. Metric queries are not yet implemented in the current version, but the structure would be:

```yaml title="database.yaml" file=<rootDir>/modules/mission-control/fixtures/views/panels/resource-usage.yaml {7-15}

```

## Multi-Source Queries

Views can combine data from different sources and use SQL queries in panels to aggregate and analyze the data:

```yaml title="pipelines.yaml" file=<rootDir>/modules/mission-control/fixtures/views/pipelines.yaml

```

This example shows:

- **Multiple query sources**: Combining workflow runs from changes
- **Panel queries**: Using SQL to aggregate repository data
- **CEL expressions**: Complex duration calculations in mappings
- **Data aggregation**: COUNT and AVG functions in panel queries
