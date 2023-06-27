# <img src='https://raw.githubusercontent.com/flanksource/flanksource-ui/main/src/icons/elasticsearch.svg' style='height: 32px'/> ElasticSearch

This check will try to connect to a specified ElasticSearch database, run a query against it and verify the results.

!!! note "Opensearch"
    To connect to Opensearch use `opensearch` field instead of `elasticsearch`


```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: elasticsearch-check
spec:
  interval: 30
  elasticsearch:
    - url: http://elasticsearch.default.svc:9200
      description: Elasticsearch checker
      index: index
      query: |
        {
        "query": {
            "term": {
            "system.role": "api"
            }
        }
        }

      results: 1
      name: elasticsearch_pass
      auth:
        username:
            valueFrom:
              secretKeyRef:
                name: elasticsearch-credentials
                key: USERNAME
        password:
            valueFrom:
              secretKeyRef:
                name: elasticsearch-credentials
                key: PASSWORD
```

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `auth` | username and password value, configMapKeyRef or SecretKeyRef for ElasticSearch server | [*Authentication*](../concepts/authentication.md) |  |
| `description` | Description for the check | *string* |  |
| `display` | Template to display the result in  | [*Template*](../concepts/templating.md) |  |
| `icon` | Icon for overwriting default icon on the dashboard | *string* |  |
| **`index`** | Index against which query should be ran | *string* | Yes |
| `labels` | Labels for the check | *Labels* |  |
| **`name`** | Name of the check | *string* | Yes |
| **`query`** | Query that needs to be executed on the server | *string* | Yes |
| **`results`** | Number of expected hits | *int* | Yes |
| `test` | Template to test the result against | [*Template*](../concepts/templating.md) |  |
| `transform` | Template to transform results to | [*Template*](../concepts/templating.md) |  |
| **`url`** | host:port address | *string* | Yes |
