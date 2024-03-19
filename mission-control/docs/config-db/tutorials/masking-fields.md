# Masking sensitive fields

```yaml title="file-mask-scraper.yaml"
apiVersion: configs.flanksource.com/v1
kind: ScrapeConfig
metadata:
  name: file-mask-scraper
spec:
  file:
    - type: Config
      id: $.id
      name: $.name
      transform:
        mask:
          - selector: config.name == 'Config1'
            jsonpath: $.password
            value: md5sum
          - selector: config.name == 'Config1'
            jsonpath: $.secret
            value: '***'
      paths:
        - fixtures/data/single-config.json
```

This configuration specifies 2 different masks. The first one will replace the value of the field `password` with the md5sum of the value. The second one will replace the value of the field `secret` with `***`.

```yaml title="kubernetes-mask-secrets.yaml"
apiVersion: configs.flanksource.com/v1
kind: ScrapeConfig
metadata:
  name: kubernetes-scraper
spec:
  kubernetes:
    - clusterName: local-kind-cluster
      transform:
        mask:
          - selector: config.type == 'Kubernetes::Secret'
            jsonpath: .data
            value: md5sum
```
