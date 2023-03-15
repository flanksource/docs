The file config type is set to scrape configurations or configurations in common with the related elements that can be specified in the fields; `type`, and `id`. The paths to the configuration(s) to be scraped is set with the field `path` as a list.

```yaml
file:
  - type: $.Config.InstanceType
    id: $.Config.InstanceId
    path:
      - config*.json
      - test*.json
```

| Field                           | Description                                                                     | Scheme                      | Required |
| ------------------------------- | ------------------------------------------------------------------------------- | --------------------------- | -------- |
| [**BaseScraper**](#BaseScraper) | Specify inline fields, `id`, `name`, `items`, `type`, `transform`, and `format` | [BaseScraper](#basescraper) |          |
| `url`                           | Specify URL e.g github repository containing the configuration(s)               | `string`                    | `false`  |
| `paths`                         | Specify paths to configuration(s) for scraping                                  | `[]string`                  | `true`   |
| `ignore`                        | Set configurations to ignore                                                    | `[]string`                  | `false`  |

### BaseScraper

| Field                     | Description                                                                                                                                                             | Scheme                    | Required |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | -------- |
| `id`                      | A static value or JSONPath expression to use as the ID for the resource.                                                                                                | `string`                  | `true`   |
| `name`                    | A static value or JSONPath expression to use as the Name for the resource. Default value is the `id`.                                                                   | `string`                  | `false`  |
| `items`                   | A JSONPath expression to use to extract individual items from the resource                                                                                              | `string`                  | `false`  |
| `type`                    | A static value or JSONPath expression to use as the type for the resource.                                                                                              | `string`                  | `true`   |
| [`transform`](#transform) | Specify field to transform result                                                                                                                                       | [`Transform`](#transform) | `false`  |
| `format`                  | Format of config item, defaults to JSON, available options are JSON                                                                                                     | `string`                  | `false`  |
| `timestampFormat`         | TimestampFormat is a Go time format string used to parse timestamps in createFields and DeletedFields. If not specified, the default is `RFC3339`.                      | `string`                  | `false`  |
| `createFields`            | CreateFields is a list of JSONPath expression used to identify the created time of the config. If multiple fields are specified, the first non-empty value will be used | `[]string`                | `false`  |
| `deleteFields`            | DeleteFields is a JSONPath expression used to identify the deleted time of the config. If multiple fields are specified, the first non-empty value will be used         | `[]string`                | `false`  |

### Transform

| Field                | Description                                                                                    | Scheme                | Required |
| -------------------- | ---------------------------------------------------------------------------------------------- | --------------------- | -------- |
| [`script`](#script)  | Script to transform scrape result.                                                             | [`Script`](#script)   |          |
| [`include`](#Filter) | Specify fields to include in the configuration.                                                | [`[]Filter`](#filter) | `false`  |
| [`exclude`](#filter) | Specify fields to remove from the config. It is useful for removing sensitive data and fields. | [`[]Filter`](#filter) | `false`  |
| [`mask`](#mask)      | Specify configurations to replace sensitive fields with hash functions or static string.       | [`[]Mask`](#mask)     | `false`  |

### Filter

| Field      | Description                                | Scheme   | Required |
| ---------- | ------------------------------------------ | -------- | -------- |
| `jsonPath` | Specify JSONPath expression for the fields | `string` |          |

### Script

| Field        | Description                                    | Scheme   | Required |
| ------------ | ---------------------------------------------- | -------- | -------- |
| `gotemplate` | Specify Go template for use in script          | `string` |          |
| `jsonPath`   | Specify path to JSON element for use in script | `string` |          |
| `expr`       | Specify expression for use in script           | `string` |          |
| `javascript` | Specify javascript syntax for script           | `string` |          |

### Mask

Mask allows replacing sensitive fields with hash functions or a static string.
Example: You could set the `value` to `***` and all the fields that match the `jsonPath` will be replaced with `***`.

| Field      | Description                                                                                  | Scheme                          | Required |
| ---------- | -------------------------------------------------------------------------------------------- | ------------------------------- | -------- |
| `selector` | Selector helps in choosing which configs should use the mask.                                | [`MaskSelector`](#maskselector) | `true`   |
| `jsonPath` | Specify JSONPath expression for the fields                                                   | `string`                        | `true`   |
| `value`    | Value can be a name of a hash function or just a string. Supported hash functions: `md5sum`. | `string`                        | `true`   |

### MaskSelector

| Field  | Description                               | Scheme   | Required |
| ------ | ----------------------------------------- | -------- | -------- |
| `type` | Type is the config type to apply the mask | `string` | `true`   |
