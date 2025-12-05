---
title: View Table Selector Queries
sidebar_custom_props:
  icon: view-details
---

View table selectors reuse cached data from other views instead of hitting the original data sources again. They are ideal for composing dashboards, drilldowns, or summaries on top of existing views.

## Overview

- Query the materialized Postgres tables generated for other views
- Avoid re-running expensive source queries
- Compose multiple views together or build drill-downs
- Keep formatting and column types consistent with the source view

## Query Properties

| Property        | Type   | Description                                                                |
| --------------- | ------ | -------------------------------------------------------------------------- |
| `name`          | string | Name of the view to query                                                  |
| `namespace`     | string | Namespace of the view (default: `default`)                                 |
| `labelSelector` | string | Optional label selector to match multiple views (for composition by label) |

The selector returns **all rows** from the matched view tables. Shape or filter the data in your `merge` SQL or panel queries.

## Example: Summarize an Existing View

Aggregate the cached `deployments` view to show healthy vs unhealthy releases per namespace:

```yaml title="deployments-summary.yaml" file=<rootDir>/modules/mission-control/fixtures/views/deployments-summary.yaml {10-37}

```

## Tips

- Ensure the source view has cached data; the selector reads the Postgres table created for that view.
- Column types are inherited from the source view, so filters and formatting stay consistent.
- Use `labelSelector` when you want to stitch together multiple related views without hard-coding names.
- Apply filtering and limits in `merge` SQL or panel queries to keep selectors simple.
