## <img src='https://raw.githubusercontent.com/flanksource/flanksource-ui/main/src/icons/icmp.svg' style='height: 32px'/> ICMP

This check performs ICMP requests for information on ICMP packet loss, duration and response.

??? example

    ```yaml
    apiVersion: canaries.flanksource.com/v1
    kind: Canary
    metadata:
      name: icmp-check
    spec:
      interval: 30
      icmp:
        - endpoint: https://api.github.com
          thresholdMillis: 600
          packetLossThreshold: 10
          packetCount: 2

    ```

| Field                 | Description                                          | Scheme   | Required |
| --------------------- | ---------------------------------------------------- | -------- | -------- |
| `description`         | Description for the check                            | _string_ |          |
| **`endpoint`**        | Address to query using ICMP                          | _string_ | Yes      |
| `icon`                | Icon for overwriting default icon on the dashboard   | _string_ |          |
| `name`                | Name of the check                                    | _string_ |          |
| `packetCount`         | Total number of packets to send per check            | _int_    |          |
| `packetLossThreshold` | Percent of total packets that are allowed to be lost | _int64_  |          |
| `thresholdMillis`     | Expected response time threshold in ms               | _int64_  |          |
