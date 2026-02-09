---
title: Variables
sidebar_custom_props:
  icon: mdi:variable
---

Variables make views interactive by allowing users to dynamically control which data is fetched. Variables are defined in the `templating` section and their values are substituted into queries using the `$(var.<key>)` syntax.

## Overview

Variables in Mission Control allow you to:

- Create interactive dropdowns users can adjust
- Populate options from static lists or dynamic sources
- Build dependent variables (e.g., filter namespaces by cluster)
- Use variable values in queries to control what data is fetched
- Maintain separate cache entries per variable combination

## Variables vs Column Filters

Mission Control has two ways to filter view data. Both are server-side, but they operate at different stages:

```
┌─────────────────────────────────────┐
│  Sources                            │
│  (configs, prometheus, checks, etc) │
└──────────────────┬──────────────────┘
                   │
                   ▼
        ┌──────────────────┐
        │  Execute Queries │ ◀── Variables filter here
        └────────┬─────────┘     (only matching data is fetched)
                 │
                 ▼
      ┌────────────────────┐
      │  In-memory SQLite  │
      │  (joins/merge)     │
      └──────────┬─────────┘
                 │
                 ▼
┌─────────────────────────────────────┐
│  PostgreSQL Table                   │
│  (view_<namespace>_<name>)          │
└──────────────────┬──────────────────┘
                   │
                   ▼
          ┌────────────────┐
          │ PostgREST API  │ ◀── Column Filters add WHERE clauses here
          └───────┬────────┘
                  │
                  ▼
            ┌──────────┐
            │    UI    │
            └──────────┘
```

|                            | Variables                                                  | Column Filters                                           |
| -------------------------- | ---------------------------------------------------------- | -------------------------------------------------------- |
| **Defined in**             | `spec.templating`                                          | `spec.columns[].filter`                                  |
| **When filtering happens** | At source query time                                       | At display time (PostgreSQL query)                       |
| **Effect**                 | Only matching data is fetched and stored in the view table | All data is in PostgreSQL; UI queries with WHERE clauses |
| **Use case**               | Scoping large datasets (e.g., select a cluster/namespace)  | Narrowing down within already-materialized results       |
| **Cache impact**           | Each variable combination has its own cache                | No cache impact                                          |

**Example**: If you have 10,000 pods across 5 clusters:

- **Variable** with `cluster` selection → Only pods from that cluster are fetched from the source and stored (~2,000 rows in PostgreSQL)
- **Column filter** on `cluster` → All 10,000 pods are stored in PostgreSQL; user's filter selection adds a WHERE clause to the query

Use **variables** when you need to scope down large datasets at the source. Use **column filters** when you want users to explore within already-reasonable result sets.

## Basic Variable Structure

```yaml
templating:
  # Simple static values variable
  - key: environment
    label: 'Environment'
    values: ['dev', 'staging', 'prod']
    default: 'dev'

  # Dynamic values from config items
  - key: cluster
    label: 'Cluster'
    valueFrom:
      config:
        types: ['Kubernetes::Cluster']
    default: 'us-east-1'
```

## Variable Properties

### Required Properties

| Property    | Type   | Description                                                       |
| ----------- | ------ | ----------------------------------------------------------------- |
| `key`       | string | Unique identifier for the variable (used in template expressions) |
| `label`     | string | Display name shown to users                                       |
| `values`    | array  | Static list of options for the dropdown                           |
| `valueFrom` | object | Dynamic options from config items (alternative to `values`)       |

:::note One of values or valueFrom is required
Every variable must have exactly one of `values` (static list) or `valueFrom` (dynamic from configs) to populate the dropdown options. These fields are mutually exclusive.
:::

### Optional Properties

| Property    | Type   | Description                           |
| ----------- | ------ | ------------------------------------- |
| `default`   | string | Default value when view loads         |
| `dependsOn` | array  | List of variable keys this depends on |

## valueFrom Structure

When using dynamic values from config items, `valueFrom` has the following structure:

| Property             | Type   | Description                                                                    |
| -------------------- | ------ | ------------------------------------------------------------------------------ |
| `config`             | object | Config selector to find matching config items                                  |
| `config.types`       | array  | List of config types to match (e.g., `['Kubernetes::Cluster']`)                |
| `config.tagSelector` | string | Tag selector for filtering configs (optional)                                  |
| `config.search`      | string | Free text search for configs (optional)                                        |
| `config.limit`       | int    | Maximum number of configs to return (optional, default: no limit)              |
| `label`              | string | CEL expression for dropdown display labels (optional, defaults to config name) |
| `value`              | string | CEL expression for dropdown values (optional, defaults to config name)         |

