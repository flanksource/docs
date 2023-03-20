# Templating

**Templating is:**

> Simply a way to represent data in different forms.

Templating comes in handy when you want to transform the scraped configuration.

## Supported Templating Types

To specify the template to be used for representing your data, the following options are available:

- [Go template](#go-template)
- [Javascript](#javascript)

### Go Template

[Go templates](https://pkg.go.dev/text/template) can be used to transform the scraped configuration into a new configuration.
Below is an example for the `display` field.

```yaml
file:
  - type: Config
    id: '$.id'
    name: 'scraped'
    transform:
      script:
        gotemplate: |+
          [{
            {{range .config}}
              "name-{{.id}}": "hi {{.name}}",
            {{end}}
            "id": "what"
          }]
    paths:
      - fixtures/data/multiple-configs.json
```

A Go template is specified in `template` under `display`. The template extracts the `git_version` field from the initial field in `.results` output.

### Javascript

Javascript code can used to transformed the scraped configuration. Below is an example of in-line Javascript in use.

```yaml
file:
  - type: Config
    id: $[0].id
    name: $[0].name
    transform:
      script:
        javascript: |+
          for (var i = 0; i < config.length; i++) {
            config[i].hello = "world"
          }
          JSON.stringify(config)
    paths:
      - fixtures/data/multiple-configs.json
```
