# Kubernetes File

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


## Scraper

| Field       | Description                                                                        | Scheme                    | Required |
| ----------- | ---------------------------------------------------------------------------------- | ------------------------- | -------- |
| `logLevel`  | Specify the level of logging.                                                      | `string`                  | `false`  |
| `schedule`  | Specify the interval to scrape in cron format. Defaults to every 60 minutes.       | `string`                  | `false`  |
| `full`      | Set to `true` to extract changes from scraped configurations. Defaults to `false`. | `bool`                    | `false`  |
| `retention` | Settings for retaining changes, analysis and scraped items                         | [`Retention`](/config-db/concepts/retention) |          |
| `kubernetesFile`       | Specifies the list of Kubernetes File configurations to scrape.                                | [`[]KubernetesFile`](#kubernetesfile-1)         | `false`  |

### KubernetesFile

| Field             | Description                                                                                                                                                             | Scheme                                   | Required |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- | -------- |
| `id`              | A static value or JSONPath expression to use as the ID for the resource.                                                                                                | `string`                                 | `true`   |
| `name`            | A static value or JSONPath expression to use as the Name for the resource. Default value is the `id`.                                                                   | `string`                                 | `false`  |
| `items`           | A JSONPath expression to use to extract individual items from the resource                                                                                              | `string`                                 | `false`  |
| `type`            | A static value or JSONPath expression to use as the type for the resource.                                                                                              | `string`                                 | `true`   |
| `transform`       | Specify field to transform result                                                                                                                                       | [`Transform`](../concepts/transform.md)  | `false`  |
| `format`          | Format of config item, defaults to JSON, available options are JSON                                                                                                     | `string`                                 | `false`  |
| `timestampFormat` | TimestampFormat is a Go time format string used to parse timestamps in createFields and DeletedFields. If not specified, the default is `RFC3339`.                      | `string`                                 | `false`  |
| `createFields`    | CreateFields is a list of JSONPath expression used to identify the created time of the config. If multiple fields are specified, the first non-empty value will be used | `[]string`                               | `false`  |
| `deleteFields`    | DeleteFields is a JSONPath expression used to identify the deleted time of the config. If multiple fields are specified, the first non-empty value will be used         | `[]string`                               | `false`  |
| `selector`        | Specify Kubernetes resource for configuration based on `namespace`, `kind`, `name` and more.                                                                            | [`ResourceSelector`](./resourceselector) | yes      |
| `container`       | Set container name                                                                                                                                                      | `string`                                 |          |
| `files`           | Specify path to file contained in Pod                                                                                                                                   | `[]PodFile`                              |          |

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