**Example:**

```yaml
valueFrom:
  config:
    types: ['Kubernetes::Pod']
    tagSelector: 'cluster=production'
    limit: 50
  label: 'row.name + " (" + row.tags.namespace + ")"' # Display: "nginx (default)"
  value: 'row.name' # Value used in queries: "nginx"
```

## Variable Types

### Static Values Variable

Use predefined options:

```yaml
- key: loglevel
  label: 'Log Level'
  values: ['debug', 'info', 'warning', 'error', 'fatal']
  default: 'info'
```

**Use cases**: Environments, log levels, predefined status filters, feature flags

### Dynamic Values Variable

Load options from configuration items:

```yaml
- key: cluster
  label: 'Kubernetes Cluster'
  valueFrom:
    config:
      types: ['Kubernetes::Cluster'] # Search for Cluster config items
      tagSelector: 'environment=prod' # Optional: filter configs
      limit: 100 # Optional: limit results
```

**Use cases**: Select from actual resources, allow any config type as filter, dynamic lists

The variable will be populated with config item names as options. Users can select one value.

### Dependent Variables

Create variables that depend on other variables:

```yaml
templating:
  # First variable (no dependencies)
  - key: cluster
    label: 'Cluster'
    valueFrom:
      config:
        types: ['Kubernetes::Cluster']

  # Dependent variable (filters based on cluster)
  - key: namespace
    label: 'Namespace'
    valueFrom:
      config:
        types: ['Kubernetes::Namespace']
        tagSelector: 'cluster=$(var.cluster)' # Reference parent variable
    dependsOn: ['cluster']
    default: 'default'

  # Another dependent variable
  - key: pod
    label: 'Pod'
    valueFrom:
      config:
        types: ['Kubernetes::Pod']
        # Can depend on multiple variables
        tagSelector: 'cluster=$(var.cluster),namespace=$(var.namespace)'
    dependsOn: ['cluster', 'namespace']
```

**How it works**:

1. Cluster variable loads first (no dependencies)
2. User selects a cluster
3. Namespace variable's options are dynamically filtered by the selected cluster
4. User selects a namespace
5. Pod variable's options are filtered by both cluster AND namespace

## Using Variables in Queries

Variables are available in query definitions using the `$(var.<key>)` syntax:

### In Config Queries

```yaml
queries:
  pods:
    configs:
      types: ['Kubernetes::Pod']
      tagSelector: 'cluster=$(var.cluster),namespace=$(var.namespace)'
      search: '$(var.pod_search)'
```

### In Prometheus Queries

```yaml
queries:
  metrics:
    prometheus:
      query: |
        up{cluster="$(var.cluster)",namespace="$(var.namespace)"}
```

### In Custom Merge Queries

```yaml
merge: |
  SELECT * FROM configs
  WHERE cluster = '$(var.cluster)'
  AND namespace = '$(var.namespace)'
```

## Using Variables in Mappings

Variables can also be used in column mapping expressions:

```yaml
mapping:
  cluster_display: "'$(var.cluster)'"
  pod_name: 'row.name'
```

## Variable Dependency Resolution

When views have multiple variables, Mission Control resolves them using topological sorting:

1. **Level 0**: Variables with no dependencies load first
2. **Level 1**: Variables depending on Level 0 variables load next
3. **Level N**: Variables are resolved in dependency order

**Circular dependency detection**: Mission Control validates that no circular dependencies exist and rejects invalid configurations.

**Example resolution order**:

```
cluster (Level 0 - no deps)
  ↓
namespace (Level 1 - depends on cluster)
pod (Level 1 - depends on cluster)
  ↓
container (Level 2 - depends on pod)
```

## Variable Scope and Caching

Each unique combination of variable values creates a separate cache entry:

```
cluster=us-east-1, namespace=default
  → separate cache entry
cluster=us-east-1, namespace=kube-system
  → different cache entry
cluster=eu-central-1, namespace=default
  → another cache entry
```

This means:

- Users switching between variable combinations get independent cached results
- No interference between different filter selections
- Each combination maintains its own [cache control](./cache-control.md) lifecycle

## Examples

### Example 1: Simple Static Variables

