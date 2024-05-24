---
title: Custom Scrapers
sidebar_position: 100
---

Custom scrapers allow you to scrape from sources that are not well defined eg: scraping a [File](./file) sitting on disk, inside a [Kubernetes Pod](./kubernetes-file) or from a [SQL](./sql) query.


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
        - config*.json
        - test*.json
```



```json title="config-file.json"
{
  "Config": {
    "InstanceId": "i-1234567890abcdef0",
    "InstanceType": "t2.micro"
  }
}
```

## Mapping

Custom scrapers need to define the id, type & class for each items that are scraped. For example: if you're scraping a file with a JSON Array where each element on the array is to be scraped as a config item, you need to define what the id, type & config class of the items should be. This can be done using mappings.

| Field             | Description                                                                                                                                                                                  | Scheme                                              | Required |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | -------- |
| `items`            |  A path pointing to an array, each item will be created as a a separate config item, all other JSONPath will be evaluated from the new items root                                                                                                                                                                  | <CommonLink to="jsonpath">_`JSONPath`_</CommonLink> | `true`   |
| `id`              | ID for the config item                                                                                                                                                                       | <CommonLink to="jsonpath">_`JSONPath`_</CommonLink> | `true`   |
| `type`            | Type for the config item                                                                                                                                                                     | <CommonLink to="jsonpath">_`JSONPath`_</CommonLink> | `true`   |
| `class`           | Class for the config item. _(Defaults to `type`)_                                                                                                                                            | <CommonLink to="jsonpath">_`JSONPath`_</CommonLink> |          |
| `name`            | Name for the config item                                                                                                                                                                     | <CommonLink to="jsonpath">_`JSONPath`_</CommonLink> |          |
| `format` | Format of the config source. Defaults to `json` | `json`, `xml` or `properties` See [Formats](#formats) | |
| `createFields`    | Fields to use to determine the items created date, if not specified or the field is not found, defaults to scrape time| <CommonLink to="jsonpath">_`[]JSONPath`_</CommonLink> |          |
| `deleteFields`    | Fields to use to determine when an item was deleted if not specified or the field is not found, defaults to scrape time of when the item was no longer detected| <CommonLink to="jsonpath">_`[]JSONPath`_</CommonLink> |          |
| `timestampFormat` | Timestamp format of `createFields` and `deleteFields`. _(Default 2006-01-02T15:04:05Z07:00)_                                                                              | [`time.Format`](https://golang.org/pkg/time/#Time.Format)              |          |
| `full` | Scrape result includes the full metadata of a config, including possible changes, See [Change Extraction](#change-extraction) | `bool` | |



## Formats

### JSON

Config items are stored as `jsonb` fields in PostgreSQL.

 The JSON used is typically returned by resource provider e.g.  `kubectl get -o json` or `aws --output=json`

The UI will convert from JSON to YAML when showing the config.

### XML / Properties

[**Custom**](./concepts/custom-scraper) scrapers can ingest non-JSON config which is represented as:

```yaml
{
 "format": "xml",
  "content": "<root>..</root>"
}
```

The UI will format and render XML appropriately.




## Change Extraction

Custom scrapers can also be used to ingest changes from external systems, by using the `full` option. In this example, the scraped JSON contains the actual config under `config` and a list of changes under `changes`.

```yaml
apiVersion: configs.flanksource.com/v1
kind: ScrapeConfig
metadata:
  name: file-scraper
spec:
  full: true
  file:
    - type: Car
      id: $.reg_no
      paths:
        - fixtures/data/car_changes.json
```

```json title=fixtures/data/car_changes.json
{
  "reg_no": "A123",
  "config": {
    "meta": "this is the actual config that'll be stored."
  },
  "changes": [
    {
      "action": "drive",
      "summary": "car color changed to blue",
      "unrelated_stuff": 123
    }
  ]
}
```

Since `full=true`, `Config DB` will extract the `config` and `changes` from the scraped JSON config. So, the actual config will simply be

```json
{
  "meta": "this is the actual config that'll be stored."
}
```

and the following new config change would be registered for that particular config item

```json
{
  "action": "drive",
  "summary": "car color changed to blue",
  "unrelated_stuff": 123
}
```

