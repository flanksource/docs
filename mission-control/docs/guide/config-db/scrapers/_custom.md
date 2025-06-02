## Mapping

Custom scrapers require defining the `id` and `type` for each scraped item. For example, when scraping a file containing a JSON array, where each array element represents a config item, you need to specify the `id` and `type` for those items.
You can achieve this by utilizing mappings in your custom scraper configuration.

| Field             | Description                                                                                                                                                    | Scheme                                                    | Required |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- | -------- |
| `items`           | A path pointing to an array, each item is created as a separate config item, all other JSONPath is evaluated from the new items root                           | <CommonLink to="jsonpath">_`JSONPath`_</CommonLink>       | `true`   |
| `id`              | ID for the config item                                                                                                                                         | <CommonLink to="jsonpath">_`JSONPath`_</CommonLink>       | `true`   |
| `type`            | Type for the config item                                                                                                                                       | <CommonLink to="jsonpath">_`JSONPath`_</CommonLink>       | `true`   |
| `class`           | Class for the config item. _(Defaults to `type`)_                                                                                                              | <CommonLink to="jsonpath">_`JSONPath`_</CommonLink>       |          |
| `name`            | Name for the config item                                                                                                                                       | <CommonLink to="jsonpath">_`JSONPath`_</CommonLink>       |          |
| `format`          | Format of the config source. Defaults to `json`                                                                                                                | `json`, `xml` or `properties` See [Formats](#formats)     |          |
| `createFields`    | Fields to use to determine the items created date, if not specified or the field is not found, defaults to scrape time                                         | <CommonLink to="jsonpath">_`[]JSONPath`_</CommonLink>     |          |
| `deleteFields`    | Fields to use to determine when an item was deleted if not specified or the field is not found, defaults to scrape time of when the item is no longer detected | <CommonLink to="jsonpath">_`[]JSONPath`_</CommonLink>     |          |
| `timestampFormat` | Timestamp format of `createFields` and `deleteFields`. _(Default 2006-01-02T15:04:05Z07:00)_                                                                   | [`time.Format`](https://golang.org/pkg/time/#Time.Format) |          |
| `full`            | Scrape result includes the full metadata of a config, including possible changes, See [Change Extraction](#change-extraction)                                  | `bool`                                                    |          |

## Formats

### JSON

Config items are stored as `jsonb` fields in PostgreSQL.

The JSON used is typically returned by a resource provider. e.g. `kubectl get -o json` or `aws --output=json`.

When displaying the config, the UI will automatically convert the JSON data to YAML for improved readability.

### XML / Properties

Non JSON files are stored as JSON using:

```yaml
{ 'format': 'xml', 'content': '<root>..</root>' }
```

Non JSON content can still be accessed in scripts using `config.content`

The UI formats and render XML appropriately.

## Change Extraction

Custom scrapers can also be used to ingest changes from external systems by using the `full` option.

Consider a file containing the following json data.
It contains the actual config under `config` field and a list of changes under the `changes` field.

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

A regular scraper would save the entire json as a config.
However, with the `full` option, the scraper extracts the config from the `config` field and the changes from the `changes` field.

```yaml {6}
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

The resulting config is:

```json
{
  "meta": "this is the actual config that'll be stored."
}
```

and the following new config change is recorded on that config:

```json
{
  "action": "drive",
  "summary": "car color changed to blue",
  "unrelated_stuff": 123
}
```