```yaml
apiVersion: mission-control.flanksource.com/v1
kind: View
metadata:
  name: environment-filter
spec:
  templating:
    - key: env
      label: 'Environment'
      values: ['development', 'staging', 'production']
      default: 'development'

    - key: sort_by
      label: 'Sort By'
      values: ['name', 'status', 'age']
      default: 'name'

  queries:
    items:
      configs:
        types: ['Application']
        tagSelector: 'environment=$(var.env)'

  columns:
    - name: item_name
      type: string
      primaryKey: true

  mapping:
    item_name: 'row.name'
```

### Example 2: Dynamic Cluster and Namespace Selection

```yaml
apiVersion: mission-control.flanksource.com/v1
kind: View
metadata:
  name: pod-explorer
spec:
  display:
    title: 'Pod Explorer'

  templating:
    # Level 0: No dependencies
    - key: cluster
      label: 'Cluster'
      valueFrom:
        config:
          types: ['Kubernetes::Cluster']
      default: 'production'

    # Level 1: Depends on cluster
    - key: namespace
      label: 'Namespace'
      valueFrom:
        config:
          types: ['Kubernetes::Namespace']
          tagSelector: 'cluster=$(var.cluster)'
      dependsOn: ['cluster']
      default: 'default'

  columns:
    - name: pod_name
      type: string
      primaryKey: true
    - name: status
      type: status

  queries:
    pods:
      configs:
        types: ['Kubernetes::Pod']
        tagSelector: 'cluster=$(var.cluster),namespace=$(var.namespace)'

  mapping:
    pod_name: 'row.name'
    status: 'row.status'
```

### Example 3: Multiple Data Sources with Variables

```yaml
apiVersion: mission-control.flanksource.com/v1
kind: View
metadata:
  name: pod-metrics
spec:
  templating:
    - key: cluster
      label: 'Cluster'
      values: ['us-east-1', 'us-west-2', 'eu-central-1']
      default: 'us-east-1'

    - key: metric_type
      label: 'Metric Type'
      values: ['cpu', 'memory', 'network']
      default: 'cpu'

  columns:
    - name: pod
      type: string
      primaryKey: true
    - name: value
      type: gauge

  queries:
    pods:
      configs:
        types: ['Kubernetes::Pod']
        tagSelector: 'cluster=$(var.cluster)'

    metrics:
      prometheus:
        query: |
          $(var.metric_type)_usage{cluster="$(var.cluster)"}
        columns:
          pod: string
          value: decimal

  merge: |
    SELECT p.name as pod, m.value as value
    FROM pods p
    LEFT JOIN metrics m ON p.name = m.pod

  mapping:
    pod: 'row.pod'
    value: 'row.value'
```

## Best Practices

1. **Use meaningful keys** - Choose variable keys that describe what they filter

   ```yaml
   key: environment  # ✓ Clear
   key: env_filter   # ✓ Also clear
   key: x            # ✗ Unclear
   ```

2. **Provide helpful labels** - Give users context about what to select

   ```yaml
   label: "Production Environment"  # ✓ Descriptive
   label: "Prod"                    # ✗ Too vague
   ```

3. **Set sensible defaults** - Most users select default, so choose a good one

   ```yaml
   default: "production"  # ✓ Safe, commonly used
   default: "dev"        # ? May not be what most users need
   ```

4. **Order variables logically** - Put base filters first, dependent filters later

   ```yaml
   # ✓ Good order
   - cluster # User selects cluster first
   - namespace # Then narrows to namespace
   - pod # Then finally a specific pod

   # ✗ Poor order
   - pod # User can't narrow down pods first
   - namespace
   - cluster
   ```

5. **Limit dynamic variable options** - Add reasonable limits to prevent huge lists

   ```yaml
   valueFrom:
     config:
       types: ['Kubernetes::Pod']
       limit: 100 # Don't load 10,000 pods
   ```

## Variable Templating Syntax

Variables use simple `$(var.key)` syntax for substitution:

```yaml
# In tagSelector
tagSelector: "cluster=$(var.cluster),env=$(var.env)"

# In search fields
search: "$(var.pod_search)"

# In PromQL queries
query: 'up{cluster="$(var.cluster)"}'

# In merge/custom SQL
WHERE cluster = '$(var.cluster)'
```

Note: String substitution happens before query execution, so values are injected as-is. For dynamic SQL, consider using parameterized queries if dealing with user input.
