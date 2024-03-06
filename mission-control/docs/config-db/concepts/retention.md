# Retention

After scraping we can choose to retain results on the basis of name, age, count and more.

The retention rules are applied for each unique catalog item. If `changes` is specified with type `X` and count `20`, last 20 changes of `X` type would be kept for each catalog item

| Field          | Description                                                   | Scheme                                      | Required |
| -------------- | ------------------------------------------------------------- | ------------------------------------------- | -------- |
| `changes`      | Specify retention rules for changes                           | [`[]ChangeRetention`](./changes/#retention) |          |
| `types`        | Specify retention rules for config items                      | [`[]ConfigRetention`](#config-retention)    |          |
| `staleItemAge` | configs that were last updated before the age will be deleted | `string`                                    |          |

## Config Retention

```yaml title="kubernetes-scraper.yaml"
apiVersion: configs.flanksource.com/v1
kind: ScrapeConfig
metadata:
  name: kubernetes-scraper
spec:
  retention:
    types:
      - name: Kubernetes::Pod
        createdAge: 7d
  kubernetes:
    clusterName: local
```

| Field        | Description                              | Scheme   | Required |
| ------------ | ---------------------------------------- | -------- | -------- |
| `name`       | Specify retention rules for changes      | `string` |          |
| `createdAge` | Specify retention rules for config items | `string` |          |
| `updatedAge` | Specify retention rules for config items | `string` |          |
| `deletedAge` | Specify retention rules for config items | `string` |          |

## Cleaning up stale configs

When config items are deleted on the source, config-db doesn't know about it because it only saves what it sees at present.
Items that were scraped before and no longer seen are considered stale.
You can delete these stale items by configuring the staleItemAge field in the retention section.

```yaml title="kubernetes-scraper.yaml"
apiVersion: configs.flanksource.com/v1
kind: ScrapeConfig
metadata:
  name: kubernetes-scraper
spec:
  retention:
    staleItemAge: 30m
  kubernetes:
    clusterName: local
```
