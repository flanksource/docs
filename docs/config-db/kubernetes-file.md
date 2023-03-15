The KubernetesFile config type is used to scrape configurations contained in your specified resource e.g Pod.

```yaml
  kubernetesFile:
    - selector:
      namespace: demo
      kind: Statefulset
      name: postgresql
    files:
      - path:
          - /var/lib/postgresql/data/pgdata/postgresql.conf
        format: properties
```

| Field       | Description                                                                                  | Scheme                                     | Required |
| ----------- | -------------------------------------------------------------------------------------------- | ------------------------------------------ | -------- |
| -           | Specify inline fields, `id`, `name`, `items`, `type`, `transform`, and `format`              | [**`BaseScraper`**](./base.md#basescraper) | yes      |
| `selector`  | Specify Kubernetes resource for configuration based on `namespace`, `kind`, `name` and more. | [`ResourceSelector`](./resourceselector)   | yes      |
| `container` | Set container name                                                                           | `string`                                   |          |
| `files`     | Specify path to file contained in Pod                                                        | `[]PodFile`                                |          |

### PodFile

| Field    | Description                       | Scheme     | Required |
| -------- | --------------------------------- | ---------- | -------- |
| `path`   | Set path to file contained in Pod | `[]string` |          |
| `format` | Specify format of file            | `string`   |          |

### ResourceSelector

| Field           | Description                                                                               | Scheme   | Required |
| --------------- | ----------------------------------------------------------------------------------------- | -------- | -------- |
| `namespace`     | Specify Namespace for Kubernetes resource                                                 | `string` |          |
| `kind`          | Specify Kind of Kubernetes resource                                                       | `string` |          |
| `name`          | Specify name of Kubernetes resource                                                       | `string` |          |
| `labelSelector` | Specify labels attached to Kubernetes resource                                            | `string` |          |
| `fieldSelector` | Specify Kubernetes resource based on value of resource fields. e.g `status.Phase=Running` | `string` |          |
