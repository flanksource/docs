---
title: Stateful Metrics
---

Metrics can be generated from time based data, e.g. logs per minute, logins per second by using the output of one check execution as the input to the next.

```yaml file=../../../../modules/canary-checker/fixtures/elasticsearch/stateful_metrics.yaml

```

This snippet retrieves the `last_result.results.max` value from the last execution ensuring data is not duplicated or missed

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
