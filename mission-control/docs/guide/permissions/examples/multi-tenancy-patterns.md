---
title: Multi-Tenancy Patterns
---

Scopes are fundamental to implementing multi-tenancy in Mission Control. Here are common patterns for partitioning resources across different tenants, teams, or organizational units.

## Environment Isolation

Create separate Scopes for different environments to prevent accidental changes to production:

```yaml
apiVersion: mission-control.flanksource.com/v1
kind: Scope
metadata:
  name: production-resources
  namespace: default
spec:
  description: All production resources
  targets:
    - config:
        tagSelector: 'env=production'
    - component:
        tagSelector: 'env=production'
    - playbook:
        tagSelector: 'env=production'
```

Grant developers read-only access to production resources and full access to development resources.

## Team-Based Isolation

Partition resources by team using namespace or agent:

```yaml
apiVersion: mission-control.flanksource.com/v1
kind: Scope
metadata:
  name: platform-team-resources
  namespace: default
spec:
  description: Resources managed by platform team
  targets:
    - config:
        namespace: platform-team
    - component:
        namespace: platform-team
```

Each team gets their own namespace, and Scopes ensure teams can only access their designated resources.

## Customer Isolation (SaaS)

For SaaS scenarios, isolate customer resources by agent or tags:

```yaml
apiVersion: mission-control.flanksource.com/v1
kind: Scope
metadata:
  name: customer-acme-resources
  namespace: default
spec:
  description: All resources for ACME Corp
  targets:
    - config:
        tagSelector: 'customer=acme'
```

You tag each customer's resources appropriately, and Scopes ensure customer data isolation.

## Multi-Dimensional Isolation

Combine multiple isolation dimensions (environment + team + region):

```yaml
apiVersion: mission-control.flanksource.com/v1
kind: Scope
metadata:
  name: team-a-prod-west
  namespace: default
spec:
  description: Team A production resources in west region
  targets:
    - config:
        namespace: team-a
        tagSelector: 'env=production,region=west'
```

This provides granular control for complex organizational structures.

**Key Principles:**

- Use consistent tagging strategies across all resources
- Document your tenant isolation model
- Start with broader Scopes and refine as needed
- Combine Scopes with [ABAC](../concepts/abac.md) policies for complete access control
