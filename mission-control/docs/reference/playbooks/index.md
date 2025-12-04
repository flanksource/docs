---
title: Playbook
sidebar_position: 6
sidebar_custom_props:
  icon: playbook
---

| Field             | Description                                                                                                                                                                                                                                                                | Scheme                                                    |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| **`description`** | A short description                                                                                                                                                                                                                                                        | `string`                                                  |
| `icon`            | Icon for the playbook                                                                                                                                                                                                                                                      | [`Icon`](/docs/reference/types#icon)                      |
| `timeout`         | Maximum duration to let the playbook run before cancellation. Valid time units are "s", "m", "h", "d", "w", "y". Defaults to 30 minutes.                                                                                                                                   | `string`                                                  |
| `on.canary`       | Run a playbook when a health check fails or passes                                                                                                                                                                                                                         | [`EventTrigger`](./events#canary)                         |
| `on.component`    | Run a playbook when a part becomes heathy/unhealthy                                                                                                                                                                                                                        | [`EventTrigger`](./events#component)                      |
| `on.config`       | Run a playbook when someone creates/updates/deletes a config item or changes its state                                                                                                                                                                                     | [`EventTrigger`](./events#config)                         |
| `on.webhook`      | Run a playbook when someone calls a webhook                                                                                                                                                                                                                                | [`Webhook`](./webhooks)                                   |
| `runsOn`          | Which [runner](/docs/guide/playbooks/concepts/runners) (agent) to run the playbook on                                                                                                                                                                                      | [`[]Agent`](/docs/reference/types#agent)                  |
| `templatesOn`     | Where the templating of actions occurs <br/> For `host` the templating occurs on the mission control instance before sending to the agent <br/> For `agent` the templating occurs on the agent/runner where there might be secrets not accessible by the primary instance. | `host` or `agent`                                         |
| `checks`          | Which health checks this playbook can run on                                                                                                                                                                                                                               | [`[]ResourceSelector`](/docs/reference/resource-selector) |
| `configs`         | Which config items this playbook can run on                                                                                                                                                                                                                                | [`[]ResourceSelector`](/docs/reference/resource-selector) |
| `components`      | Which parts this playbook can run on                                                                                                                                                                                                                                       | [`[]ResourceSelector`](/docs/reference/resource-selector) |
| `env`             | Variables to lookup, available as `env` map in templating/filters                                                                                                                                                                                                          | [[]EnvVar](/docs/reference/env-var)                       |
| `parameters`      | Variables that users need to enter. Do not use parameters for sensitive values.                                                                                                                                                                                            | [`[]Parameter`](./parameters)                             |
| `actions`         | Individual actions or steps to perform                                                                                                                                                                                                                                     | [`[]Action`](#actions)                                    |
| `approval`        | Optional approvals required before a playbook runs                                                                                                                                                                                                                         | [`Approval`](#approvals)                                  |

## Run

<Fields
rows={[
{
field: 'id',
description: 'ID of the playbook run',
scheme: 'string',
},
{
field: 'playbook_id',
description: 'ID of the playbook',
scheme: 'string',
},
{
field: 'status',
description: 'Status of the playbook run',
scheme: 'string',
},
{
field: 'created_by',
description: 'ID of the user who created the playbook run',
scheme: 'string',
},
{
field: 'component_id',
description: 'ID of the component associated with the playbook run',
scheme: 'string',
},
{
field: 'check_id',
description: 'ID of the check associated with the playbook run',
scheme: 'string',
},
{
field: 'config_id',
description: 'ID of the config associated with the playbook run',
scheme: 'string',
},
{
field: 'agent_id',
description: 'ID of the agent that executed the playbook run',
scheme: 'string',
},
]}
/>

## Actions

| Field                 | Description                                                                         | Scheme                                                                                                                  | Required |
| --------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | -------- |
| **`name`**            | Step Name                                                                           | `string`                                                                                                                | `true`   |
| `runsOn`              | Which [runner](/docs/guide/playbooks/concepts/runners) (agent) to run the action on | [`[]Agent`](/docs/reference/types#agent)                                                                                |          |
| `templatesOn`         | Where templating (and secret management) of actions occurs                          | `host` or `agent`                                                                                                       |          |
| `delay`               | A delay before running the action e.g. `8h`                                         | [`Duration`](/docs/reference/types#duration) or [CEL](/docs/reference/scripting/cel) with [Playbook Context](./context) |          |
| `filter`              | Conditionally run an action                                                         | [CEL](/docs/reference/scripting/cel) with [Playbook Context](./context)                                                 |          |
| `timeout`             | Timeout on this action.                                                             | [`Duration`](/docs/reference/types#duration)                                                                            |          |
| `azureDevopsPipeline` | Trigger a pipeline run                                                              | [AzureDevops](/docs/guide/playbooks/actions/azure_devops_pipeline)                                                      |          |
| `exec`                | Run a script e.g. to use `kubectl` or `aws` `CLIs`                                  | [Exec](/docs/guide/playbooks/actions/exec)                                                                              |          |
| `github`              | Trigger Github Action                                                               | [Github Action](/docs/guide/playbooks/actions/github)                                                                   |          |
| `gitops`              | Update a git repository (directly or via pull request)                              | [Gitops](/docs/guide/playbooks/actions/gitops)                                                                          |          |
| `http`                | Call an HTTP Endpoint                                                               | [Http](/docs/guide/playbooks/actions/http)                                                                              |          |
| `sql`                 | Execute a SQL query                                                                 | [Sql](/docs/guide/playbooks/actions/sql)                                                                                |          |
| `pod`                 | Run a kubernetes pod.                                                               | [Pod](/docs/guide/playbooks/actions/pod)                                                                                |          |
| `notification`        | Specify notification of action.                                                     | [Notification](/docs/guide/playbooks/actions/notification)                                                              |          |

> Only 1 action should be specified per step

## Approvals

Approvals allow requiring one or more people to approve before a playbook runs.

```yaml title="scale-deployment.yaml" {10-14} file=<rootDir>/modules/mission-control/fixtures/playbooks/delete-pv.yaml

```

| Field                | Description                                    | Scheme         | Required |
| -------------------- | ---------------------------------------------- | -------------- | -------- |
| `type`               | How many approvals required. Defaults to `all` | `any` or `all` | `false`  |
| `approvers.[]people` | Login or id of a person                        | `People`       | `false`  |
| `approvers.[]teams`  | Name or id of a team                           | `Team`         | `false`  |
