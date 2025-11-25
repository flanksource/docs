---
title: Status
sidebar_custom_props:
  icon: mdi:list-status
---

The `status` column type displays custom status badges for any status values. Unlike `health` which is limited to three states, `status` supports any custom status string.

## Basic Usage

```yaml
columns:
  - name: pod_status
    type: status
```

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | string | Column name (used in mapping) |
| `type` | string | Set to `"status"` |
| `description` | string | Help text for column |
| `filter` | object | Enable filtering on this column |
| `card` | object | Configure card layout position |

## Example Usage

### Direct Status Property

```yaml
columns:
  - name: status
    type: status

mapping:
  status: "row.status"
```

### Status from Custom Field

```yaml
columns:
  - name: deployment_status
    type: status

mapping:
  deployment_status: "row.properties.deployment_state"
```

### Status from Condition

```yaml
columns:
  - name: build_status
    type: status

mapping:
  build_status: "row.properties.result == 0 ? 'success' : 'failed'"
```

## Common Patterns

### Kubernetes Pod States
```yaml
mapping:
  status: "row.status"  # pending, running, succeeded, failed, unknown
```

### Build/Deployment States
```yaml
mapping:
  status: "row.properties.state"  # created, running, succeeded, failed, cancelled
```

### Replica States
```yaml
mapping:
  status: "row.desired == row.ready ? 'ready' : row.ready > 0 ? 'updating' : 'not-ready'"
```

### Custom Status Values
```yaml
mapping:
  status: "row.properties.status"  # Can be any string
```

## Real-World Examples

### Pod Status Display
```yaml
columns:
  - name: pod_name
    type: string
    primaryKey: true

  - name: status
    type: status
    description: "Current pod state"

queries:
  pods:
    configs:
      types: ["Kubernetes::Pod"]

mapping:
  pod_name: "row.name"
  status: "row.status"  # pending, running, succeeded, failed, unknown
```

### Build Pipeline Status
```yaml
columns:
  - name: build_id
    type: string
    primaryKey: true

  - name: status
    type: status
    description: "Build state"

  - name: stage
    type: status
    description: "Current stage"

queries:
  builds:
    configs:
      types: ["CI::Build"]

mapping:
  build_id: "row.id"
  status: "row.properties.state"  # created, queued, running, succeeded, failed
  stage: "row.properties.current_stage"  # build, test, deploy
```

### Deployment Rollout Status
```yaml
columns:
  - name: deployment
    type: string
    primaryKey: true

  - name: status
    type: status
    description: "Rollout status"

  - name: desired_replicas
    type: number

  - name: ready_replicas
    type: number

queries:
  deployments:
    configs:
      types: ["Kubernetes::Deployment"]

mapping:
  deployment: "row.name"
  status: "row.desired == row.ready ? 'ready' : row.ready > 0 ? 'updating' : 'pending'"
  desired_replicas: "row.properties.spec.replicas"
  ready_replicas: "row.properties.status.readyReplicas"
```

### Database Migration Status
```yaml
columns:
  - name: migration_id
    type: string
    primaryKey: true

  - name: database
    type: string

  - name: status
    type: status
    description: "Migration state"

queries:
  migrations:
    configs:
      types: ["Database::Migration"]

mapping:
  migration_id: "row.id"
  database: "row.properties.database_name"
  status: "row.properties.state"  # pending, running, succeeded, failed, rolled_back
```

### Job Execution Status
```yaml
columns:
  - name: job_id
    type: string
    primaryKey: true

  - name: job_name
    type: string

  - name: status
    type: status
    description: "Job execution status"

  - name: attempt
    type: number

queries:
  jobs:
    configs:
      types: ["Job::Run"]

mapping:
  job_id: "row.id"
  job_name: "row.name"
  status: "row.properties.execution_status"  # pending, running, succeeded, failed, skipped
  attempt: "row.properties.attempt_number"
```

## Complex Status Logic

### Multi-Step Status Determination
```yaml
columns:
  - name: resource
    type: string
    primaryKey: true

  - name: status
    type: status

mapping:
  status: "
    row.properties.state == 'error' ? 'error' :
    row.properties.state == 'pending' ? 'pending' :
    !row.properties.is_configured ? 'not-configured' :
    !row.properties.is_healthy ? 'degraded' :
    'ready'
  "
```

