---
title: Gauge
sidebar_custom_props:
  icon: mdi:gauge
---

The `gauge` column type displays numeric values as visual gauges with configurable thresholds and colors.

<ColumnDef rows={[
  {field: "gauge", description: "Gauge visualization configuration", scheme: "object", required: true},
  {field: "gauge.min", description: "Minimum value for the gauge range (number or CEL expression, e.g. `row.memory_limit`)", scheme: "string"},
  {field: "gauge.max", description: "Maximum value for the gauge range (number or CEL expression)", scheme: "string"},
  {field: "gauge.precision", description: "Number of decimal places to display", scheme: "int"},
  {field: "gauge.thresholds[].percent", description: "Percentage of the range at which this threshold applies (0–100)", scheme: "int"},
  {field: "gauge.thresholds[].color", description: "Color at this threshold (name or hex, e.g. `green`, `#ef4444`)", scheme: "string"},
]}/>

## Example

```yaml title="namespace.yaml" file=<rootDir>/modules/mission-control/fixtures/views/namespace.yaml {25-38}

```
