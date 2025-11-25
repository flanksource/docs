---
title: Prometheus Queries
sidebar_custom_props:
  icon: prometheus
---

Prometheus queries fetch metrics directly from Prometheus using PromQL.

## Query Properties

| Property | Type | Description |
|----------|------|-------------|
| `connection` | string | Prometheus connection reference (e.g., `connection://mc/prometheus`) |
| `query` | string | PromQL query expression |
| `columns` | object | Define column types for results (recommended) |

## Example

```yaml title="pods.yaml" file=<rootDir>/modules/mission-control/fixtures/views/pods.yaml {75-103}

```

## Column Definitions

Define column types to control display and handle empty results:

```yaml
queries:
  memory:
    columns:
      namespace: string
      pod: string
      value: decimal
    prometheus:
      connection: connection://mc/prometheus
      query: |
        sum by (namespace, pod) (container_memory_working_set_bytes{...})
```

## Auto-Mapped Columns

Prometheus queries return:

- **Labels** from the metric as string columns (e.g., `namespace`, `pod`, `instance`)
- **value** as a numeric column containing the metric value
