---
title: DateTime
sidebar_custom_props:
  icon: mdi:calendar-clock
---

The `datetime` column type displays timestamp values formatted as human-readable dates and times.

## Basic Usage

```yaml
columns:
  - name: created_at
    type: datetime
```

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | string | Column name (used in mapping) |
| `type` | string | Set to `"datetime"` |
| `description` | string | Help text for column |
| `filter` | object | Enable filtering on this column |
| `card` | object | Configure card layout position |

## Example Usage

### Simple Timestamp Display

```yaml
columns:
  - name: created_at
    type: datetime

mapping:
  created_at: "row.created_at"
```

### DateTime from Calculation

```yaml
columns:
  - name: last_updated
    type: datetime

mapping:
  last_updated: "row.updated_at"
```

### DateTime with Description

```yaml
columns:
  - name: deployment_time
    type: datetime
    description: "When this resource was deployed"

mapping:
  deployment_time: "row.properties.deployment_timestamp"
```

## Common Patterns

### Resource Lifecycle Timestamps
```yaml
columns:
  - name: created_at
    type: datetime
  - name: updated_at
    type: datetime
  - name: deleted_at
    type: datetime

mapping:
  created_at: "row.created_at"
  updated_at: "row.updated_at"
  deleted_at: "row.deleted_at"
```

### Event Timeline
```yaml
columns:
  - name: event_time
    type: datetime
  - name: acknowledged_at
    type: datetime
  - name: resolved_at
    type: datetime

mapping:
  event_time: "row.event_timestamp"
  acknowledged_at: "row.acknowledgment_timestamp"
  resolved_at: "row.resolution_timestamp"
```

### Calculated Timestamps
```yaml
columns:
  - name: last_check
    type: datetime

mapping:
  # Last time status was checked (from metrics)
  last_check: "row.properties.last_status_check_time"
```

## DateTime Formatting

The platform automatically formats datetime values. Examples:
- `2024-01-15T10:30:00Z` displays as `Jan 15, 2024 10:30 AM`
- Time zone information is preserved
- Relative times may be shown ("2 hours ago")

## Real-World Examples

### Pod Event Timeline
```yaml
columns:
  - name: pod_name
    type: string
    primaryKey: true

  - name: created_at
    type: datetime
    description: "Pod creation time"

  - name: ready_since
    type: datetime
    description: "When pod became ready"

  - name: last_transition
    type: datetime
    description: "Last status change"

queries:
  pods:
    configs:
      types: ["Kubernetes::Pod"]

mapping:
  pod_name: "row.name"
  created_at: "row.created_at"
  ready_since: "row.properties.status.conditions[0].lastTransitionTime"
  last_transition: "row.updated_at"
```

### Deployment History
```yaml
columns:
  - name: deployment
    type: string
    primaryKey: true

  - name: deployed_at
    type: datetime
    description: "Deployment time"

  - name: image_built_at
    type: datetime
    description: "Container image build time"

  - name: last_update
    type: datetime

queries:
  deployments:
    configs:
      types: ["Kubernetes::Deployment"]

mapping:
  deployment: "row.name"
  deployed_at: "row.created_at"
  image_built_at: "row.properties.image_build_time"
  last_update: "row.updated_at"
```

### Certificate Expiration Tracking
```yaml
columns:
  - name: certificate_name
    type: string
    primaryKey: true

  - name: issued_at
    type: datetime
    description: "Issue date"

  - name: expires_at
    type: datetime
    description: "Expiration date"

  - name: last_renewed
    type: datetime

queries:
  certs:
    configs:
      types: ["Security::Certificate"]

mapping:
  certificate_name: "row.name"
  issued_at: "row.properties.not_before"
  expires_at: "row.properties.not_after"
  last_renewed: "row.properties.renewal_timestamp"
```

