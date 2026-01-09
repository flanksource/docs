---
title: Multi Tenancy / ABAC
sidebar_position: 7
sidebar_custom_props:
  icon: data-center
---

Mission Control provides sophisticated access control mechanisms for complex deployment scenarios, particularly in Software-as-a-Service (SaaS) environments where multiple tenants or organizations share the same infrastructure.
Two key features enable fine-grained access control in these scenarios: Agent-based permissions and Tag-based permissions.

## Agent-Based Permissions

Mission Control often acts as a central hub receiving data from multiple agents deployed across different environments. Each agent pushes its own set of resources, including catalogs and topologies, to the central Mission Control instance. While all these resources are accessible through a unified UI portal, organizations frequently need to restrict user access to specific agent-sourced data.

Agent-based ABAC addresses this requirement by allowing administrators to create permissions that reference specific agents.

For example, you might have:

- Development teams that should only access resources from their development environment agents
- Regional teams that should only see resources from agents in their geographic location
- Client-specific teams that should only interact with agents deployed in their infrastructure

### Examples

<details summary="Restrict Team to Development Agent">
<div>

```yaml title="dev-team-agent-permission.yaml"
apiVersion: mission-control.flanksource.com/v1
kind: Permission
metadata:
  name: dev-team-dev-agent-only
spec:
  description: Allow dev team to only access resources from the development agent
  subject:
    team: development
  actions:
    - read
    - playbook:run
  agents:
    - dev-cluster-agent
```

</div>
</details>

<details summary="Regional Access Control">
<div>

```yaml title="eu-team-agent-permission.yaml"
apiVersion: mission-control.flanksource.com/v1
kind: Permission
metadata:
  name: eu-team-regional-access
spec:
  description: Restrict EU team to EU region agents only
  subject:
    team: eu-operations
  actions:
    - read
    - write
    - playbook:*
  agents:
    - eu-west-agent
    - eu-central-agent
```

</div>
</details>

<details summary="Client-Specific Agent Access">
<div>

```yaml title="client-agent-permission.yaml"
apiVersion: mission-control.flanksource.com/v1
kind: Permission
metadata:
  name: acme-client-access
spec:
  description: Restrict ACME client team to their dedicated agent
  subject:
    team: acme-support
  actions:
    - read
    - playbook:run
  agents:
    - acme-corp-agent
```

</div>
</details>

## Tag-Based Permissions

Tag-based permissions provide another layer of access control granularity by allowing administrators to restrict access based on resource tags.
This approach is particularly powerful for managing access in multi-cluster Kubernetes environments.

Tags can represent various attributes such as:

- Environment (production, staging, development)
- Geographic region (us-east, eu-west, asia-pacific)
- Business unit (finance, marketing, operations)
- Client identifier (client-a, client-b)
- Clusters

### Examples

<details summary="Environment-Based Access">
<div>

```yaml title="prod-readonly-permission.yaml"
apiVersion: mission-control.flanksource.com/v1
kind: Permission
metadata:
  name: prod-readonly
spec:
  description: Allow SRE team read-only access to production resources
  subject:
    team: sre
  actions:
    - read
  tags:
    environment: production
```

</div>
</details>

<details summary="Multi-Cluster Access">
<div>

```yaml title="cluster-access-permission.yaml"
apiVersion: mission-control.flanksource.com/v1
kind: Permission
metadata:
  name: allow-playbooks-on-demo-cluster
spec:
  description: Allow user to run playbooks only on demo and staging clusters
  subject:
    person: john@example.com
  actions:
    - playbook:run
  object:
    playbooks:
      - name: "*"
    configs:
      - tagSelector: cluster=demo
      - tagSelector: cluster=staging
```

</div>
</details>

<details summary="Business Unit Isolation">
<div>

```yaml title="finance-team-permission.yaml"
apiVersion: mission-control.flanksource.com/v1
kind: Permission
metadata:
  name: finance-business-unit
spec:
  description: Restrict finance team to finance business unit resources
  subject:
    team: finance-ops
  actions:
    - read
    - write
  tags:
    business-unit: finance
```

</div>
</details>

<details summary="Client Tenant Isolation">
<div>

```yaml title="client-tenant-permission.yaml"
apiVersion: mission-control.flanksource.com/v1
kind: Permission
metadata:
  name: client-a-tenant-access
spec:
  description: Isolate Client A to their tenant resources only
  subject:
    team: client-a-admins
  actions:
    - read
    - write
    - playbook:*
  tags:
    tenant: client-a
```

</div>
</details>

## Combined Agent and Tag Permissions

Agent-based and tag-based permissions can be combined to create sophisticated access control policies that precisely match organizational requirements and security boundaries.

:::info
When both `agents` and `tags` are specified, the permission applies only to resources that match **both** criteria (AND condition).
:::

### Examples

<details summary="Regional Production Access">
<div>

```yaml title="combined-permission.yaml"
apiVersion: mission-control.flanksource.com/v1
kind: Permission
metadata:
  name: us-prod-access
spec:
  description: Allow US SRE team to manage production resources from US agents only
  subject:
    team: us-sre
  actions:
    - read
    - write
    - playbook:run
  agents:
    - us-east-agent
    - us-west-agent
  tags:
    environment: production
```

</div>
</details>

<details summary="Client-Specific Environment Access">
<div>

```yaml title="client-env-permission.yaml"
apiVersion: mission-control.flanksource.com/v1
kind: Permission
metadata:
  name: acme-staging-access
spec:
  description: Allow ACME support team to access only their staging environment
  subject:
    team: acme-support
  actions:
    - read
    - playbook:run
  agents:
    - acme-corp-agent
  tags:
    environment: staging
```

</div>
</details>
