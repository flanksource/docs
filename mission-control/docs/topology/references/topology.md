---
title: Topology
---

This page defines the specification for Topology. There are few samples in the examples section.

| Field        | Description                                                                   | Scheme                                                       | Required |
| ------------ | ----------------------------------------------------------------------------- | ------------------------------------------------------------ | -------- |
| `id`         | Specify unique ID for topology                                                | [`IDSelector`](#id-selector)                                 |          |
| `components` | Specify the topology fields for your service, application, check, etc.        | [`[]Component`](./components.md#topology)                    |          |
| `configs`    | Specify selectors for config items that should be related with this topology. | [`[]ConfigSelector`](../concepts/catalog.md#config-selector) |          |
| `icon`       | Set an icon class for topology.                                               | [`Icon`](/reference/types#icon)                                                      |          |
| `owner`      | Specify owner for the topology.                                               | `string`                                                     |          |
| `properties` | Customize topology properties as to be visualized on Mission control UI.      | [`[]Property`](../concepts/properties.md)                    |          |
| `schedule`   | Set schedule to update topology at the set interval.                          | `string`                                                     |          |
| `text`       | Set description or text of choice pertaining to topology.                     | `string`                                                     |          |
| `tooltip`    | Set tooltip outlining information pertaining to the topology.                 | `string`                                                     |          |
| `type`       | Set type of topology e.g. service, API, website, library, database, etc.      | `string`                                                     |          |

### ID Selector

| Field        | Description                                | Scheme   | Required |
| ------------ | ------------------------------------------ | -------- | -------- |
| `expr`       | Specify expression for ID                  | `string` |          |
| `javascript` | Specify javascript syntax to generate ID   | `string` |          |
| `jsonPath`   | Specify path to JSON element for use in ID | `string` |          |
| `template`   | Specify Go template for use in ID          | `string` |          |
