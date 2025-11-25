---
title: Boolean
sidebar_custom_props:
  icon: mdi:checkbox-marked-outline
---

The `boolean` column type displays true/false values as checkboxes or text labels in the table.

## Basic Usage

```yaml
columns:
  - name: is_running
    type: boolean
```

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | string | Column name (used in mapping) |
| `type` | string | Set to `"boolean"` |
| `description` | string | Help text for column |
| `filter` | object | Enable filtering on this column |
| `card` | object | Configure card layout position |

## Example Usage

### Simple Boolean Display

```yaml
columns:
  - name: enabled
    type: boolean

mapping:
  enabled: "row.properties.enabled"
```

### Boolean with Description

```yaml
columns:
  - name: has_ssl
    type: boolean
    description: "SSL/TLS enabled"

mapping:
  has_ssl: "row.properties.ssl_enabled"
```

### Boolean from Condition

```yaml
columns:
  - name: is_healthy
    type: boolean

mapping:
  is_healthy: "row.health == 'healthy'"
```

### Boolean with Filtering

```yaml
columns:
  - name: is_active
    type: boolean
    filter:
      type: "checkbox"

mapping:
  is_active: "row.status == 'active'"
```

## Common Patterns

### Status-Based Boolean
```yaml
mapping:
  is_running: "row.status == 'running'"
  is_error: "row.status == 'error'"
  is_pending: "row.status == 'pending'"
```

### Property-Based Boolean
```yaml
mapping:
  has_gpu: "has(row.properties.gpu_enabled) ? row.properties.gpu_enabled : false"
  is_public: "row.properties.visibility == 'public'"
  is_encrypted: "row.properties.encryption_enabled"
```

### Complex Logic Boolean
```yaml
mapping:
  needs_attention: "row.health != 'healthy' || row.replicas < row.desired_replicas"
  is_overprovisioned: "row.actual_usage < (row.allocated * 0.2)"
  has_warnings: "row.warning_count > 0"
```

## Display Formats

Booleans typically display as:
- **Checked/Unchecked** - Checkbox-style display
- **True/False** - Text representation
- **Yes/No** - User-friendly text
- **On/Off** - State representation
- **Enabled/Disabled** - Feature state

The exact display depends on your UI configuration.

## Real-World Examples

### Pod Readiness Status
```yaml
columns:
  - name: pod_name
    type: string
    primaryKey: true

  - name: is_ready
    type: boolean
    description: "Pod is ready to serve traffic"

  - name: has_resource_requests
    type: boolean
    description: "Resource requests are defined"

  - name: is_privileged
    type: boolean
    description: "Running in privileged mode"

queries:
  pods:
    configs:
      types: ["Kubernetes::Pod"]

mapping:
  pod_name: "row.name"
  is_ready: "row.properties.status.conditions.ready"
  has_resource_requests: "has(row.properties.spec.containers[0].resources.requests)"
  is_privileged: "row.properties.spec.securityContext.privileged"
```

### Database Configuration
```yaml
columns:
  - name: database_name
    type: string
    primaryKey: true

  - name: has_backups
    type: boolean
    description: "Automated backups enabled"

  - name: is_replicated
    type: boolean
    description: "Database replication enabled"

  - name: ssl_required
    type: boolean
    description: "SSL connections required"

  - name: audit_logging
    type: boolean
    description: "Audit logging enabled"

queries:
  databases:
    configs:
      types: ["Database::Instance"]

mapping:
  database_name: "row.name"
  has_backups: "row.properties.backup_enabled"
  is_replicated: "row.properties.replication.enabled"
  ssl_required: "row.properties.ssl_requirement == 'required'"
  audit_logging: "row.properties.audit_config.enabled"
```

