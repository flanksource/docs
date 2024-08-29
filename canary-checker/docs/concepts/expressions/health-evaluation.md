---
title: Health Evaluation
---

All checks expose a health stats of passing (Green) or failing (Red), for example the HTTP check fails if the status is `200 >= code < 299`
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
        expr: "code in [200,201,301] && sslAge < Duration('7d')"
```

:::info Boolean
`test` expressions must return a bool or boolean type string (`'true'` or `'false`')
:::

See <CommonLink to="cel">Cel Expressions</CommonLink> for a function reference

:::note Javascript and Go Templating
While `test` fields do support Javascript and Go Text Templates, they are not recommended for health evaluations due to their verbosity and performance.
:::

## Variables

Each check exposes different variables to use in the `display` expression, See the **Result Variables** section for each check.
