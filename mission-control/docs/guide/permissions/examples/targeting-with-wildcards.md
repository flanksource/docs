---
title: Targeting with Wildcards
---

This example demonstrates using the wildcard `*` to match all resources of a specific type.

```yaml title="all-topology.yaml" file=<rootDir>/modules/mission-control/fixtures/scopes/all-topology.yaml

```

Using `name: "*"` matches all components (topology items) in the system without any filtering.

:::info Wildcard Limitations
The `name` field only supports the special wildcard directive `*` which matches **any** resource. Mission Control does **NOT** support prefix and suffix wildcards (e.g., `nginx-*` or `*-prod`).
:::

**Use Cases:**

- Creating broad access policies for all resources of a type
- Testing and development environments
- Admin-level permissions
