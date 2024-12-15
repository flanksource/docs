# Comparison of Mission Control to Backstage

https://www.markepear.com/blog/dev-tool-comparison-page

|                          | Mission Control                                                                                           | Backstage                                                            |
| ------------------------ | --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Time to Value            | < 1h                                                                                                      | 1+ week                                                              |
| Target Owner             | DevOps / Platform team with limited dev exp                                                               | Platform Team with dedicated full-stack developer                    |
| Target Consumer          | Developers, Junior DevOps, Operators                                                                      | Microservice Developers                                              |
| Skill Required           | YAML, [CEL](https://cel.dev/)                                                                             | React, Node.js, API                                                  |
| Configuration Model      | Helm values, CRD's                                                                                        | YAML, React, Node.js,                                                |
|                          |                                                                                                           |                                                                      |
| Push vs Pull             | Pull, Agent Push or Hub-Spoke                                                                             | Pull / Pull via Broker                                               |
| Relationships / Insights | Scrape time                                                                                               | Runtime                                                              |
| Relationship links       | Existing metadata                                                                                         | `backstage.io` annotations applied on both sides                     |
| Dependencies             | Postgres (pre-configured by default)                                                                      | Container build and deploy pipeline                                  |
| Typing                   | Schemaless                                                                                                | Static Schema                                                        |
| Scaffolding              |                                                                                                           |                                                                      |
| Scorecards               | Only indirectly via health checks / insights                                                              | Multiple external plugins                                            |
| Health                   | Unified health and status across all components                                                           | No unified concept of health and status, only Indirectly via plugins |
| Catalog Graph            | Integrated with health and recent changes                                                                 | Relationships only                                                   |
| Event Correlation        |                                                                                                           |                                                                      |
| Docs                     | Only via links to external docs                                                                           | Natively integrated.                                                 |
|                          |                                                                                                           |                                                                      |
| Gitops                   |                                                                                                           |                                                                      |
|                          |                                                                                                           |                                                                      |
| Events                   | Unified changes/events, including for upstream / downtream resources.                                     | Plugin specific                                                      |
| Change Tracking          |                                                                                                           |                                                                      |
| Playbooks                |                                                                                                           |                                                                      |
| Playbook Actions         |                                                                                                           | Scaffolding + Custom Actions                                         |
| Custom Actions           | Bash / Powershell / Node.js / Python etc. <br /> (Or anything in a git repo that can checked out and run) |                                                                      |
| Trigger via API          |                                                                                                           |                                                                      |
| Trigger via Event        |                                                                                                           |                                                                      |
| Self-Service             |                                                                                                           |                                                                      |
|                          |                                                                                                           |                                                                      |
| **Kubernetes**           |                                                                                                           |                                                                      |
| Multi-Cluster            |                                                                                                           |                                                                      |
| CRD                      |                                                                                                           |                                                                      |
| Visibility               |                                                                                                           |                                                                      |
| Secrets                  |                                                                                                           |                                                                      |
| Metrics                  | Prometheus / PodMetrics                                                                                   | PodMetrics                                                           |
| Flux                     |                                                                                                           |                                                                      |
| Argo                     |                                                                                                           |                                                                      |
|                          |                                                                                                           |                                                                      |

Configuration Model

## GitOps and De-CentralizedFirst

Mission Control is GitOps first - everything is configured using CRD's (With a GUI escape hatch), this makes it easy to configure and deploy. Especially for decentralized teams that can deploy their own scrapers and health checks without coordination with a central team.

With backstage the componnent definitions are discovered using gitops, the actual configuration of plugins, relationships all required update node and react files, rebuilding and redeploying the app.

## Shared Model

Mission Control has a unified catalog with a shared common model of:

- **Health** / Red Amber Green (RAG) status
- **Status** - e.g. `Running`, `Updating`, `ReconciliationSucceeded`
- **Change** / Events (e.g. Cloudtrail, Kubernetes events or changes detected by a diff in the resource configuration)
- **Insights** (Security, Cost, etc. )
- **Cost**

This provides a unified view where different data sources can be combined, and then used for:

- A full catalog graph, that includes status and changes
- Notifications when resources become unhealthy
- Playbooks that work on specific resources.
- Multiple cost allocation views

Backstage and other IDP's use a plugin model where health, change, etc are recorded as seperate catalog items and then linked, resulting in needing to review many tabs to fully understand state.

## Connection Aware

Mission control has the concept of a connection which defines where an API (AWS, Kubernetes, Git, etc..) can be reached, and what credentials to be used. The credentials can be looked up at runtime from Kubernetes Secrets/Configmaps/Tokens or computed Helm values.

With backstage, credentials tend to be hardcoded to environment variables or IAM roles, making them difficult to deploy and secure.

## Push vs Pull

Mission Control is designed to support both push and pull based models of data collection in a secure manner.

The mission control agent gets installed on individual clusters / accounts and uses secrets that are local tothe agent, negating the the need for the SaaS or Centralised instance to maintain any credentials.

Agents are configured locally using CRD for scrapers, health-checks, playbooks and notifications.

Backstage requires a direct connction, or a connection through a proxy, which from a security perspective is very difficult to secure and apply least privilege.
