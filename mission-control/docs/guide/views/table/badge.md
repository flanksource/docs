---
title: Badge
sidebar_custom_props:
  icon: mdi:label
---

The `badge` column type displays text values as styled badge/tag elements. Badges are useful for displaying categories, labels, versions, or other short text values that benefit from visual distinction.

## Basic Usage

```yaml
columns:
  - name: version_badge
    type: badge
```

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | string | Column name (used in mapping) |
| `type` | string | Set to `"badge"` |
| `description` | string | Help text for column |
| `filter` | object | Enable filtering on this column |
| `card` | object | Configure card layout position |

## Example Usage

### Version Badge

```yaml
columns:
  - name: version
    type: badge

mapping:
  version: "row.properties.version"
```

### Label/Tag Badge

```yaml
columns:
  - name: environment
    type: badge

mapping:
  environment: "row.properties.environment"
```

### Custom Badge from Expression

```yaml
columns:
  - name: tier_badge
    type: badge

mapping:
  tier_badge: "
    row.properties.tier == 'enterprise' ? 'Enterprise' :
    row.properties.tier == 'premium' ? 'Premium' :
    'Free'
  "
```

## Common Patterns

### Application Versions
```yaml
columns:
  - name: app_version
    type: badge
    description: "Application version"

mapping:
  app_version: "row.properties.version"
```

### Environment Labels
```yaml
columns:
  - name: environment
    type: badge
    description: "Deployment environment"

  - name: region
    type: badge
    description: "Cloud region"

mapping:
  environment: "row.properties.environment"
  region: "row.properties.region"
```

### Framework/Runtime Labels
```yaml
columns:
  - name: runtime
    type: badge
    description: "Runtime environment"

  - name: framework
    type: badge
    description: "Application framework"

mapping:
  runtime: "row.properties.runtime_version"
  framework: "row.properties.framework"
```

## Real-World Examples

### Pod Runtime Versions
```yaml
columns:
  - name: pod_name
    type: string
    primaryKey: true

  - name: kubernetes_version
    type: badge
    description: "Kubernetes version"

  - name: container_runtime
    type: badge
    description: "Container runtime"

  - name: os
    type: badge
    description: "Operating system"

queries:
  pods:
    configs:
      types: ["Kubernetes::Pod"]

mapping:
  pod_name: "row.name"
  kubernetes_version: "row.properties.kubernetes_version"
  container_runtime: "row.properties.container_runtime"
  os: "row.properties.os"
```

### Service Versions and Status
```yaml
columns:
  - name: service_name
    type: string
    primaryKey: true

  - name: current_version
    type: badge
    description: "Running version"

  - name: target_version
    type: badge
    description: "Target version"

  - name: language
    type: badge
    description: "Programming language"

  - name: deployment_method
    type: badge
    description: "How it's deployed"

queries:
  services:
    configs:
      types: ["Service::Application"]

mapping:
  service_name: "row.name"
  current_version: "row.properties.current_version"
  target_version: "row.properties.target_version"
  language: "row.properties.language"
  deployment_method: "row.properties.deployment_strategy"
```

### Infrastructure Provider Tags
```yaml
columns:
  - name: resource_id
    type: string
    primaryKey: true

  - name: provider
    type: badge
    description: "Cloud provider"

  - name: region
    type: badge
    description: "Region"

  - name: availability_zone
    type: badge
    description: "Availability zone"

  - name: instance_type
    type: badge
    description: "Instance/Machine type"

queries:
  instances:
    configs:
      types: ["AWS::EC2Instance", "GCP::Instance"]

mapping:
  resource_id: "row.id"
  provider: "row.properties.provider"
  region: "row.properties.region"
  availability_zone: "row.properties.zone"
  instance_type: "row.properties.instance_type"
```

### Database Configuration
```yaml
columns:
  - name: database_name
    type: string
    primaryKey: true

  - name: engine
    type: badge
    description: "Database engine"

  - name: version
    type: badge
    description: "Database version"

  - name: replication_mode
    type: badge
    description: "Replication configuration"

  - name: backup_type
    type: badge
    description: "Backup method"

queries:
  databases:
    configs:
      types: ["Database::Instance"]

mapping:
  database_name: "row.name"
  engine: "row.properties.engine"
  version: "row.properties.version"
  replication_mode: "row.properties.replication_mode"
  backup_type: "row.properties.backup_type"
```

### Deployment Configuration
```yaml
columns:
  - name: deployment
    type: string
    primaryKey: true

  - name: image_tag
    type: badge
    description: "Container image tag"

  - name: rollout_strategy
    type: badge
    description: "Rollout strategy"

  - name: scheduling_policy
    type: badge
    description: "Scheduling policy"

queries:
  deployments:
    configs:
      types: ["Kubernetes::Deployment"]

mapping:
  deployment: "row.name"
  image_tag: "row.properties.spec.template.spec.containers[0].image.split(':')[1]"
  rollout_strategy: "row.properties.spec.strategy.type"
  scheduling_policy: "row.properties.spec.template.spec.affinity.type"
```

