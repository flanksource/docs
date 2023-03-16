`config-db` is a straightforward JSON-based configuration management database. It enables you to scrape configuration from several sources on an ongoing basis and navigate that configuration in an easy-to-navigate and search JSON tree.

By doing this, `config-db` enables you to view and search the change history of your configuration across multiple dimensions (node, zone, environment, application, technology, etc). As well as compare and view the differences between configurations across environments.

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
