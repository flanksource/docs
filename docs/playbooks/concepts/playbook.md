# Playbook

Playbooks can be used to define actions for a component or a config item.

## Playbook

| Field         | Description                                                            | Scheme                                 | Required |
| ------------- | ---------------------------------------------------------------------- | -------------------------------------- | -------- |
| `description` | A short description                                                    | `string`                               | `true`   |
| `configs`     | Specify selectors for config items that can be run on the Playbook.    | [`[]ResourceFilter`](#resourcefilter)  | `false`  |
| `components`  | Specify selectors for component items that can be run on the Playbook. | [`[]ResourceFilter`](#resourcefilter)  | `false`  |
| `parameters`  | Define a set of labeled parameters for the Playbook.                   | [`Properties`](#properties-properties) | `false`  |
| `actions`     | Specify the set of actions to run.                                     | [`[]Action`](./action.md#action)       | `true`   |
| `approval`    | Specify who can approve runs on this playbook.                         | [`Approval`](./approval.md#approval)   | `false`  |

## ResourceFilter

Filters can define what resources (config or a component) are permitted be run on the Playbook.

| Field  | Description                | Scheme              | Required |
| ------ | -------------------------- | ------------------- | -------- |
| `type` | Specify type of component. | `string`            | `false`  |
| `tags` | Specify tags of component. | `map[string]string` | `false`  |

## Parameter

Playbook parameter defines a parameter that a playbook needs to run.

| Field   | Description                 | Scheme   | Required |
| ------- | --------------------------- | -------- | -------- |
| `name`  | Specify name of parameter.  | `string` | `true`   |
| `label` | Specify label of parameter. | `string` | `true`   |

