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

## Extracting Changes & Access Logs

Custom scrapers ingest changes & access logs from external systems when you enable the `full` option.

Every single config is expected to have at these 3 top-level fields

- `config`
- `changes`
- `access_logs`

:::note info
They could have more fields or even missing some of these fields.
The point is that only these fields are extracted.
:::

Consider a file that contains the following json data.

```json title=fixtures/data/car.json {3,6,13}
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
  ],
  "access_logs": [
    {
      "config_id": "99024949-9118-4dcb-a3a0-b8f1536bebd0",
      "external_user_id": "a3542241-4750-11f0-8000-e0146ce375e6",
      "created_at": "2025-01-01"
    },
    {
      "config_id": "9d9e51a7-6956-413e-a07e-a6aeb3f4877f",
      "external_user_id": "a5c2e8e3-4750-11f0-8000-f4eaacabd632",
      "created_at": "2025-01-02"
    }
  ]
}
```

A regular scraper saves the entire json as a config.
However, with the `full` option, the scraper extracts the config, changes and access logs.

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

and the access logs will be saved to

```json
[
  {
    "config_id": "99024949-9118-4dcb-a3a0-b8f1536bebd0",
    "external_user_id": "a3542241-4750-11f0-8000-e0146ce375e6",
    "created_at": "2025-01-01"
  },
  {
    "config_id": "9d9e51a7-6956-413e-a07e-a6aeb3f4877f",
    "external_user_id": "a5c2e8e3-4750-11f0-8000-f4eaacabd632",
    "created_at": "2025-01-02"
  }
]
```
