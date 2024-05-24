# Canary-Checker vs Prometheus blackbox exporter

[Prometheus Blackbox Exporter](https://github.com/prometheus/blackbox_exporter) is a prometheus exporter for probing HTTP, HTTPS, DNS, TCP, ICMP and gRPC.

|                     | Blackbox Exporter                                            | Canary Checker                                               |
| ------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| Prometheus Exporter | Yes                                                          | Yes                                                          |
| Internal DB         | No                                                           | Runs with an embedded postgres database, making it possible to monitor prometheus itself |
| Check types         | HTTP, ICMP, DNS, TCP, gRPC                                   | 30+                                                          |
| Custom Metrics      | No                                                           | Create custom metrics from HTTP / SQL / Elasticsearch / etc queries |
| Exports             | Metrics and labels only                                      | Metrics, labels and  error messages                          |
| Run in CI/CD        | No                                                           | Run as a CLI for rapid feedback loops and export JUnit results in CI pipelines |
| Cron                | No                                                           | Stop running checks when environments are shut down, or after hours |
| Scripting           | No                                                           | Evaluate the health of a response using CEL, Javascript, Go Templates |
| **Kubernetes**      |                                                              |                                                              |
| CRDs                | Via [Probe](https://prometheus-operator.dev/docs/operator/api/#monitoring.coreos.com/v1.Probe) | Yes                                                          |
| Conditions          | No                                                           | Status conditions enable canaries to be used as health checks in Helm, Flux, and Argo |
| Events              | No                                                           | Kubernetes events are fired on failure                       |
| Secrets             | Via [Probe](https://prometheus-operator.dev/docs/operator/api/#monitoring.coreos.com/v1.Probe) |                                                              |
| **Check Types**     |                                                              |                                                              |
| Synthetic           | No                                                           | Builtin check types for any test exporting JUnit test results e.g.  (k6, playwright, robot, postman, etc) |
| Infrastructure       | No                                                           | Verify the ability to launch new pods, create new EC2 instances or push and pull from docker / helm / git repositories |
| Backup              | No                                                           | Check backups via Restic, S3, SMB, SFTP, GCS                 |
| Compliance          | No                                                           | AWS Config Rules, Flanksource Config DB                      |
| Alert Aggregation   | No                                                           | Alert Manager, AWS Cloudwatch, Dynatrace                     |
