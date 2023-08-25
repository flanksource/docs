---
title: Prometheus
---

# <Icon name="prometheus"/> Prometheus

The Prometheus Check connects to the Prometheus host, performs the desired query, and displays the results.

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: prometheus-check
spec:
  interval: 30
  prometheus:
    - url: http://prometheus-k8s.monitoring.svc:9090
      query: kubernetes_build_info{job!~"kube-dns|coredns"}
      display:
        template: "{{ (index .results 0).git_version }}"
      test:
        template: "true"

```

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| **`url`** | Address of the Prometheus server | string | Yes |
| **`query`** | PromQL query | string | Yes |
| `*`         | All other common fields | [*Common*](common) |  |
|  |  |  | |
| `connection` | Path of existing connection e.g. `connection://prometheus/instance`<br/>Mutually exclusive with `url` <br/><Commercial/> | [Connection](../../concepts/connections) | |
| `url` | Redis hostname and port |  | |
| `username` | Mutually exclusive with `connection` | [*EnvVar*](../../concepts/authentication/#envvar) | |
| `password` | Mutually exclusive with `connection` | [*EnvVar*](../../concepts/authentication/#envvar) | |

## Result Variables

| Name         | Description             | Scheme                     |
| ------------ | ----------------------- | -------------------------- |
| `value`      |                         | *float*                    |
| `firstValue` | Number of rows returned | *int*                      |
| `results`    | A list of results       | *[]map[string]interface{}* |
