---
title: Millicore
sidebar_custom_props:
  icon: mdi:cpu-64-bit
---

The `millicore` column type displays CPU resources in millicores (m) with automatic formatting. 1000 millicores = 1 CPU core.

## Basic Usage

```yaml
columns:
  - name: cpu_request
    type: millicore
```

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | string | Column name (used in mapping) |
| `type` | string | Set to `"millicore"` |
| `description` | string | Help text for column |
| `precision` | integer | Decimal places for display |
| `filter` | object | Enable filtering on this column |
| `card` | object | Configure card layout position |

## Example Usage

### CPU Request Display

```yaml
columns:
  - name: cpu_request
    type: millicore

mapping:
  cpu_request: "row.properties.cpu_request_m"
```

### CPU Limit Display

```yaml
columns:
  - name: cpu_limit
    type: millicore
    precision: 1

mapping:
  cpu_limit: "row.properties.cpu_limit_m"
```

## Conversion

Millicores are the standard unit for Kubernetes CPU requests/limits:

| Value | Display | Meaning |
|-------|---------|---------|
| 100 | 100m | 0.1 CPU core (10% of a core) |
| 500 | 500m | 0.5 CPU core (50% of a core) |
| 1000 | 1000m or 1 | 1 full CPU core |
| 2000 | 2000m or 2 | 2 CPU cores |
| 2500 | 2500m or 2.5 | 2.5 CPU cores |

## Common Patterns

### Pod Resource Limits
```yaml
columns:
  - name: pod_name
    type: string
    primaryKey: true

  - name: cpu_request
    type: millicore

  - name: cpu_limit
    type: millicore

mapping:
  pod_name: "row.name"
  cpu_request: "row.properties.spec.containers[0].resources.requests.cpu_m"
  cpu_limit: "row.properties.spec.containers[0].resources.limits.cpu_m"
```

### Node CPU Capacity
```yaml
columns:
  - name: node_name
    type: string
    primaryKey: true

  - name: allocatable_cpu
    type: millicore

  - name: requested_cpu
    type: millicore

  - name: available_cpu
    type: millicore

mapping:
  node_name: "row.name"
  allocatable_cpu: "row.properties.status.allocatable.cpu_m"
  requested_cpu: "row.properties.status.requested.cpu_m"
  available_cpu: "row.properties.status.allocatable.cpu_m - row.properties.status.requested.cpu_m"
```

## Real-World Examples

### Pod CPU Requests and Limits
```yaml
columns:
  - name: pod_name
    type: string
    primaryKey: true

  - name: container
    type: string

  - name: cpu_request
    type: millicore
    description: "Requested CPU (minimum guaranteed)"

  - name: cpu_limit
    type: millicore
    description: "CPU limit (maximum allowed)"

  - name: cpu_usage
    type: millicore
    description: "Current actual usage"

queries:
  pods:
    configs:
      types: ["Kubernetes::Pod"]

mapping:
  pod_name: "row.name"
  container: "row.properties.spec.containers[0].name"
  cpu_request: "row.properties.spec.containers[0].resources.requests.cpu * 1000"
  cpu_limit: "row.properties.spec.containers[0].resources.limits.cpu * 1000"
  cpu_usage: "row.properties.metrics.cpu_m"
```

### Node Resource Allocation
```yaml
columns:
  - name: node_name
    type: string
    primaryKey: true

  - name: total_capacity
    type: millicore
    description: "Total CPU capacity"

  - name: allocatable
    type: millicore
    description: "CPU available for pods"

  - name: requested
    type: millicore
    description: "Sum of all pod requests"

  - name: available
    type: millicore
    description: "Remaining unallocated CPU"

queries:
  nodes:
    configs:
      types: ["Kubernetes::Node"]

mapping:
  node_name: "row.name"
  total_capacity: "row.properties.status.capacity.cpu * 1000"
  allocatable: "row.properties.status.allocatable.cpu * 1000"
  requested: "row.properties.status.requested.cpu * 1000"
  available: "(row.properties.status.allocatable.cpu - row.properties.status.requested.cpu) * 1000"
```

### Deployment CPU Planning
```yaml
columns:
  - name: deployment_name
    type: string
    primaryKey: true

  - name: replicas
    type: number

  - name: cpu_per_replica
    type: millicore

  - name: total_cpu_requested
    type: millicore

  - name: total_cpu_limit
    type: millicore

queries:
  deployments:
    configs:
      types: ["Kubernetes::Deployment"]

mapping:
  deployment_name: "row.name"
  replicas: "row.properties.spec.replicas"
  cpu_per_replica: "row.properties.spec.template.spec.containers[0].resources.requests.cpu * 1000"
  total_cpu_requested: "row.properties.spec.replicas * row.properties.spec.template.spec.containers[0].resources.requests.cpu * 1000"
  total_cpu_limit: "row.properties.spec.replicas * row.properties.spec.template.spec.containers[0].resources.limits.cpu * 1000"
```

