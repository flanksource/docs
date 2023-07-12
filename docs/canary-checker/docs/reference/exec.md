# <img src='https://raw.githubusercontent.com/flanksource/flanksource-ui/main/src/icons/console.svg' style={{height: '32px'}}/> Exec

Exec Check executes a command or script file on the target host. The type of scripts executed include:

- Bash scripts
- Powershell scripts

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
