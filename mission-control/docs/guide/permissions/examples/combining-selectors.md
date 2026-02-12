---
title: Combining Selectors
---

Within a single `ScopeResourceSelector`, you can combine multiple fields. All specified fields must match (AND logic).

```yaml
apiVersion: mission-control.flanksource.com/v1
kind: Scope
metadata:
  name: prod-west-configs
  namespace: default
spec:
  description: Production configs in us-west region from specific agent
  targets:
    - config:
        agent: agent-west-1
        namespace: production
        tagSelector: 'region=us-west'
```

This target matches configs that:

- Come from `agent-west-1` **AND**
- Are in the `production` namespace **AND**
- Have the tag `region=us-west`

All three conditions must be satisfied for a config to match this target.

**Use Cases:**

- Highly specific resource filtering
- Regional + environment isolation
- Agent-specific namespaced resources
- Complex compliance requirements

**Selector Logic Summary:**

- Fields within a single selector: **AND** logic (all must match)
- Multiple targets in a Scope: **OR** logic (any target can match)
- Multiple tags in `tagSelector`: **AND** logic (all tags must match)
