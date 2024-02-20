
A scri

**Templating is:**

> Simply a way to represent data in different forms.

Templating comes in handy when you want the results of your operation displayed in your desired configuration and order. They can be specified in `display`, `test`, `transform` fields for the `Canary` object, `id`, `test`, `transform`, `display` for `Topology` object. The template can be configured In the next section, you'll see the different supported templates.

## Canary Template Types

To specify the template to be used for representing your data, the following options are available:

- [Scripting](#scripting)
  - [Canary Template Types](#canary-template-types)
    - [Expression](#expression)
    - [Go Template](#go-template)
    - [Javascript](#javascript)
    - [JSONPath](#jsonpath)

### Expression

### Go Template

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
