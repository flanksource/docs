---
title: Approvals
sidebar_custom_props:
  icon: material-symbols-light:approval-delegation-outline
---

Approval mechanisms ensure that only authorized individuals or teams can execute playbook runs. This safeguard helps maintain control and security over critical operations.

To implement approval in a playbook, define the `approval` field:

```yaml title="approve-kubernetes-scaling.yaml"
# This playbook scales a Kubernetes deployment and requires approval before execution.
kind: Playbook
  # snipped
  approval:
    type: any
    approvers:
      people:
        - admin@local
      teams:
        - DevOps
```

| Field                | Description                                                    | Scheme         | Required |
| -------------------- | -------------------------------------------------------------- | -------------- | -------- |
| `type`               | Specifies the number of approvals required. Defaults to `all`. | `any` or `all` | `false`  |
| `approvers.[]people` | List of individuals who can approve the playbook run.          | `People`       | `false`  |
| `approvers.[]teams`  | List of teams who can approve the playbook run.                | `Team`         | `false`  |
