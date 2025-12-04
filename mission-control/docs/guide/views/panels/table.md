---
title: Table
sidebar_custom_props:
  icon: mdi:table
---

The `table` panel displays query results as a simple key-value list. It has no additional configuration.

## Expected Columns

| Column                   | Type          | Description                             |
| ------------------------ | ------------- | --------------------------------------- |
| `value`                  | string/number | Value displayed on the right (required) |
| First non-`value` column | string        | Label displayed on the left (required)  |

## Example

```yaml title="table.yaml" file=<rootDir>/modules/mission-control/fixtures/views/panels/table.yaml

```
