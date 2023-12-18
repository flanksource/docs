# Expressions

Expressions is a powerful tool that allows formulating complex filters for playbook events. Playbook event filters use [Common Expression Language (CEL)](https://github.com/google/cel-go).

> The Common Expression Language (CEL) is a non-Turing complete language designed for simplicity, speed, safety, and portability. CEL's C-like syntax looks nearly identical to equivalent expressions in C++, Go, Java, and TypeScript.

**Examples:**

```
filter: check.type == 'http'

filter: check.type == 'http' && summary.failed >  3
```

## Context

| Field       | Description                              | Schema                                       |
| ----------- | ---------------------------------------- | -------------------------------------------- |
| `config`    | Config passed to the playbook            | [`ConfigItem`](../references/config_item.md) |
| `component` | Component passed to the playbook         | [`Component`](../references/component.md)    |
| `check`     | Canary Check passed to the playbook      | [`Check`](../references/check.md)            |
| `params`    | User provided parameters to the playbook | `map[string]string`                          |
