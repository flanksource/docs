
The Go Expression Evaluation Language, [Expr](https://github.com/antonmedv/expr/) comes builtin with the Canary checker and is used for working with expressions. You use can expressions to render your data the way you see fit.
Below is an example for the supported field `test` for the `Canary` object.

```yaml
exec:
  - description: "exec dummy check"
    script: |
      echo "hello"
      name: exec-pass-check
      test:
        expr: 'results.Stdout == "hello"'
```

The expression, `expr: 'results.Stdout == "hello"'` performs a test to check if the command in the `script:` field ran successfully the result returns the string `hello`.
