---
title: Health Evaluation
---

All checks expose a health status of passing or failing.
HTTP checks pass for `200 <= code < 300` by default, and fail otherwise.
You can change default behavior using the `test` field:

In the following example, the HTTP check fails if the HTTP response header contains an `Authorization` field.

```yaml title=http-check-expr.yaml file=<rootDir>/modules/canary-checker/fixtures/minimal/http_no_auth_pass.yaml

```

:::info Boolean
`test` expressions must return a bool or boolean type string (`'true'` or `'false`')
:::

See <CommonLink to="cel">CEL expressions</CommonLink> for a function reference.

:::note JavaScript and Go templates
While `test` fields support JavaScript and Go templates, they are not recommended for health evaluations because of their verbosity and performance.
:::

## Variables

Each check exposes different variables to use in the `display` expression, See the **Result Variables** section for each check.
