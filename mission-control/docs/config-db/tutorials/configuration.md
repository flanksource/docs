# Configuration

Configuration in `Config DB` can refer to two things:

- The configuration YAML file required by `Config DB` to scrape external configuration files
- The external configurations scraped by `Config DB` _(referred to as scraped configuration)_

In order to run `Config DB` you need to first have a configuration file. Below is the structure of the configuration file.

## Configuration file

| Field            | Description                                                                                      | Scheme                                                              | Required |
| ---------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- | -------- |
| `logLevel`       | Specify the level of logging.                                                                    | `string`                                                            | `false`  |
| `schedule`       | Specify the interval to scrape configuration files in cron format. Defaults to every 60 minutes. | `string`                                                            | `false`  |
| `full`           | Set to `true` to extract changes from scraped configurations. Defaults to `false`.               | `bool`                                                              | `false`  |
| `aws`            | Specifies the list of AWS configurations to scrape.                                              | [`[]AWS`](../scrapers/aws.md#aws)                                   | `false`  |
| `file`           | Specifies the list of local file paths to scrape.                                                | [`[]File`](../scrapers/file.md#file)                                | `false`  |
| `kubernetes`     | Specifies the list of Kubernetes configurations to scrape.                                       | [`[]Kubernetes`](../scrapers/kubernetes.md#kubernetes)              | `false`  |
| `kubernetesFile` | Specifies the list of Kubernetes configurations from a file to scrape.                           | [`[]KubernetesFile`](../scrapers/kubernetes-file.md#kubernetesfile) | `false`  |
| `azure`          | Specifies the list of Azure configurations to scrape.                                            | [`[]Azure`](../scrapers/azure#azure)                                | `false`  |
| `azureDevops`    | Specifies the list of Azure DevOps configurations to scrape.                                     | [`[]AzureDevops`](../scrapers/azure-devops.md#azuredevops)          | `false`  |
| `sql`            | Specifies the list of SQL configurations to scrape.                                              | [`[]SQL`](../scrapers/sql.md#sql)                                   | `false`  |

```yaml
# Example configuration file

schedule: @every 5m
file:
  - type: $.make
    id: $.reg_no
    paths:
      - fixtures/data/car_changes.json
```
