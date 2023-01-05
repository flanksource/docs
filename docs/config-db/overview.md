## Configuration

Mission Control is able to scan multiple configuration sources including

- [AWS Cloud Resources](./aws)
- [Azure Devops](./azure-devops.md) - Azure Devops Pipeline runs
- [Files](./file)  -On a local filesystem, git or HTTP)
- [Files - Kubernetes](/kubernetes-file) - Files inside a running kubernetes pod
- [SQL](./sql.md) - Data available via query on MySQL, SQL Server and Postgres databases

Each configuration has:

- Configuration - Normally JSON, but XML and properties files are also available
- Insights - Security, cost, performance and other recommendations from scanners including AWS Trusted Adviosr, AWS Config rules, etc..
- Changes - Either changes directly on the config (recorded as diff change type) or changes identified via AWS Cloudtrail, etc...
