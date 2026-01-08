---
title: Changes
sidebar_custom_props:
  icon: octicon:diff-16
---

When you save a config item to Config DB, it tracks its changes. These changes come from external sources like Kubernetes events or Azure activities. Alternatively, Mission Control can automatically detect changes by comparing the old config with the new one.

Changes are of two types:

- Diff change
- Event based change

### Diff Change

Config DB generates these changes by comparing the old and new config values. The image below shows a change where the port value was modified from 8080 to 3000.

![Kubernetes Deployment Replica change](/img/config-changes.png)

### Event based change

External sources like Kubernetes Events and AWS CloudTrail provide these changes. Event-based changes have an associated type.

![Event-based config changes of a Kubernetes Pod](/img/event-based-config-changes.png)

See [Transformation Changes](./transform#changes).

## Extracting Changes

Custom scrapers can ingest changes from external systems when you enable the `full` option. This separates config data from change events in your source.

When `full: true` is set, the scraper expects each config item to have these top-level fields:

- `config` - The actual configuration data to store
- `changes` - An array of change events
- `access_logs` - Access log entries (see [Access Logs](/docs/guide/config-db/concepts/access-logs))

:::note
Fields other than these are ignored. Missing fields are treated as empty.
:::

### Example

Consider a file containing:

```json title="fixtures/data/car.json"
{
  "reg_no": "A123",
  "config": {
    "meta": "this is the actual config that'll be stored."
  },
  "changes": [
    {
      "change_type": "drive",
      "summary": "car color changed to blue",
      "created_at": "2025-01-01T10:00:00Z"
    }
  ],
  "access_logs": [
    {
      "external_user_id": "user-123",
      "created_at": "2025-01-01"
    }
  ]
}
```

With `full: true`:

```yaml
apiVersion: configs.flanksource.com/v1
kind: ScrapeConfig
metadata:
  name: file-scraper
spec:
  full: true
  file:
    - type: Car
      id: $.reg_no
      paths:
        - fixtures/data/car.json
```

The scraper stores only the `config` object:

```json
{
  "meta": "this is the actual config that'll be stored."
}
```

And records the change event separately on that config item.

### Change Schema

| Field                | Description                             | Scheme               |
| -------------------- | --------------------------------------- | -------------------- |
| `change_type`        | Type of the change                      | `string`             |
| `action`             | Action of the change                    | `delete` or `ignore` |
| `summary`            | Summary of the change                   | `string`             |
| `severity`           | Severity of the change                  | `string`             |
| `source`             | Source of the change                    | `string`             |
| `created_at`         | Creation time of the change             | `time.Time`          |
| `created_by`         | User who created the change             | `string`             |
| `external_change_id` | ID of the change in the external system | `string`             |
| `external_id`        | ID of the change                        | `string`             |
| `details`            | Additional details                      | `map[string]any`     |
| `diff`               | Diff of the change                      | `string`             |
| `patches`            | Patches of the change                   | `string`             |
