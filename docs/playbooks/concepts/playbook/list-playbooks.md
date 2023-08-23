# Listing playbooks

As Playbooks are defined for component and config items, it is possible to list what playbooks are available for a component or config item.
This filtering of playbooks for components and config items is done by the [`ResourceFilter`](./index.md#resourcefilter) in the [`PlaybookSpec`](./index.md#playbookspec) object.

## REST API

```
POST `/playbook/list?config_id={config_id}`
POST `/playbook/list?component_id={component_id}`
```

### Query Parameters

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
