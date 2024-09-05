Canary checker can replace the following exporters:

| Exporter                                                                                                                                                                              | Canary Checker Equivalent | Description |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | ----------- |
| [blackbox-exporter](https://github.com/prometheus/blackbox_exporter)                                                                                                                  | http, tcp, dns, imcp      |             |
| [elasticsearch-exporter](https://github.com/prometheus-community/elasticsearch_exporter/) / [opensearch_exporter](https://github.com/aiven/prometheus-exporter-plugin-for-opensearch) |                           |             |
| [sql_exporter](https://github.com/burningalchemist/sql_exporter)                                                                                                                      |                           |             |
| [github-exporter](https://github.com/githubexporter/github-exporter)                                                                                                                  |                           |             |
| [json_exporter](https://github.com/prometheus-community/json_exporter)                                                                                                                |                           |             |
| [ssl_exporter](https://github.com/ribbybibby/ssl_exporter)                                                                                                                            |                           |             |
| [ping_exporter](https://github.com/czerwonk/ping_exporter)                                                                                                                            |                           |             |
| [script_exporter](https://github.com/ricoberger/script_exporter) / [bash_exporter](https://github.com/gree-gorey/bash-exporter)                                                       |                           |             |
| [azure-devops-exporter](https://github.com/webdevops/azure-devops-exporter)                                                                                                           |                           |             |
| [s3-exporter](https://github.com/ribbybibby/s3_exporter)                                                                                                                              |                           |             |
| [github_actions_exporter](https://github.com/cpanato/github_actions_exporter)                                                                                                         |                           |             |
| [filestat_exporter](https://github.com/michael-doubez/filestat_exporter)                                                                                                              |                           |             |

<!-- vale off -->
### Prometheus Alert Manager

### Blackbox Exporter

### Kuberhealthy

https://github.com/kuberhealthy/kuberhealthy

**Kuberhealthy is a [Kubernetes](https://kubernetes.io/) [operator](https://kubernetes.io/docs/concepts/extend-kubernetes/operator/) for [synthetic monitoring](https://en.wikipedia.org/wiki/Synthetic_monitoring) and [continuous process verification](https://en.wikipedia.org/wiki/Continued_process_verification).** [Write your own tests](https://github.com/kuberhealthy/kuberhealthy/blob/master/docs/CHECK_CREATION) in any language and Kuberhealthy will run them for you. Automatically creates metrics for [Prometheus](https://prometheus.io/). Includes simple JSON What is Kuberhealthy?

Kuberhealthy lets you continuously verify that your applications and Kubernetes clusters are working as expected. By creating a custom resource (a `KuberhealthyCheck`) in your cluster, you can easily enable [various synthetic tests](https://github.com/kuberhealthy/kuberhealthy/blob/master/docs/CHECKS_REGISTRY) and get Prometheus metrics for them.

Kuberhealthy comes with [lots of useful checks already available](https://github.com/kuberhealthy/kuberhealthy/blob/master/docs/CHECKS_REGISTRY) to ensure the core functionality of Kubernetes, but checks can be used to test anything you like. We encourage you to [write your own check container](https://github.com/kuberhealthy/kuberhealthy/blob/master/docs/CHECK_CREATION) in any language to test your own applications. It really is quick and easy!

Kuberhealthy serves the status of all checks on a simple JSON status page, a [Prometheus](https://prometheus.io/) metrics endpoint (at `/metrics`), and supports InfluxDB metric forwarding for integration into your choice of alerting solution.

### Cloudprober

https://cloudprober.org/

### Karma Alert Dashboard


<!-- vale on -->
