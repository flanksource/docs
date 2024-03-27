---
slug: /topology
title: Topology
hide_title: true
# hide_table_of_contents: true

pagination_next: canary-checker/health-checks
pagination_prev: playbooks/overview
---


# Topology

A topology is a represenation of logical system made up of components and sub-components. Many views can be created using the same underlying components based on the way the consumer thinks about the system - e.g. from an Infrastructure or Application focused view.



<img src="/img/topology.svg" width="900px"/>







* **Components**
* **Catalog**
* **Health Checks**
* **Properties**
* Metrics



## Components

### Relationships


## Health / RAG Status
:::tip Mini Dashboards

One way to think about a component is as a mini dashboard that has provides a detailed RAG status that incorporates metrics and configuration from multiple sub-components and/or external systems.

:::

![](/img/topology-card.svg)



## Logical Views

Components can be created to represent any logical view of a system, for example the below represents a FluxCD installation, mapping helm releases to pods and resources that they create.



<img src="/img/flux-topology.svg" width="800px"/>



## Catalog

|                    | Component                                       | Catalog                                        |
| ------------------ | ----------------------------------------------- | ---------------------------------------------- |
|                    |                                                 |                                                |
| Examples           | Namespace, Pod, Datacenter                      | Namespace, Pod, Security Group, postgres.conf  |
| Ownership          | Yes                                             | No                                             |
| Properties         | Custom Properties                               | Derived from config                            |
| Health Checks      | Yes                                             | Yes                                            |
| Playbooks          | Yes                                             | Yes                                            |
| Changes / Insights | None -  (Derived from linked catalog item only) | Using change tracking, events and audit trails |
| Cost               | Sum of related catalog costs                    | Based on Cloud Cost & Usage Reports            |






Topology is a way for you to describe the different parts of your infrastructure, like servers, databases, applications, or any other elements that make up your system, in a structured way. It is represented as a tree-like structure where the nodes are called Components.

The Components in a Topology can reference each other, which allows you to create a more complex and interconnected topology. This makes it easy to visualize how different parts of your infrastructure are related to each other and how they interact with each other. For example, you can have a database component that is referenced by multiple server components, indicating that these servers are all dependent on the database.

Users can provide the Topology structure as a YAML specification, which is a simple way to represent data in a human-readable format. With this specification, users can create a clear and detailed description of their system infrastructure, allowing them to easily manage and maintain their systems.

## Health
