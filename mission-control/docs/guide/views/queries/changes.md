---
title: Change Queries
sidebar_custom_props:
  icon: diff
---

Change queries retrieve the audit trail of modifications to configuration items. They allow you to display what changed, when, how, and which resources were affected.

## Overview

Changes represent modifications to configuration items tracked in your catalog. They include version updates, property changes, deletions, and other modifications. Change queries let you build audit dashboards, change timelines, and impact analysis views.

**Example**:
```yaml
queries:
  recent_changes:
    changes:
      types: ["Kubernetes::Pod", "Kubernetes::Deployment"]
      search: "update"
      limit: 50
```

## Query Properties

### Basic Properties

| Property | Type | Description |
|----------|------|-------------|
| `types` | array | Config item types to get changes for |
| `search` | string | Free text search across change summaries |
| `tagSelector` | string | Filter by tags of the affected config items |
| `status` | string | Filter by change status |
| `severity` | string | Filter by change severity (`info`, `warning`, `critical`) |
| `agent` | string | Filter by specific agent that captured the change |
| `limit` | integer | Maximum number of changes to return |

## Query Examples

### Recent Changes for a Resource Type

```yaml
queries:
  pod_changes:
    changes:
      types: ["Kubernetes::Pod"]
      limit: 100
```

Return the 100 most recent changes to pods.

### Search for Specific Changes

```yaml
queries:
  deployment_updates:
    changes:
      types: ["Kubernetes::Deployment"]
      search: "update"
      limit: 50
```

Return changes containing "update" in the summary.

### Critical Changes Only

```yaml
queries:
  critical_changes:
    changes:
      types: ["Kubernetes::Pod", "Kubernetes::Node"]
      severity: "critical"
      limit: 200
```

Return critical changes to pods and nodes.

### Changes to Production Resources

```yaml
queries:
  prod_changes:
    changes:
      types: ["Kubernetes::Pod"]
      tagSelector: "environment=production"
      limit: 100
```

Return changes to production resources only.

### Combine Multiple Filters

```yaml
queries:
  analysis:
    changes:
      types:
        - "Kubernetes::Deployment"
        - "Kubernetes::StatefulSet"
        - "Kubernetes::DaemonSet"
      tagSelector: "environment=production,team=platform"
      severity: "warning"
      search: "config"
      agent: "cluster-1"
      limit: 100
```

Return warning-level configuration changes to production deployments managed by platform team.

## Auto-Mapped Columns

Change queries automatically provide these columns:

### Core Change Information
- `id` - Unique change identifier
- `config_id` - ID of the changed configuration item
- `config_name` - Name of the changed resource
- `config_type` - Type of the changed resource
- `change_type` - Type of change (e.g., `Created`, `Updated`, `Deleted`)
- `severity` - Change severity (`info`, `warning`, `critical`)
- `summary` - Human-readable summary of the change
- `description` - Detailed change description

### Before/After Content
- `old_config` - Configuration before the change
- `new_config` - Configuration after the change
- `diff` - Computed diff showing what changed
- `patch` - Patch format showing the differences

### Timestamps
- `created_at` - When the change was detected
- `first_seen_at` - First time this change was observed
- `last_seen_at` - Last time this change was observed

### Related Information
- `tags` - Tags of the affected resource
- `labels` - Labels of the affected resource

## Using Variables in Change Queries

Make change queries dynamic with templating variables:

```yaml
templating:
  - key: resource_type
    label: "Resource Type"
    values: ["Kubernetes::Pod", "Kubernetes::Deployment"]
    default: "Kubernetes::Pod"

  - key: severity_level
    label: "Min Severity"
    values: ["info", "warning", "critical"]

queries:
  changes:
    changes:
      types: ["$(var.resource_type)"]
      severity: "$(var.severity_level)"
```

## Column Mapping Examples

### Simple Change Timeline

