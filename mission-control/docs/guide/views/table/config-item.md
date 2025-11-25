---
title: Config Item
sidebar_custom_props:
  icon: config
---

The `config_item` column type displays clickable links to configuration item detail pages. It's used to navigate from one view to view details about specific configuration items in the catalog.

## Basic Usage

```yaml
columns:
  - name: pod_link
    type: config_item
    configItem:
      idField: "id"
```

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | string | Column name (used in mapping) |
| `type` | string | Set to `"config_item"` |
| `description` | string | Help text for column |
| `configItem` | object | Config item configuration |
| `for` | string | Column to use as link text |

## ConfigItem Configuration

```yaml
configItem:
  # Required: which field contains the config item ID
  idField: "id"
```

## Example Usage

### Simple Config Link

```yaml
columns:
  - name: pod_detail
    type: config_item
    configItem:
      idField: "id"

mapping:
  pod_detail: "row.id"
```

### Config Link with Custom Text

```yaml
columns:
  - name: pod_detail
    type: config_item
    for: "pod_name"  # Use pod_name as display text
    configItem:
      idField: "id"

mapping:
  pod_name: "row.name"  # Display text
  pod_detail: "row.id"  # The link target
```

## Common Patterns

### Navigation from Summary to Details
```yaml
columns:
  - name: resource_name
    type: string
    primaryKey: true

  - name: resource_detail
    type: config_item
    for: "resource_name"
    configItem:
      idField: "id"

mapping:
  resource_name: "row.name"
  resource_detail: "row.id"
```

### Multiple Config Links
```yaml
columns:
  - name: pod
    type: string
    primaryKey: true

  - name: pod_detail
    type: config_item
    for: "pod"
    configItem:
      idField: "id"

  - name: parent_node
    type: config_item
    for: "node_name"
    configItem:
      idField: "parent_id"

mapping:
  pod: "row.name"
  pod_detail: "row.id"
  node_name: "row.parent_name"
  parent_node: "row.parent_id"
```

## Real-World Examples

### Pod Summary with Drill-Down

```yaml
columns:
  - name: pod_name
    type: string
    primaryKey: true

  - name: namespace
    type: string

  - name: status
    type: status

  - name: pod_details
    type: config_item
    for: "pod_name"
    description: "View full pod details"
    configItem:
      idField: "id"

queries:
  pods:
    configs:
      types: ["Kubernetes::Pod"]

mapping:
  pod_name: "row.name"
  namespace: "row.namespace"
  status: "row.status"
  pod_details: "row.id"
```

Clicking the pod name in the `pod_details` column opens the full pod configuration page.

### Deployment and Related Pods

```yaml
columns:
  - name: deployment_name
    type: string
    primaryKey: true

  - name: replicas
    type: number

  - name: status
    type: status

  - name: deployment_config
    type: config_item
    for: "deployment_name"
    description: "View deployment config"
    configItem:
      idField: "id"

  - name: owner_namespace
    type: string

  - name: namespace_config
    type: config_item
    for: "owner_namespace"
    description: "View namespace"
    configItem:
      idField: "namespace_id"

queries:
  deployments:
    configs:
      types: ["Kubernetes::Deployment"]

mapping:
  deployment_name: "row.name"
  replicas: "row.properties.spec.replicas"
  status: "row.status"
  deployment_config: "row.id"
  owner_namespace: "row.namespace"
  namespace_config: "row.namespace_id"
```

Users can navigate to either the deployment or namespace configuration details.

### Container Images with Registry Links

```yaml
columns:
  - name: pod
    type: string
    primaryKey: true

  - name: image_registry
    type: string

  - name: image_config
    type: config_item
    for: "image_name"
    description: "View image details"
    configItem:
      idField: "image_config_id"

queries:
  pods:
    configs:
      types: ["Kubernetes::Pod"]

mapping:
  pod: "row.name"
  image_name: "row.properties.spec.containers[0].image"
  image_registry: "row.properties.spec.containers[0].image.split('/')[0]"
  image_config: "row.properties.image_config_id"
```