## Badge Expressions in CEL

### Extracting from Strings
```yaml
mapping:
  # Extract image tag from full image name
  image_tag: "row.image.split(':')[1]"

  # Extract version from version string
  version: "row.version_string.split('-')[0]"
```

### Conditional Badges
```yaml
mapping:
  # Badge based on condition
  tier_badge: "
    row.cpu_request > 500 ? 'High-Performance' :
    row.cpu_request > 100 ? 'Standard' :
    'Minimal'
  "

  # Badge based on multiple conditions
  status_badge: "
    row.in_maintenance ? 'Maintenance' :
    row.failed_checks > 0 ? 'Issues' :
    'Normal'
  "
```

### Version Comparison
```yaml
mapping:
  # Show upgrade needed badge
  upgrade_badge: "
    row.current_version != row.target_version ?
    'Upgrade: ' + row.target_version :
    'Up-to-date'
  "
```

## Badge Display Options

Badges typically display as:
- Rounded rectangles with padding
- Background color (customizable by platform)
- Optional icons
- Text content centered

Visual styling depends on the platform theme.

## Filtering

Enable users to filter by badge values:

```yaml
columns:
  - name: version
    type: badge
    filter:
      type: "multiselect"

mapping:
  version: "row.properties.version"
```

Users can then filter to show specific badge values.

## Best Practices

1. **Keep badge text short** - Badges work best with short values
   ```yaml
   # ✓ Short, readable
   mapping:
     version: "row.version"  # "1.25", "v2.0"

   # ✗ Too long
   mapping:
     description: "row.long_description"
   ```

2. **Use consistent formatting** - Keep badge values standardized
   ```yaml
   # ✓ Consistent format
   mapping:
     version: "row.version"  # Always "v1.0" format

   # ✗ Inconsistent
   mapping:
     version: "row.raw_version"  # Sometimes "v1.0", sometimes "1.0"
   ```

3. **Group related badges** - Show badges together
   ```yaml
   - name: runtime_version
     type: badge
   - name: framework_version
     type: badge
   - name: compiler_version
     type: badge
   ```

4. **Use for categories, not detailed info** - Keep content simple
   ```yaml
   # ✓ Badge-friendly data
   type: badge
   mapping: "row.environment"  # "prod", "staging", "dev"

   # ✗ Too much detail for badge
   type: badge
   mapping: "row.full_configuration"  # Too verbose
   ```

5. **Add descriptions** - Explain what badges mean
   ```yaml
   - name: version
     type: badge
     description: "Application version"
   ```

## Comparison with Other Label Types

| Type | Use Case |
|------|----------|
| `badge` | Short label/tag values (versions, categories) |
| `string` | General text, longer values |
| `status` | Status states (pending, running, failed) |
| `health` | Health states (healthy, warning, critical) |

Use `badge` for versions and tags. Use `string` for longer text. Use `status` for workflow states. Use `health` for operational health.

## Common Badge Values

### Environment Badges
```
dev
staging
production
qa
integration-test
```

### Version Badges
```
v1.0
v1.1
v2.0
v2.1-beta
latest
```

### Provider Badges
```
AWS
GCP
Azure
On-Premise
Hybrid
```

### Language Badges
```
Go
Python
Java
Node.js
Rust
C++
```

### Architecture Badges
```
Monolith
Microservices
Serverless
Distributed
```

## Real Badge Examples in Views

### Comprehensive Service View

```yaml
columns:
  - name: service_name
    type: string
    primaryKey: true

  - name: language
    type: badge
    description: "Programming language"

  - name: framework
    type: badge
    description: "Framework/runtime"

  - name: version
    type: badge
    description: "Current version"

  - name: environment
    type: badge
    description: "Deployed environment"

  - name: provider
    type: badge
    description: "Cloud provider"

queries:
  services:
    configs:
      types: ["Service::Application"]

mapping:
  service_name: "row.name"
  language: "row.properties.language"
  framework: "row.properties.framework"
  version: "row.properties.version"
  environment: "row.tags.environment"
  provider: "row.tags.provider"
```

## Performance Considerations

- Badge columns are very efficient to render
- Minimal UI overhead even with many badges
- Badge filtering is fast
- No performance impact from badge expressions

## URL Encoding in Badges

Badges typically don't need URL encoding unless they contain special characters:

```yaml
mapping:
  # Simple badge - no encoding needed
  version: "row.version"  # "1.0"

  # Badge with spaces
  status_badge: "'Status: ' + row.status"  # "Status: Active"
```

## Empty/Null Badge Handling

```yaml
mapping:
  # Show empty if null
  version: "has(row.version) ? row.version : ''"

  # Show "Unknown" if null
  version: "has(row.version) ? row.version : 'Unknown'"

  # Don't show anything if null
  version: "has(row.version) ? row.version : null"
```

## Accessibility

Badges should:
- Have sufficient color contrast
- Not rely only on color to convey information
- Include text descriptions in the view description
- Be readable at all zoom levels

Mission Control handles most accessibility features automatically.
