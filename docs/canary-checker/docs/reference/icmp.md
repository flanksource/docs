---
title: ICMP
---

# <Icon name="icmp"/> ICMP

Performs ICMP (ping) requests for information on ICMP packet loss, duration and response.

:::danger Root Privileges Required
ICMP requires either root privileges or the following setting applied:
```shell
sudo sysctl -w net.ipv4.ping_group_range="0 2147483647"
```
:::

```yaml title="imcp-check.yaml"
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: icmp-check
spec:
  interval: 30
  icmp:
    - endpoint: api.github.com
      thresholdMillis: 600
      packetLossThreshold: 10
      packetCount: 2

```

| Field                 | Description                                                | Scheme                | Required |
| --------------------- | ---------------------------------------------------------- | --------------------- | -------- |
| **`endpoint`**        | Host to ping                                               | _string_              | Yes      |
| `packetCount`         | Total number of packets to send per check, defaults to `5` | _int_                 |          |
| `packetLossThreshold` | Percent of total packets that are allowed to be lost       | _int64_               |          |
| `thresholdMillis`     | Expected response time threshold in ms                     | _int64_               |          |
| **`name`**    | Name of the check, must be unique within the canary         | `string`                                     | Yes      |
| `description` | Description for the check                                   | `string`                                     |          |
| `icon`        | Icon for overwriting default icon on the dashboard          | `string`                                     |          |
| `labels`      | Labels for check                                            | `map[string]string`                          |          |
| `test`        | Evaluate whether a check is healthy                         | [`Expression`](/concepts/health-evaluation)  |          |
| `display`     | Expression to change the formatting of the display          | [`Expression`](/concepts/display-formatting) |          |
| `transform`   | Transform data from a check into multiple individual checks | [`Expression`](/concepts/transforms)          |          |
| `metrics`     | Metrics to export from                                      | [`[]Metrics`](/concepts/metrics-exporter)    |          |



## Metrics

| **Metric**                                       |       |                                      |
| ------------------------------------------------ | ----- | ------------------------------------ |
| canary_check_icmp_packetloss{endpoint="", ip=""} | Gauge | Packet loss percentage in ICMP check |
