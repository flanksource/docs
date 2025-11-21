---
title: Global Resource Selectors
---

The `global` resource type creates a Scope that applies to all resource types simultaneously. This is useful for namespace-wide or agent-wide restrictions.

```yaml
apiVersion: mission-control.flanksource.com/v1
kind: Scope
metadata:
  name: namespace-restricted
  namespace: default
spec:
  description: All resources in specific namespace
  targets:
    - global:
        namespace: restricted-zone
```

This Scope matches configs, components, playbooks, canaries, and views in the `restricted-zone` namespace.

## When to Use Global Selectors

**Use global selectors when:**
- Applying namespace-based isolation across all resource types
- Creating agent-wide restrictions
- Implementing broad organizational boundaries
- Simplifying Scope definitions for common patterns

**Avoid global selectors when:**
- You need fine-grained control per resource type
- Different resource types have different access requirements
- You want to apply different tag filters to different resource types

## Global vs. Multiple Targets

These two Scopes are functionally equivalent:

**Using global:**
```yaml
targets:
  - global:
      namespace: myapp
```

**Using individual targets:**
```yaml
targets:
  - config:
      namespace: myapp
  - component:
      namespace: myapp
  - playbook:
      namespace: myapp
  - canary:
      namespace: myapp
  - view:
      namespace: myapp
```

The `global` approach is more concise but less flexible if you later need to apply different filters to different resource types.
