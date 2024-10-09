---
title: Javascript
---

`javascript` expressions use to the [otto](https://github.com/robertkrimen/otto) Javascript VM

```yaml title="display-with-javascript.yaml" file=../../../modules/canary-checker/fixtures/minimal/display-with-javascript_pass.yaml

```

:::tip Troubleshooting
You can print to the console for rapid development e.g. `console.log(JSON.stringify(json))`, this is only shown in the logs
:::

### Underscore

The [underscore](https://underscorejs.org/) library is automatically imported so you can do the following:

```yaml title="display-format-with-underscore.yaml"
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
          "$1 = " + _.map(json.rates, function(rate, currency) {
               return currencyCodes[currency] + rate;
          }).join(", ");
```
