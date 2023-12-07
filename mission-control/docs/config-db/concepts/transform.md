# Transform

`Config DB` allows you to transform the configuration after they've been scraped from the target. This is supported by all the scrapers.

Transformation can be useful when you want to

- hide/remove sensitive data from the scraped configuration (e.g. passwords, tokens, etc.)
- transform the scraped configuration using Javascript and [Go templates](https://pkg.go.dev/text/template).
- remove certain fields from the scraped configuration

| Field                | Description                                                                                    | Scheme                            | Required |
| -------------------- | ---------------------------------------------------------------------------------------------- | --------------------------------- | -------- |
| [`script`](#script)  | Script to transform scrape result.                                                             | [`Script`](#script)               |          |
| [`exclude`](#filter) | Specify fields to remove from the config. It is useful for removing sensitive data and fields. | [`[]Filter`](./exclude.md#filter) | `false`  |
| [`mask`](#mask)      | Specify configurations to replace sensitive fields with hash functions or static string.       | [`[]Mask`](./mask.md)             | `false`  |
| [`createField`](#mask)      | A path to a field that indicates with an item was created      | JSONPath         | `false`  |
| [`deleteField`](#mask)      | A path to a field that indicates with an item was deleted      | JSONPath           | `false`  |

## Script

Script allows you to transform the scraped configuration using Javascript and [Go templates](https://pkg.go.dev/text/template).

| Field        | Description                           | Scheme   | Required |
| ------------ | ------------------------------------- | -------- | -------- |
| `gotemplate` | Specify Go template for use in script | `string` | `false`  |
| `javascript` | Specify javascript syntax for script  | `string` | `false`  |

!!! note

    Unlike other transformation functions, script is ran before the attributes _(id, name, type, ...)_ are extracted.
    So please make sure your transformation scripts are inline with the JSONPath selectors for the attributes.

### JavaScript

You can supply a JavaScript code to transform the scraped configuration. Your JS code will have access to the special `config` variable which will contain the scraped config. Your script is expected to return a stringified JSON object which will be the new configuration.

_Example_: The following `Config DB` configuration specifies a transformation that'll add a new field `"hello"` with the value `"world"` to all the scraped configurations.

```yaml
file:
  - type: Config
    id: $[0].id
    name: $[0].name
    transform:
      script:
        javascript: |+
          for (var i = 0; i < config.length; i++) {
            config[i].hello = "world"
          }
          JSON.stringify(config)
    paths:
      - fixtures/data/multiple-configs.json
```

Considering that the `fixtures/data/multiple-configs.json` file contains the following configuration

```json
[
  {
    "name": "Config1",
    "id": 1,
    "password": "p1",
    "secret": "secret_1"
  },
  {
    "name": "Config2",
    "id": 2,
    "password": "p2",
    "secret": "secret_2"
  }
]
```

The JS transformation will result in two new config items

```json
{"id": 1, "name": "Config1", "added": "a", "secret": "secret_1", "password": "p1"}
{"id": 2, "name": "Config2", "added": "a", "secret": "secret_2", "password": "p2"}
```

### Go Templates

Go template is another powerful way to transform the scraped configuration. Just as you provide a javascript code, you can also provide a Go template. The Go template will have access to the special `config` variable which will contain the scraped config.

```yaml
file:
  - type: Config
    id: '$.id'
    name: 'scraped'
    transform:
      script:
        gotemplate: |+
          [{
            {{range .config}}
              "name-{{.id}}": "hi {{.name}}",
            {{end}}
            "id": "what"
          }]
    paths:
      - fixtures/data/multiple-configs.json
```

The above transformation will result in the following config

```json
{ "id": "what", "name-1": "hi Config1", "name-2": "hi Config2" }
```


## Exclude
This transformation function allows you to remove certain fields from the scraped configuration. This is useful when you want to remove sensitive or just useless data from the scraped configuration.

### Filter

| Field      | Description                                | Scheme   | Required |
| ---------- | ------------------------------------------ | -------- | -------- |
| `jsonpath` | Specify JSONPath expression for the fields | `string` | `true`   |

_Example_: With the following `Config DB` configuration for AWS, the transformation will delete the `tags` and `privateDnsNameOptionsOnLaunch` fields from the scraped configuration.

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
_Example_: You could set the `value` to `***` and all the fields that match the `jsonPath` will be replaced with `***`.

| Field      | Description                                                                                                         | Scheme                          | Required |
| ---------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------- | -------- |
| `selector` | Selector helps in choosing which configs should use the mask.                                                       | [`MaskSelector`](#maskselector) | `true`   |
| `jsonpath` | Specify JSONPath expression for the fields                                                                          | `string`                        | `true`   |
| `value`    | Value can be a name of a hash function or just a string. See [supported hash functions](#supported-hash-functions). | `string`                        | `true`   |

As an example let's take the following configuration file for `Config DB`

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

:::info
All the masks will be applied in the order they are specified in the configuration file.
:::

### Supported hash functions

At the moment, only `md5sum` is supported. More hash functions will be added in the future.

- md5sum

### MaskSelector

| Field  | Description                               | Scheme   | Required |
| ------ | ----------------------------------------- | -------- | -------- |
| `type` | Type is the config type to apply the mask | `string` | `true`   |

`Config DB` allows selectively applying masks to certain types of configs. So you could apply a mask to all the `Config` types and another mask to all the `Secret` types.



## Date Mapping

This feature allows you to specify custom creation and deletion times for config items. This is useful when you want to import config items from an external source, and you want to preserve the creation and deletion times of the config items in the external source.

You'll be making use of the `createFields` and `deleteFields` fields that are supported by all the scrapers. They are both a list of [JSONPath expression](../concepts/templating.md#jsonpath) and are used to extract the created/deleted time of the config item from the scraped configuration. If multiple fields are specified, the first non-empty value will be used.

### Example

Consider the following configuration file

```yaml
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

```yaml
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

### Custom timestamp format

By default, the timestamp format is RFC3339 (`2006-01-02T15:04:05Z07:00`). If the scraped configuration follows a different timestamp format, then you can specify it in the `timestampFormat` field. The format is specified using the [Go time format](https://golang.org/pkg/time/#Time.Format).

In the above example if the value of `made_at` was `2017/03/06 21:04:11Z`, then the `timestampFormat` file would look like this

```yaml
...
    timestampFormat: '2006/01/02 15:04:05Z'
...
```
