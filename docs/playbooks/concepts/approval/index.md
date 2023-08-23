# Approval

Authorization safeguards can be applied to playbook runs, ensuring their execution is limited to specific individuals or teams who grant approval.

## Approval

| Field       | Description                    | Scheme       | Required |
| ----------- | ------------------------------ | ------------ | -------- |
| `type`      | Specify type of approval.      | `string`     | `false`  |
| `approvers` | Specify approvers of approval. | `[]Approver` | `false`  |

### Approval Type

| Type  | Description                           |
| ----- | ------------------------------------- |
| `any` | A single approval can suffice.        |
| `all` | All approvals are required. (default) |

### Approvers

| Field    | Description               | Scheme     | Required |
| -------- | ------------------------- | ---------- | -------- |
| `people` | Specify ids of the people | `[]string` | `false`  |
| `teams`  | Specify ids of the teams  | `[]string` | `false`  |
