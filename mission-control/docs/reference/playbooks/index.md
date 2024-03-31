---
title: Playbooks
---

| Field         | Description                                                  | Scheme                                               |
| ------------- | ------------------------------------------------------------ | ---------------------------------------------------- |
| **`description`** | A short description                                          | `string`                                             |
| `icon`        | Icon for the playbook                                        | [`Icon`](/reference/types#icon)  |
| `on.canary`    | Run a playbook when a health check fail or passed | [`EventTrigger`](./events#canary) |
| `on.component` | Run a playbook when a component becomes heathy/unhealthy | [`EventTrigger`](./events#component) |
| `on.config` | Run a playbook when a config item is created/updated/deleted or changes state | [`EventTrigger`](./events#config) |
| `on.webhook`   | Run a playbook when a webhook is called | [`Webhook`](./webhooks)    |
| `runsOn`      | Which [runner](/playbooks/concepts/runners) (agent) to run the playbook on|[`[]Agent`](/reference/types#agent)                                         |
| `templatesOn` | Where the templating of actions should occur  <br/> For `host` the templating occurs on the mission control instance before being passed to the agent <br/> For `agent` the templating occurs on the agent/runner where there might be secrets not accessible by the primary instance. | `host` or `agent`                                      |
| `checks`      | Which health checks can this playbook run on | [`[]ResourceSelector`](/reference/resource-selector) |
| `configs`     | Which config items can this playbook run on | [`[]ResourceSelector`](/reference/resource-selector) |
| `components`  | Which components can this playbook run on | [`[]ResourceSelector`](/reference/resource-selector) |
| `env` | Variables to lookup, available as `env` map in templating/filters | [[]EnvVar](/reference/env-var) |
| `parameters`  | Variables to be supplied by the user, Do not use parameters for sensitive values. | [`[]Parameter`](./parameters)                          |
| `actions`     | Individual actions or steps to perform   | [`[]Action`](#action)                                |
| `approval`    | Optional approvals required before a playbooks runs | [`Approval`](#approval)                    |


## Actions

| Field          | Description                                                  | Scheme                                                | Required |
| -------------- | ------------------------------------------------------------ | ----------------------------------------------------- | -------- |
| **`name`**         | Step Name                                              | `string`                                              | `true`   |
| `runsOn`       | Which [runner](/playbooks/concepts/runners) (agent) to run the action on| [`[]Agent`](/reference/types#agent)                  |          |
| `templatesOn`  | Where templating (and secret management) of actions should occur | `host` or `agent`                                     |          |
| `delay`        | A delay before running the action e.g. `8h`                  | [`Duration`](/reference/types#duration)  or  [CEL](/reference/scripting/cel) with [Playbook Context](./context) |          |
| `filter`       | Conditionally run an action                                                              | [CEL](/reference/scripting/cel) with [Playbook Context](./context)               |          |
| `timeout`      | Timeout on this action.                                      | [`Duration`](/reference/types#duration)                                            |          |
| `azureDevopsPipeline` |   Trigger a pipeline run                                                           | [AzureDevops](/playbooks/actions/azure_devops_pipeline)                |          |
| `exec`         | Run a script e.g. to use `kubectl` or `aws` CLI's            | [Exec](/playbooks/actions/exec)                  |          |
| `github` |   Trigger Github Action                                                         | [Github Action](/playbooks/actions/github)                |          |
| `gitops`       | Update a git repository (directly or via pull request)       | [Gitops](/playbooks/actions/gitops)              |          |
| `http`         | Call an HTTP Endpoint                                        | [Http](/playbooks/actions/http)                  |          |
| `sql`          | Execute a SQL query                                          | [Sql](/playbooks/actions/sql)                    |          |
| `pod`          | Run a kubernetes pod.                                        | [Pod](/playbooks/actions/pod)                    |          |
| `notification` | Specify notification of action.                              | [Notification](/playbooks/actions/notification)  |          |

> Only 1 action should be specified per step

## Approvals

Approvals allow requiring one or more people to approve before a playbook runs.

```yaml title="scale-deployment.yaml" {10-14} file=../../../modules/mission-control/fixtures/playbooks/delete-pv.yaml
```

| Field       | Description                    | Scheme       | Required |
| ----------- | ------------------------------ | ------------ | -------- |
| `type`      | How many approvals required. Defaults to `all`    | `any` or `all`     | `false`  |
| `approvers.[]people` | Login or id of a person| `People` | `false`  |
| `approvers.[]teams` | Name or id of a team | `Team` | `false`  |