### Multi-Level Navigation

```yaml
columns:
  - name: instance_name
    type: string
    primaryKey: true

  - name: instance_detail
    type: config_item
    for: "instance_name"
    configItem:
      idField: "instance_id"

  - name: volume_name
    type: string

  - name: volume_detail
    type: config_item
    for: "volume_name"
    configItem:
      idField: "volume_id"

  - name: availability_zone
    type: string

  - name: az_detail
    type: config_item
    for: "availability_zone"
    configItem:
      idField: "az_id"

queries:
  instances:
    configs:
      types: ["AWS::EC2Instance"]

mapping:
  instance_name: "row.name"
  instance_detail: "row.id"
  volume_name: "row.properties.volume_name"
  volume_detail: "row.properties.volume_id"
  availability_zone: "row.properties.az"
  az_detail: "row.properties.az_id"
```

Navigate from instance → volume → availability zone, drilling down at each level.

### Service Mesh Components

```yaml
columns:
  - name: service_name
    type: string
    primaryKey: true

  - name: service_detail
    type: config_item
    for: "service_name"
    configItem:
      idField: "service_id"

  - name: virtual_service
    type: string

  - name: vs_detail
    type: config_item
    for: "virtual_service"
    configItem:
      idField: "vs_id"

  - name: destination_rule
    type: string

  - name: dr_detail
    type: config_item
    for: "destination_rule"
    configItem:
      idField: "dr_id"

queries:
  services:
    configs:
      types: ["Istio::Service"]

mapping:
  service_name: "row.name"
  service_detail: "row.id"
  virtual_service: "row.properties.virtualservice_name"
  vs_detail: "row.properties.virtualservice_id"
  destination_rule: "row.properties.destination_rule_name"
  dr_detail: "row.properties.destination_rule_id"
```

Navigate between service, virtual service, and destination rule configurations.

## Link Text Display

The link text comes from the `for` property:

```yaml
columns:
  - name: resource_link
    type: config_item
    for: "resource_name"  # Use this column's value as link text
    configItem:
      idField: "id"

mapping:
  resource_name: "row.name"        # Display as link text
  resource_link: "row.id"          # Link target (not visible)
```

The user sees `row.name` as a clickable link. Clicking navigates to the configuration page for `row.id`.

## Config Item Detail Pages

Clicking a config_item link opens the configuration detail page for that resource, which includes:
- Full configuration in JSON/YAML
- Property explorer
- Related resources
- Change history
- Cost information (if available)
- Custom properties
- Tags and labels

## Column Layout

Typically you'll have:
1. **Display column** (string) - Shows the name/identifier
2. **Link column** (config_item) - Provides the navigation

```yaml
columns:
  # Display what the resource is
  - name: pod_name
    type: string
    primaryKey: true

  # Clickable link to details
  - name: pod_details
    type: config_item
    for: "pod_name"
    configItem:
      idField: "id"

mapping:
  pod_name: "row.name"
  pod_details: "row.id"
```

Or combine them:

```yaml
columns:
  - name: pod_detail
    type: config_item
    for: "pod_name"  # Show pod name as link text
    configItem:
      idField: "id"

mapping:
  pod_name: "row.name"  # Display text
  pod_detail: "row.id"  # Link target
```

## Using Variables with Config Links

You can use variables in config_item expressions:

```yaml
columns:
  - name: cluster_resource
    type: config_item
    configItem:
      idField: "id"

templating:
  - key: cluster
    label: "Cluster"
    values: ["us-east-1", "us-west-2"]

mapping:
  cluster_resource: "row.id"  # Same ID regardless of cluster variable
```

The config_item always links by ID; variables don't affect the link target, only which rows are displayed.

## Best Practices

