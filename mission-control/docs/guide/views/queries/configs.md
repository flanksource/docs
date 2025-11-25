---
title: Config Queries
sidebar_custom_props:
  icon: config
---

Config queries fetch configuration items (resources) from the Flanksource catalog. They allow you to display and analyze any type of infrastructure or application resource tracked in your catalog.

## Overview

Config queries retrieve resources from your catalog based on filters. The query results include all standard config item properties plus custom properties and tags you've defined.

**Example**:
```yaml
queries:
  myquery:
    configs:
      types: ["Kubernetes::Pod", "Kubernetes::Node"]
      tagSelector: "environment=production"
```

## Query Properties

### Basic Properties

| Property | Type | Description |
|----------|------|-------------|
| `types` | array | Config types to query (e.g., `["Kubernetes::Pod"]`) |
| `search` | string | Free text search across config name and properties |
| `status` | string | Filter by status (`healthy`, `warning`, `critical`, `unhealthy`) |
| `health` | string | Filter by health status |
| `tagSelector` | string | Filter by tags using selector syntax |
| `labelSelector` | string | Filter by Kubernetes-style labels |
| `agent` | string | Filter by specific agent ID |
| `scope` | string | Filter by scraper/scope ID |
| `fieldSelector` | string | Advanced field-based filtering |
| `limit` | integer | Maximum number of results to return |

## Query Examples

### Query by Type

```yaml
queries:
  pods:
    configs:
      types: ["Kubernetes::Pod"]
```

Return all Kubernetes pods from the catalog.

### Query Multiple Types

```yaml
queries:
  resources:
    configs:
      types:
        - "Kubernetes::Pod"
        - "Kubernetes::Deployment"
        - "Kubernetes::StatefulSet"
```

Return pods, deployments, and stateful sets.

### Filter by Tags

```yaml
queries:
  prod_pods:
    configs:
      types: ["Kubernetes::Pod"]
      tagSelector: "environment=prod,team=platform"
```

Return production pods owned by the platform team. Multiple tags use AND logic.

### Filter by Status

```yaml
queries:
  unhealthy:
    configs:
      types: ["Kubernetes::Pod"]
      status: "critical"
      limit: 100
```

Return up to 100 pods with critical status.

### Free Text Search

```yaml
queries:
  search_results:
    configs:
      types: ["Kubernetes::Pod"]
      search: "postgres"
```

Return all pods with "postgres" in name or properties.

### Combine Multiple Filters

```yaml
queries:
  complex_query:
    configs:
      types: ["Kubernetes::Deployment"]
      tagSelector: "environment=production,region=us-east-1"
      status: "warning"
      search: "database"
      agent: "cluster-1"
      limit: 50
```

Return the first 50 production deployments in us-east-1 with "database" in name and warning status.

## Auto-Mapped Columns

Config queries automatically provide these columns for use in table views:

### Core Properties
- `id` - Unique config identifier
- `name` - Resource name
- `type` - Config type (e.g., `Kubernetes::Pod`)
- `namespace` - Kubernetes namespace (if applicable)
- `agent` - Agent that scraped the config
- `source` - Configuration source

### Status & Health
- `status` - Current status (healthy/warning/critical/unhealthy)
- `health` - Health status
- `health_color` - Color code for health status

### Timestamps
- `created_at` - When config was first discovered
- `updated_at` - Last time config was updated
- `deleted_at` - When config was deleted (if deleted)

### Properties & Content
- `config` - Raw configuration content (often JSON/YAML)
- `properties` - Custom properties as JSON
- `tags` - Applied tags as JSON
- `labels` - Kubernetes-style labels as JSON

### Cost Data
- `cost` - Current cost
- `cost_total_1d` - Cost over last day
- `cost_total_7d` - Cost over last 7 days
- `cost_total_30d` - Cost over last 30 days

### Relationships
- `parent_id` - ID of parent config item
- `parent_name` - Name of parent config item
- `parent_type` - Type of parent config item

### Computed Fields
- `summary` - Auto-generated summary of the config

## Using Variables in Config Queries

You can use templating variables to make queries dynamic:

```yaml
templating:
  - key: environment
    label: "Environment"
    values: ["dev", "staging", "prod"]

  - key: search_term
    label: "Search"
    values: ["", "database", "cache", "web"]

queries:
  resources:
    configs:
      types: ["Kubernetes::Pod"]
      tagSelector: "environment=$(var.environment)"
      search: "$(var.search_term)"
```

See [Templating & Variables](../concepts/templating.md) for more details.

## Column Mapping Examples

### Simple Table with Basic Columns

```yaml
columns:
  - name: name
    type: string
    primaryKey: true
  - name: status
    type: status
  - name: health
    type: health

queries:
  resources:
    configs:
      types: ["Kubernetes::Pod"]

mapping:
  name: "row.name"
  status: "row.status"
  health: "row.health"
```

### Display Cost Information

```yaml
columns:
  - name: name
    type: string
    primaryKey: true
  - name: cost_30d
    type: decimal
  - name: health
    type: health

queries:
  resources:
    configs:
      types: ["AWS::EC2Instance"]

mapping:
  name: "row.name"
  cost_30d: "row.cost_total_30d"
  health: "row.health"
```

### Show Custom Properties

