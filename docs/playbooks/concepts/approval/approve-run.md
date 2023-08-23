# Approving a run

A run can be approved using our REST API

```
POST /playbook/run/approve/{playbook_id}/{run_id}
```

## Path Parameters

| Parameter     | Type     | Description             |
| ------------- | -------- | ----------------------- |
| `playbook_id` | `string` | The ID of the playbook. |
| `run_id`      | `string` | The ID of the run.      |

## Example

```bash
curl -sL -X POST -u 'admin@local:admin' \
  'localhost:8080/playbook/run/approve/<playbook_id/<run_id>'
```