```yaml
columns:
  - name: resource
    type: string
    primaryKey: true
  - name: change_type
    type: string
  - name: severity
    type: status
  - name: changed_at
    type: datetime

queries:
  changes:
    changes:
      types: ["Kubernetes::Pod", "Kubernetes::Deployment"]
      limit: 100

mapping:
  resource: "row.config_name"
  change_type: "row.change_type"
  severity: "row.severity"
  changed_at: "row.created_at"
```

### Detailed Change View with Summary

```yaml
columns:
  - name: id
    type: string
    primaryKey: true
    hidden: true
  - name: resource
    type: string
  - name: type
    type: string
  - name: summary
    type: text
  - name: severity
    type: health
  - name: timestamp
    type: datetime

queries:
  changes:
    changes:
      types: ["Kubernetes::*"]
      limit: 200

mapping:
  id: "row.id"
  resource: "row.config_name"
  type: "row.change_type"
  summary: "row.summary"
  severity: "row.severity == 'critical' ? 'critical' : row.severity == 'warning' ? 'warning' : 'healthy'"
  timestamp: "row.created_at"
```

### Change Impact Analysis

```yaml
columns:
  - name: resource_id
    type: string
    primaryKey: true
    hidden: true
  - name: resource_name
    type: string
  - name: resource_type
    type: string
  - name: changes_count
    type: number
  - name: latest_change
    type: datetime

queries:
  changes:
    changes:
      types: ["Kubernetes::Pod"]
      limit: 1000

merge: |
  SELECT
    config_id as resource_id,
    config_name as resource_name,
    config_type as resource_type,
    COUNT(*) as changes_count,
    MAX(created_at) as latest_change
  FROM changes
  GROUP BY config_id, config_name, config_type

mapping:
  resource_id: "row.resource_id"
  resource_name: "row.resource_name"
  resource_type: "row.resource_type"
  changes_count: "row.changes_count"
  latest_change: "row.latest_change"
```

## Real-World Examples

### Deployment Change Timeline

```yaml
apiVersion: mission-control.flanksource.com/v1
kind: View
metadata:
  name: deployment-changes
spec:
  display:
    title: "Deployment Changes"
    sidebar: true

  templating:
    - key: environment
      label: "Environment"
      values: ["dev", "staging", "prod"]
      default: "prod"

  columns:
    - name: deployment
      type: string
      primaryKey: true
    - name: change_type
      type: string
    - name: summary
      type: text
    - name: severity
      type: health
    - name: timestamp
      type: datetime

  queries:
    changes:
      changes:
        types: ["Kubernetes::Deployment"]
        tagSelector: "environment=$(var.environment)"
        limit: 100

  mapping:
    deployment: "row.config_name"
    change_type: "row.change_type"
    summary: "row.summary"
    severity: "row.severity == 'critical' ? 'critical' : row.severity == 'warning' ? 'warning' : 'healthy'"
    timestamp: "row.created_at"
```

### Production Incident Investigation

```yaml
apiVersion: mission-control.flanksource.com/v1
kind: View
metadata:
  name: incident-changes
spec:
  display:
    title: "Incident Investigation Timeline"

  columns:
    - name: timestamp
      type: datetime
      primaryKey: true
    - name: resource
      type: string
    - name: resource_type
      type: string
    - name: change
      type: text
    - name: severity
      type: health

  queries:
    changes:
      changes:
        types:
          - "Kubernetes::Pod"
          - "Kubernetes::Node"
          - "Kubernetes::Deployment"
        tagSelector: "environment=production"
        severity: "critical"
        limit: 500

  mapping:
    timestamp: "row.created_at"
    resource: "row.config_name"
    resource_type: "row.config_type"
    change: "row.summary"
    severity: "row.severity == 'critical' ? 'critical' : 'warning'"
```

### Change Summary Dashboard with Panels

