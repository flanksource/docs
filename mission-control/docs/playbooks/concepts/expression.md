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

## Conditionally running actions

Playbook actions can be selectively executed based on CEL expressions. These expressions must either return

- a boolean value (`true` indicating run the action & skip the action otherwise)
- or a special function among the ones listed below

| Function    | Description                                                 |
| ----------- | ----------------------------------------------------------- |
| `always()`  | run no matter what; even if the playbook is cancelled/fails |
| `failure()` | run if any of the previous actions failed                   |
| `skip()`    | skip running this action                                    |
| `success()` | run only if all previous actions succeeded (default)        |
| `timeout()` | run only if any of the previous actions timed out           |

**Examples**

- `if: config.deleted_at ? true: false`
- `if: always()`

## Context

Expressions have access to the following variables and functions

| Field       | Description                              | Schema                                       |
| ----------- | ---------------------------------------- | -------------------------------------------- |
| `.config`    | Config passed to the playbook            | [`ConfigItem`](/reference/config-db/config-item) |
| `.component` | Component passed to the playbook         | [`Component`](/reference/topology/components)    |
| `.check`     | Canary Check passed to the playbook      | [`Check`](/reference/canary-checker/check)            |
| `.params`    | User provided parameters to the playbook | `map[string]string`                          |
| `.user.name`    | Name of the user who invoked the action | `string`                          |
| `.user.email`    | Email of the user who invoked the action | `string`                          |

