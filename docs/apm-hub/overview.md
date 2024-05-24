# Logging



![](/img/logging.svg)



Logging in Mission Control is provided by the apm-hub tool. APM Hub is a log aggregator - it does not provide any log storage or query capabilities and relies entirely on external log sources.



## Why aggregate logs?

Aggregating logs has multiple benefits:

* **Faster time to value** without the need to setup complex logging pipelines
* **Reduced storage costs** by using fit-for-purpose data stores and migrating/switching between them without developers being impacted.
* **Reduced time to access** logs, There is no need to log onto multiple data sources and remember the queries to find specific logs, simply select the component you are interested in.
* **Improved security** by restricting log access to specific components and only during incidents



## Log Sources

For example an application deployed on AWS EKS could have these different log stores:

* Application logs stored in Elasticsearch
* Raw container logs (For when the logging pipeline is down or dropping messages)
* Log files inside a pod that are not printed to stderr/out (e.g. access logs or troubleshooting logs)
* Cloudwatch logs:
  * Kubernetes Control Plane
  * VPC Flow Logs
  * fluentd startup failures
* Deployment logs from Github Actions / Azure Devops Pipelines etc
* Audit logs stored in S3
* Application batch logs stored in database table

