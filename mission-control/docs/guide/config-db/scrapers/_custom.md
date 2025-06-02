## Mapping

Custom scrapers require you to define the `id` and `type` for each scraped item. For example, when you scrape a file containing a JSON array, where each array element represents a config item, you must specify the `id` and `type` for those items.
You can achieve this by using mappings in your custom scraper configuration.

| Field             | Description                                                                                                                                                                                      | Scheme                                                    | Required |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------- | -------- |
| `items`           | A path that points to an array. The scraper creates each item as a separate config item. The scraper evaluates all other JSONPath from the new item's root.                                      | <CommonLink to="jsonpath">_`JSONPath`_</CommonLink>       | `true`   |
| `id`              | ID for the config item.                                                                                                                                                                          | <CommonLink to="jsonpath">_`JSONPath`_</CommonLink>       | `true`   |
| `type`            | Type for the config item.                                                                                                                                                                        | <CommonLink to="jsonpath">_`JSONPath`_</CommonLink>       | `true`   |
| `class`           | Class for the config item. _(Defaults to `type`)_                                                                                                                                                | <CommonLink to="jsonpath">_`JSONPath`_</CommonLink>       |          |
| `name`            | Name for the config item.                                                                                                                                                                        | <CommonLink to="jsonpath">_`JSONPath`_</CommonLink>       |          |
| `format`          | format of the config source. Defaults to `json`.                                                                                                                                                 | `json`, `xml` or `properties` See [Formats](#formats)     |          |
| `createFields`    | The scraper uses these fields to determine the item's created date. If you do not specify them or the field is not found, the scraper uses the scrape time.                                      | <CommonLink to="jsonpath">_`[]JSONPath`_</CommonLink>     |          |
| `deleteFields`    | The scraper uses these fields to determine when an item was deleted. If you do not specify them or the field is not found, the scraper uses the scrape time when the item is no longer detected. | <CommonLink to="jsonpath">_`[]JSONPath`_</CommonLink>     |          |
| `timestampFormat` | timestamp format of `createFields` and `deleteFields`. _(Default 2006-01-02T15:04:05Z07:00)_                                                                                                     | [`time.Format`](https://golang.org/pkg/time/#Time.Format) |          |
| `full`            | The scraper includes the full metadata of a config in the scrape result, including possible changes. See [Change Extraction](#change-extraction).                                                | `bool`                                                    |          |

## Formats

### JSON

The scraper stores config items as `jsonb` fields in PostgreSQL.

Resource providers typically return the JSON used. e.g. `kubectl get -o json` or `aws --output=json`.

When you display the config, the UI automatically converts the JSON data to YAML for improved readability.

### XML / Properties

The scraper stores non-JSON files as JSON using:

```yaml
{ 'format': 'xml', 'content': '<root>..</root>' }
```

You can still access non-JSON content in scripts using `config.content`.

The UI formats and renders XML appropriately.

## Change Extraction

Custom scrapers ingest changes from external systems when you enable the `full` option.

Consider a file that contains the following json data.
It contains the actual config under the `config` field and a list of changes under the `changes` field.

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

A regular scraper saves the entire json as a config.
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

and the scraper records the following new config change on that config:

```json
{
  "action": "drive",
  "summary": "car color changed to blue",
  "unrelated_stuff": 123
}
```
