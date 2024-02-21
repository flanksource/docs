# Extraction

`Config DB` needs to extract few important pieces of information from the config. For example: to know the id of a config item it needs to extract the id from the scraped config. For this, it makes heavy use of JSONPath expression.

## JSONPath

A JSONPath expression, similar to `XPath` for XML, is used to extract data from a JSON structure by specifying a path to an element(s) in a JSON structure.

### Example

Below is an example of the JSONPath expression in use for the [File scraper](../scrapers/file.md)

```yaml title="file-scraper.yaml"
apiVersion: configs.flanksource.com/v1
kind: ScrapeConfig
metadata:
  name: file-scraper
spec:
  file:
    - type: $.Config.InstanceType
      id: $.Config.InstanceId
      path:
        - my-config.json
```

Suppose that `my-config.json` file referenced in the path above contains the following JSON structure

```json
{
  "Config": {
    "InstanceId": "i-1234567890abcdef0",
    "InstanceType": "t2.micro"
  }
}
```

Then, the type and id of the config item will be `t2.micro` and `i-1234567890abcdef0` respectively.

## Use cases

Some of the common use cases of JSONPath expression are

| Field             | Description                                                                                                                                                             |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`              | A static value or JSONPath expression to use as the ID for the resource.                                                                                                |
| `name`            | A static value or JSONPath expression to use as the Name for the resource. Default value is the `id`.                                                                   |
| `items`           | A JSONPath expression to use to extract individual items from the resource                                                                                              |
| `type`            | A static value or JSONPath expression to use as the type for the resource.                                                                                              |
| `timestampFormat` | TimestampFormat is a Go time format string used to parse timestamps in createFields and DeletedFields. If not specified, the default is `RFC3339`.                      |
| `createFields`    | CreateFields is a list of JSONPath expression used to identify the created time of the config. If multiple fields are specified, the first non-empty value will be used |
| `deleteFields`    | DeleteFields is a JSONPath expression used to identify the deleted time of the config. If multiple fields are specified, the first non-empty value will be used         |
