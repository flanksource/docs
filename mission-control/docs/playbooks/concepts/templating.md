# Templating

Templating allows your playbook actions to work in context of a config, health check or a component.

**Example**:

```yaml title='scale-deployment.yaml'
apiVersion: mission-control.flanksource.com/v1
kind: Playbook
metadata:
  name: scale-deployment
spec:
  description: Scale deployment
  configs:
    - type: Kubernetes::Deployment
      tags:
        environment: staging
  parameters:
    - name: replicas
      label: The new desired number of replicas.
  actions:
    - name: 'scale deployment'
      exec:
        script: kubectl scale --replicas={{.params.replicas}} --namespace={{.config.tags.namespace}} deployment {{.config.name}}
```


## Accessing results of another action

You can base your filters based on result of a previous action. The following two cel functions can be used:

### getLastAction

`getLastAction()`

Syntax:

```javascript
getLastAction().result.stdout.JSON().count < 5;
```

### getAction

To fetch the result of any action that ran before this action, use `getAction()`

Syntax:

```javascript
getAction('action_name').result.stdout.JSON().count < 5;
```

## Context

Templates receive a context variable that contain details about the config or component it is running for. In addition, it also contains the optional `params` variable which contains the parameters passed to the playbook.

| Field       | Description                              | Schema                                       |
| ----------- | ---------------------------------------- | -------------------------------------------- |
| `.config`    | Config passed to the playbook            | [`ConfigItem`](/reference/config-db/config-item) |
| `.component` | Component passed to the playbook         | [`Component`](/reference/topology/components)    |
| `.check`     | Canary Check passed to the playbook      | [`Check`](/reference/canary-checker/check)            |
| `.params`    | User provided parameters to the playbook | `map[string]string`                          |
| `.user.name`    | Name of the user who invoked the action | `string`                          |
| `.user.email`    | Email of the user who invoked the action | `string`                          |
| `getLastAction()` | Returns the result of the action that just run | Action Specific |
| `getAction({action})` | Return the result of  a specific action | Action Specific |



### Action Result



| Field           | Description | Schema |
| --------------- | ----------- | ------ |
| `result.stdout` |             |        |
|                 |             |        |
|                 |             |        |





