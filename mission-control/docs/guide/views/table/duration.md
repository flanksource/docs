---
title: Duration
sidebar_custom_props:
  icon: mdi:timer-outline
---

The `duration` column type displays time spans and durations in a human-readable format (e.g., "2h 30m", "1d").

## Basic Usage

```yaml
columns:
  - name: uptime
    type: duration
```

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | string | Column name (used in mapping) |
| `type` | string | Set to `"duration"` |
| `description` | string | Help text for column |
| `unit` | string | Default unit for display (optional) |
| `filter` | object | Enable filtering on this column |
| `card` | object | Configure card layout position |

## Example Usage

### Simple Duration Display

```yaml
columns:
  - name: build_time
    type: duration

mapping:
  build_time: "row.properties.build_duration"
```

### Duration from Timestamp Difference

```yaml
columns:
  - name: pod_age
    type: duration

mapping:
  pod_age: "now - row.created_at"
```

### Duration with Description

```yaml
columns:
  - name: sla_remaining
    type: duration
    description: "Time remaining for SLA compliance"

mapping:
  sla_remaining: "row.sla_deadline - now"
```

## Common Patterns

### Resource Lifecycle Durations
```yaml
columns:
  - name: uptime
    type: duration
    description: "Time since creation"

  - name: time_since_update
    type: duration
    description: "Time since last update"

mapping:
  uptime: "now - row.created_at"
  time_since_update: "now - row.updated_at"
```

### Process Execution Times
```yaml
columns:
  - name: build_time
    type: duration
  - name: deploy_time
    type: duration
  - name: total_time
    type: duration

mapping:
  build_time: "row.properties.build_end - row.properties.build_start"
  deploy_time: "row.properties.deploy_end - row.properties.deploy_start"
  total_time: "row.properties.deploy_end - row.properties.build_start"
```

### Time to Compliance
```yaml
columns:
  - name: sla_time_remaining
    type: duration
  - name: time_to_expiration
    type: duration

mapping:
  sla_time_remaining: "row.sla_deadline - now"
  time_to_expiration: "row.expires_at - now"
```

## Duration Formatting

Durations are automatically formatted for readability:
- `3600s` displays as `1h`
- `5400s` displays as `1h 30m`
- `86400s` displays as `1d`
- `2h 30m 45s` displays as written

## Real-World Examples

### Pod Uptime Monitoring
```yaml
columns:
  - name: pod_name
    type: string
    primaryKey: true

  - name: uptime
    type: duration
    description: "Time since pod started"

  - name: ready_duration
    type: duration
    description: "How long pod has been ready"

queries:
  pods:
    configs:
      types: ["Kubernetes::Pod"]

mapping:
  pod_name: "row.name"
  uptime: "now - row.created_at"
  ready_duration: "now - row.properties.status.conditions[0].lastTransitionTime"
```

### CI/CD Pipeline Metrics
```yaml
columns:
  - name: build_id
    type: string
    primaryKey: true

  - name: total_duration
    type: duration
    description: "Total build time"

  - name: compile_duration
    type: duration
    description: "Compilation time"

  - name: test_duration
    type: duration
    description: "Testing time"

  - name: deploy_duration
    type: duration
    description: "Deployment time"

queries:
  builds:
    configs:
      types: ["CI::BuildRun"]

mapping:
  build_id: "row.id"
  total_duration: "row.properties.end_time - row.properties.start_time"
  compile_duration: "row.properties.compile_end - row.properties.compile_start"
  test_duration: "row.properties.test_end - row.properties.test_start"
  deploy_duration: "row.properties.deploy_end - row.properties.deploy_start"
```

### Certificate Expiration Timeline
```yaml
columns:
  - name: certificate
    type: string
    primaryKey: true

  - name: age
    type: duration
    description: "Certificate age"

  - name: time_until_expiry
    type: duration
    description: "Time remaining before expiration"

  - name: renewal_window_open
    type: duration
    description: "Time until renewal window opens"

queries:
  certs:
    configs:
      types: ["Security::Certificate"]

mapping:
  certificate: "row.name"
  age: "now - row.properties.not_before"
  time_until_expiry: "row.properties.not_after - now"
  renewal_window_open: "(row.properties.not_after - duration('30d')) - now"
```

