# Exclusions

Exclusions allow you to remove certain fields from the scraped configuration. This is useful when you want to remove sensitive or just useless data from the scraped configuration.

```yaml title="kubernetes-exclude-superfluous-fields.yaml"
apiVersion: configs.flanksource.com/v1
kind: ScrapeConfig
metadata:
  name: kubernetes-scraper
spec:
  kubernetes:
    - clusterName: local-kind-cluster
      transform:
        exclude:
          - jsonpath: '.metadata.ownerReferences'
          - types:
              - Kubernetes::Pod
            jsonpath: '.metadata.generateName'
```

## Exclude

| Field      | Description                                                                | Scheme     | Required |
| ---------- | -------------------------------------------------------------------------- | ---------- | -------- |
| `jsonpath` | Specify JSONPath expression for the fields                                 | `string`   | `true`   |
| `types`    | specify the config types from which the JSONPath fields need to be removed | `[]string` |          |

The `types` field is optional and if left empty, the filter will apply to all config items.
