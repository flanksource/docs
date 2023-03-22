# <img src='https://raw.githubusercontent.com/flanksource/flanksource-ui/main/src/icons/alert.svg' style='height: 32px'/> TCP

This checks whether the given address is reachable within the specified timeout period.

??? example

    ```yaml
    apiVersion: canaries.flanksource.com/v1
    kind: Canary
    metadata:
      name: tcp-check
    spec:
      schedule: "*/1 * * * *"
      tcp:
        - name: "flanksource website"
          endpoint: https://www.flanksource.com
          thresholdMillis: 1200
    ```

| Field             | Description                                        | Scheme              | Required |
| ----------------- | -------------------------------------------------- | ------------------- | -------- |
| `name`            | Name of the check                                  | `string`            |          |
| `description`     | Description for the check                          | `string`            |          |
| `icon`            | Icon for overwriting default icon on the dashboard | `string`            |          |
| `labels`          | Labels for check                                   | `map[string]string` |          |
| `endpoint`        | Connection URL                                     | `string`            |          |
| `thresholdMillis` | Expected response time threshold in ms             | `int64`             |          |
