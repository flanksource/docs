# Kubernetes File

The KubernetesFile config type is used to scrape configurations contained in your specified resource e.g Pod.

```yaml title='k8s-file-scraper.yaml'
apiVersion: configs.flanksource.com/v1
kind: ScrapeConfig
metadata:
  name: k8s-file-scraper
spec:
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

| Field            | Description                                                                        | Scheme                                       | Required |
| ---------------- | ---------------------------------------------------------------------------------- | -------------------------------------------- | -------- |
| `logLevel`       | Specify the level of logging.                                                      | `string`                                     |          |
| `schedule`       | Specify the interval to scrape in cron format. Defaults to every 60 minutes.       | `string`                                     |          |
| `full`           | Set to `true` to extract changes from scraped configurations. Defaults to `false`. | `bool`                                       |          |
| `retention`      | Settings for retaining changes, analysis and scraped items                         | [`Retention`](/config-db/concepts/retention) |          |
| `kubernetesFile` | Specifies the list of Kubernetes File configurations to scrape.                    | [`[]KubernetesFile`](#kubernetesfile)        |          |

### KubernetesFile

| Field             | Description                                                                                                                                                             | Scheme                                                  | Required |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | -------- |
| `id`              | A static value or JSONPath expression to use as the ID for the resource.                                                                                                | `string`                                                | `true`   |
| `name`            | A static value or JSONPath expression to use as the Name for the resource. Default value is the `id`.                                                                   | `string`                                                |          |
| `type`            | A static value or JSONPath expression to use as the type for the resource.                                                                                              | `string`                                                | `true`   |
| `items`           | A JSONPath expression to use to extract individual items from the resource                                                                                              | `string`                                                |          |
| `container`       | Set container name                                                                                                                                                      | `string`                                                |          |
| `createFields`    | CreateFields is a list of JSONPath expression used to identify the created time of the config. If multiple fields are specified, the first non-empty value will be used | `[]string`                                              |          |
| `deleteFields`    | DeleteFields is a JSONPath expression used to identify the deleted time of the config. If multiple fields are specified, the first non-empty value will be used         | `[]string`                                              |          |
| `files`           | Specify path to file contained in Pod                                                                                                                                   | [`[]File`](#file)                                       |          |
| `format`          | Format of config item, defaults to JSON, available options are JSON                                                                                                     | `string`                                                |          |
| `selector`        | Specify Kubernetes resource for configuration based on `namespace`, `kind`, `name` and more.                                                                            | [`ResourceSelector`](../../reference/resource-selector) | `true`   |
| `timestampFormat` | TimestampFormat is a Go time format string used to parse timestamps in createFields and DeletedFields. If not specified, the default is `RFC3339`.                      | `string`                                                |          |
| `transform`       | Field to transform result                                                                                                                                               | [`Transform`](#transform)                               |          |
| `tags`            | set custom tags on the scraped config items                                                                                                                             | `map[string]string`                                     |          |
| `properties`      | Custom templatable properties for the scraped config items.                                                                                                             | [`[]ConfigProperty`](../../reference/property)          |          |

#### File

| Field    | Description                       | Scheme     | Required |
| -------- | --------------------------------- | ---------- | -------- |
| `path`   | Set path to file contained in Pod | `[]string` |          |
| `format` | Specify format of file            | `string`   |          |

#### Transform

<ConfigTransform></ConfigTransform>
