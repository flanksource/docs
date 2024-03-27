# Playbooks

| Field         | Description                                                  | Scheme                                               |
| ------------- | ------------------------------------------------------------ | ---------------------------------------------------- |
| **`description`** | A short description                                          | `string`                                             |
| `icon`        | Icon for the playbook                                        | [`Icon`](/reference/types#icon)  |
| `on.canary`    | Run a playbook when a health check fail or passed | [`EventTrigger`](./events#canary) |
| `on.component` | Run a playbook when a component becomes heathy/unhealthy | [`EventTrigger`](./events#component) |
| `on.config` | Run a playbook when a config item is created/updated/deleted or changes state | [`EventTrigger`](./events#config) |
| `on.webhook`   | Run a playbook when a webhook is called | [`Webhook`](./webhooks)    |
| `runsOn`      | Specify the [runners](./runners.md) that can run this playbook. One will be chosen on random. When empty, the playbook will run on the main instance itself |[`[]Agent`](/reference/types#agent)                                         |
| `templatesOn` | Specify where the templating of the action spec should occur | `host` or `agent`                                      |
| `checks`      | Specify selectors for checks that can be run on the Playbook. | [`[]ResourceSelector`](/reference/resource-selector) |
| `configs`     | Specify selectors for config items that can be run on the Playbook. | [`[]ResourceSelector`](/reference/resource-selector) |
| `components`  | Specify selectors for component items that can be run on the Playbook. | [`[]ResourceSelector`](/reference/resource-selector) |
| `parameters`  | Accept user input | [`[]Parameter`](./parameters)                          |
| `actions`     | 1 or more actions to run    | [`[]Action`](#action)                                |
| `approval`    | Optional approvals required before a playbooks runs | [`Approval`](#approval)                    |


## Action

| Field          | Description                                                  | Scheme                                                | Required |
| -------------- | ------------------------------------------------------------ | ----------------------------------------------------- | -------- |
| `name`         | Name of action.                                              | `string`                                              | `true`   |
| `runsOn`       | Where a playbook runs. If more than 1 agent is specified the playbook will run on all specified runners | [`[]Agent`](/reference/types#agent)                  |          |
| `templatesOn`  | Where templating (and secret management) of actions should occur | `host` or `agent`                                     |          |
| `delay`        | A delay before running the action e.g. `8h`                  | [`Duration`](/reference/types#duration)  or  [CEL](/reference/scripting/cel) with [Playbook Context](./context) |          |
| `filter`       |                                                              | [CEL](/reference/scripting/cel) with [Playbook Context](./context)               |          |
| `timeout`      | Timeout on this action.                                      | [`Duration`](/reference/types#duration)                                            |          |
| `azureDevopsPipeline` |                                                              | [AzureDevops](/playbooks/actions/azure_devops_pipeline)                |          |
| `exec`         | Run a script e.g. to use `kubectl` or `aws` CLI's            | [Exec](/playbooks/actions/exec.md)                  |          |
| `gitops`       | Update a git repository (directly or via pull request)       | [Gitops](/playbooks/actions/gitops.md)              |          |
| `http`         | Call an HTTP Endpoint                                        | [Http](/playbooks/actions/http.md)                  |          |
| `sql`          | Execute a SQL query                                          | [Sql](/playbooks/actions/sql.md)                    |          |
| `pod`          | Run a kubernetes pod.                                        | [Pod](/playbooks/actions/pod.md)                    |          |
| `notification` | Specify notification of action.                              | [Notification](/playbooks/actions/notification.md)  |          |


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

