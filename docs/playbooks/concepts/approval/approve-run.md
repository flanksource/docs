# Approving a run

```bash
curl -sL -X POST -u 'admin@local:admin' \
  'localhost:8080/playbook/run/approve/<playbook_id/<run_id>'
```

### Path Parameters

| Parameter     | Type     | Description             |
| ------------- | -------- | ----------------------- |
| `playbook_id` | `string` | The ID of the playbook. |
| `run_id`      | `string` | The ID of the run.      |
