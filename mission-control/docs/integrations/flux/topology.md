---
title: Topology
sidebar_custom_props:
  icon: topology
---

The Flux topology provides a comprehensive view of your Flux-based GitOps infrastructure by monitoring and visualizing several key components:

1. **Controllers**: Monitors Flux system pods in the `flux-system` namespace.

2. **Releases**: Tracks HelmReleases with detailed information including:
   - Release status and health
   - Version information
   - Configuration details
   - Related pod connections

3. **Kustomizations**: Visualizes Kustomization resources showing:
   - Deployment status
   - Health metrics
   - Configuration state
   - Associated pod relationships

4. **Repositories**: Monitors Helm, OCI and Git repositories:
   - Helm repositories status and health
   - Git repository connections
   - Sync states
   - Error conditions

Benefits:

- Real-time visibility into GitOps workflows
- Visual relationship mappings between components
- Silence notifications at the `Kustomization` or `HelmRelease` level
- Efficient troubleshooting of deployment issues- Comprehensive property tracking for all components

<Screenshot img="/img/flux-topology.svg" size="800px" shadow="false" alt="Flux Topology Graph"/>

## Getting Started

:::info Prerequisites
To enable the Flux Topology you need

- Mission Control [installed](/installation/)
- [kubectl](/installation/saas/kubectl) access to the Mission Control instance
  :::

1. Install the [mission-control-flux](https://artifacthub.io/packages/helm/flanksource/mission-control-flux) chart

   <Helm chart="mission-control-flux"
   createNamespace={false}
   createRepo={false} />

   :::note Single
   This chart only needs to be installed once, and groups all flux resources by cluster.
   :::
