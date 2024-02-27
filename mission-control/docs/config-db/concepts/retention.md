# Retention

After scraping we can choose to retain results on the basis of name, age, count and more.

The retention rules are applied for each unique catalog item. If `changes` is specified with type `X` and count `20`, last 20 changes of `X` type would be kept for each catalog item

| Field     | Description                              | Scheme                                      | Required |
| --------- | ---------------------------------------- | ------------------------------------------- | -------- |
| `changes` | Specify retention rules for changes      | [`[]ChangeRetention`](./changes/#retention) | `false`  |
| `types`   | Specify retention rules for config items | [`[]ConfigRetention`](#config-retention)    | `false`  |

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
