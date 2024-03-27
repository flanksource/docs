# Playbooks


| Field         | Description                                                  | Scheme                                               | Required |
| ------------- | ------------------------------------------------------------ | ---------------------------------------------------- | -------- |
| `description` | A short description                                          | `string`                                             | `true`   |
| `icon`        | Icon for the playbook                                        | `string`                                             |          |
| `on`          | Specify events to automatically trigger the Playbook. .      | [`[]Trigger`](#trigger)                              |          |
| `runsOn`      | Specify the [runners](./runners.md) that can run this playbook. One will be chosen on random. When empty, the playbook will run on the main instance itself | `[]string`                                           |          |
| `templatesOn` | Specify where the templating of the action spec should occur | `host` or `agent`                                      |          |
| `checks`      | Specify selectors for checks that can be run on the Playbook. | [`[]ResourceSelector`](/reference/resource-selector) |          |
| `configs`     | Specify selectors for config items that can be run on the Playbook. | [`[]ResourceSelector`](/reference/resource-selector) |          |
| `components`  | Specify selectors for component items that can be run on the Playbook. | [`[]ResourceSelector`](/reference/resource-selector) |          |
| `parameters`  | Define a set of labeled parameters for the Playbook.         | [`[]Parameter`](./parameters)                          |          |
| `actions`     | Specify the set of actions to run.                           | [`[]Action`](#action)                                | `true`   |
| `approval`    | Specify who can approve runs on this playbook.               | [`Approval`](#approval)                    |          |


## Action

| Field          | Description                                                                                                                                               | Scheme                                             | Required |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | -------- |
| `name`         | Name of action.                                                                                                                                           | `string`                                           | `true`   |
| `runsOn`       | Specify the [runners](./runners.md) that can run this action. One will be chosen on random. When empty, the playbook will run on the main instance itself | `[]string`                                         |          |
| `templatesOn`  | Specify where the templating of the action spec should occur                                                                                              | `host` or `agent`                                    |          |
| `delay`        | A delay before running the action e.g. `8h`                                        | `Duration` or  [`Expression`](../concepts/expression)                                           |          |
| `filter`       | Whether to run the step or not  | [`Expression`](../concepts/expression)                                           |          |
| `timeout`      | Timeout on this action.                                                                                                                                   | `Duration`               |          |
| `exec`         | Specify exec of action.                                                                                                                                   | [`Exec`](/playbooks/actions/exec.md)                 |          |
| `gitops`       | Specify gitops of action.                                                                                                                                 | [`Gitops`](/playbooks/actions/gitops.md)             |          |
| `http`         | Specify http of action.                                                                                                                                   | [`Http`](/playbooks/actions/http.md)                 |          |
| `sql`          | Specify sql of action.                                                                                                                                    | [`Sql`](/playbooks/actions/sql.md)                   |          |
| `pod`          | Specify pod of action.                                                                                                                                    | [`Pod`](/playbooks/actions/pod.md)                   |          |
| `notification` | Specify notification of action.                                                                                                                           | [`Notification`](/playbooks/actions/notification.md) |          |


## Trigger

| Field       | Description                                          | Scheme                                   | Required |
| ----------- | ---------------------------------------------------- | ---------------------------------------- | -------- |
| `canary`    | Setup trigger on canary events                       | [`EventTrigger`](../concepts/events#event-spec) |          |
| `component` | Setup trigger on health check events.                | [`EventTrigger`](../concepts/events#event-spec) |          |
| `webhook`   | Setup a webhook endpoint that triggers the playbook. | [`WebhookTrigger`](../concepts/webhook#spec)    |          |


## Approval

Authorization safeguards can be applied to playbook runs, ensuring their execution is limited to specific individuals or teams who grant approval.

```yaml title="approve-kubernetes-scaling.yaml"
#...
kind: Playbook
spec:
  #...
  approval:
    type: any
    approvers:
      people:
        - admin@local
      teams:
        - DevOps
```

| Field       | Description                    | Scheme       | Required |
| ----------- | ------------------------------ | ------------ | -------- |
| `type`      | How many approvals required. Defaults to `all`    | `any` or `all`     | `false`  |
| `approvers.[]people` | Login or id of a person| `People` | `false`  |
| `approvers.[]teams` | Name or id of a team | `Team` | `false`  |

