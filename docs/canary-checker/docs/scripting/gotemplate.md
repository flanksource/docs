
The [Go template](https://pkg.go.dev/text/template) comes supported with the Canary checker to customize your output however you want it.
Below is an example for the `display` field.

```yaml
prometheus:
    - url: https://prometheus.canary.lab.flanksource.com/
      name: prometheus-check
      query: kubernetes_build_info{job!~"kube-dns|coredns"}
      display:
        template: "{{ (index .results 0).git_version }}"
```

A Go template is specified in `template` under `display`. The template extracts the `git_version` field from the initial field in `.results` output.
