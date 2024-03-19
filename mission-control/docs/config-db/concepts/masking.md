# Masking

Masking allows replacing sensitive fields with hash of that field or with a static string.
The field to mask is specified by the `jsonPath` config and `value` field defines the hash function or the static value.

```yaml title="file-mask-scraper.yaml"
apiVersion: configs.flanksource.com/v1
kind: ScrapeConfig
metadata:
  name: file-mask-scraper
spec:
  file:
    - type: Config
      id: $.id
      name: $.name
      transform:
        mask:
          - selector: config.name == 'Config1'
            jsonpath: $.password
            value: md5sum
          - selector: config.name == 'Config1'
            jsonpath: $.secret
            value: '***'
      paths:
        - fixtures/data/single-config.json
```

| Field      | Description                                                   | Scheme                                            | Required |
| ---------- | ------------------------------------------------------------- | ------------------------------------------------- | -------- |
| `selector` | Selector helps in choosing which configs should use the mask. | <CommonLink to="jsonpath">`jsonpath`</CommonLink> | `true`   |
| `jsonpath` | Specify JSONPath expression for the fields                    | `string`                                          | `true`   |
| `value`    | Value can be a name of a hash function or just a string.      | [`hashFunction`](#supported-hash-functions)       | `true`   |

:::info
Masks are applied in the order they are specified in the configuration file.
:::

## Template Variable

The `selector` cel expression receives the [`ScrapeResult`](../references/scrape-result) as its template variable.

## Supported hash functions

- `md5sum`
