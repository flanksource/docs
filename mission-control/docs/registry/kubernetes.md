# Kubernetes

## Setup

The Kubernetes helm chart installs a [catalog scraper](/config-db/scrapers/kubernetes) and a [topology](/topology/examples/kubernetes) for a kubernetes

```sh
helm repo add flanksource https://flanksource.github.io/charts
helm repo update
helm install {release-name} flanksource/mission-control-registry-kubernetes
```

## Values

This document provides an overview of configurable values for deploying the Kubernetes Scraper component using Helm.

### Configuration

The following table lists the configurable parameters and their default values:

| Parameter | Description | Default |
| --- | --- | --- |
| `nameOverride` | Overrides the name of the chart. | "" |
| `fullnameOverride` | Overrides the full name of the chart. | "" |
| `labels` | Additional labels to apply to resources. | {} |

### Topology

| Parameter | Description | Default |
| --- | --- | --- |
| `topology.name` | Topology name. | "cluster" |
| `topology.schedule` | Topology schedule. | "@every 5m" |

### Scraper

| Parameter | Description | Default |
| --- | --- | --- |
| `scraper.name` | Scraper name. | "kubernetes" |
| `scraper.clusterName` | Cluster name for scraping. | "kubernetes" |
| `scraper.defaultScrapeExclusions` | Default scrape exclusions. | ["APIService", "PodMetrics", "NodeMetrics", "endpoints.discovery.k8s.io", "endpointslices.discovery.k8s.io", "leases.coordination.k8s.io", "podmetrics.metrics.k8s.io", "nodemetrics.metrics.k8s.io", "controllerrevision", "certificaterequest", "orders.acme.cert-manager.io"] |
| `scraper.scrapeExclusions` | Additional scrape exclusions. | ["Secret", "customresourcedefinition"] |
| `scraper.eventExclusions` | Event exclusions. | ["SuccessfulCreate", "Created", "DNSConfigForming"] |
| `scraper.transform.changes.exclude` | Transformation changes exclusions. | ["details.source.component == \"canary-checker\" && details.reason == \"Failed\"", "details.source.component == \"canary-checker\" && details.reason == \"Succeeded\""] |
| `scraper.severityKeywords.error` | Keywords indicating error severity. | ["failed", "error"] |
| `scraper.severityKeywords.warn` | Keywords indicating warning severity. | ["backoff", "nodeoutofmemory"] |
| `scraper.retention.changes` | Retention changes. | [{"name": "ReconciliationSucceeded", "count": 10}] |
| `scraper.relationships` | Kubernetes relationships to create via name, namespace and kind. [Reference Docs](/config-db/scrapers/kubernetes#kubernetesrelationships) | [{"name": {"label": "helm.toolkit.fluxcd.io/name"}, {"name": {"label": "helm.toolkit.fluxcd.io/namespace"}, {"kind": {"value": "HelmRelease"}] |

Feel free to customize this template according to your specific needs.
