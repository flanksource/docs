---
title: Actions
sidebar_position: 3
---

Actions are the fundamental tasks executed by a playbook. A playbook can comprise multiple actions, which are executed sequentially. If any action encounters an error and fails, the execution of the playbook is halted.

| Field                 | Description                                                                                                                                                              | Scheme                                               | Required |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------- | -------- |
| `name`                | Name of action.                                                                                                                                                          | `string`                                             | `true`   |
| `runsOn`              | Specify the [runners](/playbooks/concepts/runners) that can run this action. One will be chosen on random. When empty, the playbook will run on the main instance itself | `[]string`                                           |          |
| `templatesOn`         | Specify where the templating of the action spec should occur                                                                                                             | `host` or `agent`                                    |          |
| `delay`               | A delay before running the action e.g. `8h`                                                                                                                              | `Duration` or [`Expression`](../concepts/expression) |          |
| `filter`              | Whether to run the step or not                                                                                                                                           | [`Expression`](../concepts/expression)               |          |
| `timeout`             | Timeout on this action.                                                                                                                                                  | `Duration`                                           |          |
| `azureDevopsPipeline` |                                                                                                                                                                          | [AzureDevops](./azure_devops_pipeline)               |          |
| `exec`                | Specify exec of action.                                                                                                                                                  | [Exec](./exec)                                       |          |
| `gitops`              | Specify gitops of action.                                                                                                                                                | [Gitops](./gitops)                                   |          |
| `http`                | Specify http of action.                                                                                                                                                  | [Http](./http)                                       |          |
| `sql`                 | Specify sql of action.                                                                                                                                                   | [Sql`](./sql)                                        |          |
| `pod`                 | Specify pod of action.                                                                                                                                                   | [Pod](./pod)                                         |          |
| `notification`        | Specify notification of action.                                                                                                                                          | [Notification](./notification)                       |          |

:::note
Specify one or more actions; but at least one.
:::

## Templating

Templating allows your playbook actions to work in context of a config, health check or a component.

```yaml title='scale-deployment.yaml'
apiVersion: mission-control.flanksource.com/v1
kind: Playbook
metadata:
  name: scale-deployment
spec:
  description: Scale deployment
  configs:
    - types: [Kubernetes::Deployment]
  parameters:
    - name: replicas
      label: The new desired number of replicas.
  actions:
    - name: scale deployment
      exec:
        script: kubectl scale --replicas={{.params.replicas}} --namespace={{.config.tags.namespace}} deployment {{.config.name}}
```

### Accessing results of another action

You can base your filters based on result of a previous action. The following two cel functions can be used:

#### getLastAction

`getLastAction()` returns the result of the action that ran just before this action.

Syntax:

```javascript
getLastAction().result.stdout.JSON().count < 5
```

#### getAction

To fetch the result of any action that ran before this action, use `getAction()`

Syntax:

```javascript
getAction('action_name').result.stdout.JSON().count < 5
```

### Context

Templates receive a context variable that contain details about the config or component it is running for. In addition, it also contains the optional `params` variable which contains the parameters passed to the playbook.

| Field         | Description                              | Schema                                        |
| ------------- | ---------------------------------------- | --------------------------------------------- |
| `.config`     | Config passed to the playbook            | [`ConfigItem`](/reference/config-db)          |
| `.component`  | Component passed to the playbook         | [`Component`](/reference/topology/components) |
| `.check`      | Canary Check passed to the playbook      | [`Check`](/reference/canary-checker/check)    |
| `.params`     | User provided parameters to the playbook | `map[string]string`                           |
| `.user.name`  | Name of the user who invoked the action  | `string`                                      |
| `.user.email` | Email of the user who invoked the action | `string`                                      |
