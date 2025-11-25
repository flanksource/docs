---
title: URL
sidebar_custom_props:
  icon: mdi:link
---

The `url` column type displays clickable links. Links can point to external URLs, other views, or configuration items. URLs can be parameterized with row data for dynamic linking.

## Basic Usage

```yaml
columns:
  - name: dashboard_link
    type: url
    url:
      href: "https://example.com"
```

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | string | Column name (used in mapping) |
| `type` | string | Set to `"url"` |
| `description` | string | Help text for column |
| `url` | object | URL configuration |
| `for` | string | Column to use as link text |

## URL Configuration

```yaml
url:
  # External URL
  href: "https://example.com/resource"

  # OR internal view link
  view:
    namespace: "default"
    name: "view-name"
    filter:
      param: "value"

  # OR link to config item
  config: "row.id"
```

## Example Usage

### External URL Link

```yaml
columns:
  - name: documentation
    type: url
    url:
      href: "https://docs.example.com"

mapping:
  documentation: "row.name"  # Link text
```

### Dynamic External URL

```yaml
columns:
  - name: grafana_link
    type: url
    for: "metric_name"  # Use this column as link text
    url:
      href: "https://grafana.example.com/d/panel?pod=$(row.name)"

mapping:
  metric_name: "row.name"
```

### Link to Another View

```yaml
columns:
  - name: details_link
    type: url
    url:
      view:
        namespace: "default"
        name: "pod-details"
        filter:
          pod_id: "row.id"

mapping:
  details_link: "row.name"  # Link text = pod name
```

### Link to Config Item

```yaml
columns:
  - name: config_link
    type: url
    for: "resource_name"  # Show resource name as link text
    url:
      config: "row.id"  # Link to config by ID

mapping:
  resource_name: "row.name"
```

## Common Patterns

### External Service Links
```yaml
columns:
  - name: service_url
    type: url
    for: "service_name"
    url:
      href: "https://$(row.domain)/service/$(row.service_id)"

mapping:
  service_name: "row.name"
```

### Monitoring Dashboard Links
```yaml
columns:
  - name: metrics_dashboard
    type: url
    for: "pod_name"
    url:
      href: "https://prometheus.example.com/graph?expr=pod_metrics%7Bpod%3D%22$(row.name)%22%7D"

mapping:
  pod_name: "row.name"
```

### Log Aggregation Links
```yaml
columns:
  - name: logs_link
    type: url
    for: "pod_name"
    url:
      href: "https://logs.example.com/search?q=pod:$(row.name)"

mapping:
  pod_name: "row.name"
```

### View Navigation
```yaml
columns:
  - name: pod_details
    type: url
    url:
      view:
        namespace: "default"
        name: "pod-details"
        filter:
          pod_id: "row.id"
          cluster: "$(var.cluster)"  # Use variables too

mapping:
  pod_details: "row.name"
```

## Real-World Examples

### Kubernetes Pod Dashboard Links
```yaml
columns:
  - name: pod_name
    type: string
    primaryKey: true

  - name: logs_link
    type: url
    for: "pod_name"
    description: "View pod logs"
    url:
      href: "https://logs.example.com/search?pod=$(row.name)&namespace=$(row.namespace)"

  - name: metrics_link
    type: url
    for: "pod_name"
    description: "View metrics"
    url:
      href: "https://metrics.example.com/dashboard?pod=$(row.name)"

  - name: pod_config
    type: url
    for: "pod_name"
    description: "View config details"
    url:
      config: "row.id"

queries:
  pods:
    configs:
      types: ["Kubernetes::Pod"]

mapping:
  pod_name: "row.name"
  logs_link: "row.name"
  metrics_link: "row.name"
  pod_config: "row.name"
```

### AWS Resource Links
```yaml
columns:
  - name: instance_id
    type: string
    primaryKey: true

  - name: aws_console_link
    type: url
    for: "instance_id"
    description: "Open in AWS Console"
    url:
      href: "https://console.aws.amazon.com/ec2/v2/home#Instances:instanceId=$(row.instance_id)"

  - name: cloudwatch_metrics
    type: url
    for: "instance_id"
    description: "CloudWatch Metrics"
    url:
      href: "https://console.aws.amazon.com/cloudwatch/home#metricsV2:graph=~();query=$(row.instance_id)"

queries:
  instances:
    configs:
      types: ["AWS::EC2Instance"]

mapping:
  instance_id: "row.name"
  aws_console_link: "row.name"
  cloudwatch_metrics: "row.name"
```

### Application Links
```yaml
columns:
  - name: app_name
    type: string
    primaryKey: true

  - name: production_url
    type: url
    for: "app_name"
    description: "Open production app"
    url:
      href: "https://$(row.production_domain)/$(row.app_id)"

  - name: staging_url
    type: url
    for: "app_name"
    description: "Open staging app"
    url:
      href: "https://staging-$(row.production_domain)/$(row.app_id)"

  - name: git_repository
    type: url
    for: "app_name"
    description: "View source code"
    url:
      href: "$(row.git_repo_url)"

queries:
  apps:
    configs:
      types: ["Application::Service"]

mapping:
  app_name: "row.name"
  production_url: "row.name"
  staging_url: "row.name"
  git_repository: "row.name"
```

