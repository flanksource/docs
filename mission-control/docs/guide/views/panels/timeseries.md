---
title: Time Series
sidebar_custom_props:
  icon: mdi:chart-timeline-variant
---

The `timeseries` panel visualizes data over time using line, area, or point charts.

## Properties

| Property   | Type   | Description                                                            |
| ---------- | ------ | ---------------------------------------------------------------------- |
| `timeKey`  | string | Field name containing the timestamp (default: infers timestamp column) |
| `valueKey` | string | Field name containing the numeric value (for single-series charts)     |
| `style`    | string | Visualization style: `lines` (default), `area`, `points`               |
| `legend`   | object | Legend configuration (see below)                                       |

## Legend Configuration

| Property | Type    | Description                                              |
| -------- | ------- | -------------------------------------------------------- |
| `enable` | boolean | Show or hide legend (default: `true`)                    |
| `layout` | string  | Legend orientation: `horizontal` (default) or `vertical` |

## Example

```yaml title="timeseries.yaml" file=<rootDir>/modules/mission-control/fixtures/views/panels/timeseries.yaml

```
