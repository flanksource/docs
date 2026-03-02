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

For full schema reference, see [Transformation Reference](/docs/reference/config-db/transformation).

## Config Items

### Field Exclusions

Exclusions allow you to remove fields from the `config` of an item. This is useful when you want to remove sensitive or overly verbose from being recorded.

See [Field Exclusions Schema](/docs/reference/config-db/transformation#field-exclusions) for the full schema.

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

### Masking

Masking replaces sensitive fields with a hash or static string. A hash can be used to determine if a field changed without revealing original values.

See [Masking Schema](/docs/reference/config-db/transformation#masking) for the full schema.

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

See [Change Mapping Schema](/docs/reference/config-db/transformation#change-mapping) for the full schema.

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

### Change Traversal

Changes can be redirected to other config items using `move-up`, `copy-up`, `move`, and `copy` actions.

- **`move-up`** redirects a change to an ancestor config (walks the parent chain). Use `ancestor_type` to target a specific type; omit it for the immediate parent.
- **`copy-up`** is the same as `move-up` but keeps the original change as well.
- **`move`** redirects a change to config items matched by `target`.
- **`copy`** duplicates the change to all matched targets.

```yaml title="change-traversal.yaml"
apiVersion: configs.flanksource.com/v1
kind: ScrapeConfig
metadata:
  name: kubernetes-scraper
spec:
  kubernetes:
    - clusterName: local-kind-cluster
      transform:
        changes:
          mapping:
            //highlight-start
            # Move pod crash events to the parent Namespace
            - filter: change.change_type == "PodCrashLooping"
              action: move-up
            # Copy node-level changes up to the Cluster
            - filter: >
                config.config_type == "Kubernetes::Node" &&
                change.change_type == "diff"
              action: copy-up
              ancestor_type: Kubernetes::Cluster
            //highlight-end
```

## Scripting

Scripting modifies the scraped configuration using CEL before saving it to the database. This process is beneficial for data normalization, default value population, and sensitive field masking.

See [Script Context](/docs/reference/config-db/transformation#script-context) for available variables and the [Transform Schema](/docs/reference/config-db/transformation#transform) for scripting options (`expr`, `gotemplate`, `jsonpath`, `javascript`).

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
