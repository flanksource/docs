Config is used to associate config items with your components.

??? Example

    ```yaml
    components:
      - configs:
          - name: flanksource-canary-cluster
            type: EKS
    ```

## Config

| Field       | Description              | Scheme              | Required |
| ----------- | ------------------------ | ------------------- | -------- |
| `id`        | Set unique ID for config | `[]string`          |          |
| `name`      | Set name for config      | `string`            |          |
| `namespace` | Set namespace for config | `string`            |          |
| `type`      | Specify type of config   | `string`            |          |
| `labels`    | Specify type of config   | `map[string]string` |          |
