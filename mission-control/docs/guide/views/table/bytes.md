---
title: Bytes
sidebar_custom_props:
  icon: mdi:memory
---

The `bytes` column type displays byte sizes and automatically formats them with appropriate units (B, KB, MB, GB, TB).

## Basic Usage

```yaml
columns:
  - name: file_size
    type: bytes
```

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | string | Column name (used in mapping) |
| `type` | string | Set to `"bytes"` |
| `description` | string | Help text for column |
| `precision` | integer | Decimal places for display |
| `filter` | object | Enable filtering on this column |
| `card` | object | Configure card layout position |

## Example Usage

### Simple Byte Size Display

```yaml
columns:
  - name: file_size
    type: bytes

mapping:
  file_size: "row.properties.size_bytes"
```

### Storage Size with Precision

```yaml
columns:
  - name: storage_used
    type: bytes
    precision: 2

mapping:
  storage_used: "row.properties.used_bytes"
```

## Auto-Formatting

The bytes column automatically formats values:

| Input Value | Display |
|------------|---------|
| 512 | 512 B |
| 1024 | 1 KB |
| 1048576 | 1 MB |
| 1073741824 | 1 GB |
| 1099511627776 | 1 TB |
| 1234567890 | 1.15 GB |

## Common Patterns

### Storage Metrics
```yaml
columns:
  - name: total_size
    type: bytes
  - name: used_size
    type: bytes
  - name: available_size
    type: bytes

mapping:
  total_size: "row.properties.total_bytes"
  used_size: "row.properties.used_bytes"
  available_size: "row.properties.available_bytes"
```

### Container Image Sizes
```yaml
columns:
  - name: image_name
    type: string
    primaryKey: true
  - name: image_size
    type: bytes
  - name: compressed_size
    type: bytes

mapping:
  image_name: "row.name"
  image_size: "row.properties.uncompressed_bytes"
  compressed_size: "row.properties.compressed_bytes"
```

### Database Storage
```yaml
columns:
  - name: database_name
    type: string
    primaryKey: true
  - name: data_size
    type: bytes
  - name: index_size
    type: bytes
  - name: total_size
    type: bytes

mapping:
  database_name: "row.name"
  data_size: "row.properties.data_bytes"
  index_size: "row.properties.index_bytes"
  total_size: "row.properties.data_bytes + row.properties.index_bytes"
```

## Real-World Examples

### Kubernetes PVC Storage Status
```yaml
columns:
  - name: pvc_name
    type: string
    primaryKey: true

  - name: capacity
    type: bytes
    description: "Total capacity"

  - name: used
    type: bytes
    description: "Currently used"

  - name: available
    type: bytes
    description: "Available space"

queries:
  pvcs:
    configs:
      types: ["Kubernetes::PersistentVolumeClaim"]

mapping:
  pvc_name: "row.name"
  capacity: "row.properties.spec.resources.requests.storage"
  used: "row.properties.status.used_bytes"
  available: "row.properties.spec.resources.requests.storage - row.properties.status.used_bytes"
```

### Volume Snapshot Sizes
```yaml
columns:
  - name: snapshot_name
    type: string
    primaryKey: true

  - name: snapshot_size
    type: bytes
    description: "Snapshot data size"

  - name: source_volume_size
    type: bytes
    description: "Original volume size"

queries:
  snapshots:
    configs:
      types: ["Storage::VolumeSnapshot"]

mapping:
  snapshot_name: "row.name"
  snapshot_size: "row.properties.snapshot_bytes"
  source_volume_size: "row.properties.source_volume_bytes"
```

### Object Storage Inventory
```yaml
columns:
  - name: bucket_name
    type: string
    primaryKey: true

  - name: total_objects
    type: number

  - name: total_size
    type: bytes
    description: "Total data stored"

  - name: avg_object_size
    type: bytes
    description: "Average object size"

queries:
  buckets:
    configs:
      types: ["Cloud::S3Bucket", "Cloud::GCSBucket"]

mapping:
  bucket_name: "row.name"
  total_objects: "row.properties.object_count"
  total_size: "row.properties.total_bytes"
  avg_object_size: "row.properties.total_bytes / row.properties.object_count"
```

### Log Storage Analysis
```yaml
columns:
  - name: log_stream
    type: string
    primaryKey: true

  - name: log_size
    type: bytes
    description: "Total log data size"

  - name: retention_bytes
    type: bytes
    description: "Retention limit"

  - name: age
    type: duration

queries:
  logs:
    configs:
      types: ["Logging::Stream"]

mapping:
  log_stream: "row.name"
  log_size: "row.properties.size_bytes"
  retention_bytes: "row.properties.retention_bytes_limit"
  age: "now - row.properties.first_record_time"
```

### Docker Image Statistics
```yaml
columns:
  - name: image_id
    type: string
    primaryKey: true
    hidden: true

  - name: image_name
    type: string

  - name: size
    type: bytes
    description: "Uncompressed size"

  - name: virtual_size
    type: bytes
    description: "Virtual size"

queries:
  images:
    prometheus:
      connection: docker
      query: |
        container_image_size_bytes
      columns:
        image: string
        size: number

mapping:
  image_id: "row.image"
  image_name: "row.image"
  size: "row.size"
  virtual_size: "row.size"  # Simplified for example
```

