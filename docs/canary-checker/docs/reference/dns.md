---
title: DNS
---

# <img src='https://raw.githubusercontent.com/flanksource/flanksource-ui/main/src/icons/dns.svg' style={{height: '32px'}}/> DNS

Performs queries to a DNS server, typical use cases include:

* Checking the latency of the DNS server in a Kubernetes cluster
* Verifying that there are serving records for a DNS based load balancer.

```yaml title="dns-check.yaml"
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: dns-check
spec:
  interval: 30
  dns:
    - name: A record query
      server: 8.8.8.8
      port: 53
      query: "1.2.3.4.nip.io"
      querytype: "A"
      minrecords: 1
      exactreply: ["1.2.3.4"]
      timeout: 10
      thresholdMillis: 1000
```

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| **`server`** | Address of DNS server to query e.g. `8.8.8.8` | *string* | Yes |
| **`port`** | Port to query DNS server on, e.g. `53` | *int* | Yes |
| **`query`** | Domain name to lookup | *string* | Yes |
| **`querytype`** | Record type to query e.g. `A`, `CNAME`, `TXT`, `SRV` | *string* | Yes |
| `exactreply` | Expected exact match result(s) | *\[\]string* |  |
| `minrecords` | Minimum records | *int* |  |
| `thresholdMillis` | Threshold response time from DNS server | *int* |  |
| `timeout` | Timeout in seconds | *int* |  |
| `*` | All other commons field | [*Common*](common) | |
