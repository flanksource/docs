---
title: Exec
---

# <Icon name="console"/> Exec

<Standard/>

Executes a bash (linux) or  powershell (windows) script. The check is considered passing if the script exits with `0`

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: exec-check
spec:
  interval: 30
  exec:
  - description: "exec dummy check"
    script: |
      echo "hello"
    name: exec-pass-check
    test:
      expr: 'results.Stdout == "hello"'
```

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| **`script`** | Script can be a inline script or a path to a script that needs to be executed. On windows executed via Powershell and in darwin and linux executed using bash. | *string* | Yes |
| `*` | All other commons field | [*Common*](common) |  |

::: note Docker image variants
See [image-variants](/image-variants)

