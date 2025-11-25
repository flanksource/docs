---
title: String
sidebar_custom_props:
  icon: mdi:format-text
---

The `string` column type displays text values as a simple text field in the table.

## Basic Usage

```yaml
columns:
  - name: pod_name
    type: string
    primaryKey: true
```

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | string | Column name (used in mapping) |
| `type` | string | Set to `"string"` |
| `description` | string | Help text for column |
| `primaryKey` | boolean | Is this part of the unique identifier? |
| `hidden` | boolean | Hide column from UI |
| `unit` | string | Display unit suffix (e.g., "ms") |
| `filter` | object | Enable filtering on this column |
| `card` | object | Configure card layout position |

## Example Usage

### Simple Text Display

```yaml
columns:
  - name: name
    type: string
    primaryKey: true

queries:
  resources:
    configs:
      types: ["Kubernetes::Pod"]

mapping:
  name: "row.name"
```

### String with Description

```yaml
columns:
  - name: region
    type: string
    description: "AWS region"

mapping:
  region: "row.properties.region"
```

### String with Filtering

Enable users to filter by string values:

```yaml
columns:
  - name: environment
    type: string
    filter:
      type: "text"

mapping:
  environment: "row.properties.environment"
```

### String with Unit Display

```yaml
columns:
  - name: version
    type: string
    unit: "v"  # Displays as "v1.25"

mapping:
  version: "row.properties.kubernetes_version"
```

### Composite Strings from Expressions

Use CEL expressions to create formatted strings:

```yaml
columns:
  - name: display_name
    type: string
    primaryKey: true

mapping:
  display_name: "'Pod: ' + row.name + ' (' + row.namespace + ')'"
```

## Common Patterns

### Display Config Item Type
```yaml
mapping:
  type: "row.type"
```

### Namespace Display
```yaml
mapping:
  namespace: "row.namespace"
```

### Custom Property
```yaml
mapping:
  image: "row.properties.container_image"
```

### Formatted Status Message
```yaml
mapping:
  message: "row.health == 'healthy' ? 'OK' : 'Check required'"
```

## Filtering

When you add filter configuration, users can:
- Search for text values
- Filter by exact match
- Filter by partial match (if supported)

```yaml
columns:
  - name: pod_name
    type: string
    filter:
      type: "text"

  - name: label
    type: string
    filter:
      type: "multiselect"  # Users can select multiple values
```

## String Mapping Examples

### Simple Direct Mapping
```yaml
mapping:
  name: "row.name"
```

### Concatenation
```yaml
mapping:
  full_location: "row.region + '/' + row.zone"
```

### Conditional Values
```yaml
mapping:
  status_text: "row.status == 'running' ? 'Active' : 'Inactive'"
```

### Extracted from Properties
```yaml
mapping:
  owner: "row.properties.owner_email"
```

### Optional String with Default
```yaml
mapping:
  description: "has(row.properties.description) ? row.properties.description : 'No description'"
```

## Real-World Examples

### Pod Details View
```yaml
columns:
  - name: pod_name
    type: string
    primaryKey: true

  - name: namespace
    type: string

  - name: node
    type: string

  - name: image
    type: string

queries:
  pods:
    configs:
      types: ["Kubernetes::Pod"]

mapping:
  pod_name: "row.name"
  namespace: "row.namespace"
  node: "row.properties.node_name"
  image: "row.properties.container_image"
```

### AWS Resource Labels
```yaml
columns:
  - name: instance_id
    type: string
    primaryKey: true

  - name: instance_type
    type: string

  - name: subnet_id
    type: string

  - name: availability_zone
    type: string

queries:
  instances:
    configs:
      types: ["AWS::EC2Instance"]

mapping:
  instance_id: "row.name"
  instance_type: "row.properties.instance_type"
  subnet_id: "row.properties.subnet_id"
  availability_zone: "row.properties.availability_zone"
```

### Deployment Configuration
```yaml
columns:
  - name: deployment_name
    type: string
    primaryKey: true

  - name: replicas_config
    type: string
    description: "Configured replicas"

  - name: image_registry
    type: string
    description: "Container image registry"

queries:
  deployments:
    configs:
      types: ["Kubernetes::Deployment"]

mapping:
  deployment_name: "row.name"
  replicas_config: "string(row.properties.spec.replicas)"
  image_registry: "row.properties.spec.containers[0].image"
```

## Best Practices

1. **Use primaryKey for identifiers** - Make the primary identifier string a primaryKey
   ```yaml
   - name: id
     type: string
     primaryKey: true
   ```

2. **Provide descriptions for clarity** - Help users understand what each string represents
   ```yaml
   - name: region
     type: string
     description: "AWS region identifier"
   ```

3. **Consistent formatting** - Use CEL expressions for consistent formatting
   ```yaml
   mapping:
     created_date: "row.created_at.format('2006-01-02')"
   ```

4. **Hide internal IDs** - Mark non-user-friendly identifiers as hidden
   ```yaml
   - name: config_id
     type: string
     hidden: true
     primaryKey: true
   ```

5. **Use units for clarity** - Add units when values have implicit meaning
   ```yaml
   - name: version
     type: string
     unit: "v"
   ```

## Performance Considerations

- String columns are very fast - use freely
- String filtering can be slower with large datasets
- Consider limiting results with `limit` in queries
- Use `hidden: true` for primaryKey fields not needed in UI

## String Length

By default, strings are not truncated. Long strings will wrap or scroll in the table. Consider:
- Using descriptions instead of long content
- Storing long content in a separate detail view
- Truncating in mapping: `row.name.substring(0, 50)`
