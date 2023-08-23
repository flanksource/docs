# Manually Triggering Playbook run

A run can be triggered manually using our REST API

```
POST /playbook/run
```

## Body Parameters

| Parameter      | Type                | Description                             |
| -------------- | ------------------- | --------------------------------------- |
| `id`           | `string`            | The ID of the playbook to run.          |
| `config_id`    | `string`            | The ID of the config item to run.       |
| `component_id` | `string`            | The ID of the component to run.         |
| `params`       | `map[string]string` | The parameters to pass to the playbook. |

## Response

| Field       | Type     | Description                                           |
| ----------- | -------- | ----------------------------------------------------- |
| `run_id`    | `string` | The ID of the run.                                    |
| `starts_at` | `string` | The time the run is scheduled to start (_in RFC3339_) |

## Example

Considering the playbook spec in [playbooks/example](../playbook/examples.md#1-scaling-ec2-instance), we can trigger a run as follows:

```bash
curl -sL -X POST -u 'admin@local:admin' \
  --json '{
    "id": "1e624351-2e7c-4afd-a038-8b0fc9e179ef",
    "config_id": "0189f7b0-e0c7-944f-1f86-3e554392fd2b",
    "params": {
      "replicas": "1"
    }
  }' \
  localhost:8080/playbook/run
```
