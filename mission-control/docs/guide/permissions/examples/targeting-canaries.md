---
title: Targeting Canaries
---

This example demonstrates scoping canary health checks by name.

```yaml title="canary-localhost.yaml" file=<rootDir>/modules/mission-control/fixtures/scopes/canary-localhost.yaml

```

This Scope targets all canaries with the name `localhost`, which is useful for:

**Use Cases:**

- Granting access to specific monitoring checks
- Isolating development canaries from production
- Team-specific health check ownership
- SRE visibility boundaries
