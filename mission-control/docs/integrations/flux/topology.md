---
title: Topology
---

The flux topology

![](/img/flux-topology.svg)

## Getting Started

:::info Prerequisites
To enable the Flux Topology you need

- Mission Control [installed](/installation/)
- [kubectl](/installation/saas/kubectl) access to the Mission Control instance
- Scrape configuration for a [kubernetes](../kubernetes/config) cluster
  :::

1. Install the [mission-control-flux](https://artifacthub.io/packages/helm/flanksource/mission-control-flux) chart

   <Helm chart="mission-control-flux"
   createNamespace={false}
   createRepo={false} />

   :::note Single
   This chart only needs to be installed once,
   :::
