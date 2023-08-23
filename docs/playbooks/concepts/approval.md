# Approval

Playbook runs can be protected behind an authorization so that it can only run if certain people or teams approve it.

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

## Approving a run

```bash
curl -sL -X POST -u 'admin@local:admin' \
  'localhost:8080/playbook/run/approve/<playbook_id/<run_id>'
```

### Path Parameters

| Parameter     | Type     | Description             |
| ------------- | -------- | ----------------------- |
| `playbook_id` | `string` | The ID of the playbook. |
| `run_id`      | `string` | The ID of the run.      |
