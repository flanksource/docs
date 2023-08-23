# Playbook Action

Actions are the actual task performed by a playbook. A playbook can consist of multiple actions that are executed in sequence. If any action fails, the execution is stopped.

## Action

| Field  | Description             | Scheme       | Required |
| ------ | ----------------------- | ------------ | -------- |
| `name` | Name of action.         | `string`     | `true`   |
| `exec` | Specify exec of action. | `ExecAction` | `false`  |
