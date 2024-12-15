Flanksource Mission Control is a source-open, Kubernetes-native Internal Developer Platform (IDP) that empowers platform teams to improve GitOps adoption and enables developers to gain deeper insights into their systems' state. With Mission Control, you can also easily discover and run GitOps compliant playbooks for day-2 operations.

Background

Mission Control was born out of Flanksource's platform engineering practise where we consistenly saw lower adoption rates for platform engineering and site reliability practises.

1. Lack of skill and capacity - this is especially true for Seed / Series A startups and larger financial enterprises.
2. Change fatigue

Focus

Mission Control is designed for diverse teams working on complex systems that are often a combination of systems in various stages of modernization from microservices, to brownfields and commercial off the shelf software.

Mission Control's focus is primarily in helping developers **operate** complex systems, rather than **developing** new services, with the following 2 areas:

1. Understanding system state by building a graph of complex systems and then attaching a simple Red Amber Green (RAG) status to each component, while tracking and associating change and security/cost insights.
2. Enabling incremental GitOps adoption by providing highly discoverable playbooks that both make changes directly or commit changes via Git Pull Request. This allows developers (and even non-technical users) to update the state of the system without knowning Kubernetes, Git, GitOps or how to change YAML/JSON/Terraform etc..

This hyper-focus means if you are looking for other features you might find typically in a portal.

1. Scaffolding - While you can use playbooks to scaffold and provision resources - the experience will be subpar to other tools like Backstage
2. Docs - There is no built-in docs (We can add a link to external docs to components)
3. Scorecards - Our focus is on health, not maturity ranking (Our health check framework can calculate and aggregate some of these metrics, )

What it does
How it does it

With Mission Control you can:

Catalog and track changes on infrastructure, applications and configuration.
Empower Developers with self-service playbooks for Day 0-2 operations.
Run Health Checks across both cloud-native and legacy infrastructure and applications.
Incrementally Adopt GitOps with playbooks that perform Git commits in the background.
Aggregate Alerts from Prometheus, Cloudwatch, etc.
Visualize Complex Systems with a multi-dimensional system topology.
Build Event Driven Control Planes with a combination of webhooks, events and GitOps.
Notify People and Systems about changes in health and configuration.
When not to use Mission Control
Mission Control is best suited for medium to large teams with complex infrastructure and applications. If you have a simple setup with just a few servers, tools like Ansible, Terraform and Prometheus may be enough.

Your primary concern is Development Experience & Maturity. Mission Control is focused on improving the operational experience for developers, enabling them to quickly understand, troubleshoot and operate on complex systems.
You prefer ClickOps to GitOps. Mission Control is built on a GitOps first principle, and configured using Kubernetes Custom Resource Defintions. While there is a configuration UI, it is primarily for rapid prototyping and testing.
Your application / team has no dependencies across multiple teams or services. Mission Control is best suited for distributed systems with dependencies across teams and services that need to be visualized and tracked.
TIP
While YAML is preferred for configuration, Mission Control does provide highly optimized UI for viewing, navigating and operating on the catalogs and playbooks defined in YAML/CRDs.

Your system is very simple with few applications, dependencies and changes.
Getting Started
See Deployment Models to get started with either self-hosted, SaaS or hybrid models.

** Background **

** Focus **

** Features **
