---
title: Transformation
sidebar_custom_props:
  icon: hugeicons:code
---

Transformations allow you to modify scraped config items before they are saved, common use cases include:

- Linking configuration items
- Removing extraneous or overly verbose fields
- Masking sensitive data
- Excluding duplicate changes or changes with a high rate

| Field                       | Description                                                                | Scheme                                                                   |
| --------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `transform.exclude`         | Remove fields from a scraped `config`                                      | [[]Exclude](#field-exclusions)                                           |
| `transform.mask`            | Replace sensitive fields with a hash to enable change detection on secrets | [[]Mask](#masking)                                                       |
| `transform.changes.exclude` | Ignore changes                                                             | [[]CEL](#exclusions) with [Change Context](/docs/reference/config-db/changes) |
| `transform.changes.mapping` | Categorize changes                                                         | [Mapping](#mapping)                                                      |
| `transform.expr`            |                                                                            | [CEL](/docs/reference/scripting/cel)                                          |
| `transform.relationship`    | Create relationships between items                                         | [Relationships](./relationships)                                         |

## Config Items

### Field Exclusions

Exclusions allow you to remove fields from the `config` of an item. This is useful when you want to remove sensitive or overly verbose from being recorded.

```yaml title="kubernetes-exclude-superfluous-fields.yaml"
apiVersion: configs.flanksource.com/v1
kind: ScrapeConfig
metadata:
  name: kubernetes-scraper
spec:
  kubernetes:
    - clusterName: local-kind-cluster
      transform:
      //highlight-start
        exclude:
          - types:
              - Kubernetes::Pod
            jsonpath: '.metadata.generateName'
       //highlight-end
```

| Field      | Description                                                            | Scheme                                            | Required |
| ---------- | ---------------------------------------------------------------------- | ------------------------------------------------- | -------- |
| `jsonpath` | All matching elements will be removed from the `config`                | <CommonLink to="jsonpath">`jsonpath`</CommonLink> | `true`   |
| `types`    | Only run exclusion rules for these config types, if empty apply to all | `[]string`                                        |          |

### Masking

Masking replaces sensitive fields with a hash or static string. A hash can be used to determine if a field changed without revealing original values.

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
      //highlight-start
        mask:
          - selector: config.name == 'Config1'
            jsonpath: $.password
            value: md5sum # Change detection will pick up that a change has occurred, but not what the change was
          - selector: config.name == 'Config1'
            jsonpath: $.secret
            value: '***' # Replace the secret with a fixed mask, no change detection will be possible
       //highlight-end
      paths:
        - fixtures/data/single-config.json
```

| Field      | Description                                 | Scheme                                                                                                  |
| ---------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `selector` | Filter which config items to apply masks on | <CommonLink to="cel">`CEL`</CommonLink> with [ScrapeResult](/docs/reference/config-db/scrape-result) context |
| `jsonpath` | Values to mask                              | <CommonLink to="jsonpath">`JSONPath`</CommonLink>                                                       |
| `value`    | The replacement value of matched elements   | `md5` or any static string e.g. `***`                                                                   |

:::info
Masks are applied in the order they are specified in the configuration file.
:::

## Changes

### Exclusions

Some configurations can change frequently and may not be relevant. For example, a `Kubernetes::Node` configuration changes often as pods launched and stopped. From the node's perspective, these image changes are irrelevant.

This is where exclusions become useful. Here's an example that ignores all image changes in a `Kubernetes::Node` configuration:

```yaml title="kubernetes-scraper.yaml"
apiVersion: configs.flanksource.com/v1
kind: ScrapeConfig
metadata:
  name: kubernetes-scraper
spec:
  kubernetes:
    - clusterName: local-kind-cluster
      transform:
      	//highlight-start
        changes:
          exclude:
            - 'config_type == "Kubernetes::Node" && details.message == "status.images"'
				//highlight-end
```

### Mapping

When you encounter a diff change, unlike an event-based change, it can sometimes appear unclear. The summary of the change may not immediately indicate its purpose. For example, the change 'status.images' might not be self-explanatory. To clarify this, you can assign types to these diff changes using mapping.

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
              //highlight-start
          mapping:
            - filter: >
                change.change_type == 'diff' && change.summary == "status.containerStatuses" &&
                patch != null && has(patch.status) && has(patch.status.containerStatuses) &&
                patch.status.containerStatuses.size() > 0 &&
                has(patch.status.containerStatuses[0].restartCount)
              type: PodCrashLooping
            - filter: >
                change.change_type == 'diff' && change.summary == "status.images" && config.kind == "Node"
              type: ImageUpdated
              //highlight-end
```

| Field     | Description                                                                                            | Scheme                                                                                                   |
| --------- | ------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| `filter`  | Selects changes to apply the mapping                                                                   | <CommonLink to="cel">CEL</CommonLink> with [Change Context](/docs/reference/config-db/changes)                |
| `action`  | What action to take on the change, if `delete` then the corresponding config item is marked as deleted | `delete` or `ignore`                                                                                     |
| `type`    | New change type                                                                                        | `string`                                                                                                 |
| `summary` | New summary of the change                                                                              | <CommonLink to="gotemplate">Go Template</CommonLink> with [Change Context](/docs/reference/config-db/changes) |

## Scripting

Scripting modifies the scraped configuration using CEL before saving it to the database. This process is beneficial for data normalization, default value population, and sensitive field masking.

| Field  | Description             | Scheme                                                                                                  | Context                                                                          |
| ------ | ----------------------- | ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `expr` | Transform a config item | <CommonLink to="cel">CEL</CommonLink> that returns [[]ScrapeResult](/docs/reference/config-db/scrape-result) | `config` `JSON`<br/>`result` [Scrape Result](/docs/reference/config-db/scrape-result) |

```yaml title="file-scraper.yaml"
apiVersion: configs.flanksource.com/v1
kind: ScrapeConfig
metadata:
  name: file-scraper
spec:
  file:
    - type: Config
      id: $.id
      name: $.name
      transform:
        expr: |
          //highlight-next-line
          [(config + {'source': 'scraper', 'password': config.password.size()})].toJSON()
      paths:
        - config.json
```

Using the following file

```json title=config.json
{
  "name": "Config1",
  "id": 1,
  "password": "p1",
  "secret": "secret_1"
}
```

The transformation would emit:

```json
{
  "name": "Config1",
  "id": 1,
  "password": 2,
  "source": "scraper",
  "secret": "secret_1"
}
```
