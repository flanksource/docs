# Playbook Action

Actions are the fundamental tasks executed by a playbook. A playbook can comprise multiple actions, which are executed sequentially. If any action encounters an error and fails, the execution of the playbook is halted.

## Action

| Field  | Description             | Scheme       | Required |
| ------ | ----------------------- | ------------ | -------- |
| `name` | Name of action.         | `string`     | `true`   |
| `exec` | Specify exec of action. | `ExecAction` | `false`  |
