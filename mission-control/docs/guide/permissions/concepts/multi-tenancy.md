---
title: Multi Tenancy
sidebar_position: 3
---

Mission Control provides sophisticated access control mechanisms for complex deployment scenarios, particularly in Software-as-a-Service (SaaS) environments where multiple tenants or organizations share the same infrastructure.
Two key features enable fine-grained access control in these scenarios: Agent-based permissions and Tag-based permissions.

### Agent based permission

Mission Control often acts as a central hub receiving data from multiple agents deployed across different environments. Each agent pushes its own set of resources, including catalogs and topologies, to the central Mission Control instance. While all these resources are accessible through a unified UI portal, organizations frequently need to restrict user access to specific agent-sourced data.
Agent-based ABAC addresses this requirement by allowing administrators to create permissions that reference specific agents.
For example, you might have:

- Development teams that should only access resources from their development environment agents
- Regional teams that should only see resources from agents in their geographic location
- Client-specific teams that should only interact with agents deployed in their infrastructure

```yaml title="agent-based-permission.yaml" file=<rootDir>/modules/mission-control/fixtures/permissions/agent-based-permission.yaml
```

### Tag based permission

Tag-based permissions provide another layer of access control granularity by allowing administrators to restrict access based on resource tags.
This approach is particularly powerful for managing access in multi-cluster Kubernetes environments.
Tags can represent various attributes such as:

- Environment (production, staging, development)
- Geographic region (us-east, eu-west, asia-pacific)
- Business unit (finance, marketing, operations)
- Client identifier (client-a, client-b)
- Clusters

```yaml title="tag-based-permission.yaml" file=<rootDir>/modules/mission-control/fixtures/permissions/tag-based-permission.yaml
```

:::info
Tag-based and agent-based permissions can be combined to create sophisticated access control policies that precisely match organizational requirements and security boundaries. 
:::