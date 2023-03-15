This transformation function allows you to remove certain fields from the scraped configuration. This is useful when you want to remove sensitive or just useless data from the scraped configuration.

### Filter

| Field      | Description                                | Scheme   | Required |
| ---------- | ------------------------------------------ | -------- | -------- |
| `jsonpath` | Specify JSONPath expression for the fields | `string` | `true`   |

_Example_: With the following `config-db` configuration for AWS, the transformation will delete the `tags` and `privateDnsNameOptionsOnLaunch` fields from the scraped configuration.

```yaml
aws:
  - type: AWS
    transform:
      exclude:
        - jsonpath: $.tags
        - jsonpath: $.privateDnsNameOptionsOnLaunch
```
