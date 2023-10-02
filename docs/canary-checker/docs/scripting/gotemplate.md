# Go Templates

`template` expressions use the [Go Text Template](https://pkg.go.dev/text/template) library with some additional functions provided by the [gomplate](https://docs.gomplate.ca/) library.
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
        template: "$1 = €{{.json.rates.EUR}}, £{{.json.rates.GBP}}, ₪{{.json.rates.ILS}}"
```

