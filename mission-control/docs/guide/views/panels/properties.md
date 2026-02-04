---
title: Properties
sidebar_custom_props:
  icon: mdi:form-textbox
---

The `properties` panel displays a single row of data as a vertical list of key-value pairs. This is useful for showing details of a specific entity.

## Configuration

This panel type does not require any specific configuration. It uses the standard panel definition.

## Behavior

- Displays column names as labels and their values from the first row of the query result.
- Useful when the query returns a single record.

## Example

```yaml
panels:
  - name: Deployment Details
    type: properties
    query: |
      SELECT name, status, created_at, version
      FROM deployments
      LIMIT 1
```
