Mission Control is able to scan multiple configuration sources including

- [AWS Cloud Resources](./aws.md)
- [Azure Devops](./azure-devops.md) - Azure Devops Pipeline runs
- [Files](./file.md) - On a local filesystem, git or HTTP
- [Files - Kubernetes](./kubernetes-file.md) - Files inside a running Kubernetes pod
- [SQL](./sql.md) - Data available via queries on MySQL, SQL Server, and Postgres databases

Each configuration has:

- Configuration - Normally JSON, but XML and properties files are also available
- Insights - Security, cost, performance, and other recommendations from scanners including AWS Trusted Advisor, AWS Config rules, etc...
- Changes - Either change directly on the config _(recorded as diff change type)_ or changes identified via AWS Cloudtrail, etc...

## Configuration file

| Field            | Description                                                                                      | Scheme                                                    | Required |
| ---------------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------- | -------- |
| `logLevel`       | Specify the level of logging.                                                                    | `string`                                                  | `false`  |
| `schedule`       | Specify the interval to scrape configuration files in cron format. Defaults to every 60 minutes. | `string`                                                  | `false`  |
| `full`           | Set to `true` to extract changes from scraped configurations. Defaults to `false`.               | `bool`                                                    | `false`  |
| `aws`            | Specifies the list of AWS configurations to scrape.                                              | [`[]AWS`](./aws.md#aws)                                   | `false`  |
| `file`           | Specifies the list of local file paths to scrape.                                                | [`[]File`](./file.md#file)                                | `false`  |
| `kubernetes`     | Specifies the list of Kubernetes configurations to scrape.                                       | [`[]Kubernetes`](./kubernetes.md#kubernetes)              | `false`  |
| `kubernetesFile` | Specifies the list of Kubernetes configurations from a file to scrape.                           | [`[]KubernetesFile`](./kubernetes-file.md#kubernetesfile) | `false`  |
| `azureDevops`    | Specifies the list of Azure DevOps configurations to scrape.                                     | [`[]AzureDevops`](./azure-devops.md#azuredevops)          | `false`  |
| `sql`            | Specifies the list of SQL configurations to scrape.                                              | [`[]SQL`](./sql.md#sql)                                   | `false`  |

### `full` flag

When `full` is set to `true`, `config-db` will extract changes and the config itself from the scraped configuration.

Example: consider that we have a configuration for `config-db`

```yaml
full: true
file:
  - type: Car
    id: $.reg_no
    paths:
      - fixtures/data/car_changes.json
```

The config points to this file

```json
{
  "reg_no": "A123",
  "config": {
    "meta": "this is the actual config that'll be stored."
  },
  "changes": [
    {
      "action": "drive",
      "summary": "car color changed to blue",
      "unrelated_stuff": 123
    }
  ]
}
```

Since `full=true`, `config-db` will extract the `config` and `changes` from the scraped JSON config. So, the actual config will simply be

```json
{
  "meta": "this is the actual config that'll be stored."
}
```

and the following new config change would be registered for that particular config item

```json
{
  "action": "drive",
  "summary": "car color changed to blue",
  "unrelated_stuff": 123
}
```
