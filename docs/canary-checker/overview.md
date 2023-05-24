---
hide:
  - toc
---
# Health Checks

Health Checks in Mission Control are built on top of the  **flank**source open-source [canary-checker](https://github.com/flanksource/canary-checker) tool.


Canary checker can collect health about systems in few different ways:

* **Active** **Application** health checks involve sending periodic requests to the service or application and checking the response to ensure that it is working correctly,  Active health checks are proactive and can detect issues quickly, but they can also introduce some load on the system being monitored.
* **Active Infrastructure** health checks are similar to application health checks, but instead of sending a requst to the application it sends a request to the infrastructure to deploy a new appplication or infrastructure component e.g. a new Kubernetes pod or EC2 instance.
* **Passive** health checks rely on monitoring the activity in the system, analyzing it, and detecting anomalies or errors. Passive health checks are less intrusive than active health checks, but they may not detect issues as quickly.

Health checks can be defined in 3 different ways:

1. **UI**: Navigate to Settings --> Health --> Click on the :material-plus-circle: button
1. **[GitOps](./concepts/gitops.md)**:  canary-checker is fully Gitops enabled using Kubernetes Custom Resource Definitions (CRD)
1. **[CLI](./tutorials/run.md)**: For rapid development and feedback, canary-checker can be run as a normal CLI application by specifying the health check definition in a config file.


Canary checker runs health checks on a pre-defined CRON schedule and provides a fully customizable platform that:

1. Accesses [authentication](./concepts/authentication.md) credentials from kubernetes secrets and configmaps.
1. Parses and  [transforms](./concepts/transforms.md) the response using JSONPath, Go templates or Javascript to validate, extrapolate or aggregate results.

## Check Types


| Protocol                            | Status             | Checks |
| ----------------------------------- | ------------------ | ---- |
| HTTP(s)                             | GA                 | Response body, headers and duration |
| DNS                                 | GA                 | Response and duration |
| Ping/ICMP                           | GA | Duration and packet loss |
| **Data Sources**                    |                    |      |
| SQL (MySQL, PostgreSQL, SQL Server) | GA | Ability to login, results, duration, health exposed via stored procedures |
| LDAP                                | GA | Ability to login, response time |
| Elasticsearch                       | GA | Ability to login, response time, size of search results |
| Mongo                               | GA | Ability to login, results, duration, |
| Redis                               | GA | Ability to login, results, duration, |
| Prometheus | GA | Ability to login, results, duration, |
| **Alerts**                 |                    | Prometheus |
| Prometheus Alert Manager | GA | Pending and firing alerts |
| AWS Cloudwatch Alarms | GA | Pending and firing alerts |
| **File Systems** |                    |      |
| Git                                 | GA |  |
| Disk / S3 / SMB / CIFS / SFTP / | GA | Too many/few files matching critera, files that too large or too big |
| **Config**                          |                    |      |
| AWS Config                          | GA | AWS Config Rules that are firing, Custom AWS Config queries |
| Mission Control Config              | GA | Custom config queries |
| Kubernetes Resources                | GA | Kubernetes resources that are missing or are in a non-ready state |
| **Backups**                         |                    |      |
| GCP Databases                | GA | Backup freshness |
| Restic                              | GA | Backup freshness and integrrity |
| **Infrastructure** |  | |
| EC2 | GA | Ability to launch new EC2 instances |
| Kubernetes | GA | Ability to schedule and then route traffic via an ingress to a pod |
| Docker | GA | Ability to push and pull containers via docker/containerd |
| Helm | GA | Ability to push and pull helm charts |

