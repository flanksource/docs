---
title: Catalog
---
import { IoIosHeart } from "react-icons/io";

# <Icon name="flux"/> FluxCD

Mission Control provides built-in support for relating Flux resources to each other, determining their health status, and building a dependency graph. This allows you to:

- Visualize relationships between Flux resources like `Kustomizations`, `HelmReleases`, `GitRepositories` etc.
- Track the health and status of related Flux resources
- Understand dependencies between resources to troubleshoot issues
- Build a graph showing how Flux resources connect and depend on each other
- Monitor the overall health of your Flux-based GitOps workflows


![](/img/helmrelease-graph.png)


## Next Steps

1. Use self-service [playbooks](./playbooks) to enable a ClickOps experience, while still leveraging the power of GitOps.
2. Manage and monitor Flux with a [topology](./topology) view, providing the missing GUI for Flux.
3. [Continuously test your control plane](/canary-checker/tutorials/control-plane-testing) with `kubernetesResource` canaries