1. **Use for navigation** - Make drill-down easy
   ```yaml
   # ✓ Easy navigation path
   - name: pod_name
     type: string
   - name: pod_detail
     type: config_item
   ```

2. **Provide meaningful text** - Show what the link is about
   ```yaml
   # ✓ Clear link purpose
   for: "pod_name"

   # ✗ Generic link text
   for: "link"
   ```

3. **Use consistent IDs** - ID field must be unique and valid
   ```yaml
   # ✓ Unique config IDs
   idField: "id"

   # ✗ Might not be unique
   idField: "name"
   ```

4. **Add descriptions** - Explain what clicking does
   ```yaml
   - name: pod_details
     type: config_item
     description: "View complete pod configuration"
   ```

5. **Combine with filters** - Use view filters for context
   ```yaml
   templating:
     - key: cluster
       values: ["prod", "staging"]

   # User selects cluster, then clicks config_item to drill down
   ```

## Multiple Config Items

You can have multiple config_item links in one view:

```yaml
columns:
  - name: pod_detail
    type: config_item
    for: "pod"
    configItem:
      idField: "pod_id"

  - name: node_detail
    type: config_item
    for: "node"
    configItem:
      idField: "node_id"

mapping:
  pod: "row.pod_name"
  pod_detail: "row.pod_id"
  node: "row.node_name"
  node_detail: "row.node_id"
```

Users can navigate to either the pod or node details.

## Column ID Mapping

The `idField` property must match your config ID structure:

```yaml
configItem:
  idField: "id"  # Simple ID field
  # OR
  idField: "row.properties.config_id"  # Nested ID
```

Ensure the mapped value is a valid config ID in the catalog.

## Filtering for Config Items

Config items are typically not filtered directly, but you can filter the parent view:

```yaml
columns:
  - name: pod_detail
    type: config_item
    configItem:
      idField: "id"

# Filter shows/hides rows, which affects what config items are linked
queries:
  pods:
    configs:
      types: ["Kubernetes::Pod"]
      status: "running"  # Only show running pods

mapping:
  pod_detail: "row.id"
```

## Performance Considerations

- Config_item columns are very efficient
- No performance impact from multiple config_item links
- Links resolve instantly when clicked
- Minimal UI overhead

## Comparison with URL Column Type

| Type | Use Case |
|------|----------|
| `config_item` | Navigate to Mission Control config detail page |
| `url` | Navigate to external URLs or custom views |

Use `config_item` to drill into config details. Use `url` for external links.

## Real-World Navigation Example

### Complete Resource Hierarchy

```yaml
columns:
  - name: pod
    type: string
    primaryKey: true

  - name: pod_detail
    type: config_item
    for: "pod"
    configItem:
      idField: "pod_id"

  - name: deployment
    type: string

  - name: deployment_detail
    type: config_item
    for: "deployment"
    configItem:
      idField: "deployment_id"

  - name: namespace
    type: string

  - name: namespace_detail
    type: config_item
    for: "namespace"
    configItem:
      idField: "namespace_id"

  - name: cluster
    type: string

  - name: cluster_detail
    type: config_item
    for: "cluster"
    configItem:
      idField: "cluster_id"

queries:
  pods:
    configs:
      types: ["Kubernetes::Pod"]

mapping:
  pod: "row.name"
  pod_detail: "row.id"
  deployment: "row.deployment_name"
  deployment_detail: "row.deployment_id"
  namespace: "row.namespace"
  namespace_detail: "row.namespace_id"
  cluster: "row.cluster_name"
  cluster_detail: "row.cluster_id"
```

User can navigate: Pod → Pod Details, Pod → Deployment Details, Pod → Namespace Details, Pod → Cluster Details

All from a single summary view.

## Error Handling

If a config ID is invalid or doesn't exist:
- Link may appear disabled
- Clicking shows an error
- Ensure IDs are valid and exist in your catalog

Test with sample data before deploying views.
