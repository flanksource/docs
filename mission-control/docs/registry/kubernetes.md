# Kubernetes

## Setup

The Kubernetes helm chart installs a [catalog scraper](/config-db/scrapers/kubernetes) and a [topology](/topology/examples/kubernetes) for a kubernetes

```sh
helm repo add flanksource https://flanksource.github.io/charts
helm repo update
helm install mission-control-kubernetes flanksource/mission-control-kubernetes
```

After running `helm install` you should get a success message:

```sh
NAME: mission-control-kubernetes
LAST DEPLOYED: Thu Feb 14 19:00:32 2024
NAMESPACE: default
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
Kubernetes topology and scraper added
```

When you go to the dashboard now, you can now see a cluster topology:

![Cluster on dashboard](/img/kubernetes-registry-dashboard.png)

On clicking the topology, you can access nodes, namespaces and pods

![Nodes Topology](/img/kubernetes-registry-node-component.png)
![Namespace Topology](/img/kubernetes-registry-namespace-component.png)

And we also have added a catalog scraper which populated our catalog

![Kuberenetes Catalog](/img/kubernetes-registry-catalog-scraper.png)

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
| `scraper.defaultScrapeExclusions` | Default scrape exclusions. | `["APIService", "PodMetrics", "NodeMetrics", "endpoints.discovery.k8s.io", "endpointslices.discovery.k8s.io", "leases.coordination.k8s.io", "podmetrics.metrics.k8s.io", "nodemetrics.metrics.k8s.io", "controllerrevision", "certificaterequest", "orders.acme.cert-manager.io"]` |
| `scraper.scrapeExclusions` | Additional scrape exclusions. | `["Secret", "customresourcedefinition"]` |
| `scraper.eventExclusions` | Event exclusions. | `["SuccessfulCreate", "Created", "DNSConfigForming"]` |
| `scraper.transform.changes.exclude` | Transformation changes exclusions. | `["details.source.component == \"canary-checker\" && details.reason == \"Failed\"", "details.source.component == \"canary-checker\" && details.reason == \"Succeeded\""]` |
| `scraper.severityKeywords.error` | Keywords indicating error severity. | `["failed", "error"]` |
| `scraper.severityKeywords.warn` | Keywords indicating warning severity. | `["backoff", "nodeoutofmemory"]` |
| `scraper.retention.changes` | Retention changes. | `[{"name": "ReconciliationSucceeded", "count": 10}]` |
| `scraper.relationships` | Kubernetes Relationships to create via name, namespace and kind. [Kubernetes Relationships](/config-db/scrapers/kubernetes#kubernetesrelationships) | Helm and Argo |


### Playbooks

#### Edit flux resources

This feature allows you to edit any kustomize resource managed via flux in the UI and then create a Pull Request back to source with your changes.

To use this, the Kustomization file must have [originAnnotations](https://kubectl.docs.kubernetes.io/references/kustomize/kustomization/buildmetadata/#origin-annotation).

| Parameter | Description | Schema | Default |
| --- | --- | --- | --- |
| `playbooks.edit_kubernetes_manifests.enabled` | Enable this to have a playbook to edit and commit flux resources back to git | bool | `false`
| `playbooks.edit_kubernetes_manifests.git_connection` | Connection string to be used with git credentials | `string` (<CommonLink to="connection">_Connections_</CommonLink>) | `""`

After enabling the playbook, you can see a `Edit Kustomize Resource` option in playbooks for any catalog item that is linked to flux

![Playbook option in catalog](/img/kubernetes-registry-playbook-edit-catalog-option.png)

We can then edit this resource in UI, write our own commit message and it will automatically open a Pull Request to the corresponding repo

![Playbook edit dialog](/img/kubernetes-registry-playbook-edit-catalog-dialog.png)

:::tip
Make sure the token in the Connection provided has access to create pull requests in the repositories that might have the manifests. We support GitHub, GitLab and Gitea
:::
