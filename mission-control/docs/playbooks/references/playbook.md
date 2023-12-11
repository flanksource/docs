# Playbooks

## Trigger

| Field       | Description                                          | Scheme                                   | Required |
| ----------- | ---------------------------------------------------- | ---------------------------------------- | -------- |
| `canary`    | Setup trigger on canary events                       | [`EventTrigger`](../concepts/events#event-spec) |          |
| `component` | Setup trigger on health check events.                | [`EventTrigger`](../concepts/events#event-spec) |          |
| `webhook`   | Setup a webhook endpoint that triggers the playbook. | [`WebhookTrigger`](../concepts/webhook#spec)    |          |

## ResourceFilter

Filters can define what resources (checks, configs or components) are permitted be run on the Playbook.

| Field  | Description                | Scheme              | Required |
| ------ | -------------------------- | ------------------- | -------- |
| `type` | Specify type of component. | `string`            |          |
| `tags` | Specify tags of component. | `map[string]string` |          |

## Parameter

Playbook parameter defines a parameter that a playbook needs to run.

| Field   | Description                 | Scheme   | Required |
| ------- | --------------------------- | -------- | -------- |
| `name`  | Specify name of parameter.  | `string` | `true`   |
| `label` | Specify label of parameter. | `string` | `true`   |