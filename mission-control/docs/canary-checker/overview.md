---
# slug: /
# title: Overview
hide_title: true
# hide_table_of_contents: true
# pagination_next: null
# pagination_prev: null
---

![Canary Checker](./images/canary-checker.svg#gh-light-mode-only)
![Canary Checker](./images/canary-checker-white.svg#gh-dark-mode-only)

Canary checker is a kubernetes-native platform for monitoring health across application and infrastructure using both passive and active (synthetic) mechanisms.

## Features

* **Batteries Included** - 35+ built-in check types
* **Kubernetes Native** - Health checks (or canaries) are CRD's that reflect health via the `status` field, making them compatible with GitOps, [Flux Health Checks](https://fluxcd.io/flux/components/kustomize/kustomization/#health-checks), Argo, Helm, etc..
* **Secret Management** - Leverage K8S secrets and configmaps for authentication and connection details
* **Prometheus** - Prometheus compatible metrics are exposed at `/metrics`.  A Grafana Dashboard is also available.
* **Dependency Free** - Runs an embedded postgres instance by default,  can also be configured to use an external database.
* **JUnit Export (CI/CD)**  - Export health check results to JUnit format for integration into CI/CD pipelines
* **JUnit Import (k6/newman/puppeter/etc)** - Use any container that creates JUnit test results
* **Scriptable** - Go templates, Javascript and [Expr](https://github.com/antonmedv/expr) can be used to:
  * Evaluate whether a check is passing and severity to use when failing
  * Extract a user friendly error message
  * Transform and filter check responses into individual check results
* **Multi-Modal** - While designed as a Kubernetes Operator, canary checker can also run as a CLI and a server without K8s

Canary Checker can collect health about systems in few different ways:

* **Active** **Application** health checks involve sending periodic requests to the service or application and checking the response to ensure that it is working correctly,  Active health checks are proactive and can detect issues quickly, but they can also introduce some load on the system being monitored.
* **Active Infrastructure** health checks are similar to application health checks, but instead of sending a request to the application it sends a request to the infrastructure to deploy a new application or infrastructure component e.g. a new Kubernetes pod or EC2 instance.
* **Passive** health checks rely on monitoring the activity in the system, analysing it, and detecting anomalies or errors. Passive health checks are less intrusive than active health checks, but they may not detect issues as quickly.

Health checks can be defined in 3 different ways:

1. **UI**: Navigate to Settings --> Health --> Click on the :material-plus-circle: button
1. **[GitOps](./concepts/gitops.md)** canary-checker is fully Gitops enabled using Kubernetes Custom Resource Definitions (CRD)
1. **[CLI](./tutorials/run.md)** For rapid development and feedback, canary-checker can be run as a normal CLI application by specifying the health check definition in a config file.

## License

Canary Checker core (the code in this repository) is licensed under [Apache 2.0](https://raw.githubusercontent.com/flanksource/canary-checker/main/LICENSE) and accepts contributions via GitHub pull requests after signing a CLA.

The UI (Dashboard) is free to use with canary checker under a license exception of [Flanksource UI](https://github.com/flanksource/flanksource-ui/blob/main/LICENSE#L7)

## Check Types

| Protocol                            | Status             | Checks |
| ----------------------------------- | ------------------ | ---- |
| [HTTP(s)](reference/http)                             | GA                 | Response body, headers and duration |
| [DNS](reference/dns)                                 | GA                 | Response and duration |
| [Ping/ICMP](reference/icmp)                            | GA | Duration and packet loss |
| [TCP](reference/tcp) | GA | Port is open and connectable |
| **Data Sources**                    |                    |      |
| SQL ([MySQL](reference/mysql), [Postgres](reference/postgres), [SQL Server](reference/mssql)) | GA | Ability to login, results, duration, health exposed via stored procedures |
| [LDAP](reference/ldap)                                | GA | Ability to login, response time |
| [ElasticSearch / Opensearch](reference/elasticsearch)           | GA | Ability to login, response time, size of search results |
| [Mongo](reference/mongo)                               | Beta | Ability to login, results, duration, |
| [Redis](reference/redis)                               | GA | Ability to login, results, duration, |
| [Prometheus](reference/prometheus) | GA | Ability to login, results, duration, |
| **Alerts**                 |                    | Prometheus |
| [Prometheus Alert Manager](reference/alert-manager) | GA | Pending and firing alerts |
| [AWS Cloudwatch Alarms](reference/cloudwatch) | GA | Pending and firing alarms |
| [Dynatrace Problems](reference/dynatrace) | Beta | Problems deteced |
| **DevOps** |  |  |
| [Git](reference/git) | GA | Query Git and Github repositories via SQL |
| [Azure Devops](reference/azure-devops) |  |  |
| **Integration Testing** |  |  |
| [JMeter](reference/jmeter) | Beta | Runs and checks the result of a JMeter test |
| [JUnit](reference/junit) | Beta | Run a container/pod that saves Junit test results |
| [K6](reference/k6) | Beta | Runs K6 tests that export JUnit via a container |
| [Newman](reference/newman) | Beta |  Runs Newman / Postman tests that export JUnit via a container  |
| [Playwright](reference/Playwright) | Beta |  Runs Playwright tests that export JUnit via a container  |
| **File Systems / Batch** |                    |      |
| [Local Disk / NFS](reference/folder)                      | GA         | Check folders for files that are:  too few/many, too old/new, too small/large |
| [S3](reference/s3-bucket) | GA | Check contents of AWS S3 Buckets |
| [GCS](reference/gcs-bucket) | GA | Check contents of Google Cloud Storage Buckets |
| [SFTP](reference/sftp) | GA | Check contents of folders over SFTP |
| [SMB / CIFS](reference/smb) | GA | Check contents of folders over SMB/CIFS |
| **Config**                          |                    |      |
| [AWS Config](reference/aws-config)                          | GA | Query AWS config using SQL |
| [AWS Config Rule](reference/aws-config-rule)                          | GA | AWS Config Rules that are firing, Custom AWS Config queries |
| [Config DB](reference/configdb)             | GA | Custom config queries for Mission Control Config D |
| [Kubernetes Resources](reference/kubernetes)                | GA | Kubernetes resources that are missing or are in a non-ready state |
| **Backups**                         |                    |      |
| [GCP Databases](reference/gcs-database-backup)  | GA | Backup freshness |
| [Restic](reference/restic)                              | Beta | Backup freshness and integrity |
| **Infrastructure** |  | |
| [EC2](reference/ec2) | GA | Ability to launch new EC2 instances |
| [Kubernetes Ingress](reference/pod) | GA | Ability to schedule and then route traffic via an ingress to a pod |
| [Docker/Containerd](reference/containerd) | Deprecated | Ability to push and pull containers via docker/containerd |
| [Helm](reference/helm) | Deprecated | Ability to push and pull helm charts |
| [S3 Protocol](reference/s3-protocol) | GA | Ability to read/write/list objects on an S3 compatible object store |
