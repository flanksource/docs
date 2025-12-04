---
title: Labels
sidebar_custom_props:
  icon: mdi:label
---

The `labels` column type renders key/value labels and supports include/exclude filtering by tag.

## Example

```yaml title="pods.yaml" file=<rootDir>/modules/mission-control/fixtures/views/pods.yaml {49-50}

```

## Behavior

- Values must be a JSON object (e.g., `{team: "platform", env: "prod"}`).
- Enable `filter.type: multiselect` to allow users to include or exclude specific label values.
- UI filters encode selections per label key, so users can combine multiple label filters without losing context.