### Backup and Sync Operations
```yaml
columns:
  - name: backup_name
    type: string
    primaryKey: true

  - name: duration_seconds
    type: duration
    description: "How long backup took"

  - name: age
    type: duration
    description: "How old the backup is"

  - name: next_backup_in
    type: duration
    description: "Time until next backup"

queries:
  backups:
    configs:
      types: ["Backup::Job"]

mapping:
  backup_name: "row.name"
  duration_seconds: "row.properties.end_time - row.properties.start_time"
  age: "now - row.properties.completed_at"
  next_backup_in: "row.properties.next_scheduled - now"
```

### SLA Compliance Tracking
```yaml
columns:
  - name: incident_id
    type: string
    primaryKey: true

  - name: time_to_resolution
    type: duration
    description: "Total time to resolve"

  - name: sla_deadline
    type: datetime

  - name: time_to_deadline
    type: duration

queries:
  incidents:
    configs:
      types: ["Incident::Report"]

mapping:
  incident_id: "row.id"
  time_to_resolution: "row.properties.resolved_at - row.created_at"
  sla_deadline: "row.created_at + duration('4h')"
  time_to_deadline: "(row.created_at + duration('4h')) - now"
```

## Duration Expressions in CEL

### Creating Durations
```yaml
mapping:
  # Using duration literal
  timeout: "duration('5m')"

  # Common durations
  hour: "duration('1h')"
  day: "duration('24h')"
  week: "duration('168h')"

  # Custom calculations
  two_hours: "duration('2h')"
```

### Duration Calculations
```yaml
mapping:
  # Time difference
  elapsed: "now - row.start_time"

  # Add duration to time
  deadline: "now + duration('30d')"

  # Duration arithmetic
  total_time: "(row.end_time - row.start_time) + duration('5m')"
```

### Duration Comparisons
```yaml
mapping:
  is_old: "(now - row.created_at) > duration('90d')"
  is_urgent: "(row.deadline - now) < duration('1h')"
  requires_renewal: "(row.expires_at - now) < duration('30d')"
```

### Duration to Numeric Value
```yaml
mapping:
  # Convert to seconds
  seconds: "(now - row.created_at) / duration('1s')"

  # Convert to hours
  hours: "(now - row.created_at) / duration('1h')"

  # Convert to days
  days: "(now - row.created_at) / duration('24h')"
```

## Common Duration Values

These duration literals are commonly used in CEL:

```
1s      - 1 second
1m      - 1 minute
1h      - 1 hour
24h     - 1 day
168h    - 1 week
720h    - 1 month (30 days)
8760h   - 1 year (365 days)
```

Combine them:
```
1h30m   - 1 hour and 30 minutes
2h45m30s - 2 hours, 45 minutes, 30 seconds
```

## Best Practices

1. **Use meaningful names** - Duration columns should indicate what duration they represent
   ```yaml
   - name: uptime        # ✓ Clear
   - name: build_time    # ✓ Clear
   - name: duration      # ? Generic
   - name: time1         # ✗ Unclear
   ```

2. **Provide descriptions** - Explain what the duration measures
   ```yaml
   - name: uptime
     type: duration
     description: "Time since pod was created"
   ```

3. **Handle negative durations** - Document what negative means
   ```yaml
   - name: time_to_deadline
     type: duration
     description: "Positive = time remaining, Negative = overdue"
   ```

4. **Consider filtering** - Enable filtering for common durations
   ```yaml
   - name: pod_age
     type: duration
     filter:
      type: "duration"

   mapping:
     pod_age: "now - row.created_at"
   ```

5. **Order chronologically** - Present durations in logical order
   ```yaml
   - name: created_duration  # Oldest
   - name: modified_duration # More recent
   ```

## Comparison with Other Time Types

| Type | Use Case |
|------|----------|
| `duration` | Length of time (how long) |
| `datetime` | Specific point in time (when) |

Use `duration` for "how long did this take" or "how old is this". Use `datetime` for "when did this happen".

## Performance Considerations

- Duration columns are efficient to calculate and display
- Duration calculations in CEL expressions are fast
- No significant performance overhead

## Display Examples

How durations appear in the UI:
- `3600s` → `1h`
- `5400s` → `1h 30m`
- `90s` → `1m 30s`
- `86400s` → `1d`
- `604800s` → `7d`
- Negative durations might show as "Past" or display the difference

## Null Duration Handling

When duration is unknown or null:

```yaml
mapping:
  # Default to 0 if unknown
  duration: "has(row.duration) ? row.duration : duration('0s')"

  # Show as "Not available"
  duration: "has(row.duration) ? row.duration : null"
```
