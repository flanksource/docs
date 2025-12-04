---
title: Boolean
sidebar_custom_props:
  icon: mdi:check-circle-outline
---

The `boolean` column type renders `true`/`false` values as friendly yes/no text in tables and cards. Use it for readiness, feature flags, or any binary state.

## Example

```yaml title="boolean-example.yaml" file=<rootDir>/modules/mission-control/fixtures/views/boolean-example.yaml {7-27}

```

If you enable `filter.type: multiselect` on a boolean column, Mission Control builds the options from the cached table so users can quickly include or exclude rows by state without triggering a view refresh.
