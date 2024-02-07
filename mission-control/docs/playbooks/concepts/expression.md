# Expressions

Expressions is a powerful tool that allows formulating complex filters for playbook events. Playbook event filters use [Common Expression Language (CEL)](https://github.com/google/cel-go).

> The Common Expression Language (CEL) is a non-Turing complete language designed for simplicity, speed, safety, and portability. CEL's C-like syntax looks nearly identical to equivalent expressions in C++, Go, Java, and TypeScript.

**Examples:**

```yaml title="notify-with-filter.yaml"
---
apiVersion: mission-control.flanksource.com/v1
kind: Playbook
metadata:
  name: notify-with-filter
spec:
  on:
    config:
      - event: created
  configs:
    - type: Kubernetes::Pod
  actions:
    - name: Send notification
      exec:
        script: notify-send "{{.config.name}} was created"
    - name: Bad script to create a failing action
      exec:
        script: non-existing-command
    - name: Send all success notification
      if: success() # this filter practically skips this action as the second action above always fails
      exec:
        script: notify-send "Everything went successfully"
    - name: Send notification regardless
      if: always()
      exec:
        script: notify-send "a config was created"
```

## Context

| Field       | Description                              | Schema                                       |
| ----------- | ---------------------------------------- | -------------------------------------------- |
| `config`    | Config passed to the playbook            | [`ConfigItem`](../references/config_item.md) |
| `component` | Component passed to the playbook         | [`Component`](../references/component.md)    |
| `check`     | Canary Check passed to the playbook      | [`Check`](../references/check.md)            |
| `params`    | User provided parameters to the playbook | `map[string]string`                          |
