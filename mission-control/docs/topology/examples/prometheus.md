---
title: Prometheus
---

The following configuration creates a topology for Prometheus. The topology will have all the kubernetes pods in the "monitoring" namespace as its child components.

```yaml title=prometheus.yaml
apiVersion: canaries.flanksource.com/v1
kind: Topology
metadata:
  name: prometheus
spec:
  icon: prometheus
  type: Topology
  schedule: '@every 5m'
  components:
    - name: pods
      icon: pods
      lookup:
        kubernetes:
          - display:
              javascript: JSON.stringify(k8s.getPodTopology(results))
            kind: Pod
            name: k8s
            namespaceSelector:
              name: monitoring
      properties:
        - lookup:
            prometheus:
              - display:
                  javascript: |
                    var components = [];
                    for (idx in results) {
                      var value = parseInt(Number(results[idx].value))
                      // CPU can be between 0 & 1, so take ceil for that case
                      if (value < 1) {value = 1}

                      components.push({
                        name: results[idx].pod,
                        properties: [{name: 'cpu', value: value}],
                      })
                    }
                    JSON.stringify(components)
                query: 1000 * max by (pod) (rate(container_cpu_usage_seconds_total{container!=""}[5m]))
          name: cpu
        - lookup:
            prometheus:
              - display:
                  javascript: |
                    var components = [];
                    for (idx in results) {
                      components.push({
                        name: results[idx].pod,
                        properties: [{name: 'memory', value: parseInt(Number(results[idx].value))}],
                      })
                    }
                    JSON.stringify(components)
                query: max by (pod) (avg_over_time(container_memory_working_set_bytes{container!=""}[5m]))
          name: memory
  properties:
    - name: Metrics
      headline: true
      lookup:
        prometheus:
          - query: 'count({__name__=~".+"})'
            display:
              expr: results[0].value
    - name: Disk
      lookup:
        prometheus:
          - query: 'prometheus_tsdb_storage_blocks_bytes'
            display:
              expr: |
                [{'name': 'Disk', 'value': int(results[0].value), 'headline': true, 'unit': 'bytes'}].toJSON()
    - name: Memory
      lookup:
        prometheus:
          - query: 'max(container_memory_working_set_bytes{namespace="monitoring",container="prometheus"})'
            display:
              expr: |
                [{'name': 'Memory', 'value': int(results[0].value), 'headline': true, 'unit': 'bytes'}].toJSON()
    - name: Targets
      lookup:
        prometheus:
          - query: 'count(prometheus_target_scrape_pool_targets)'
            display:
              expr: results[0].value
    - name: Rule groups with duration > 1 sec
      lookup:
        prometheus:
          - query: 'count(prometheus_rule_group_last_duration_seconds > 1)'
            display:
              expr: results[0].value
    - name: Version
      lookup:
        prometheus:
          - query: prometheus_build_info
            display:
              expr: results[0].version
    - name: Alerts
      lookup:
        prometheus:
          - query: count(ALERTS{alertstate="firing"})
            display:
              expr: results[0].value
```