## Byte Size Expressions in CEL

### Direct Byte Values
```yaml
mapping:
  file_size: "row.properties.bytes"
```

### Unit Conversion
```yaml
mapping:
  # Gigabytes to bytes
  size_bytes: "row.properties.size_gb * 1024 * 1024 * 1024"

  # Megabytes to bytes
  size_bytes: "row.properties.size_mb * 1024 * 1024"
```

### Byte Calculations
```yaml
mapping:
  # Total from components
  total_size: "row.properties.data_bytes + row.properties.index_bytes + row.properties.cache_bytes"

  # Percentage of capacity
  # (Returns bytes, bytes column will format)
  used_size: "(row.capacity_bytes * 0.75)"

  # With conditional
  size: "row.type == 'file' ? row.file_bytes : row.directory_bytes"
```

## Precision Configuration

Control decimal places in display:

```yaml
columns:
  - name: size
    type: bytes
    precision: 2  # Shows "1.23 GB"

mapping:
  size: "row.properties.bytes"
```

## Common Byte Sizes

Reference for common values:
```
1 KB = 1,024 bytes
1 MB = 1,024 KB = 1,048,576 bytes
1 GB = 1,024 MB = 1,073,741,824 bytes
1 TB = 1,024 GB = 1,099,511,627,776 bytes
1 PB = 1,024 TB = 1,125,899,906,842,624 bytes
```

## Real-World Examples with Calculations

### Storage Utilization Percentage

```yaml
columns:
  - name: volume_name
    type: string
    primaryKey: true

  - name: total_capacity
    type: bytes

  - name: used_space
    type: bytes

  - name: utilization_percent
    type: gauge
    gauge:
      max: "100"
      thresholds:
        - percent: 70
          color: "yellow"
        - percent: 85
          color: "red"

mapping:
  volume_name: "row.name"
  total_capacity: "row.properties.total_bytes"
  used_space: "row.properties.used_bytes"
  utilization_percent: "(row.properties.used_bytes / row.properties.total_bytes) * 100"
```

### Storage Growth Rate

```yaml
columns:
  - name: dataset_name
    type: string
    primaryKey: true

  - name: current_size
    type: bytes

  - name: size_24h_ago
    type: bytes

  - name: daily_growth
    type: bytes

mapping:
  dataset_name: "row.name"
  current_size: "row.properties.current_bytes"
  size_24h_ago: "row.properties.size_24h_ago_bytes"
  daily_growth: "row.properties.current_bytes - row.properties.size_24h_ago_bytes"
```

## Filtering

Enable users to filter by size ranges:

```yaml
columns:
  - name: file_size
    type: bytes
    filter:
      type: "range"  # If supported, allows range filtering

mapping:
  file_size: "row.properties.bytes"
```

## Best Practices

1. **Use bytes as base unit** - Always store values as bytes
   ```yaml
   # ✓ Store in bytes
   mapping:
     size: "row.size_bytes"

   # ✗ Store in MB
   mapping:
     size: "row.size_mb * 1024 * 1024"
   ```

2. **Set appropriate precision** - Not too many decimals
   ```yaml
   # ✓ Reasonable precision
   precision: 2

   # ✗ Too many decimals
   precision: 5
   ```

3. **Provide context** - Add related metrics
   ```yaml
   columns:
     - name: total_size
       type: bytes
     - name: used_size
       type: bytes
     - name: utilization
       type: gauge  # Show usage too
   ```

4. **Document limits** - Explain size constraints
   ```yaml
   - name: storage_used
     type: bytes
     description: "Current storage used (max 1TB)"
   ```

5. **Handle edge cases** - Account for zero/null
   ```yaml
   mapping:
     size: "has(row.bytes) ? row.bytes : 0"
   ```

## Comparison with Other Numeric Types

| Type | Use Case |
|------|----------|
| `bytes` | Storage sizes (auto-formatted as B, KB, MB, etc.) |
| `number` | Integer or decimal counts |
| `decimal` | Precise float values |

Use `bytes` for storage, file, and memory sizes. Use `number` for counts. Use `decimal` for calculated percentages.

## Performance Considerations

- Byte formatting is very efficient
- Can display large datasets without performance issues
- Byte calculations in CEL are fast
- No significant UI rendering overhead

## Null/Zero Handling

```yaml
mapping:
  # Default to 0 bytes if unknown
  size: "has(row.bytes) ? row.bytes : 0"

  # Show as "Unknown" if null
  size: "has(row.bytes) ? row.bytes : null"
```

## Display Units

Bytes are automatically displayed with appropriate units based on size:
- 0-1023 B → Bytes (B)
- 1024-1MB → Kilobytes (KB)
- 1MB-1GB → Megabytes (MB)
- 1GB-1TB → Gigabytes (GB)
- 1TB+ → Terabytes (TB)

This provides intuitive human-readable display without configuration.
