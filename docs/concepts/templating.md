# Templating
**Templating is:**
> Simply a way to represent data in different forms.

Templating comes in handy when you want the results of your operation displayed in your desired configuration and order. [Canary-checker](/canary-checker/overview/), [Config-db](/config-db/tutorials/getting-started-configdb) supports this feature for rendering results. They can be specified in `display`, `test`, `transform` fields for the `Canary` object, `id`, `test`, `transform`, `display` for `SystemTemplate` object. The template can be configured In the next section, you'll see the different supported templates.

## Canary Template Types
To specify the template to be used for representing your data, the following options are available:

- [Expression](#expression)
- [Go template](#go-template)
- [Javascript](#javascript)
- [JsonPath](#jsonpath)

### Expression 
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

### Go Template
The [Go template](https://pkg.go.dev/text/template) comes supported with the Canary checker to customize your output however you want it. 
Below is an example for the `display` field. 
```yaml
prometheus:
    - host: https://prometheus.canary.lab.flanksource.com/
      name: prometheus-check
      query: kubernetes_build_info{job!~"kube-dns|coredns"}
      display:
        template: "{{ (index .results 0).git_version }}"
```
A Go template is specified in `template` under `display`. The template extracts the `git_version` field from the initial field in `.results` output. 

### Javascript
In-line javascript does come supported with the Canary checker. Javascript code can be ran side-by-side with the checks to filter or render your data. 
Below is an example of in-line Javascript in use.
```yaml
properties:
  - name: pod-metrics
    lookup:
      kubernetes:
        - kind: PodMetrics
          ready: false
          name: podmetrics
          display:
            javascript: JSON.stringify(k8s.getPodMetrics(results))  
```
The javascript method `JSON.stringify()` is used in the `display` field to convert the value of `k8s.getPodMetrics(results)` to a JSON string.

### JSONPath
A JSONPath expression similar to the XPath with XML, is used to extract data from a JSON file by specifying a path to an element(s) in a JSON structure. This comes supported with the Canary-checker, and Config-db.
Below is an example of the JSONPath in use with the [File](/reference/config-db/config-types/file/) config type for Config-db .
```yaml
file:
  - type: $.Config.InstanceType
    id: $.Config.InstanceId
    path:
      - config*.json
      - test*.json
```
The fields, `type`, and `id` require a JSONPath expression to run. The string `$.Config.InstanceType` and `$.Config.InstanceId` specify the JSON value for `InstanceType` and `InstanceId` respectively contained in the files set in `path`.


