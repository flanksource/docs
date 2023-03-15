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

| Field    | Description                                                                     | Scheme                                     | Required |
| -------- | ------------------------------------------------------------------------------- | ------------------------------------------ | -------- |
| -        | Specify inline fields, `id`, `name`, `items`, `type`, `transform`, and `format` | [**`BaseScraper`**](./base.md#basescraper) |          |
| `url`    | Specify URL e.g github repository containing the configuration(s)               | `string`                                   | `false`  |
| `paths`  | Specify paths to configuration(s) for scraping                                  | `[]string`                                 | `true`   |
| `ignore` | Set configurations to ignore                                                    | `[]string`                                 | `false`  |
