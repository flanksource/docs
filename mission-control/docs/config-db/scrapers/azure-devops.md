# Azure Devops

The Azure Devops scanner will create a new configuration item for each unique pipeline (combination of name and variables).

Each time the pipeline is run it will create a change for that configuration item.

```yaml title="azure-devops-scraper.yaml"
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

| Field         | Description                                                                        | Scheme                                       | Required |
| ------------- | ---------------------------------------------------------------------------------- | -------------------------------------------- | -------- |
| `logLevel`    | Specify the level of logging.                                                      | `string`                                     | `false`  |
| `schedule`    | Specify the interval to scrape in cron format. Defaults to every 60 minutes.       | `string`                                     | `false`  |
| `full`        | Set to `true` to extract changes from scraped configurations. Defaults to `false`. | `bool`                                       | `false`  |
| `retention`   | Settings for retaining changes, analysis and scraped items                         | [`Retention`](/config-db/concepts/retention) |          |
| `azureDevops` | Specifies the list of Azure DevOps configurations to scrape.                       | [`[]AzureDevops`](#azuredevops-1)            | `false`  |

### AzureDevops

| Field                 | Description                                                                                                                                                             | Scheme                                           | Required |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | -------- |
| `id`                  | A static value or JSONPath expression to use as the ID for the resource.                                                                                                | `string`                                         | `true`   |
| `name`                | A static value or JSONPath expression to use as the Name for the resource. Default value is the `id`.                                                                   | `string`                                         | `false`  |
| `items`               | A JSONPath expression to use to extract individual items from the resource                                                                                              | `string`                                         | `false`  |
| `type`                | A static value or JSONPath expression to use as the type for the resource.                                                                                              | `string`                                         | `true`   |
| `transform`           | Specify field to transform result                                                                                                                                       | [`Transform`](../concepts/transform.md)          | `false`  |
| `format`              | Format of config item, defaults to JSON, available options are JSON                                                                                                     | `string`                                         | `false`  |
| `timestampFormat`     | TimestampFormat is a Go time format string used to parse timestamps in createFields and DeletedFields. If not specified, the default is `RFC3339`.                      | `string`                                         | `false`  |
| `createFields`        | CreateFields is a list of JSONPath expression used to identify the created time of the config. If multiple fields are specified, the first non-empty value will be used | `[]string`                                       | `false`  |
| `deleteFields`        | DeleteFields is a JSONPath expression used to identify the deleted time of the config. If multiple fields are specified, the first non-empty value will be used         | `[]string`                                       | `false`  |
| `organization`        | Specifies the name of the Azure DevOps organization to scrape                                                                                                           | `string`                                         | `true`   |
| `personalAccessToken` | Specifies the personal access token to authenticate with Azure DevOps                                                                                                   | <CommonLink to="secrets">[]_EnvVar_</CommonLink> | `true`   |
| `projects`            | Specifies the Azure DevOps projects to scrape                                                                                                                           | `[]string`                                       | `false`  |
| `pipelines`           | Specifies the Azure DevOps pipelines to scrape                                                                                                                          | `[]string`                                       | `false`  |
