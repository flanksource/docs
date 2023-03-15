`config-db` allows you to transform the configuration after they've been scraped from the target. This is supported by all the scrapers.

Transformation can be useful when you want to

- hide/remove sensitive data from the scraped configuration (e.g. passwords, tokens, etc.)
- transform the scraped configuration using Javascript and [Go templates](https://pkg.go.dev/text/template).
- remove certain fields from the scraped configuration

# Transform

| Field                | Description                                                                                    | Scheme                | Required |
| -------------------- | ---------------------------------------------------------------------------------------------- | --------------------- | -------- |
| [`script`](#script)  | Script to transform scrape result.                                                             | [`Script`](#script)   |          |
| [`exclude`](#filter) | Specify fields to remove from the config. It is useful for removing sensitive data and fields. | [`[]Filter`](#filter) | `false`  |
| [`mask`](#mask)      | Specify configurations to replace sensitive fields with hash functions or static string.       | [`[]Mask`](#mask)     | `false`  |

## Script

| Field        | Description                                    | Scheme   | Required |
| ------------ | ---------------------------------------------- | -------- | -------- |
| `gotemplate` | Specify Go template for use in script          | `string` |          |
| `jsonpath`   | Specify path to JSON element for use in script | `string` |          |
| `expr`       | Specify expression for use in script           | `string` |          |
| `javascript` | Specify javascript syntax for script           | `string` |          |

## Exclude

This feature allows you to remove certain fields from the scraped configuration. This is useful when you want to remove sensitive or just useless data from the scraped configuration.

### Filter

| Field      | Description                                | Scheme   | Required |
| ---------- | ------------------------------------------ | -------- | -------- |
| `jsonpath` | Specify JSONPath expression for the fields | `string` | `true`   |

Example: With the following `config-db` configuration for AWS, the transformation will delete the `tags` and `privateDnsNameOptionsOnLaunch` fields from the scraped configuration.

```yaml
aws:
  - type: AWS
    transform:
      exclude:
        - jsonpath: $.tags
        - jsonpath: $.privateDnsNameOptionsOnLaunch
```

## Mask

Mask allows replacing sensitive fields with hash of that field or with a static string.
Example: You could set the `value` to `***` and all the fields that match the `jsonPath` will be replaced with `***`.

| Field      | Description                                                                                                         | Scheme                          | Required |
| ---------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------- | -------- |
| `selector` | Selector helps in choosing which configs should use the mask.                                                       | [`MaskSelector`](#maskselector) | `true`   |
| `jsonpath` | Specify JSONPath expression for the fields                                                                          | `string`                        | `true`   |
| `value`    | Value can be a name of a hash function or just a string. See [supported hash functions](#supported-hash-functions). | `string`                        | `true`   |

As an example let's take the following configuration file for `config-db`

```yaml
file:
  - type: Config
    id: $.id
    name: $.name
    transform:
      mask:
        - selector:
            type: Config
          jsonpath: $.password
          value: md5sum
        - selector:
            type: Config
          jsonpath: $.secret
          value: '***'
    paths:
      - fixtures/data/single-config.json
```

This configuration specifies 2 different masks. The first one will replace the value of the field `password` with the md5sum of the value. The second one will replace the value of the field `secret` with `***`.

!!! info

    All the masks will be applied in the order they are specified in the configuration file.

### Supported hash functions

At the moment, only `md5sum` is supported. More hash functions will be added in the future.

- md5sum

### MaskSelector

| Field  | Description                               | Scheme   | Required |
| ------ | ----------------------------------------- | -------- | -------- |
| `type` | Type is the config type to apply the mask | `string` | `true`   |

`config-db` allows selectively applying masks to certain types of configs. So you could apply a mask to all the `Config` types and another mask to all the `Secret` types.
