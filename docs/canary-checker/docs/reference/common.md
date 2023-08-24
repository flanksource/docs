# Common Fields

All check types support the following fields:

| Field         | Description                                        | Scheme                                            | Required |
| ------------- | -------------------------------------------------- | ------------------------------------------------- | -------- |
| **`name`**    | Name of the check                                  | `string`                                          | Yes      |
| `filters`     | A map of label to value prefixes to find alerts on | `map[string]string`                               |          |
| `description` | Description for the check                          | `string`                                          |          |
| `icon`        | Icon for overwriting default icon on the dashboard | `string`                                          |          |
| `labels`      | Labels for check                                   | `map[string]string`                               |          |
| `test`        | Template to test the result against                | [`Template`](../concepts/templating)              |          |
| `display`     | Template to display the result in                  | [`Template`](../concepts/templating)              |          |
| `transform`   | Template for transformation                        | [`Template`](../concepts/templating)              |          |
| `metrics`     | Metrics to export from check results               | [`[]Metrics`](../concepts/metrics#custom-metrics) |          |

## Test

The `test` field allows you to run scripts to validate the response/result of a check.

In the example below we use an [expr](scripting/expr) to check an http response code and SSL expiry.

```yaml title="http-expr.yaml"
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: http-test
spec:
  interval: 30
  http:
    - name: http-expr-tests
      url: https://httpbin.demo.aws.flanksource.com/status/200
      test:
        expr: "code in [200,201,301] and sslAge > Duration('7d')"
```

## Display

The `display` field can be used to change the message shown (on pass or failure of a check) e.g.

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: http-test
spec:
  interval: 30
  http:
    - name: http-expr-tests
      url: https://httpbin.demo.aws.flanksource.com/status/200
      display:
        expr: "code in [200,201,301] and sslAge > Duration('7d')"
```





## Transform
