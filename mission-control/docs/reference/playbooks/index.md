---
title: Playbook
sidebar_position: 70
sidebar_custom_props:
  icon: playbook
---

| Field             | Description                                                                                                                                                                                                                                                                | Scheme                                                    |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| **`description`** | A short description                                                                                                                                                                                                                                                        | `string`                                                  |
| `title`           | Title shown on the UI. Defaults to the playbook's name                                                                                                                                                                                                                     | `string`                                                  |
| `icon`            | Icon for the playbook                                                                                                                                                                                                                                                      | [`Icon`](/docs/reference/types#icon)                      |
| `category`        | Group the playbook under a category on the UI                                                                                                                                                                                                                              | `string`                                                  |
| `timeout`         | Maximum duration to let the playbook run before cancellation. Valid time units are "s", "m", "h", "d", "w", "y". Defaults to 30 minutes.                                                                                                                                   | `string`                                                  |
| `on.canary`       | Run a playbook when a health check fails or passes                                                                                                                                                                                                                         | [`EventTrigger`](./events#canary)                         |
| `on.component`    | Run a playbook when a part becomes heathy/unhealthy                                                                                                                                                                                                                        | [`EventTrigger`](./events#component)                      |
| `on.config`       | Run a playbook when someone creates/updates/deletes a config item or changes its state                                                                                                                                                                                     | [`EventTrigger`](./events#config)                         |
| `on.webhook`      | Run a playbook when someone calls a webhook                                                                                                                                                                                                                                | [`Webhook`](./webhooks)                                   |
| `on.schedule`     | Run a playbook on a recurring cron schedule                                                                                                                                                                                                                                | [`[]Schedule`](./events#schedule)                         |
| `runsOn`          | Which [runner](/docs/guide/playbooks/concepts/runners) (agent) to run the playbook on                                                                                                                                                                                      | [`[]Agent`](/docs/reference/types#agent)                  |
| `templatesOn`     | Where the templating of actions occurs <br/> For `host` the templating occurs on the mission control instance before sending to the agent <br/> For `agent` the templating occurs on the agent/runner where there might be secrets not accessible by the primary instance. | `host` or `agent`                                         |
| `checks`          | Which health checks this playbook can run on                                                                                                                                                                                                                               | [`[]ResourceSelector`](/docs/reference/resource-selector) |
| `configs`         | Which config items this playbook can run on                                                                                                                                                                                                                                | [`[]ResourceSelector`](/docs/reference/resource-selector) |
| `components`      | Which parts this playbook can run on                                                                                                                                                                                                                                       | [`[]ResourceSelector`](/docs/reference/resource-selector) |
| `filters`         | CEL expressions that decide whether the playbook can run on the selected resource                                                                                                                                                                                          | [`[]Expression`](/docs/guide/playbooks/concepts/expression) |
| `env`             | Variables to lookup, available as `env` map in templating/filters                                                                                                                                                                                                          | [[]EnvVar](/docs/reference/env-var)                       |
| `parameters`      | Variables that users need to enter. Do not use parameters for sensitive values.                                                                                                                                                                                            | [`[]Parameter`](./parameters)                             |
| `jsonSchema`      | A JSON schema, or a URL to one, to use for the run form instead of `parameters`                                                                                                                                                                                            | `string`                                                  |
| `ui`              | Properties applied to the UI form                                                                                                                                                                                                                                          | `map[string]any`                                          |
| `actions`         | Individual actions or steps to perform                                                                                                                                                                                                                                     | [`[]Action`](#actions)                                    |
| `approval`        | Optional approvals required before a playbook runs                                                                                                                                                                                                                         | [`Approval`](#approvals)                                  |
| `permissions`     | Roles and teams that are allowed to run this playbook                                                                                                                                                                                                                      | [`[]Permission`](#permissions)                            |
| `mcp`             | How this playbook is presented to LLM clients as an [MCP](/docs/guide/mcp) tool                                                                                                                                                                                            | [`MCP`](#mcp)                                             |

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
| `if`                  | Conditionally run an action                                                         | [CEL](/docs/reference/scripting/cel) with [Playbook Context](./context)                                                 |          |
| `timeout`             | Timeout on this action.                                                             | [`Duration`](/docs/reference/types#duration)                                                                            |          |
| `retry`               | Retry the action when it fails                                                      | [`Retry`](#retry)                                                                                                       |          |
| `contentType`         | How the action's primary output is rendered on the UI                               | `text/plain`, `text/markdown`, `text/x-shellscript`, `application/json`, `application/yaml`, `application/log+json` or `application/sql` |          |
| `ai`                  | Prompt an LLM with the context of the resource                                      | [AI](/docs/guide/playbooks/actions/ai)                                                                                  |          |
| `azureDevopsPipeline` | Trigger a pipeline run                                                              | [AzureDevops](/docs/guide/playbooks/actions/azure_devops_pipeline)                                                      |          |
| `catalog`             | Create a config item in the catalog                                                 | [Catalog](/docs/guide/playbooks/actions/catalog)                                                                        |          |
| `exec`                | Run a script e.g. to use `kubectl` or `aws` `CLIs`                                  | [Exec](/docs/guide/playbooks/actions/exec)                                                                              |          |
| `github`              | Trigger Github Action                                                               | [Github Action](/docs/guide/playbooks/actions/github)                                                                   |          |
| `gitops`              | Update a git repository (directly or via pull request)                              | [Gitops](/docs/guide/playbooks/actions/gitops)                                                                          |          |
| `http`                | Call an HTTP Endpoint                                                               | [Http](/docs/guide/playbooks/actions/http)                                                                              |          |
| `logs`                | Fetch logs from Loki, CloudWatch, OpenSearch or Kubernetes                          | [Logs](/docs/guide/playbooks/actions/logs)                                                                              |          |
| `notification`        | Specify notification of action.                                                     | [Notification](/docs/guide/playbooks/actions/notification)                                                              |          |
| `pod`                 | Run a kubernetes pod.                                                               | [Pod](/docs/guide/playbooks/actions/pod)                                                                                |          |
| `prometheus`          | Run a PromQL query                                                                  | [`PrometheusQuery`](/docs/guide/views/queries/prometheus)                                                                |          |
| `report`              | Render a catalog report from a view or a config selector                            | [Report](/docs/guide/playbooks/actions/report)                                                                          |          |
| `sql`                 | Execute a SQL query                                                                 | [Sql](/docs/guide/playbooks/actions/sql)                                                                                |          |

> Only 1 action should be specified per step

### Retry

<Fields rows={[
  {field: 'limit', description: 'Number of times to retry the action. With a limit of 3 there is a max of 4 attempts (initial attempt + 3 retries)', scheme: 'int', required: true},
  {field: 'duration', description: 'Duration to wait before retrying the action', scheme: 'Duration', required: true},
  {field: 'exponent.multiplier', description: 'Exponential backoff multiplier applied to the duration on every retry', scheme: 'int', required: true},
  {field: 'jitter', description: 'Random factor, from 0 to 100, applied to the wait duration', scheme: 'int'},
]}/>

## Approvals

Approvals allow requiring one or more people to approve before a playbook runs.

```yaml title="scale-deployment.yaml" {10-14} file=<rootDir>/modules/mission-control/fixtures/playbooks/delete-pv.yaml

```

| Field                | Description                                    | Scheme         | Required |
| -------------------- | ---------------------------------------------- | -------------- | -------- |
| `type`               | How many approvals required. Defaults to `all` | `any` or `all` | `false`  |
| `approvers.[]people` | Login or id of a person                        | `People`       | `false`  |
| `approvers.[]teams`  | Name or id of a team                           | `Team`         | `false`  |

## Permissions

Permissions grant roles and teams the ability to run this playbook, in addition to the global [permissions](/docs/guide/permissions).

| Field  | Description                                    | Scheme   | Required |
| ------ | ---------------------------------------------- | -------- | -------- |
| `role` | Name of a [role](/docs/guide/permissions/roles) | `string` | `false`  |
| `team` | Name of a team                                 | `string` | `false`  |
| `ref`  | Name of a [Permission](/docs/guide/permissions/permission) resource | `string` | `false`  |

## MCP

Mission Control exposes playbooks to LLM clients as [MCP](/docs/guide/mcp) tools. The `mcp` field controls how a playbook is presented to those clients.

| Field             | Description                                                          | Scheme     | Required |
| ----------------- | -------------------------------------------------------------------- | ---------- | -------- |
| `title`           | Tool title shown to the LLM. Defaults to the playbook's title        | `string`   | `false`  |
| `description`     | Additional context for the LLM, beyond `spec.description`            | `string`   | `false`  |
| `tags`            | Keywords used to categorize the tool for LLM discovery               | `[]string` | `false`  |
| `readOnlyHint`    | The playbook does not modify any state                               | `bool`     | `false`  |
| `destructiveHint` | The playbook may perform destructive operations                      | `bool`     | `false`  |
| `idempotentHint`  | Repeated runs with the same arguments have no additional effect      | `bool`     | `false`  |
| `openWorldHint`   | The playbook interacts with entities outside Mission Control         | `bool`     | `false`  |
