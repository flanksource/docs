---
title: Stateful Metrics
---

Metrics can be generated from time based data, e.g. logs per minute, logins per second by using the output of one check execution as the input to the next.

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: "container-log-counts"
  namespace: observability
  # The schedule can be as short or as long as you want, the query will always search for log
  # since the last query
  schedule: "@every 5m"
  http:
    - name: container_log_volume
      url: "https://elasticsearch/logstash-*/_search"
      headers:
        - name: Content-Type
          value: application/json
      templateBody: true
      test:
        # if no logs are found, fail the health check
        expr: json.?aggregations.logs.doc_count.orValue(0) > 0
      # query for log counts by namespace, container and pod that have been created since the last check
      body: >-
        {
          "size": 0,
          "aggs": {
            "logs": {
              "filter": {
                "range": {
                  "@timestamp" : {
                    {{-  if last_result.results.max }}
                    "gte": "{{ last_result.results.max }}"
                    {{- else }}
                    "gte": "now-5m"
                    {{- end }}
                  }
                }
              },
              "aggs": {
                "age": {
                  "max": {
                    "field": "@timestamp"
                  }
                },
                "labels": {
                  "multi_terms": {
                    "terms": [
                      { "field": "kubernetes_namespace_name.keyword"},
                      { "field": "kubernetes_container_name.keyword"},
                      { "field": "kubernetes_pod_name.keyword"}
                    ],
                    "size": 1000
                  }
                }
              }
            }
          }
        }
      transform:
        # Save the maximum age for usage in subsequent queries and create a metric for each pair
        expr: |
          json.orValue(null) != null ?
          [{
            'detail': { 'max': string(json.?aggregations.logs.age.value_as_string.orValue(last_result().?results.max.orValue(time.Now()))) },
            'metrics': json.?aggregations.logs.labels.buckets.orValue([]).map(k,  {
              'name': "namespace_log_count",
              'type': "counter",
              'value': double(k.doc_count),
              'labels': {
                "namespace": k.key[0],
                "container": k.key[1],
                "pod": k.key[2]
              }
            })
          }].toJSON()
          : '{}'
```

This snippet will retrieve the `last_result.results.max` value from the last execution ensuring data is not duplicated or missed

```go
"@timestamp" : {
  {{-  if last_result.results.max }}
  "gte": "{{ last_result.results.max }}"
  {{- else }}
  "gte": "now-5m"
  {{- end }}
}
```

The max value is saved in the `transform` section using:

```yaml
#...
'detail': { 'max': string(json.?aggregations.logs.age.value_as_string.orValue(last_result().?results.max.orValue(time.Now()))) },
#...
```
