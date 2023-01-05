## File

The file config type is set to scrape configurations or configurations in common with the related elements that can be specified in the fields; `type`, and `id`. The paths to the configuration(s) to be scraped is set with the field `path` as a list.

```yaml
  file:
    - type: $.Config.InstanceType
      id: $.Config.InstanceId
      path:
        - config*.json
        - test*.json
```

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| [**BaseScraper**](#BaseScraper) | Specify inline fields, `id`, `name`, `items`, `type`, `transform`, and `format` | [BaseScraper](#basescraper) |
| `url` | Specify URL e.g github repository containing the configuration(s) | *string* |
| `path` | Specify path to configuration(s) for scraping | *string* |
| `ignore` | Set configurations to ignore | *string* |

### BaseScraper

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `id` | A static value or JSONPath expression to use as the ID for the resource. | *string* |  |
| `name` | A static value or JSONPath expression to use as the Name for the resource. | *string* |  |
| `items` | A JSONPath expression to use to extract individual items from the resource | *string* |  |
| `type` | A static value or JSONPath expression to use as the type for the resource. | *string* |  |
| [`transform`](#transform) | Specify field to transform result | [*Transform*](#transform) |  |
| `format` | Format of config item, defaults to JSON, available options are JSON | *string* |

### Transform

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| [`script`](#script) | Script to transform scrape result | [*Script*](#script) |
| [`include`](#Filter) | Specify fields to include in the configuration | [*Filter*](#filter)  |  |
| [`exclude`](#filter) | Specify fields to remove from the config. It is useful for removing sensitive data and fields | [*Filter](#filter) |  |

### Filter

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `jsonPath` | Specify JSONPath expression for the fields | *string* |

### Script

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `gotemplate` | Specify Go template for use in script | *string* |
| `jsonPath` | Specify path to JSON element for use in script | *string* |
| `expr` | Specify expression for use in script | *string* |
| `javascript` | Specify javascript syntax for script | *string* |
