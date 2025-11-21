---
title: Multiple Resource Types
---

A single Scope can include multiple resource types by using multiple targets. Each target must specify exactly one resource type, and targets are combined with OR logic.

```yaml
apiVersion: mission-control.flanksource.com/v1
kind: Scope
metadata:
  name: monitoring-stack
  namespace: default
spec:
  description: Complete monitoring stack resources
  targets:
    - config:
        tagSelector: "app=prometheus"
    - component:
        tagSelector: "app=prometheus"
    - canary:
        tagSelector: "app=prometheus"
```

This Scope includes configs, components, and canaries that all have the tag `app=prometheus`. A resource matches the Scope if it matches **any** of the three targets.

**Use Cases:**
- Application stack ownership (all resources for an app)
- Feature-based access (configs + playbooks for a feature)
- Platform team permissions (infrastructure + monitoring)
- Cross-cutting concerns (observability resources across types)

:::info
Remember: Each target can only specify **one** resource type, but a single Scope can have multiple targets for different resource types.
:::
