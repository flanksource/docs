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
| **`name`**    | Name of the check, must be unique within the canary         | `string`                                     | Yes      |
| `description` | Description for the check                                   | `string`                                     |          |
| `icon`        | Icon for overwriting default icon on the dashboard          | `string`                                     |          |
| `labels`      | Labels for check                                            | `map[string]string`                          |          |
| `test`        | Evaluate whether a check is healthy                         | [`Expression`](/concepts/health-evaluation)  |          |
| `display`     | Expression to change the formatting of the display          | [`Expression`](/concepts/display-formatting) |          |
| `transform`   | Transform data from a check into multiple individual checks | [`Expression`](/concepts/transforms)          |          |
| `metrics`     | Metrics to export from                                      | [`[]Metrics`](/concepts/metrics-exporter)    |          |

:::tip Docker Image variants
See [image-variants](/concepts/image-variants)
:::

