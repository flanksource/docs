# Templating

**Templating is:**

> Simply a way to represent data in different forms.

Templating allows your playbook actions to work in context of a config or a component. Some actions, like exec action, can be templated using [Go templates](https://golang.org/pkg/text/template/).

**Example**:

```YAML
actions:
  - name: 'scale deployment'
    exec:
      script: kubectl scale --replicas={{.params.replicas}} --namespace={{.config.tags.namespace}} deployment {{.config.name}}
```

## Context

Templates receive a context variable that contain details about the config or component it is running for. In addition, it also contains the optional `params` variable which contains the parameters passed to the playbook.

| Field       | Description                       | Schema                                                                                           |
| ----------- | --------------------------------- | ------------------------------------------------------------------------------------------------ |
| `config`    | Config passed to the playbook     | [`models.ConfigItem`](https://github.com/flanksource/duty/blob/main/models/config.go#L68-L90)    |
| `component` | Component passed to the playbook  | [`models.Component`](https://github.com/flanksource/duty/blob/main/models/components.go#L20-L69) |
| `params`    | Parameters passed to the playbook | `map[string]string  `                                                                            |
