---
title: Targeting by Agent
---

This example shows how to scope configs based on which agent reported them. This is useful for creating permissions that apply to specific infrastructure components or regions.

```yaml title="prod-agent-configs.yaml" file=<rootDir>/modules/mission-control/fixtures/scopes/prod-agent-configs.yaml

```

This Scope includes all configs reported by either `agent-prod-1` or `agent-prod-2`. The multiple targets use OR logic, so any config from either agent will match this Scope.

**Use Cases:**
- Granting access to resources from specific production agents
- Regional isolation (agents in different regions)
- Infrastructure team boundaries (different teams managing different agents)
