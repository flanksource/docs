---
title: ArgoCD
---

## Setup

The ArgoCD helm chart installs a [topology](/guide/topology) for ArgoCD

```sh
helm repo add flanksource https://flanksource.github.io/charts
helm repo update
helm install mission-control-argocd flanksource/mission-control-argocd
```

After running `helm install` you should get a success message:

```sh
NAME: mission-control-argocd
LAST DEPLOYED: Thu Feb 14 19:00:32 2024
NAMESPACE: default
STATUS: deployed
REVISION: 1
TEST SUITE: None
NOTES:
ArgoCD topology added
```

When you go to the dashboard now, you can now see a ArgoCD topology:

![ArgoCD dashboard](/img/argocd-registry-dashboard.png)

## Values

This document provides an overview of configurable values for deploying ArgoCD topology component using Helm.

### Configuration

The following table lists the configurable parameters and their default values:

| Parameter          | Description                              | Default  |
| ------------------ | ---------------------------------------- | -------- |
| `nameOverride`     | Overrides the name of the chart.         | ""       |
| `fullnameOverride` | Overrides the full name of the chart.    | ""       |
| `labels`           | Additional labels to apply to resources. | {}       |
| `argocd.namespace` | Namespace for argocd pods                | "argocd" |
