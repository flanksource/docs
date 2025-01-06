---
slug: /guide/topology
title: Topology
sidebar_position: 4
# hide_table_of_contents: true

pagination_next: guide/canary-checker/health-checks
pagination_prev: guide/playbooks/index
sidebar_custom_props:
  icon: topology
---

A topology is a representation of logical system made up of components and sub-components.

Some of the benefits include:

- **Different Views** of the same resources based on use case e.g. Platform teams might want an infra focused view, while application teams want an app focused view
- **Partial Views** enable publishing high-level details of a component without exposing internal or private data more widely.

<Screenshot img="/img/topology.svg" size="900px" />

A topology is comprised of:

- **Components** and sub-components that represent logical parts of the system. Components can be nested to represent hierarchy.
- **Config Items** (and their associated changed/insights) that represent the underlying configuration or code of a component.
- **Health Checks** (or SLO's) to determine the health of a component in a consistent way.
- **Properties** and links to documentation or external consoles and dashboards
- **Metrics** aggregated from external data sources

## Components

Components are represented as cards:
<Screenshot img="/img/topology-card.svg" size="700px" />

<div style={{width: "800px"}}>

:::tip Mini Dashboards

One way to think about a component is as a mini dashboard that has provides a detailed RAG status that incorporates metrics and configuration from multiple sub-components and/or external systems.

:::

</div>

## Logical Views

Components can be created to represent any logical view of a system, for example the below represents a FluxCD installation, mapping helm releases to pods and resources that they create.

<Screenshot img="/img/flux-topology.svg" size="800px" />

## Components vs Config Items

Sometimes a logical resource is both a Component and a Config Item, for example a Kubernetes Namespace or Pod. What distinguishes them is that config items are physical - they represent a resource or configuration that exists.

Components on the other hand are how people think about and model complex systems.

<!--

|                    | Component                                       | Catalog                                        |
| ------------------ | ----------------------------------------------- | ---------------------------------------------- |
| Examples           | Namespace, Pod, Datacenter                      | Namespace, Pod, Security Group, postgres.conf  |
| Ownership          | Yes                                             | No                                             |
| Properties         | Custom Properties                               | Derived from config                            |
| Health Checks      | Yes                                             | Yes                                            |
| Playbooks          | Yes                                             | Yes                                            |
| Changes / Insights | None -  (Derived from linked catalog item only) | Using change tracking, events and audit trails |
| Cost               | Sum of related catalog costs                    | Based on Cloud Cost & Usage Reports            |

 -->
