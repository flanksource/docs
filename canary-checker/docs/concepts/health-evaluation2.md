# Health Evaluation

All checks expose a health stats of passing (Green) or failing (Red),  for example the HTTP check fails if the status is `200 >= code < 299`
these default behaviors can be changed using the `test` field:

In the example below the http check will fail if the SSL certificate expiry age is below 7 days

```yaml title=http-check-expr.yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: http-check-expr
spec:
  interval: 30
  http:
    - name: http pass response 200 status code
      endpoint: https://httpbin.demo.aws.flanksource.com/status/200
      test:
        expr: "code in [200,201,301] and sslAge < Duration('7d')"
```

Expressions must return a boolean type object and can use all 3 expression languages:
| Expression Type | Example                                               | Reference                                  |
| --------------- | ----------------------------------------------------- | ------------------------------------------ |
| `expr`          | `code in [200]`                                       | [CEL](/scripting/go-template)              |
| `javascript`    | `code == 200 `                                        | [Javascript](/scripting/javascript)        |
| `template`      | `{{if eq .result.code 200 }}true{{else}}false{{end}}` | [Go Text Template](/scripting/go-template) |



## Variables

Each check exposes different variables to use in the `test` expression, See the **Result Variables** section for each check.

