`apm-hub` takes in a list of config paths as an argument to the `serve` command. Below is the structure of the configuration file.

## Configuration

| Field      | Description                   | Scheme      | Required |
| ---------- | ----------------------------- | ----------- | -------- |
| `backends` | Specify the level of logging. | `[]Backend` | `true`   |

```yaml
# Example configuration file

backends:
  - file:
      - labels:
          name: acmehost
          type: Nginx
        path:
          - nginx-access.log
      - labels:
          name: all
          type: Nginx
        path:
          - '*.log'
```

### Backend

| Field           | Description                             | Scheme                                                           | Required   |
| --------------- | --------------------------------------- | ---------------------------------------------------------------- | ---------- |
| `elasticsearch` | configuration for elastic search v8.0+. | `ElasticSearchConfig`                                            | `optional` |
| `opensearch`    | configuration for elastic search < v8.0 | `OpenSearchConfig`                                               | `optional` |
| `kubernetes`    | configuration for Kubernetes            | [`KubernetesSearch`](../backends/kubernetes.md#kubernetesconfig) | `optional` |
| `file`          | configuration for file                  | [`[]FileConfig`](../backends/file.md#fileconfig)                 | `optional` |