### Container Security Settings
```yaml
columns:
  - name: container
    type: string
    primaryKey: true

  - name: read_only_fs
    type: boolean
    description: "Read-only root filesystem"

  - name: run_as_nonroot
    type: boolean
    description: "Runs as non-root user"

  - name: no_new_privileges
    type: boolean
    description: "No new privileges flag"

  - name: drop_capabilities
    type: boolean
    description: "Dangerous capabilities dropped"

queries:
  containers:
    configs:
      types: ["Kubernetes::Container"]

mapping:
  container: "row.name"
  read_only_fs: "row.properties.securityContext.readOnlyRootFilesystem"
  run_as_nonroot: "row.properties.securityContext.runAsNonRoot"
  no_new_privileges: "row.properties.securityContext.allowPrivilegeEscalation == false"
  drop_capabilities: "size(row.properties.securityContext.capabilities.drop) > 0"
```

### Infrastructure Compliance
```yaml
columns:
  - name: resource_id
    type: string
    primaryKey: true

  - name: is_compliant
    type: boolean
    description: "Passes all compliance checks"

  - name: has_monitoring
    type: boolean
    description: "Monitoring enabled"

  - name: has_tagging
    type: boolean
    description: "Required tags present"

  - name: encryption_enabled
    type: boolean
    description: "Encryption at rest"

queries:
  resources:
    configs:
      types: ["AWS::EC2Instance", "AWS::S3Bucket"]

mapping:
  resource_id: "row.id"
  is_compliant: "row.properties.tags['compliance'] == 'true' && row.properties.encryption && row.properties.monitoring"
  has_monitoring: "row.properties.monitoring_enabled"
  has_tagging: "has(row.tags['compliance']) && has(row.tags['owner'])"
  encryption_enabled: "row.properties.encryption.enabled"
```

## Filtering with Boolean

Enable filtering to allow users to show only true or false values:

```yaml
columns:
  - name: is_critical
    type: boolean
    filter:
      type: "checkbox"

mapping:
  is_critical: "row.properties.priority == 'critical'"
```

Users can then filter to show:
- All items
- Only `is_critical = true`
- Only `is_critical = false`

## Boolean Expressions in CEL

### Comparison Operators
```yaml
mapping:
  is_old: "row.created_at < now - duration('90d')"
  is_large: "row.size > 1000000"
  is_matching: "row.name == 'production'"
```

### Logical Operators
```yaml
# AND
mapping:
  is_problem: "row.health == 'critical' && row.replicas == 0"

# OR
mapping:
  needs_action: "row.status == 'failed' || row.status == 'pending'"

# NOT
mapping:
  is_not_running: "row.status != 'running'"
```

### Collection Checks
```yaml
mapping:
  has_items: "size(row.tags) > 0"
  contains_prod: "row.environments.contains('production')"
```

### Null Checks
```yaml
mapping:
  is_set: "has(row.properties.owner)"
  is_empty: "!has(row.properties.description) || row.properties.description == ''"
```

## Best Practices

1. **Use meaningful names** - Boolean column names should start with `is_`, `has_`, or similar
   ```yaml
   - name: is_running  # ✓ Clear
   - name: enabled     # ✓ Clear
   - name: pod_bool    # ✗ Unclear
   ```

2. **Provide descriptions** - Always add a description for clarity
   ```yaml
   - name: is_ready
     type: boolean
     description: "Pod is ready to serve traffic"
   ```

3. **Use consistent logic** - Keep true conditions positive
   ```yaml
   # ✓ True = something good
   mapping:
     is_healthy: "row.health == 'healthy'"

   # ✗ Confusing
   mapping:
     is_broken: "row.health == 'critical'"
   ```

4. **Handle null gracefully** - Default to false when uncertain
   ```yaml
   mapping:
     is_set: "has(row.value) ? row.value : false"
   ```

## Comparison with Other Types

| Type | Use Case |
|------|----------|
| `boolean` | Yes/no, true/false states |
| `health` | Health status (healthy/warning/critical) |
| `status` | General status badge |

Use `boolean` when you have exactly two states. Use `health` or `status` for multiple states.

## Performance Considerations

- Boolean columns are extremely efficient
- Boolean filtering is fast even on large datasets
- Boolean values can be indexed for quick filtering
- No performance overhead for boolean calculations

## UI Display

Booleans typically render as:
- **Checked box** ☑ for true
- **Unchecked box** ☐ for false
- Or as text labels: "Yes"/"No" or "Enabled"/"Disabled"

The exact rendering depends on the platform's UI theme.
