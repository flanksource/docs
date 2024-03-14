---
description: Display Formatting
---

# Display Formatting

Canary checker can format the results of checks using the `display` field. All expressions must return a string (or a Go struct with a `.String()` method)

## Go Text Templates

In this example we get the current exchange rate:

```yaml title="display-with-gotemplate.yaml"
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: http-check
spec:
  http:
    - name: USD
      url: https://api.frankfurter.app/latest?from=USD&to=GBP,EUR,ILS,ZAR
      display:
        template: '$1 = €{{.json.rates.EUR}}, £{{.json.rates.GBP}}, ₪{{.json.rates.ILS}}'
```

Which would display:

```
$1 = €0.94913, £0.82394, ₪3.8455
```

See <CommonLink to="gotemplate">Go Template</CommonLink>

## CEL Expressions

The equivalent using CEL expressions would be:

```yaml title="display-with-cel.yaml"
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: http-check
spec:
  http:
    - name: USD
      url: https://api.frankfurter.app/latest?from=USD&to=GBP,EUR,ILS,ZAR
      display:
        expr: "'$1 = €' + string(json.rates.EUR) + ', £' + string(json.rates.GBP) + ', ₪' + string(json.rates.ILS)"
```

See <CommonLink to="cel">Cel Expressions</CommonLink> for a function reference

## Javascript

```yaml title="display-with-javascript.yaml"
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: http-check
spec:
  http:
    - name: USD
      url: https://api.frankfurter.app/latest?from=USD&to=GBP,EUR,ILS
      display:
        javascript: |
          currencyCodes = { "EUR": "€", "GBP": "£", "ILS": "₪"}

          display = ""
          for (var currency in json.rates) {
            if (display != "") {
              display += ", "
            }
            display += currency + " = " + currencyCodes[currency] + json.rates[currency] + ", "
          }
          "$1 = " + display
```

:::info
Do not return anything from the function, e.g. instead of `return "hello" + "world"` use just `"hello" + "world"`
:::

See <CommonLink to="javascript">JavaScript</CommonLink> for more details and a function reference.

## Variables

Each check exposes different variables to use in the `display` expression, See the **Result Variables** section for each check.
