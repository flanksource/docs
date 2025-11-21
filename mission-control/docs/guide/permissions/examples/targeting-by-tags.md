---
title: Targeting by Tags
---

This example shows how to use tag selectors to dynamically scope resources based on their labels. Tag-based scoping is the most flexible approach as it allows resources to be added or removed from the scope by simply updating their tags.

```yaml title="homelab-all-resources.yaml" file=<rootDir>/modules/mission-control/fixtures/scopes/homelab-all-resources.yaml

```

The `tagSelector` uses label selector syntax to match configs with `cluster=homelab` AND `namespace=monitoring` tags. All specified tags must match (AND logic within a single selector).

**Advantages of Tag-Based Scoping:**
- **Dynamic**: Resources automatically join/leave the scope when tags change
- **Flexible**: No need to update Scope definitions when adding new resources
- **Expressive**: Combine multiple tags to create precise filters
- **Maintainable**: Centralize resource categorization through tagging strategy

**Use Cases:**
- Environment-based access (dev, staging, prod)
- Application-based grouping
- Compliance and regulatory boundaries
- Cost center or team ownership
