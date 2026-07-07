---
title: Blackbox Exporter
sidebar_custom_props:
  icon: prometheus
---

# Canary Checker vs Prometheus Blackbox Exporter

[Prometheus Blackbox Exporter](https://github.com/prometheus/blackbox_exporter) is a Prometheus exporter for probing HTTP, HTTPS, DNS, TCP, ICMP, and gRPC.

|                     | Blackbox Exporter                                                                              | Canary Checker                                                                                                      |
| ------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Prometheus Exporter | Yes                                                                                            | Yes                                                                                                                 |
| Internal DB         | No                                                                                             | Runs with an embedded Postgres database, making it possible to monitor Prometheus itself                            |
| Check types         | HTTP, ICMP, DNS, TCP, gRPC                                                                     | 30+                                                                                                                 |
| Custom Metrics      | No                                                                                             | Create custom metrics from HTTP, SQL, Elasticsearch, and other query results                                        |
| Exports             | Metrics and labels only                                                                        | Metrics, labels and error messages                                                                                  |
| Run in CI/CD        | No                                                                                             | Run as a CLI for rapid feedback loops and export JUnit results in CI pipelines                                      |
| Cron                | No                                                                                             | Stop running checks when environments are shut down, or after hours                                                 |
| Scripting           | No                                                                                             | Evaluate the health of a response using CEL, JavaScript, and Go templates                                           |
| **Kubernetes**      |                                                                                                |                                                                                                                     |
| CRDs                | Via [Probe](https://prometheus-operator.dev/docs/operator/api/#monitoring.coreos.com/v1.Probe) | Yes                                                                                                                 |
| Conditions          | No                                                                                             | Status conditions enable canaries to be used as health checks in Helm, Flux, and Argo                               |
| Events              | No                                                                                             | Kubernetes events are fired on failure                                                                              |
| Secrets             | Via [Probe](https://prometheus-operator.dev/docs/operator/api/#monitoring.coreos.com/v1.Probe) |                                                                                                                     |
| **Check Types**     |                                                                                                |                                                                                                                     |
| Synthetic           | No                                                                                             | Built-in check types for tests that export JUnit test results, such as k6, Playwright, Robot Framework, and Postman |
| Infrastructure      | No                                                                                             | Verify Kubernetes resources, object storage, databases, and cloud APIs                                              |
| Backup              | No                                                                                             | Check backups via Restic, S3, SMB, SFTP, GCS                                                                        |
| Compliance          | No                                                                                             | AWS Config Rules, Flanksource Config DB                                                                             |
| Alert Aggregation   | No                                                                                             | Alertmanager, AWS CloudWatch, and Dynatrace                                                                         |