### Incident Response Links
```yaml
columns:
  - name: incident_id
    type: string
    primaryKey: true

  - name: related_configs
    type: url
    for: "incident_id"
    description: "View affected resources"
    url:
      view:
        namespace: "default"
        name: "incident-resources"
        filter:
          incident_id: "row.id"

  - name: incident_timeline
    type: url
    for: "incident_id"
    description: "View timeline"
    url:
      view:
        namespace: "default"
        name: "incident-timeline"
        filter:
          incident_id: "row.id"

  - name: external_issue_tracker
    type: url
    for: "incident_id"
    description: "View in Jira"
    url:
      href: "https://jira.example.com/browse/INC-$(row.id)"

queries:
  incidents:
    configs:
      types: ["Incident::Report"]

mapping:
  incident_id: "row.id"
  related_configs: "row.id"
  incident_timeline: "row.id"
  external_issue_tracker: "row.id"
```

## URL Syntax

### Static URLs
```yaml
url:
  href: "https://example.com/resource"
```

### Dynamic URLs with Row Data
```yaml
url:
  href: "https://example.com/search?q=$(row.name)&id=$(row.id)"
```

### URLs with Variables
```yaml
url:
  href: "https://example.com/cluster/$(var.cluster)/pod/$(row.name)"
```

### Internal View Links
```yaml
url:
  view:
    namespace: "default"
    name: "view-name"
    filter:
      param: "value"
```

## Link Text

The link text (what users see and click) comes from:

1. **`for` property** - Use specified column as text
   ```yaml
   - name: link_column
     type: url
     for: "name_column"  # Use name_column as link text
     url: { ... }
   ```

2. **Mapping value** - Use mapped value as text
   ```yaml
   mapping:
     link: "row.name"  # Show name as link text
   ```

3. **Default** - Shows the URL itself if not specified

## Internal View Links

Link to other views with optional filters:

```yaml
url:
  view:
    namespace: "default"      # View namespace
    name: "pod-details"       # View name
    filter:                   # Optional parameters
      pod_id: "row.id"
      cluster: "us-east-1"
```

Users clicking the link navigate to the specified view with filters applied.

## Configuration Item Links

Link directly to configuration item detail pages:

```yaml
url:
  config: "row.id"  # Links to config detail page
```

## Real URL Parameters Example

```yaml
columns:
  - name: pod_name
    type: string
    primaryKey: true

  - name: logs
    type: url
    for: "pod_name"
    url:
      # This creates clickable pod names linking to logs
      href: "https://logs.company.com/pods?name=$(row.name)&ns=$(row.namespace)"

mapping:
  pod_name: "row.name"
```

When rendered:
- Users see the pod name as a blue link
- Clicking takes them to logs.company.com with pod name and namespace in query params

## Best Practices

1. **Use meaningful link text** - Show what the link is about
   ```yaml
   # ✓ Clear what the link does
   for: "pod_name"

   # ✗ Generic link text
   for: "link"
   ```

2. **Add descriptions** - Explain link purpose
   ```yaml
   - name: logs_link
     type: url
     description: "View pod logs in Datadog"
   ```

3. **Use HTTPS** - Always use secure URLs
   ```yaml
   # ✓ Secure
   href: "https://example.com"

   # ✗ Insecure
   href: "http://example.com"
   ```

4. **Parameterize URLs** - Make links dynamic
   ```yaml
   # ✓ Dynamic for each row
   href: "https://example.com?pod=$(row.name)"

   # ✗ Static, same for all rows
   href: "https://example.com?pod=my-pod"
   ```

5. **Test links** - Verify they work before deploying
   - Check URL formatting
   - Verify query parameters
   - Test with sample data

## Escaping Special Characters

In URLs, some characters need escaping:

```yaml
# Space: %20
href: "https://example.com?q=$(row.name)%20extra"

# ?
href: "https://example.com?param1=value&param2=value"

# #
href: "https://example.com#section"
```

## URL Encoding Example

```yaml
# Properly encoded URL with spaces and special chars
url:
  href: "https://logs.example.com/search?query=$(urlEncode(row.name))&time=1h"
```

## Performance Considerations

- URL columns are very efficient
- Link rendering has minimal overhead
- No performance impact on views with many links

## Comparison with Other Link Types

| Type | Use Case |
|------|----------|
| `url` | External links or custom URLs |
| `config_item` | Links to configuration detail page |

Use `url` for external sites (logs, monitoring, etc.). Use `config_item` to link to Mission Control config pages.

## Security Considerations

- Always validate URL sources
- Use HTTPS for sensitive data
- Avoid exposing sensitive parameters in URLs
- Consider URL encoding for user-supplied data

## Open Link Behavior

By default, links:
- Open in a new browser tab/window
- Preserve the parent view
- Allow back navigation

This can usually be configured at the platform level.
