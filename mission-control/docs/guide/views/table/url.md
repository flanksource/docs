---
title: URL
sidebar_custom_props:
  icon: mdi:link
---

The `url` column type displays clickable links to external URLs, other views, or config items.

## URL Configuration

```yaml
url:
  # External URL (supports row values)
  href: "https://grafana.example.com/d/panel?pod=$(row.name)"

  # OR link to another view
  view:
    namespace: "default"
    name: "pod-details"
    filter:
      pod_id: "row.id"

  # OR link to config item
  config: "row.id"
```

## Example

```yaml title="deployments.yaml" file=<rootDir>/modules/mission-control/fixtures/views/deployments.yaml {37-39}

```
