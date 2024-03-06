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

| Field             | Description                                                                                                                                                                                  | Scheme                                              | Required |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | -------- |
| `id`              | ID for the config item                                                                                                                                                                       | <CommonLink to="jsonpath">_`jsonpath`_</CommonLink> | `true`   |
| `type`            | Type for the config item                                                                                                                                                                     | <CommonLink to="jsonpath">_`jsonpath`_</CommonLink> | `true`   |
| `class`           | Class for the config item. _(Defaults to `type`)_                                                                                                                                            | <CommonLink to="jsonpath">_`jsonpath`_</CommonLink> |          |
| `name`            | Name for the config item                                                                                                                                                                     | <CommonLink to="jsonpath">_`jsonpath`_</CommonLink> |          |
| `createFields`    | JSONPath expression and are used to extract the created time of the config item from the scraped configuration. _(If multiple fields are specified, the first non-empty value will be used)_ | <CommonLink to="jsonpath">_`jsonpath`_</CommonLink> |          |
| `deleteFields`    | JSONPath expression and are used to extract the deleted time of the config item from the scraped configuration. _(If multiple fields are specified, the first non-empty value will be used)_ | <CommonLink to="jsonpath">_`jsonpath`_</CommonLink> |          |
| `timestampFormat` | Timestamp format for fields specified in `createFields` & `deleteFields`. _(Default 2006-01-02T15:04:05Z07:00)_                                                                              | [`timestampFormat`](#timestamp-format)              |          |

### Date Mapping

In Mission Control, config items possess created, updated, and deleted dates. While Kubernetes and Cloud resources receive these dates from the API, custom config items require extraction of these values from the config item itself. If no date mapping is provided, the scrape time will be used instead.

#### Timestamp Format

The format is specified using the [Go time format](https://golang.org/pkg/time/#Time.Format).

In the above example if the value of `made_at` was `2017/03/06 21:04:11Z`, then the `timestampFormat` file would look like this

```yaml
timestampFormat: '2006/01/02 15:04:05Z'
```
