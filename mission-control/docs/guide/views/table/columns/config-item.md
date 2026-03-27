---
title: Config Item
sidebar_custom_props:
  icon: config
---

The `config_item` column type displays clickable links to configuration item detail pages with a proper icon.

## Properties

| Property             | Type   | Description                                                                                           |
| -------------------- | ------ | ----------------------------------------------------------------------------------------------------- |
| `type`               | string | Must be `config_item`                                                                                 |
| `configItem`         | object | Config item column configuration                                                                      |
| `configItem.idField` | string | Field from the merged query result to use as the config item ID. Defaults to `id` when not specified. |

See [Common Properties](/guide/views/table/columns) for the full list of fields available on all column types.

## Example

```yaml title="cronjobs.yaml" file=<rootDir>/modules/mission-control/fixtures/views/cronjobs.yaml {16-17}

```
