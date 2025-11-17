---
title: Getting Started
sidebar_position: 0
sidebar_custom_props:
  icon: getting-started
---

import { IoIosHeart } from "react-icons/io";

# <Icon name="flux"/> FluxCD

Mission Control provides built-in support for relating Flux resources to each other, determining their health status, and building a dependency graph. This allows you to:

- Visualize relationships between Flux resources like `Kustomizations`, `HelmReleases`, `GitRepositories` etc.
- Track the health and status of related Flux resources
- Understand dependencies between resources to troubleshoot issues
- Build a graph showing how Flux resources connect and depend on each other
- Monitor the overall health of your Flux-based GitOps workflows

<Screenshot img="/img/helmrelease-graph.png" alt="Flux Relationship Graph" shadow="false"/>

## Next Steps

<Cards className="border border-t border-solid border-gray-200">

  <Card size="sm" title="GitOps Actions" icon="git" link="/docs/guide/playbooks/actions/gitops">

          <Tag label="action"/>

  </Card>


    <Card size="sm" title="GitOps Playbooks" icon="playbook" link="./playbooks">
    Enable ClickOps workflows backed by git.
          <Tag label="playbooks"/>

  </Card>

<Card size="sm" title="Control Plane Testing With Canary Checker and Flux" icon="flux" link="/blog/infrastructure-testing-with-canary-checker-and-flux" >
     <Tag label="blog"/>
</Card>

</Cards>
