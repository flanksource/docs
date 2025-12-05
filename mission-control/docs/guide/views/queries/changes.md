---
title: Change Queries
sidebar_custom_props:
  icon: diff
---

Change queries retrieve the audit trail of modifications to configuration items.

## Query Properties

| Property      | Type    | Description                                                       |
| ------------- | ------- | ----------------------------------------------------------------- |
| `types`       | array   | Config types to get changes for                                   |
| `search`      | string  | Free text search (supports `change_type=` and `@order=` prefixes) |
| `tagSelector` | string  | Filter by tags of the affected config items                       |
| `severity`    | string  | Filter by severity (`info`, `warning`, `critical`)                |
| `agent`       | string  | Filter by specific agent                                          |
| `limit`       | integer | Maximum changes to return                                         |

## Example

```yaml title="pipelines.yaml" file=<rootDir>/modules/mission-control/fixtures/views/pipelines.yaml {57-63}

```

## Auto-Mapped Columns

Change queries provide these columns:

- `id` - Change identifier
- `config_id`, `config_name`, `config_type` - Affected resource
- `change_type` - Type of change (e.g., `Created`, `Updated`, `Deleted`)
- `severity` - Change severity
- `summary` - Human-readable summary
- `details` - Full change details (JSON)
- `created_at` - When the change was detected
- `tags`, `labels` - Tags/labels of the affected resource

## Search Syntax

```yaml
# Filter by change type
search: change_type=BackupSuccessful

# Ordering
search: "@order=-created_at"

# Combine
search: "change_type=GitHubActionRun* @order=-created_at"
```
