---
title: Health Evaluation
---

All checks expose a health stats of passing (Green) or failing (Red).
For example the HTTP check fails if the status is `200 >= code < 299`
these default behaviors can be changed using the `test` field:

In the example below the http check fails if the HTTP response header contains an 'Authorization' field.

```yaml title=http-check-expr.yaml file=../../../../modules/canary-checker/fixtures/minimal/http_no_auth_pass.yaml
```

:::info Boolean
`test` expressions must return a bool or boolean type string (`'true'` or `'false`')
:::

See <CommonLink to="cel">Cel Expressions</CommonLink> for a function reference

:::note Javascript and Go Templating
While `test` fields do support Javascript and Go Templates, they are not recommended for health evaluations due to their verbosity and performance.
:::

## Variables

Each check exposes different variables to use in the `display` expression, See the **Result Variables** section for each check.
