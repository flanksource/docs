---
title: FluxCD
---

## Setup

The FluxCD helm chart installs a [topology](/topology) for FluxCD

```bash
helm repo add flanksource https://flanksource.github.io/charts
helm repo update
helm install mission-control-flux flanksource/mission-control-flux
```

After running `helm install` you should get a success message:

```sh
NAME: mission-control-flux
LAST DEPLOYED: Thu Feb 14 19:00:32 2024
NAMESPACE: default
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
FluxCD topology added
```

When you go to the dashboard now, you can now see a FluxCD topology:

![FluxCD dashboard](/img/fluxcd-registry-dashboard.png)

## Values

This document provides an overview of configurable values for deploying FluxCD topology component using Helm.

### Configuration

The following table lists the configurable parameters and their default values:

| Parameter | Description | Default |
| --- | --- | --- |
| `nameOverride` | Overrides the name of the chart. | "" |
| `fullnameOverride` | Overrides the full name of the chart. | "" |
| `labels` | Additional labels to apply to resources. | {} |
| `topologyName` | Namespace for fluxcd topology | "flux" |
