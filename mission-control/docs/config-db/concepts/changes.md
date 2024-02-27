# Changes

Once a config item has been saved to ConfigDB, it's changes are also tracked. The changes could come from external sources like Kubernetes events, Azure activities, ... Or the changes can be auto detected by comparing the old config with the newly changed config.

![Kubernetes Deployment Replica change](../../images/config-changes.png)

_Fig: Kubernetes Deployment Replica change tracking_

Changes define how the config changes should be transformed. At the moment, only change exclusion is supported which lets you selectively discard changes that are not relevant.

| Field     | Description                                                                   | Scheme     | Required |
| --------- | ----------------------------------------------------------------------------- | ---------- | -------- |
| `mapping` | Mapping is a list of CEL expressions that maps a change to the specified type | `[]string` |          |
| `exclude` | A list of CEL expressions that excludes a given change                        | `[]string` |          |

## Exclusions

The scraped changes can be accessed using the `details` field.

```yaml title="kubernetes-scraper.yaml"
apiVersion: configs.flanksource.com/v1
kind: ScrapeConfig
metadata:
  name: kubernetes-scraper
spec:
  kubernetes:
    - clusterName: local-kind-cluster
      transform:
        changes:
          exclude:
            - 'config_type == "Kubernetes::Node" && details.message == "status.images"'
            - 'details.source.component == "canary-checker" && (change_type == "Failed" || change_type == "Pass")'
```

## Mapping

```yaml title="kubernetes-scraper.yaml"
apiVersion: configs.flanksource.com/v1
kind: ScrapeConfig
metadata:
  name: kubernetes-scraper
spec:
  kubernetes:
    - clusterName: local-kind-cluster
      transform:
        changes:
          mapping:
            - filter: >
                change.change_type == 'diff' && change.summary == "status.containerStatuses" &&
                patch != null && has(patch.status) && has(patch.status.containerStatuses) &&
                patch.status.containerStatuses.size() > 0 &&
                has(patch.status.containerStatuses[0].restartCount)
              type: PodCrashLooping
```

| Field     | Description                                                | Scheme   | Required |
| --------- | ---------------------------------------------------------- | -------- | -------- |
| `filter`  | CEL expressions that selects a change to apply the mapping | `string` | `true`   |
| `exclude` | Type to be set on the change                               | `string` | `true`   |

## Retention

```yaml title="kubernetes-scraper.yaml"
apiVersion: configs.flanksource.com/v1
kind: ScrapeConfig
metadata:
  name: kubernetes-scraper
spec:
  retention:
    changes:
      - name: PullSuceeded
        age: 7d # Only keep one week of PullSuceeded changes
  kubernetes:
    clusterName: local
```

| Field   | Description                                             | Scheme   | Required |
| ------- | ------------------------------------------------------- | -------- | -------- |
| `name`  | Name of the change type                                 | `string` | `true`   |
| `age`   | Maximum age of the change type to retain (`12h`, `30d`) | `string` |          |
| `count` | Maximum count to retain the change type                 | `int`    |          |
