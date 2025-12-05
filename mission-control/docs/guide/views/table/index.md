---
slug: /guide/table
title: Table
sidebar_position: 6
sidebar_custom_props:
  icon: view-details
---

Tables are the primary way to explore view data in Mission Control. They render rows from your queries, apply mappings, and drive filters, cards, and links into configs or other views.

## When to Use

- You need sortable, filterable rows for configs, changes, or metrics.
- You want to mix multiple data sources into one grid via SQL `merge`.
- You want card layouts (titles, subtitles, gauges) backed by the same table data.

## Anatomy of a Table View

- **columns**: Define the schema and rendering (type, filters, card placement, URLs).
- **queries**: Pull data from configs, changes, Prometheus, SQL, or other views.
- **merge**: Optional SQL to join multiple queries into one result set.
- **mapping**: Optional CEL to reshape query fields into your columns.
- **templating**: Variables used inside queries and filters for user-scoped data.

## Example: Namespace Table

This view shows how card positioning, gauges, and filters are driven by columns:

```yaml title="namespace.yaml" file=<rootDir>/modules/mission-control/fixtures/views/namespace.yaml {7-66}

```

### Joining Multiple Data Sources

Use `merge` to combine configs with Prometheus metrics into one table:

```yaml title="namespace.yaml" file=<rootDir>/modules/mission-control/fixtures/views/namespace.yaml {85-114}

```

## Best Practices

- Always set `primaryKey` on at least one column (composite keys allowed).
- Prefer `mapping` to normalize field names and units (e.g., bytes, millicores).
- Keep `merge` focused on shaping/joins; leave presentation to columns.
- Enable `filter.type: multiselect` on columns users need to slice without refresh.
- Use templated variables for scoping (e.g., cluster/namespace) instead of hard-coding tags.
