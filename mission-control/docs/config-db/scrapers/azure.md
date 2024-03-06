# Azure

The Azure scrapers scrapes your azure account to fetch all the resources & save them as configs.

```yaml title="azure-scraper.yaml"
apiVersion: configs.flanksource.com/v1
kind: ScrapeConfig
metadata:
  name: azure-scraper
spec:
  azure:
    - connection: connection://azure/flanksource # connection provides the clientID, clientSecret & the tenant id
      organisation: flanksource
      subscriptionID: e3911016-5810-415f-b075-682db169988f
      transform:
        relationship:
          # Link AKS Cluster to Kubernetes Cluster
          - filter: config_class == 'KubernetesCluster'
            expr: |
              [{
                "type": "Kubernetes::Cluster",
                "labels": {
                  "aks-nodeResourceGroup": config["properties"]["nodeResourceGroup"],
                  "azure/subscription-id": tags["azure-subscription-id"]
                },
              }].toJSON()
```

## Scraper

| Field       | Description                                                                  | Scheme                                       | Required |
| ----------- | ---------------------------------------------------------------------------- | -------------------------------------------- | -------- |
| `logLevel`  | Specify the level of logging.                                                | `string`                                     |          |
| `schedule`  | Specify the interval to scrape in cron format. Defaults to every 60 minutes. | `string`                                     |          |
| `retention` | Settings for retaining changes, analysis and scraped items                   | [`Retention`](/config-db/concepts/retention) |          |
| `azure`     | Azure scrape config                                                          | [`[]Azure`](#azure)                          |          |

### Azure

| Field            | Description                                                                | Scheme                                         | Required |
| ---------------- | -------------------------------------------------------------------------- | ---------------------------------------------- | -------- |
| `connection`     | Specify the connection that provides the clientID, clientSecret & tenantID | `string`                                       |          |
| `subscriptionID` | Azure subscription ID                                                      | `string`                                       |          |
| `organisation`   | Azure organisation ID                                                      | `string`                                       |          |
| `tenantID`       | Azure tenant ID                                                            | `string`                                       |          |
| `clientID`       | Microsoft Entra ID app client id                                           | <CommonLink to="secrets">_EnvVar_</CommonLink> |          |
| `clientSecret`   | Microsoft Entra ID app client secret                                       | <CommonLink to="secrets">_EnvVar_</CommonLink> |          |
| `exclusions`     | Specifies the Azure projects to scrape                                     | [`Exclusion`](#azure-exclusion)                |          |
| `properties`     | Custom templatable properties for the scraped config items.                | [`[]ConfigProperty`](../../reference/property) |          |
| `transform`      | Field to transform result                                                  | [`Transform`](#transform)                      |          |
| `tags`           | Set custom tags on the scraped config items                                | `map[string]string`                            |          |

:::note
Either the connection name or the credentials (clientID, clientSecret & tenatnID) are required
:::

#### Transform

<ConfigTransform></ConfigTransform>

#### Azure Exclusion

| Field          | Description                                        | Scheme     | Required |
| -------------- | -------------------------------------------------- | ---------- | -------- |
| `activityLogs` | A list of operations to exclude from activity logs | `[]string` |          |
