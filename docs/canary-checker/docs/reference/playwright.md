---
title: Playwright
---

# <Icon name="playwright"/> Playwright

The JUnit check type runs a new kubernetes pod with the specified image, in this example we are running a [playwright](https://playwright.dev/) test suite

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: playwright-junit
spec:
  interval: 120
  severity: high
  junit:
    - testResults: "/tmp/"
      name: playwright-junit
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
          - name: playwright
            image: ghcr.io/flanksource/canary-playwright:latest
            command: ["/start.sh"]
```

By configuring playwright to export JUnit to the `testResults` folder, canary-checker will pick up the results and make then available display formating and health evaluation.

```bash title="start.sh"
mkdir -p /tmp/junit-results
PLAYWRIGHT_JUNIT_OUTPUT_NAME=/tmp/junit-results/results.xml npx playwright test --project=chromium --reporter=junit
touch /tmp/junit-results/done
```

For a complete working example, see **[canary-checker-examples/playwright](https://github.com/flanksource/canary-checker-examples/tree/main/playwright)**

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| **`spec`** | Pod specification | [*v1.PodSpec*](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.20/#podspec-v1-core) | Yes |
| **`testResults`** | Directory where the results will be published | *string* | Yes |
| `timeout` | Timeout in minutes to wait for specified container to finish its job. Defaults to 5 minutes | *int* |  |
| `*` | All other common fields | [*Common*](common) | |

## Test Result Variables

See [JUnit Test Results](./junit##test-result-variables) for the schema that is ingested and can be used for evaluating health or formatting the display.