### Change Audit Trail
```yaml
columns:
  - name: change_id
    type: string
    primaryKey: true
    hidden: true

  - name: resource
    type: string

  - name: changed_at
    type: datetime
    description: "When change occurred"

  - name: first_seen
    type: datetime

  - name: last_seen
    type: datetime

queries:
  changes:
    changes:
      types: ["Kubernetes::Pod"]
      limit: 100

mapping:
  change_id: "row.id"
  resource: "row.config_name"
  changed_at: "row.created_at"
  first_seen: "row.first_seen_at"
  last_seen: "row.last_seen_at"
```

### System Events Timeline
```yaml
columns:
  - name: event_id
    type: string
    primaryKey: true
    hidden: true

  - name: event_type
    type: string

  - name: resource
    type: string

  - name: occurred_at
    type: datetime

  - name: logged_at
    type: datetime

queries:
  events:
    configs:
      types: ["System::Event"]

mapping:
  event_id: "row.id"
  event_type: "row.properties.event_type"
  resource: "row.properties.affected_resource"
  occurred_at: "row.properties.event_time"
  logged_at: "row.created_at"
```

## DateTime Filtering

Enable users to filter by date ranges:

```yaml
columns:
  - name: created_at
    type: datetime
    filter:
      type: "date"

mapping:
  created_at: "row.created_at"
```

Users can then filter to show:
- Items created before a date
- Items created after a date
- Items created within a date range

## DateTime Expressions in CEL

### Creating DateTime Values
```yaml
mapping:
  # Use timestamp conversion
  event_time: "timestamp('2024-01-15T10:30:00Z')"

  # Current time
  now_time: "now"
```

### DateTime Calculations
```yaml
mapping:
  # Age in days
  age_days: "(now - row.created_at) / duration('24h')"

  # Is old (created more than 90 days ago)
  is_old: "row.created_at < now - duration('90d')"

  # Days until expiration
  days_until_expiry: "(row.expires_at - now) / duration('24h')"
```

### DateTime Comparisons
```yaml
mapping:
  is_recent: "row.created_at > now - duration('7d')"
  is_expired: "row.expires_at < now"
  is_coming_due: "row.expires_at > now && row.expires_at < now + duration('30d')"
```

## Best Practices

1. **Use meaningful names** - DateTime columns should indicate time aspect
   ```yaml
   - name: created_at      # ✓ Clear
   - name: last_updated    # ✓ Clear
   - name: timestamp       # ✓ Acceptable
   - name: time1           # ✗ Unclear
   ```

2. **Provide descriptions** - Explain what the timestamp represents
   ```yaml
   - name: created_at
     type: datetime
     description: "When this resource was first created"
   ```

3. **Show timezone** - Include timezone info when relevant
   ```yaml
   - name: created_at
     type: datetime
     description: "Creation time (UTC)"
   ```

4. **Order chronologically** - Present timestamps in logical time order
   ```yaml
   - name: created_at
     type: datetime
   - name: updated_at
     type: datetime
   - name: deleted_at
     type: datetime
   ```

5. **Handle null timestamps** - Default gracefully when time is unknown
   ```yaml
   mapping:
     deleted_at: "has(row.deleted_at) ? row.deleted_at : null"
   ```

## Comparison with Other Time Types

| Type | Use Case |
|------|----------|
| `datetime` | Specific point in time (when something happened) |
| `duration` | Length of time (how long something took) |

Use `datetime` for "when" questions. Use `duration` for "how long" questions.

## Performance Considerations

- DateTime columns are efficient to store and retrieve
- DateTime filtering can be optimized with proper indexing
- DateTime calculations in CEL are fast
- No significant performance overhead for datetime operations

## Timezone Handling

- All datetimes are stored in UTC internally
- Display timezone depends on user's local settings
- When querying, assume UTC times in database
- CEL expressions work with UTC values

## Auto-Generated Fields

Many resources automatically provide:
- `created_at` - When resource was created
- `updated_at` - Last modification time
- `deleted_at` - When resource was deleted (if deleted)

These are available directly from `row.created_at`, `row.updated_at`, etc.

## Relative Time Display

The UI may display datetime values as:
- Absolute: "Jan 15, 2024 10:30 AM"
- Relative: "2 hours ago"
- Combined: "Jan 15, 2024 10:30 AM (2 hours ago)"

The exact display format depends on UI configuration.
