---
title: JUnit
---

# <Icon name="junit"/> JUnit

<Standard/>

JUnit check performs a Unit test, parses the JUnit test reports in a container at a specified path as defined in `testResults`.

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: junit-check
  annotations:
    trace: "true"
spec:
  interval: 120
  owner: DBAdmin
  severity: high
  spec:
    junit:
      - testResults: "/tmp/junit-results/"
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
            - name: jes
              image: docker.io/tarun18/junit-test-pass
              command: ["/start.sh"]
```

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| **`spec`** | Pod specification | [*v1.PodSpec*](https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.20/#podspec-v1-core) | Yes |
| **`testResults`** | Directory where the results will be published | *string* | Yes |
| `timeout` | Timeout in minutes to wait for specified container to finish its job. Defaults to 5 minutes | *int* |  |
| `*` | All other common fields | [*Common*](common) | |

## Test Result Variables

| Name       | Description           | Scehme           |
| ---------- | --------------------- | ---------------- |
| `suites`   |                       | [`[]JunitSuite`](#junit-suite) |
| `passed`   | Number of passing tests | *int*            |
| `failed`   | Number of failed tests | *int*            |
| `skipped`  | NUmber of tests that were skipped | *int*            |
| `error`    | Number of errors produced when running the tests | *int*            |
| `duration` | Total time in seconds | *float64*        |

### Junit Suite

| Name       | Description           | Scheme           |
| ---------- | --------------------- | ---------------- |
| `name`     |                       | *string* |
| `tests`    |                       | [`[]JunitTest`](#junit-test) |
| `passed`   | Number of passing tests                          | *int*                        |
| `failed`   | Number of failed tests                           | *int*                        |
| `skipped`  | NUmber of tests that were skipped                | *int*                        |
| `error`    | Number of errors produced when running the tests | *int*                        |
| `duration` | Total time in seconds | *float64*        |

### Junit Test

| Name         | Description                                             | Scheme              |
| ------------ | ------------------------------------------------------- | ------------------- |
| `name`       |                                                         | *string*            |
| `classname`  | an additional descriptor for the hierarchy of the test. | *string*            |
| `duration`   | Time in seconds                                         | *float64*           |
| `status`     | One of `passed`, `skipped`, `failed` or `error`         | *string*            |
| `message`    | Description optionally included with a skipped,         | *string*            |
| `properties` | Additional info about the test                          | `map[string]string` |
| `error`      | Any errors encountered when running atest               | *string*            |
| `stdout`     | Standard output produced during test                    | *string*            |
| `stderr`     | Standard error output produced during test              | *string*            |
