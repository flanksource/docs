---
title: File
---

The `file` scraper is used to create config items from files in a local folder (or git). This can be used to track changes in files like `/etc/hosts` or `/etc/passwd`, or for service metadata stored in git.

See [Kubernetes Files](./kubernetes-file) for scraping files inside running kubernetes pods.

```yaml title='file-scraper.yaml' file=../../../../modules/config-db/fixtures/file-git.yaml
apiVersion: configs.flanksource.com/v1
kind: ScrapeConfig
metadata:
  name: file-scraper
spec:
  file:
    - type: $.Config.InstanceType
      id: $.Config.InstanceId
      path:
        - config*.json
        - test*.json
```


## Scraper

| Field       | Description                                                                        | Scheme                                       | Required |
| ----------- | ---------------------------------------------------------------------------------- | -------------------------------------------- | -------- |
| `schedule`  | Specify the interval to scrape in cron format. Defaults to every 60 minutes.       | `string`                                     |          |
| `full`      | Set to `true` to extract changes from scraped configurations. Defaults to `false`. | `bool`                                       |          |
| `retention` | Settings for retaining changes, analysis and scraped items                         | [`Retention`](/config-db/concepts/retention) |          |
| `file`      | Specifies the list of File configurations to scrape.                               | [`[]File`](#file)                          |          |

### File

| Field             | Description                                                                                                                                                             | Scheme                                         | Required |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | -------- |
| `id`              | A static value or JSONPath expression to use as the ID for the resource.                                                                                                | `string`                                       | `true`   |
| `name`            | A static value or JSONPath expression to use as the Name for the resource. Default value is the `id`.                                                                   | `string`                                       |          |
| `items`           | A JSONPath expression to use to extract individual items from the resource                                                                                              | `string`                                       |          |
| `type`            | A static value or JSONPath expression to use as the type for the resource.                                                                                              | `string`                                       | `true`   |
| `class`           | A static value or JSONPath expression to use as the config class. _(Defaults to `type`)_                                                                                | `string`                                       |          |
| `format`          | Format of config item, defaults to JSON, available options are JSON                                                                                                     | `string`                                       |          |
| `timestampFormat` | TimestampFormat is a Go time format string used to parse timestamps in createFields and DeletedFields. If not specified, the default is `RFC3339`.                      | `string`                                       |          |
| `createFields`    | CreateFields is a list of JSONPath expression used to identify the created time of the config. If multiple fields are specified, the first non-empty value will be used | `[]string`                                     |          |
| `deleteFields`    | DeleteFields is a JSONPath expression used to identify the deleted time of the config. If multiple fields are specified, the first non-empty value will be used         | `[]string`                                     |          |
| `url`             | Specify URL e.g github repository containing the configuration(s)                                                                                                       | `string`                                       |          |
| `paths`           | Specify paths to configuration(s) for scraping                                                                                                                          | `[]string`                                     | `true`   |
| `ignore`          | Set configurations to ignore                                                                                                                                            | `[]string`                                     |          |
| `properties`      | Custom templatable properties for the scraped config items.                                                                                                             | [`[]ConfigProperty`](/reference/config-db/properties) |          |
| `tags`            | set custom tags on the scraped config items                                                                                                                             | `map[string]string`                            |          |
| `transform`       | Field to transform result                                                                        | [`Transform`](/config-db/concepts/transform)                        |          |                   |          |


