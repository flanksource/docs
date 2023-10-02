---
title: Newman
---

# <Icon name="postman"/> Newman

The JUnit check type runs a new kubernetes pod with the specified image, in this example we are running a postman collection test suite using the [newman](https://github.com/postmanlabs/newman) cli.

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: newman-junit
spec:
  interval: 120
  severity: high
  junit:
    - testResults: "/tmp/"
      name: junit-newman
      display:
        template: |
          ✅ {{.results.passed}} ❌ {{.results.failed}} in 🕑 {{.results.duration}}
          {{  range $r := .results.suites}}
          {{- if gt (conv.ToInt $r.failed)  0 }}
            {{$r.name}} ✅ {{$r.passed}} ❌ {{$r.failed}} in 🕑 {{$r.duration}}
          {{- end }}
          {{- end }}
      spec:
        containers:
          - name: newman
            image: ghcr.io/flanksource/canary-newman:latest
            command: ["/start.sh"]
```

By configuring newman to export JUnit to the `testResults` folder, canary-checker will pick up the results and make then available display formating and health evaluation.

```bash title="start.sh"
set -x
mkdir -p /tmp/junit-results
newman run newman.json --reporters junit --reporter-export /tmp/junit.xml
cp /tmp/*.xml /tmp/junit-results/
touch /tmp/junit-results/done
```

For a complete working example, see **[canary-checker-examples/newman](https://github.com/flanksource/canary-checker-examples/tree/main/newman)**

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| **`spec`** | Pod specification | [*v1.PodSpec*](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.20/#podspec-v1-core) | Yes |
| **`testResults`** | Directory where the results will be published | *string* | Yes |
| `timeout` | Timeout in minutes to wait for specified container to finish its job. Defaults to 5 minutes | *int* |  |
| **`name`**    | Name of the check, must be unique within the canary         | `string`                                     | Yes      |
| `description` | Description for the check                                   | `string`                                     |          |
| `icon`        | Icon for overwriting default icon on the dashboard          | `string`                                     |          |
| `labels`      | Labels for check                                            | `map[string]string`                          |          |
| `test`        | Evaluate whether a check is healthy                         | [`Expression`](/concepts/health-evaluation)  |          |
| `display`     | Expression to change the formatting of the display          | [`Expression`](/concepts/display-formatting) |          |
| `transform`   | Transform data from a check into multiple individual checks | [`Expression`](/concepts/transforms)          |          |
| `metrics`     | Metrics to export from                                      | [`[]Metrics`](/concepts/metrics-exporter)    |          |

## Test Result Variables

See [JUnit Test Results](./junit##test-result-variables) for the schema that is ingested and can be used for evaluating health or formatting the display.
