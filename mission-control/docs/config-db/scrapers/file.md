# File

The file config type is set to scrape configurations or configurations in common with the related elements that can be specified in the fields; `type`, and `id`. The paths to the configuration(s) to be scraped is set with the field `path` as a list.

```yaml
file:
  - type: $.Config.InstanceType
    id: $.Config.InstanceId
    path:
      - config*.json
      - test*.json
```

For more examples of configuration file, please check the [GitHub repo](https://github.com/flanksource/config-db/tree/main/fixtures)

### File

| Field             | Description                                                                                                                                                             | Scheme                                  | Required |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | -------- |
| `id`              | A static value or JSONPath expression to use as the ID for the resource.                                                                                                | `string`                                | `true`   |
| `name`            | A static value or JSONPath expression to use as the Name for the resource. Default value is the `id`.                                                                   | `string`                                | `false`  |
| `items`           | A JSONPath expression to use to extract individual items from the resource                                                                                              | `string`                                | `false`  |
| `type`            | A static value or JSONPath expression to use as the type for the resource.                                                                                              | `string`                                | `true`   |
| `transform`       | Specify field to transform result                                                                                                                                       | [`Transform`](../concepts/transform.md) | `false`  |
| `format`          | Format of config item, defaults to JSON, available options are JSON                                                                                                     | `string`                                | `false`  |
| `timestampFormat` | TimestampFormat is a Go time format string used to parse timestamps in createFields and DeletedFields. If not specified, the default is `RFC3339`.                      | `string`                                | `false`  |
| `createFields`    | CreateFields is a list of JSONPath expression used to identify the created time of the config. If multiple fields are specified, the first non-empty value will be used | `[]string`                              | `false`  |
| `deleteFields`    | DeleteFields is a JSONPath expression used to identify the deleted time of the config. If multiple fields are specified, the first non-empty value will be used         | `[]string`                              | `false`  |
| `url`             | Specify URL e.g github repository containing the configuration(s)                                                                                                       | `string`                                | `false`  |
| `paths`           | Specify paths to configuration(s) for scraping                                                                                                                          | `[]string`                              | `true`   |
| `ignore`          | Set configurations to ignore                                                                                                                                            | `[]string`                              | `false`  |
