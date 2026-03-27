---
title: Labels
sidebar_custom_props:
  icon: mdi:label
---

The `labels` column type renders key/value labels and supports include/exclude filtering by tag.

## Properties

| Property      | Type   | Description                                                                             |
| ------------- | ------ | --------------------------------------------------------------------------------------- |
| `type`        | string | Must be `labels`                                                                        |
| `filter`      | object | Enable label filtering in the UI                                                        |
| `filter.type` | string | Set to `multiselect` to allow users to include or exclude specific label values per key |

See [Common Properties](/guide/views/table/columns) for the full list of fields available on all column types.

## Behavior

- Values must be a JSON object (e.g., `{team: "platform", env: "prod"}`).
- Enable `filter.type: multiselect` to allow users to include or exclude specific label values.
- UI filters encode selections per label key, so users can combine multiple label filters without losing context.

## Example

```yaml title="pods.yaml" file=<rootDir>/modules/mission-control/fixtures/views/pods.yaml {49-50}

```
