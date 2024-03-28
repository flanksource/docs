# Azure Devops

The Azure Devops scanner will create a new configuration item for each unique pipeline (combination of name and variables).

Each time the pipeline is run it will create a change for that configuration item.

```yaml title="azure-devops-scraper.yaml" file=../../../modules/config-db/fixtures/azure-devops.yaml
apiVersion: configs.flanksource.com/v1
kind: ScrapeConfig
metadata:
  name: azure-devops
spec:
  azureDevops:
    - organization: <Org Name>
      personalAccessToken:
        valueFrom:
          secretKeyRef:
            name: ado-credentials
            key: TOKEN
      projects:
        - <Project Name> # leave empty to select all projects
      pipelines:
        - <Pipeline Name> # leave empty to select all pipelines
      type: Release # the change type the pipeline produces
```

## Scraper

| Field         | Description                                                                  | Scheme                                       | Required |
| ------------- | ---------------------------------------------------------------------------- | -------------------------------------------- | -------- |
| `logLevel`    | Specify the level of logging.                                                | `string`                                     |          |
| `schedule`    | Specify the interval to scrape in cron format. Defaults to every 60 minutes. | `string`                                     |          |
| `retention`   | Settings for retaining changes, analysis and scraped items                   | [`Retention`](/config-db/concepts/retention) |          |
| `azureDevops` | Specifies the list of Azure DevOps configurations to scrape.                 | [`[]AzureDevops`](#azuredevops-1)            |          |

### AzureDevops

| Field                 | Description                                                           | Scheme                                           | Required |
| --------------------- | --------------------------------------------------------------------- | ------------------------------------------------ | -------- |
| `connection`          | Connection to use for azure devops credential                         | `string`                                         |          |
| `organization`        | Specifies the name of the Azure DevOps organization to scrape         | `string`                                         |          |
| `personalAccessToken` | Specifies the personal access token to authenticate with Azure DevOps | <CommonLink to="secrets">[]_EnvVar_</CommonLink> |          |
| `projects`            | Specifies the Azure DevOps projects to scrape                         | `[]string`                                       | `true`   |
| `pipelines`           | Specifies the Azure DevOps pipelines to scrape                        | `[]string`                                       | `true`   |
| `properties`          | Custom templatable properties for the scraped config items.           | [`[]ConfigProperty`](../../reference/property)   |          |
| `transform`       | Field to transform result                                                                        | [`Transform`](/config-db/concepts/transform)                        |          |
| `tags`                | Set custom tags on the scraped config items                           | `map[string]string`                              |          |

:::note
Either the connection name or the credentials (organization & personalAccessToken) are required
:::
