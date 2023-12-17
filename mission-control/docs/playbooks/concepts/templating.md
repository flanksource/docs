# Templating

**Templating is:**

> Simply a way to represent data in different forms.

Templating allows your playbook actions to work in context of a config, health check or a component.

**Example**:

```YAML
actions:
  - name: 'scale deployment'
    exec:
      script: kubectl scale --replicas={{.params.replicas}} --namespace={{.config.tags.namespace}} deployment {{.config.name}}
```

## Context

Templates receive a context variable that contain details about the config or component it is running for. In addition, it also contains the optional `params` variable which contains the parameters passed to the playbook.

| Field       | Description                              | Schema                                                                                           |
| ----------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `config`    | Config passed to the playbook            | [`ConfigItem`](../references/config_item.md)    |
| `component` | Component passed to the playbook         | [`Component`](../references/component.md) |
| `check`     | Canary Check passed to the playbook      | [`Check`](../references/check.md)         |
| `params`    | User provided parameters to the playbook | `map[string]string`                                                                              |
