OpenSearch backend fetches logs from open search instances. The backend requires credentials to access the open search instance. The credentials can be provided as a Kubernetes secret or right in the config file itself. Read more about authentication [here](../reference/authentication).

You can craft the elastic search query using [Go Templates](../concepts/templating.md). The view data for the template is the [search param](../concepts/api.md#search-params).

## Example configuration

```yaml
apiVersion: apm-hub.flanksource.com/v1
kind: LoggingBackend
metadata:
  name: k8s-backend
spec:
  backends:
    - opensearch:
        routes:
          - type: 'logs'
            idPrefix: 'es-'
            labels:
              foo: bar,baz
              name: flanksource-*,!flanksource-demo
        address: 'https://logs.example.com'
        fields:
          message: 'log'
          timestamp: '@timestamp'
          exclusions:
            - 'transaction'
        username:
          value: 'elastic'
        password:
          value: 'my-secure-password'
        index: 'backend-logs'
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

## OpenSearchConfig

| Field       | Description                                                                                                | Scheme                                    | Required   |
| ----------- | ---------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ---------- |
| `routes`    | Specify routes that would match this backend.<br> _(Read more [Routing](../concepts/routing.md))_          | [`[]Route`](../concepts/routing.md#route) | `true`     |
| `labels`    | A set of key value pairs that'll be attached to individual items in the search result.                     | `map[string]string`                       | `optional` |
| `address`   | Elastic search instance URL.                                                                               | `string`                                  | `true`     |
| `query`     | The query for elastic search.<br>It's a go template which will receive the search param as it's view data. | `string`                                  | `true`     |
| `index`     | The elastic search index to look for the logs.                                                             | `string`                                  | `true`     |
| `namespace` | The Kubernetes namespace to search for `cloudID`, `apiKey`, `username` & `password`.                       | `string`                                  | `optional` |
| `fields`    | Additional configuration to customize what should and what shouldn't be fetched from the logs              | [`OpenSearchFields`](#opensearchfields)   | `true`     |
| `username`  | Username for the elastic search instance.                                                                  | `string`                                  | `true`     |
| `password`  | Password for the elastic search instance.                                                                  | `string`                                  | `true`     |

### OpenSearchFields

| Field        | Description                                                                | Scheme     | Required   |
| ------------ | -------------------------------------------------------------------------- | ---------- | ---------- |
| `timestamp`  | Specify the field that'll be used to extract the timestamp for each log.   | `string`   | `true`     |
| `message`    | Specify the field that'll be used as the message for apm-hub search result | `string`   | `true`     |
| `exclusions` | Specify the fields that'll not be extracted from the labels                | `[]string` | `optional` |
