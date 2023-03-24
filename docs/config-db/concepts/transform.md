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
