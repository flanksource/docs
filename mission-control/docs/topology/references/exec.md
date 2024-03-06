---
title: Exec
---

# <Icon name="console" /> Exec

Exec Check executes a command or script file on the target host. The type of scripts executed include:

- Bash scripts
- Powershell scripts

```yaml title="exec-check.yml"
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: exec-check
spec:
  interval: 30
  exec:
    - description: 'exec dummy check'
      script: |
        echo "hello"
      name: exec-pass-check
      test:
        expr: 'results.Stdout == "hello"'
```

| Field        | Description                                                                                                                                                    | Scheme                                  | Required |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | -------- |
| `display`    | Template to display server response in text (overrides default bar format for UI)                                                                              | [_Template_](../concepts/templating.md) |          |
| `labels`     | Labels for the check                                                                                                                                           | Labels                                  |          |
| **`script`** | Script can be a inline script or a path to a script that needs to be executed. On windows executed via powershell and in darwin and linux executed using bash. | _string_                                | Yes      |
| `transform`  | Template to transform results by excluding or including certain fields in result                                                                               | [_Template_](../concepts/templating.md) |          |
