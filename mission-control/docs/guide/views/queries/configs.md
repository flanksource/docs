---
title: Config Queries
sidebar_custom_props:
  icon: config
---

Config queries fetch configuration items from the Flanksource catalog.

## Query Properties

| Property        | Type    | Description                                             |
| --------------- | ------- | ------------------------------------------------------- |
| `types`         | array   | Config types to query (e.g., `["Kubernetes::Pod"]`)     |
| `search`        | string  | Free text search (supports `@order=` for sorting)       |
| `status`        | string  | Filter by status                                        |
| `health`        | string  | Filter by health status                                 |
| `tagSelector`   | string  | Filter by tags (e.g., `environment=prod,team=platform`) |
| `labelSelector` | string  | Filter by Kubernetes-style labels                       |
| `agent`         | string  | Filter by agent ID (use `all` for all agents)           |
| `limit`         | integer | Maximum results to return                               |

## Example

```yaml title="cronjobs.yaml" file=<rootDir>/modules/mission-control/fixtures/views/cronjobs.yaml {32-37}

```

## Auto-Mapped Columns

Config queries provide these columns:

- `id`, `name`, `type`, `namespace` - Core identifiers
- `status`, `health` - Current state
- `created_at`, `updated_at` - Timestamps
- `config` - Raw configuration (JSON)
- `properties`, `tags`, `labels` - Metadata
- `cost_total_1d`, `cost_total_7d`, `cost_total_30d` - Cost data
- `parent_id`, `parent_name`, `parent_type` - Relationships
