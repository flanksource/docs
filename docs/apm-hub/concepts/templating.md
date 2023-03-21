# Templating

**Templating is:**

> Simply a way to represent data in different forms.

Templating comes in handy when you want to dynamically craft your ElasticSearch queries that you provide in the configuration file. At the moment, only go templates are supported

## Go Template

Go templates are a feature of the Go programming language that allow you to define and execute templates. Templates are text files that contain placeholders for data, which are filled in at runtime. The view data for the template is the [search param](./api.md#search-params).

```yaml
backends:
  - opensearch:
      ...
      query: |
        {
          {{if .Page}}"search_after": {{ .Page }},{{end}}
          "sort": [{ "@timestamp": { "order": "desc", "unmapped_type": "boolean" } }],
          "query": {
            "bool": {
              "filter": [
                {"match_all": {}}
              ],
              "must_not":[
                {"match_phrase": { "agent.name": "nginx-ingress-controller-f6zx7" }},
                {"match_phrase": { "agent.name": "nginx-ingress-controller-r46vg" }}
              ]
            }
          }
        }
```
