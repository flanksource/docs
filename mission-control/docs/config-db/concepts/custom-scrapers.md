# Custom Scrapers

Custom scrapers allow you to scrape from sources that are not well defined eg: scraping a file of an arbitrary structure. It is upon the user to define how the configs should be scraped from the source.

```yaml title="file-scraper.yaml"
apiVersion: configs.flanksource.com/v1
kind: ScrapeConfig
metadata:
  name: file-scraper
spec:
  file:
    - type: $.Config.InstanceType
      class: $.Config.InstanceType
      id: $.Config.InstanceId
      path:
        - config*.json
        - test*.json
```

## Mapping

Custom scrapers need to define the id, type & class for each items that are scraped. For example: if you're scraping a file with a JSON Array where each element on the array is to be scraped as a config item, you need to define what the id, type & config class of the items should be. This can be done using mappings.

| Field             | Description                                                                      | Scheme   | Required |
| ----------------- | -------------------------------------------------------------------------------- | -------- | -------- |
| `id`              | Specify JSONPath to get the id for each config item                              | `string` | `true`   |
| `type`            | Specify JSONPath to get the type for each config item                            | `string` | `true`   |
| `class`           | Specify JSONPath to get the class for each config item. _(Defaults to `type`)_   | `string` |          |
| `name`            | Specify JSONPath to get the name for each config item                            | `string` |          |
| `createFields`    | Specify JSONPath to get the creation timestamp for each config item              | `string` |          |
| `deleteFields`    | Specify JSONPath to get the deletion timestamp for each config item              | `string` |          |
| `timestampFormat` | Specify the format of the timestamp specified in `createFields` & `deleteFields` | `string` |          |

### Date Mapping

Date mapping allows you to specify custom creation and deletion times for config items. This is useful when you want to import config items from an external source, and you want to preserve the creation and deletion times of the config items in the external source.

You'll be making use of the `createFields` and `deleteFields` fields. They are both a list of [JSONPath expression](../concepts/templating.md#jsonpath) and are used to extract the created/deleted time of the config item from the scraped configuration. If multiple fields are specified, the first non-empty value will be used.

Consider the following configuration file

```yaml title="kubernetes-scraper.yaml"
apiVersion: configs.flanksource.com/v1
kind: ScrapeConfig
metadata:
  name: kubernetes-scraper
spec:
  file:
    - type: $.aws[0].region
      id: $.aws[0].region
      createFields:
        - $.aws[0].made_at
        - $.aws[0].created_at
      deleteFields:
        - '$.aws[0].removed_at'
        - '$.aws[0].deleted_at'
      paths:
        - fixtures/data/test.yaml
```

where `fixtures/data/test.yaml` is

```yaml title="aws-scraper.yaml"
apiVersion: configs.flanksource.com/v1
kind: ScrapeConfig
metadata:
  name: aws-scraper
spec:
  aws:
    - region: eu-west-1
      compliance: true
      patch_states: true
      patch_details: true
      inventory: true
      made_at: '2017-03-06T21:04:11Z'
      deleted_at: '2017-04-04T15:04:05Z'
```

When the scraped configuration is saved in the database, the created date will be `2017-03-06T21:04:11Z` instead of being the current time and the deleted date will be `2017-04-04T15:04:05Z` instead of being empty.

#### Timestamp Format

By default, the timestamp format is RFC3339 (`2006-01-02T15:04:05Z07:00`). If the scraped configuration follows a different timestamp format, then you can specify it in the `timestampFormat` field. The format is specified using the [Go time format](https://golang.org/pkg/time/#Time.Format).

In the above example if the value of `made_at` was `2017/03/06 21:04:11Z`, then the `timestampFormat` file would look like this

```yaml
timestampFormat: '2006/01/02 15:04:05Z'
```
