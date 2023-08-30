## Triggering Playbook run

A run can be triggered manually using our REST API

```
POST /playbook/run
```

### Request Body Parameters

| Parameter      | Type                | Description                             |
| -------------- | ------------------- | --------------------------------------- |
| `id`           | `string`            | The ID of the playbook to run.          |
| `config_id`    | `string`            | The ID of the config item to run.       |
| `component_id` | `string`            | The ID of the component to run.         |
| `params`       | `map[string]string` | The parameters to pass to the playbook. |

### Response

| Field       | Type     | Description                                           |
| ----------- | -------- | ----------------------------------------------------- |
| `run_id`    | `string` | The ID of the run.                                    |
| `starts_at` | `string` | The time the run is scheduled to start (_in RFC3339_) |

### Example

Considering the playbook spec in [playbooks/example](./concepts/playbook.md#example-scaling-ec2-instance), we can trigger a run as follows:

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

## Listing playbooks

As Playbooks are defined for component and config items, it is possible to list what playbooks are available them.
This filtering of playbooks is done by the [`ResourceFilter`](./concepts/playbook.md#resourcefilter) in the [`PlaybookSpec`](./concepts/playbook.md#playbookspec) object.

```
POST `/playbook/list?config_id={config_id}`
POST `/playbook/list?component_id={component_id}`
```

### Query Parameters

!!! info "Info"
Either `config_id` or `component_id` is required.

| Parameter      | Description              | Type     |
| -------------- | ------------------------ | -------- |
| `config_id`    | ID of the config item    | `string` |
| `component_id` | ID of the component item | `string` |

### Response

Returns a list of Playbook

| Field        | Description | Type        |
| ------------ | ----------- | ----------- |
| `id`         | ID          | `uuid`      |
| `name`       | Name        | `string`    |
| `spec`       | Spec        | `json`      |
| `source`     | Source      | `string`    |
| `created_by` | Created By  | `uuid`      |
| `created_at` | Created At  | `time.Time` |
| `updated_at` | Updated At  | `time.Time` |
| `deleted_at` | Deleted At  | `time.Time` |

### Example

```bash
curl -sL -u 'admin@local:admin' \
  'localhost:8080/playbook/list?config_id=0189f7b0-e0d9-a174-7837-ad255ff9834f'

curl -sL -u 'admin@local:admin' \
  'localhost:8080/playbook/list?component_id=0188e1a5-1928-c829-b6c7-bf49d4a1fd52'
```

## Approving a run

```
POST /playbook/run/approve/{playbook_id}/{run_id}
```

### Path Parameters

| Parameter     | Type     | Description             |
| ------------- | -------- | ----------------------- |
| `playbook_id` | `string` | The ID of the playbook. |
| `run_id`      | `string` | The ID of the run.      |

### Example

```bash
curl -sL -X POST -u 'admin@local:admin' \
  'localhost:8080/playbook/run/approve/<playbook_id/<run_id>'
```

## Getting a run status

As a playbook run might take some time to complete, it is useful to know the status of the run.

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
