---
draft: true
---

### Kuberhealthy

https://github.com/kuberhealthy/kuberhealthy

**Kuberhealthy is a [Kubernetes](https://kubernetes.io/) [operator](https://kubernetes.io/docs/concepts/extend-kubernetes/operator/) for [synthetic monitoring](https://en.wikipedia.org/wiki/Synthetic_monitoring) and [continuous process verification](https://en.wikipedia.org/wiki/Continued_process_verification).** [Write your own tests](https://github.com/kuberhealthy/kuberhealthy/blob/master/docs/CHECK_CREATION) in any language and Kuberhealthy runs them for you. Automatically creates metrics for [Prometheus](https://prometheus.io/). Includes a JSON status page. What is Kuberhealthy?

Kuberhealthy lets you continuously verify that your applications and Kubernetes clusters are working as expected. By creating a custom resource (a `KuberhealthyCheck`) in your cluster, you can enable [various synthetic tests](https://github.com/kuberhealthy/kuberhealthy/blob/master/docs/CHECKS_REGISTRY) and get Prometheus metrics for them.

Kuberhealthy comes with [lots of useful checks already available](https://github.com/kuberhealthy/kuberhealthy/blob/master/docs/CHECKS_REGISTRY) to ensure the core functionality of Kubernetes, but checks can be used to test anything you like. We encourage you to [write your own check container](https://github.com/kuberhealthy/kuberhealthy/blob/master/docs/CHECK_CREATION) in any language to test your own applications.

Kuberhealthy serves the status of all checks on a JSON status page, a [Prometheus](https://prometheus.io/) metrics endpoint (at `/metrics`), and supports InfluxDB metric forwarding for integration into your choice of alerting solution.