```yaml
apiVersion: mission-control.flanksource.com/v1
kind: View
metadata:
  name: change-summary
spec:
  display:
    title: "Change Summary"
    card:
      columns: 2

  columns:
    - name: change_id
      type: string
      primaryKey: true
      hidden: true

  queries:
    changes:
      changes:
        types: ["Kubernetes::Pod", "Kubernetes::Deployment"]
        limit: 1000

  panels:
    - name: "Total Changes (24h)"
      type: number
      query: |
        SELECT COUNT(*) as value FROM changes
        WHERE created_at > datetime('now', '-1 day')

    - name: "Changes by Severity"
      type: piechart
      query: |
        SELECT severity, COUNT(*) as value FROM changes
        WHERE created_at > datetime('now', '-1 day')
        GROUP BY severity

    - name: "Critical Changes by Type"
      type: bargauge
      query: |
        SELECT config_type, COUNT(*) as value FROM changes
        WHERE severity = 'critical'
        AND created_at > datetime('now', '-7 days')
        GROUP BY config_type

    - name: "Most Changed Resources"
      type: table
      query: |
        SELECT
          config_name as resource,
          COUNT(*) as change_count
        FROM changes
        WHERE created_at > datetime('now', '-7 days')
        GROUP BY config_name
        ORDER BY change_count DESC
        LIMIT 10
```

### Change Frequency Analysis

```yaml
apiVersion: mission-control.flanksource.com/v1
kind: View
metadata:
  name: change-frequency
spec:
  display:
    title: "Change Frequency by Resource"

  templating:
    - key: days_back
      label: "Time Period"
      values: ["1", "7", "30"]
      default: "7"

  columns:
    - name: resource_name
      type: string
      primaryKey: true
    - name: resource_type
      type: string
    - name: total_changes
      type: number
    - name: last_changed
      type: datetime

  queries:
    changes:
      changes:
        types: ["Kubernetes::Pod", "Kubernetes::Deployment", "Kubernetes::StatefulSet"]
        limit: 1000

  merge: |
    SELECT
      config_name as resource_name,
      config_type as resource_type,
      COUNT(*) as total_changes,
      MAX(created_at) as last_changed
    FROM changes
    WHERE created_at > datetime('now', '-$(var.days_back) days')
    GROUP BY config_id, config_name, config_type
    ORDER BY total_changes DESC

  mapping:
    resource_name: "row.resource_name"
    resource_type: "row.resource_type"
    total_changes: "row.total_changes"
    last_changed: "row.last_changed"
```

## Diff and Patch Analysis

When mapping change configurations, you can access the diff and patch:

```yaml
mapping:
  # Show human-readable diff
  changes_made: "row.diff"

  # Show patch format
  patch_content: "row.patch"

  # Access old/new configs
  old_value: "row.old_config"
  new_value: "row.new_config"
```

## Performance Considerations

### Use Limits
Always limit the number of changes to avoid loading entire history:

```yaml
queries:
  changes:
    changes:
      types: ["Kubernetes::Pod"]
      limit: 100  # Don't load all changes
```

### Filter by Severity
When possible, filter to relevant changes:

```yaml
# ✓ Specific - gets fewer results
changes:
  types: ["Kubernetes::Pod"]
  severity: "critical"

# ✗ Broad - gets all changes
changes:
  types: ["Kubernetes::Pod"]
```

### Use Time Windows in Merge
When aggregating changes, limit the time window:

```yaml
merge: |
  SELECT config_name, COUNT(*) as change_count
  FROM changes
  WHERE created_at > datetime('now', '-7 days')  # Last 7 days only
  GROUP BY config_name
```

## Common Use Cases

### Audit Trail
Track all changes to critical resources for compliance:
```yaml
types: ["Kubernetes::Pod", "Kubernetes::Deployment"]
tagSelector: "environment=production"
```

### Incident Timeline
Find what changed around an incident time:
```yaml
types: ["Kubernetes::*"]
severity: "critical"
```

### Change Approval Workflows
Monitor changes that need approval:
```yaml
search: "requires-approval"
severity: "warning"
```

### SLA Tracking
Monitor change frequency against SLAs:
```yaml
# Count changes per resource
# Group by resource
# Compare against SLA targets
```
