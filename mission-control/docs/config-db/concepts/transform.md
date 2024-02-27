# Transform

| Field           | Description                                                                              | Scheme                                                       | Required |
| --------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------ | -------- |
| `gotemplate`    | Specify Go template for use in script                                                    | `string`                                                     |          |
| `javascript`    | Specify javascript syntax for script                                                     | `string`                                                     |          |
| `jsonpath`      | Specify JSONPath                                                                         | `string`                                                     |          |
| `expr`          | Specify Cel expression                                                                   | `string`                                                     |          |
| `changes`       | Apply transformation on the scraped changes                                              | [`[]Changes`](#changes)                                      |          |
| `exclude`       | Fields to remove from the config, useful for removing sensitive data and fields          | [`[]Exclude`](#exclude)                                      |          |
|                 | that change often without a material impact i.e. Last Scraped Time                       |                                                              |          |
| [`mask`](#mask) | Specify configurations to replace sensitive fields with hash functions or static string. | [`[]Mask`](./masking)                                        |          |
| `relationship`  | form relationships between config items using selectors                                  | [`[]RelationshipConfig`](./relationship#relationship-config) |          |

## Script

### JavaScript

You can supply a JavaScript code to transform the scraped configuration. Your JS code will have access to the special `config` variable which will contain the scraped config. Your script is expected to return a stringified JSON object which will be the new configuration.

_Example_: The following `Config DB` configuration specifies a transformation that'll add a new field `"hello"` with the value `"world"` to all the scraped configurations.

```yaml title="file-scraper.yaml"
apiVersion: configs.flanksource.com/v1
kind: ScrapeConfig
metadata:
  name: file-scraper
spec:
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

```yaml title="file-scraper.yaml"
apiVersion: configs.flanksource.com/v1
kind: ScrapeConfig
metadata:
  name: file-scraper
spec:
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

## Changes

Changes define how the config changes should be transformed. At the moment, only change exclusion is supported which lets you selectively discard changes that are not relevant.

| Field     | Description                                            | Scheme     | Required |
| --------- | ------------------------------------------------------ | ---------- | -------- |
| `exclude` | A list of CEL expressions that excludes a given change | `[]string` |          |

The scraped changes can be accessed using the `details` field.

```yaml title="kubernetes-scraper.yaml"
apiVersion: configs.flanksource.com/v1
kind: ScrapeConfig
metadata:
  name: kubernetes-scraper
spec:
  kubernetes:
    - clusterName: local-kind-cluster
      transform:
        changes:
          exclude:
            - 'config_type == "Kubernetes::Node" && details.message == "status.images"'
            - 'details.source.component == "canary-checker" && (change_type == "Failed" || change_type == "Pass")'
```
