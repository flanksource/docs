# <img src='https://raw.githubusercontent.com/flanksource/flanksource-ui/main/src/icons/prometheus.svg' style='height: 32px'/> Prometheus

The Prometheus Check connects to the Prometheus host, performs the desired query, and displays the results.

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: prometheus-check
spec:
  interval: 30
  prometheus:
    - host: http://prometheus-k8s.monitoring.svc:9090
      query: kubernetes_build_info{job!~"kube-dns|coredns"}
      display:
        template: "{{ (index .results 0).git_version }}"
      test:
        template: "true"

```

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| **`host`** | Address of the Prometheus server | string | Yes |
| **`query`** | PromQL query | string | Yes |
| `*`         | All other common fields | [*Common*](../common) |  |
