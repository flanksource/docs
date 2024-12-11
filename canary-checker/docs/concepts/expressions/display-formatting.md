---
title: Display Formatting
---

Canary checker can format the results of checks using the `display` field. All expressions must return a string (or a Go struct with a `.String()` method)

## Go Text Templates

In this example we get the current exchange rate:

```yaml title="display-with-gotemplate.yaml" file=<rootDir>/modules/canary-checker/fixtures/minimal/display-with-gotemplate_pass.yaml

```

Which would display:

```
$1 = €0.94913, £0.82394, ₪3.8455
```

See <CommonLink to="gotemplate">Go Template</CommonLink>

## CEL Expressions

The equivalent using CEL expressions would be:

```yaml title="display-with-cel.yaml" file=<rootDir>/modules/canary-checker/fixtures/minimal/display-with-cel_pass.yaml

```

See <CommonLink to="cel">Cel Expressions</CommonLink> for a function reference

## Javascript

```yaml title="display-with-javascript.yaml" file=<rootDir>/modules/canary-checker/fixtures/minimal/display-with-javascript_pass.yaml

```

:::info
Do not return anything from the function, e.g. instead of `return "hello" + "world"` use `"hello" + "world"`
:::

See <CommonLink to="javascript">JavaScript</CommonLink> for more details and a function reference.

## Variables

Each check exposes different variables to use in the `display` expression, See the **Result Variables** section for each check.