### Status from Resource Type
```yaml
mapping:
  status: "
    row.type == 'Kubernetes::Pod' ? row.status :
    row.type == 'Kubernetes::Deployment' ? (row.desired == row.ready ? 'ready' : 'updating') :
    row.type == 'Kubernetes::Node' ? (row.is_ready ? 'ready' : 'not-ready') :
    'unknown'
  "
```

## Status Filtering

Enable users to filter by status values:

```yaml
columns:
  - name: status
    type: status
    filter:
      type: "multiselect"

mapping:
  status: "row.status"
```

Users can then filter to show:
- All statuses
- Only specific statuses (e.g., only "running" and "pending")
- Combinations of statuses

## Status Values by Resource Type

### Kubernetes Pod Status
- `pending` - Waiting for resources
- `running` - Pod is executing
- `succeeded` - Completed successfully
- `failed` - Execution failed
- `unknown` - Status unknown

### Kubernetes Deployment Status
- `progressing` - Rolling out new version
- `available` - Deployment is available
- `replicas-failure` - Replica creation failed

### CI/CD Pipeline Status
- `created` - Job created
- `queued` - Waiting to run
- `running` - Currently executing
- `succeeded` - Completed successfully
- `failed` - Failed to complete
- `cancelled` - Manually cancelled
- `skipped` - Skipped (conditional)

### Database/Data Status
- `pending` - Waiting to start
- `running` - Currently executing
- `succeeded` - Completed
- `failed` - Failed
- `cancelled` - Cancelled
- `rolled_back` - Rolled back

## Status Display

Status values display as badges with:
- **Status text** - The status value itself
- **Color coding** - Varies by platform, typically:
  - Green: success, succeeded, running, ready
  - Yellow: warning, pending, updating, degraded
  - Red: failed, error, critical
  - Gray: unknown, cancelled, skipped

## Best Practices

1. **Use consistent naming** - Keep status values consistent across resources
   ```yaml
   # ✓ Consistent
   succeeded/failed/pending

   # ✗ Inconsistent
   success/fail/wait
   ```

2. **Document possible values** - List all possible status values in descriptions
   ```yaml
   - name: status
     type: status
     description: "Can be: pending, running, succeeded, failed, unknown"
   ```

3. **Keep values lowercase** - Use lowercase status values for consistency
   ```yaml
   # ✓ Good
   status: "row.properties.state.toLowerCase()"

   # ✗ Inconsistent case
   status: "row.properties.state"
   ```

4. **Combine with details** - Show status alongside relevant information
   ```yaml
   - name: status
     type: status
   - name: reason
     type: string  # Why it has this status
   - name: since
     type: datetime  # When it changed
   ```

5. **Filter for investigation** - Enable filtering for troubleshooting
   ```yaml
   - name: status
     type: status
     filter:
       type: "multiselect"
   ```

## Comparison with Other Status Types

| Type | Use Case |
|------|----------|
| `status` | Custom multi-value statuses (pending, running, failed, etc.) |
| `health` | Three-state operational health (healthy/warning/critical) |
| `boolean` | Binary true/false states |

Use `status` for workflow states, execution states, or anything with 4+ possible values. Use `health` for operational health. Use `boolean` for simple on/off states.

## Performance Considerations

- Status columns are very efficient to display and filter
- Status filtering is optimized for common status values
- No performance overhead for status expressions

## Status vs Health

**Health** answers "Is this healthy?" (healthy/warning/critical)
**Status** answers "What is the current state?" (pending/running/failed/succeeded)

Example:
- A pod with status `running` might have health `critical` (not enough resources)
- A pod with status `pending` might have health `warning` (taking a while to start)
- A pod with status `succeeded` has health `healthy` (completed successfully)

You can use both together for complete information.

## Practical Example: Multi-Status View

```yaml
columns:
  - name: pod_name
    type: string
    primaryKey: true

  - name: pod_status
    type: status
    description: "Kubernetes pod state"

  - name: health
    type: health
    description: "Resource health"

  - name: reason
    type: string
    description: "Status reason"

  - name: since
    type: datetime
    description: "When status changed"

queries:
  pods:
    configs:
      types: ["Kubernetes::Pod"]

mapping:
  pod_name: "row.name"
  pod_status: "row.status"  # pending, running, succeeded, failed
  health: "row.health"       # healthy, warning, critical
  reason: "row.properties.status.reason"
  since: "row.properties.status.lastTransitionTime"
```

This provides complete visibility into both the current state and the health of the resource.