### Resource Request Validation
```yaml
columns:
  - name: pod_name
    type: string
    primaryKey: true

  - name: cpu_request
    type: millicore

  - name: is_request_reasonable
    type: health
    description: "Request is between 10m and 2000m"

queries:
  pods:
    configs:
      types: ["Kubernetes::Pod"]

mapping:
  pod_name: "row.name"
  cpu_request: "row.properties.spec.containers[0].resources.requests.cpu * 1000"
  is_request_reasonable: "
    has(row.properties.spec.containers[0].resources.requests) &&
    row.cpu_request >= 10 &&
    row.cpu_request <= 2000
    ? 'healthy' : 'warning'
  "
```

## Millicore Expressions in CEL

### Convert from CPU Cores to Millicores
```yaml
mapping:
  # From cores to millicores
  cpu_m: "row.cpu_cores * 1000"

  # From string "0.5" to 500m
  cpu_m: "float(row.cpu_string) * 1000"
```

### Calculate Total CPU
```yaml
mapping:
  total_cpu_m: "row.replicas * row.cpu_per_replica_m"
```

### CPU Allocation Percentage
```yaml
mapping:
  allocation_percent: "(row.requested_m / row.allocatable_m) * 100"
```

### CPU Headroom
```yaml
mapping:
  available_m: "row.allocatable_m - row.requested_m"
```

## Comparison with Cores

Millicore is Kubernetes' standard unit:

```yaml
# ✓ Use millicores (Kubernetes standard)
cpu_request: "row.resources.requests.cpu * 1000"  # Convert to millicore

# ✗ Don't use cores for Kubernetes
cpu_request: "row.resources.requests.cpu"  # Would be fractional

# ✓ Display with millicore type
type: millicore
```

## Real-World Millicore Values

Common CPU requests in Kubernetes:

| Value | Typical Use Case |
|-------|-----------------|
| 10-50m | Sidecar containers, minimal overhead |
| 50-100m | Small services, non-critical apps |
| 100-250m | Standard services, small microservices |
| 250-500m | Medium services, moderate workloads |
| 500m-1 | Larger services, significant computation |
| 1-2 | CPU-intensive workloads |
| 2+ | High-performance applications |

## Best Practices

1. **Use millicore for Kubernetes CPU** - It's the standard unit
   ```yaml
   # ✓ Kubernetes standard
   type: millicore

   # ✗ Avoid raw core values
   type: decimal
   ```

2. **Provide meaningful defaults** - Common requests
   ```yaml
   # ✓ Standard requests
   - 100m (10% of a core)
   - 250m (25% of a core)
   - 500m (50% of a core)
   - 1000m (1 full core)
   ```

3. **Set request and limit together** - Show both
   ```yaml
   - name: cpu_request
     type: millicore
   - name: cpu_limit
     type: millicore
   ```

4. **Validate reasonable ranges** - Use health checks
   ```yaml
   - name: cpu_validity
     type: health
     description: "Request is reasonable"
   ```

5. **Monitor node capacity** - Show what's available
   ```yaml
   - name: available_cpu
     type: millicore
     description: "Unallocated CPU on node"
   ```

## Filtering

Enable filtering by CPU ranges:

```yaml
columns:
  - name: cpu_request
    type: millicore
    filter:
      type: "range"

mapping:
  cpu_request: "row.cpu_request_m"
```

Users can filter to find:
- Pods with excessive CPU requests
- Pods with too little CPU
- Nodes with low CPU availability

## Performance Considerations

- Millicore columns are very efficient
- Millicore calculations are fast
- Can handle large pod counts
- No significant UI overhead

## Comparison with Other Resource Types

| Type | Use Case |
|------|----------|
| `millicore` | CPU resources in millicores (Kubernetes standard) |
| `bytes` | Memory in bytes |
| `number` | Other numeric values |
| `decimal` | Floating-point calculations |

Use `millicore` specifically for CPU. Use `bytes` for memory. Use `number` for counts.

## Null/Zero Handling

```yaml
mapping:
  # Default to 0 if not specified
  cpu_request: "has(row.cpu_request_m) ? row.cpu_request_m : 0"

  # Show "unlimited" if no limit
  cpu_limit: "has(row.cpu_limit_m) ? row.cpu_limit_m : null"
```

## Common Millicore Calculations

### Total CPU for Deployment
```yaml
mapping:
  total_cpu: "row.spec.replicas * row.spec.containers[0].resources.requests.cpu * 1000"
```

### CPU Headroom on Node
```yaml
mapping:
  available_cpu: "(row.allocatable.cpu - row.requested.cpu) * 1000"
```

### CPU Over-subscription Ratio
```yaml
mapping:
  ratio: "row.requested.cpu / row.allocatable.cpu"
```

### CPU Burst Headroom
```yaml
mapping:
  burst_available: "(row.allocatable.cpu - row.requested_limit.cpu) * 1000"
```
