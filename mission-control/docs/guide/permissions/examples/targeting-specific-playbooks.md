---
title: Targeting Specific Playbooks
---

This example demonstrates how to create a Scope that targets specific playbooks by name within a namespace.

```yaml title="echo-playbooks.yaml" file=<rootDir>/modules/mission-control/fixtures/scopes/echo-playbooks.yaml

```

This Scope includes only the two named playbooks (`echo-secret-parameter` and `loki-logs`) in the `guest1-ns` namespace. Multiple targets are combined with OR logic, so the Scope matches if the playbook name matches either of the specified names.
