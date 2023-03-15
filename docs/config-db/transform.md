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

Script allows you to transform the scraped configuration using Javascript and [Go templates](https://pkg.go.dev/text/template).

| Field        | Description                           | Scheme   | Required |
| ------------ | ------------------------------------- | -------- | -------- |
| `gotemplate` | Specify Go template for use in script | `string` | `false`  |
| `javascript` | Specify javascript syntax for script  | `string` | `false`  |

### JavaScript

You can supply a JavaScript code to transform the scraped configuration. Your JS code will have access to the special `config` variable which will contain the scraped config. Your script is expected to return a stringified JSON object which will be the new configuration.

_Example_: The following `config-db` configuration specifies a transformation that'll add a new field `"hello"` with the value `"world"` to all the scraped configurations.

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

The above transformation will transform the

```json
{ "id": "what", "name-1": "hi Config1", "name-2": "hi Config2" }
```

## Exclude

This feature allows you to remove certain fields from the scraped configuration. This is useful when you want to remove sensitive or just useless data from the scraped configuration.

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

## Mask

Mask allows replacing sensitive fields with hash of that field or with a static string.
_Example_: You could set the `value` to `***` and all the fields that match the `jsonPath` will be replaced with `***`.

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
