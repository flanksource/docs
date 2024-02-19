# Exclude fields

In the following scrape config for Kubernetes, the transformation will delete the `.metadata.ownerReferences` field from all the scraped items and `.metadata.generateName` field will be removed only from Pods.

```yaml title="kubernetes.yaml"
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