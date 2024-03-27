# Approval

Authorization safeguards can be applied to playbook runs, ensuring their execution is limited to specific individuals or teams who grant approval.

```yaml title="approve-kubernetes-scaling.yaml"
#...
kind: Playbook
spec:
  #...
  approval:
    type: any
    approvers:
      people:
        - admin@local
      teams:
        - DevOps
```

| Field       | Description                    | Scheme       | Required |
| ----------- | ------------------------------ | ------------ | -------- |
| `type`      | How many approvals required. Defaults to `all`    | `any` or `all`     | `false`  |
| `approvers.[]people` | Login or id of a person| `People` | `false`  |
| `approvers.[]teams` | Name or id of a team | `Team` | `false`  |
