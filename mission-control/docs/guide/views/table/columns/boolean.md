---
title: Boolean
sidebar_custom_props:
  icon: mdi:check-circle-outline
---

The `boolean` column type renders `true`/`false` values as friendly yes/no text in tables and cards. Use it for readiness, feature flags, or any binary state.

## Properties

| Property      | Type   | Description                                                                               |
| ------------- | ------ | ----------------------------------------------------------------------------------------- |
| `type`        | string | Must be `boolean`                                                                         |
| `filter`      | object | Enable filtering; Mission Control builds options from the cached table                    |
| `filter.type` | string | Set to `multiselect` to let users include or exclude rows by state without a view refresh |

See [Common Properties](/guide/views/table/columns) for the full list of fields available on all column types.

## Example

```yaml title="boolean-example.yaml" file=<rootDir>/modules/mission-control/fixtures/views/boolean-example.yaml {24-26}

```
