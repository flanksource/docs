---
title: Scopes
sidebar_position: 4
---

Scopes define collections of resources that can be used for fine-grained access control in Mission Control. A Scope allows you to group resources by various criteria (agent, namespace, name, tags) and use these groups in permission rules to control who can access what resources.

Scopes work as building blocks for [ABAC](abac.md) permission policies and enable [multi-tenancy](multi-tenancy.md) by allowing you to partition resources across different teams, environments, or organizational boundaries.

## Core Concepts

### Scope Structure

A Scope consists of one or more **targets**, where each target defines a collection of resources. Multiple targets within a Scope are combined with **OR logic**, meaning a resource matches the Scope if it matches any of the targets.

:::info
Each target must specify exactly **one** resource type. You cannot mix different resource types within a single target.
:::

### Resource Selectors

Each target uses a `ScopeResourceSelector` to filter resources. The selector supports four fields:

| Field | Description | Example |
|-------|-------------|---------|
| `agent` | Filter by agent ID or name | `agent-prod-1` |
| `namespace` | Filter by Kubernetes namespace | `production` |
| `name` | Filter by resource name. Supports wildcard `*` to match any resource | `nginx-*` is **NOT** supported, but `*` matches all |
| `tagSelector` | Filter by tags using label selector syntax | `env=prod,region=us-west` |

:::info Wildcard Limitations
The `name` field supports only the special wildcard directive `*` which matches **any** resource. Prefix and suffix wildcards (e.g., `nginx-*` or `*-prod`) are **NOT** supported.
:::

### Resource Types

Scopes can target six different resource types:

1. **`config`** - Configuration items from config-db
2. **`component`** - Topology components from the catalog
3. **`playbook`** - Runnable playbooks and automation
4. **`canary`** - Health checks and synthetic monitors
5. **`view`** - Custom dashboards and views
6. **`global`** - Wildcard selector that applies to all resource types

## Integration with ABAC

Scopes are designed to work seamlessly with [Attribute-Based Access Control (ABAC)](abac.md). When using ABAC, you reference Scopes in your permission policies to define the resource boundaries for access control.

```yaml
apiVersion: mission-control.flanksource.com/v1
kind: Permission
metadata:
  name: dev-team-access
spec:
  subjects:
    - kind: Group
      name: dev-team
  scopes:
    - prod-agent-configs  # Reference to Scope
  actions:
    - read
    - update
```

This permission grants the `dev-team` group read and update access to all resources defined in the `prod-agent-configs` Scope.

### Scope Evaluation

When a user attempts to access a resource:

1. The system evaluates all Scopes referenced in the user's permissions
2. If the resource matches any target in any of the user's Scopes, access is granted (subject to action restrictions)
3. Multiple Scopes are combined with OR logic

## Integration with Multi-Tenancy

Scopes are fundamental to implementing [multi-tenancy](multi-tenancy.md) in Mission Control. They allow you to partition resources across different tenants, teams, or organizational units.

Common multi-tenancy patterns include:
- **Environment Isolation** - Separate Scopes for dev, staging, and production environments
- **Team-Based Isolation** - Partition resources by team using namespaces or agents
- **Customer Isolation** - For SaaS scenarios, isolate customer resources by tags or agents

See the [multi-tenancy patterns examples](../examples/multi-tenancy-patterns.md) for detailed implementation patterns.

## See Also

- [Scope Examples](../examples) - Practical examples of Scope configurations
- [Attribute-Based Access Control (ABAC)](abac.md) - Using Scopes in permission policies
- [Multi-Tenancy](multi-tenancy.md) - Implementing tenant isolation with Scopes
- [Permission Actions](/reference/permissions/actions) - Available actions for Scope-based permissions
