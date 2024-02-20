# Transform

Transformation can be performed after the configs have been scraped from the target. This can be useful when you want to

- hide/remove sensitive data from the scraped configuration (e.g. passwords, tokens, etc.)
- transform the scraped configuration using CEL
- remove certain fields from the scraped configuration

| Field           | Description                                                                              | Scheme                                        | Required |
| --------------- | ---------------------------------------------------------------------------------------- | --------------------------------------------- | -------- |
| `gotemplate`    | Specify Go template for use in script                                                    | `string`                                      |          |
| `javascript`    | Specify javascript syntax for script                                                     | `string`                                      |          |
| `jsonpath`      | Specify JSONPath                                                                         | `string`                                      |          |
| `expr`          | Specify Cel expression                                                                   | `string`                                      |          |
| `changes`       | Apply transformation on the scraped changes                                              | [`[]Changes`](#changes)                       |          |
| `exclude`       | Fields to remove from the config, useful for removing sensitive data and fields          | [`[]Exclude`](#exclude)                       |          |
|                 | that change often without a material impact i.e. Last Scraped Time                       |                                               |          |
| [`mask`](#mask) | Specify configurations to replace sensitive fields with hash functions or static string. | [`[]Mask`](./mask.md)                         |          |
| `relationship`  | form relationships between config items using selectors                                  | [`[]RelationshipConfig`](#relationshipconfig) |          |

:::note
Unlike other transformation functions, scripts (gotemplate, javascript, jsonpath & expr) are ran before the attributes _(id, name, type, ...)_ are extracted.
So please make sure your transformation scripts are inline with the JSONPath selectors for the attributes.
:::

## RelationshipConfig

This transformation function allows you to dynamically form relationships between two different config items using selectors.

Example: You can link a kubernetes deployment with the corresponding pods, or you can link AWS EC2 instances with the AWS Account. It's even possible to link two configs scraped by different scrape configs like: linking a Kubernetes Node in an EKS cluster to the EC2 instance.

| Field    | Description                                                                           | Scheme                                                    | Required |
| -------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------- | -------- |
| `filter` | Specify the config item with which relationship should be formed                      | `string`                                                  | `true`   |
| `expr`   | cel-expression that returns a list of [relationship selector](#relationshipselector). | `string`                                                  |          |
| `id`     | id of the config to link to                                                           | [`RelationshipLookup`](../references/relationship-lookup) |          |
| `name`   | id of the config to link to                                                           | [`RelationshipLookup`](../references/relationship-lookup) |          |
| `type`   | id of the config to link to                                                           | [`RelationshipLookup`](../references/relationship-lookup) |          |
| `agent`  | id of the config to link to                                                           | [`RelationshipLookup`](../references/relationship-lookup) |          |
| `labels` | Labels of the config to link to                                                       | [`RelationshipLookup`](../references/relationship-lookup) |          |

:::info
`expr` is an alternative, more flexible, way to define the selectors. Either use `expr` or the other selector fields (`id`, `name`, `type`, `agent`, `labels`) but not both.
[**See example**](../examples/kubernetes-relationship).
:::

### RelationshipSelector

| Field    | Description                     | Scheme   | Required |
| -------- | ------------------------------- | -------- | -------- |
| `id`     | id of the config to link to     | `string` |          |
| `name`   | id of the config to link to     | `string` |          |
| `type`   | id of the config to link to     | `string` |          |
| `agent`  | id of the config to link to     | `string` |          |
| `labels` | Labels of the config to link to | `string` |          |

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

## Exclude

This transformation function allows you to remove certain fields from the scraped configuration. This is useful when you want to remove sensitive or just useless data from the scraped configuration.

| Field      | Description                                                                | Scheme     | Required |
| ---------- | -------------------------------------------------------------------------- | ---------- | -------- |
| `jsonpath` | Specify JSONPath expression for the fields                                 | `string`   | `true`   |
| `types`    | specify the config types from which the JSONPath fields need to be removed | `[]string` |          |

The `types` field is optional and if left empty, the filter will apply to all config items. [See Example](../examples/exclude-fields)

## Mask

Mask allows replacing sensitive fields with hash of that field or with a static string.
The field to mask is specified by the `jsonPath` config and `value` field defines the hash function or the static value.
[See example](../examples/masking-fields).

| Field      | Description                                                                                                         | Scheme                          | Required |
| ---------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------- | -------- |
| `selector` | Selector helps in choosing which configs should use the mask.                                                       | [`MaskSelector`](#maskselector) | `true`   |
| `jsonpath` | Specify JSONPath expression for the fields                                                                          | `string`                        | `true`   |
| `value`    | Value can be a name of a hash function or just a string. See [supported hash functions](#supported-hash-functions). | `string`                        | `true`   |

### MaskSelector

| Field  | Description                               | Scheme   | Required |
| ------ | ----------------------------------------- | -------- | -------- |
| `type` | Type is the config type to apply the mask | `string` | `true`   |

`Config DB` allows selectively applying masks to certain types of configs. So you could apply a mask to all the `Config` types and another mask to all the `Secret` types.

:::info
Masks are applied in the order they are specified in the configuration file.
:::

### Supported hash functions

At the moment, only `md5sum` is supported. More hash functions will be added in the future.

- md5sum

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

## Date Mapping

This feature allows you to specify custom creation and deletion times for config items. This is useful when you want to import config items from an external source, and you want to preserve the creation and deletion times of the config items in the external source.

You'll be making use of the `createFields` and `deleteFields` fields that are supported by all the scrapers. They are both a list of [JSONPath expression](../concepts/templating.md#jsonpath) and are used to extract the created/deleted time of the config item from the scraped configuration. If multiple fields are specified, the first non-empty value will be used.

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

### Timestamp Format

By default, the timestamp format is RFC3339 (`2006-01-02T15:04:05Z07:00`). If the scraped configuration follows a different timestamp format, then you can specify it in the `timestampFormat` field. The format is specified using the [Go time format](https://golang.org/pkg/time/#Time.Format).

In the above example if the value of `made_at` was `2017/03/06 21:04:11Z`, then the `timestampFormat` file would look like this

```yaml
timestampFormat: '2006/01/02 15:04:05Z'
```
