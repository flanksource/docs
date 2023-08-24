# Getting a run status

As a playbook run might take some time to complete, it is useful to know the status of the run.

## REST API

```
GET /playbook/run/{id}
```

### Path Parameters

| Parameter | Type     | Description                 |
| --------- | -------- | --------------------------- |
| `id`      | `string` | The ID of the playbook run. |

### Response

| Field          | Type                | Description                                           |
| -------------- | ------------------- | ----------------------------------------------------- |
| `id`           | `string`            | The ID of the run.                                    |
| `playbook_id`  | `string`            | The ID of the playbook.                               |
| `status`       | `string`            | The status of the run.                                |
| `created_at`   | `string`            | The time the run is scheduled to start (_in RFC3339_) |
| `start_time`   | `string`            | The time the run started (_in RFC3339_)               |
| `end_time`     | `string`            | The time the run ended (_in RFC3339_)                 |
| `created_by`   | `string`            | The ID of the user that created the run.              |
| `component_id` | `string`            | The ID of the component that ran the playbook.        |
| `config_id`    | `string`            | The ID of the config item that ran the playbook.      |
| `parameters`   | `map[string]string` | The parameters to pass to the playbook.               |
| `agent_id`     | `string`            | The ID of the agent that ran the playbook.            |
