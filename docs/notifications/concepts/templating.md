# Templating

**Templating is:**

> Simply a way to represent data in different forms.

Templating is essential for crafting customized notifications. It involves using templates for both the notification title and body. In Mission Control, these templates are rendered using Go templates. To determine which variables you can use in a specific event's template, refer to the corresponding event details in the [events](../concepts/events.md) section.

## Go Template

Go templates are a feature of the Go programming language that allow you to define and execute templates. Templates are text files that contain placeholders for data, which are filled in at runtime. The view data for the template is the [search param](./api.md#search-params).

```yaml
events:
  - check.passed
title: Check as {{.check.status}}
template: |
  Canary: {{.canary.name}}
  {{if .agent}}Agent: {{.agent.name}}{{end}}
  Message: {{.status.message}}
filter: "check.type == 'http'"
. . .
```
