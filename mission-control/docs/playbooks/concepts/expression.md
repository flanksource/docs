# Expressions

Expressions is a powerful tool that allows formulating complex filters for playbook events. Playbook event filters use [Common Expression Language (CEL)](https://github.com/google/cel-go).

> The Common Expression Language (CEL) is a non-Turing complete language designed for simplicity, speed, safety, and portability. CEL's C-like syntax looks nearly identical to equivalent expressions in C++, Go, Java, and TypeScript.

**Examples:**

```
filter: check.type == 'http'

filter: check.type == 'http' && summary.failed >  3
```

## Context

| Field       | Description                            | Schema                                                                                                                       |
| ----------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `check`     | Check referenced by the event          | [`Check`](https://github.com/flanksource/duty/blob/d7ce9d3062eb656f955679b6d6ea2599ccede63a/models/checks.go#L24-L54) |
| `summary`   | Check 1h summary of pass/faill/latency |                                                                                                                              |
| `component` | Component referenced by the event      | [`Component`](../references/component.md)                             |
