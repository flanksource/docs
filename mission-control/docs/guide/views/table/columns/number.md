---
title: Number
sidebar_custom_props:
  icon: mdi:numeric
---

The `number` column type displays numeric values (integers and decimals).

## Properties

| Property | Type   | Description                                               |
| -------- | ------ | --------------------------------------------------------- |
| `type`   | string | Must be `number`                                          |
| `unit`   | string | Display unit appended to the value (e.g. `pods`, `req/s`) |

See [Common Properties](/guide/views/table/columns) for the full list of fields available on all column types.

## Example

```yaml title="namespace.yaml" file=<rootDir>/modules/mission-control/fixtures/views/notification-send-history.yaml {27-30}

```
