---
title: Config Item
sidebar_custom_props:
  icon: config
---

The `config_item` column type displays clickable links to configuration item detail pages with a proper icon.

<ColumnDef rows={[
{field: "configItem.idField", description: "Field from the merged query result to use as the config item ID. Defaults to `id` when not specified.", scheme: "string"},
]}/>

## Example

```yaml title="cronjobs.yaml" file=<rootDir>/modules/mission-control/fixtures/views/cronjobs.yaml {16-17}

```