```yaml
columns:
  - name: name
    type: string
    primaryKey: true
  - name: version
    type: string
  - name: replicas
    type: number

queries:
  deployments:
    configs:
      types: ["Kubernetes::Deployment"]

mapping:
  name: "row.name"
  version: "row.properties.version"
  replicas: "row.properties.replicas"
```

### Create Links to Related Resources

```yaml
columns:
  - name: pod_name
    type: string
    primaryKey: true
  - name: node_name
    type: url
    url:
      config: "row.parent_id"
  - name: health
    type: health

queries:
  pods:
    configs:
      types: ["Kubernetes::Pod"]

mapping:
  pod_name: "row.name"
  node_name: "row.parent_name"
  health: "row.health"
```

## Real-World Examples

### Production Pod Dashboard

```yaml
apiVersion: mission-control.flanksource.com/v1
kind: View
metadata:
  name: prod-pods
spec:
  display:
    title: "Production Pods"
    sidebar: true

  templating:
    - key: namespace
      label: "Namespace"
      valueFrom:
        config:
          types: ["Kubernetes::Namespace"]
          tagSelector: "environment=production"
      default: "default"

  columns:
    - name: pod_name
      type: string
      primaryKey: true
    - name: status
      type: status
    - name: health
      type: health
    - name: age
      type: duration

  queries:
    pods:
      configs:
        types: ["Kubernetes::Pod"]
        tagSelector: "environment=production,namespace=$(var.namespace)"

  mapping:
    pod_name: "row.name"
    status: "row.status"
    health: "row.health"
    age: "now - row.created_at"
```

### AWS EC2 Inventory with Cost Tracking

```yaml
apiVersion: mission-control.flanksource.com/v1
kind: View
metadata:
  name: aws-inventory
spec:
  display:
    title: "AWS EC2 Instances"

  templating:
    - key: region
      label: "Region"
      values: ["us-east-1", "us-west-2", "eu-central-1"]
      default: "us-east-1"

  columns:
    - name: instance_id
      type: string
      primaryKey: true
    - name: instance_type
      type: string
    - name: status
      type: status
    - name: monthly_cost
      type: decimal
      unit: "$"

  queries:
    instances:
      configs:
        types: ["AWS::EC2Instance"]
        tagSelector: "region=$(var.region)"

  mapping:
    instance_id: "row.name"
    instance_type: "row.properties.instance_type"
    status: "row.status"
    monthly_cost: "row.cost_total_30d"
```

### Multi-Cluster Resource View

```yaml
apiVersion: mission-control.flanksource.com/v1
kind: View
metadata:
  name: multi-cluster-resources
spec:
  display:
    title: "Resources Across Clusters"

  templating:
    - key: cluster
      label: "Cluster"
      valueFrom:
        config:
          types: ["Kubernetes::Cluster"]
      default: "production"

    - key: resource_type
      label: "Resource Type"
      values: ["Pod", "Deployment", "StatefulSet", "DaemonSet"]
      default: "Pod"

  columns:
    - name: resource_name
      type: string
      primaryKey: true
    - name: resource_type
      type: string
    - name: namespace
      type: string
    - name: status
      type: status
    - name: health
      type: health

  queries:
    resources:
      configs:
        types:
          - "Kubernetes::Pod"
          - "Kubernetes::Deployment"
          - "Kubernetes::StatefulSet"
          - "Kubernetes::DaemonSet"
        tagSelector: "cluster=$(var.cluster)"

  mapping:
    resource_name: "row.name"
    resource_type: "row.type"
    namespace: "row.namespace"
    status: "row.status"
    health: "row.health"
```

## Performance Considerations

### Limit Results
Always use `limit` to avoid fetching huge result sets:

```yaml
queries:
  resources:
    configs:
      types: ["Kubernetes::Pod"]
      limit: 100  # Don't fetch all pods
```

### Use Specific Types
Query specific resource types rather than all types:

```yaml
# ✓ Specific - only gets pods
configs:
  types: ["Kubernetes::Pod"]

# ✗ Broad - might get everything
configs:
  types: ["Kubernetes::*"]
```

### Filter Early
Apply restrictive filters to reduce data:

```yaml
# ✓ Filters reduce results
configs:
  types: ["Kubernetes::Pod"]
  tagSelector: "environment=prod,team=platform"
  status: "critical"

# ✗ Broad - gets everything
configs:
  types: ["Kubernetes::Pod"]
```

### Combine with Cache Control
Use [cache control](../concepts/cache-control.md) to avoid repeated expensive queries:

```yaml
cache:
  maxAge: 30m  # Don't refresh too frequently
```

## Troubleshooting

### No Results Returned

Check:
1. Is the config type correct? (`Kubernetes::Pod` not `Pod`)
2. Are your filters too restrictive? Try removing tagSelector
3. Does your agent/scope exist and have permissions?
4. Are there any configs of this type in your catalog?

### Unexpected Results

Check:
1. Does tagSelector have correct key=value format?
2. Are multiple tags properly comma-separated?
3. Are variable substitutions working? (Try hardcoding a value)
4. Check the health/status filters aren't too restrictive

### Performance Issues

Check:
1. Is `limit` set? (Defaults to returning all matches)
2. Are you querying multiple expensive types?
3. Try adding more restrictive filters
4. Consider increasing `maxAge` in cache control
