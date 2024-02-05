---
slug: /
title: Flanksource Mission Control
hide_title: true
# hide_table_of_contents: true
# pagination_next: null
# pagination_prev: null
---


Flanksource Mission Control is an Internal Developer Platform focused on GitOps platforms.

![](./images/how-it-works.svg)


* [Catalog](./config-db/overview) - Catalog all your infrastructure, applications, pipelines and configuration into a schema-less JSON database, with automatic change tracking.
* [Playbooks](./playbooks/overview) - Self-Service portal for day 0-2 operations like provisioning a new namespace, restarting a deployment, or updating files in git repositories.  Playbooks also be triggered via webhooks and events.
* [Health Checks](./canary-checker/overview) - RAG (red, amber, green) statuses across infrastructure, applications and commercial off the shelf software, With alert aggregation, synthethic application and infrastructure checks.
* [Topology](./topology/overview) - Visualize complex systems using a multi-dimensional hierarchical cards.
* [Notifications](./notifications/overview) - Send notifcations during playbook execution or based on any event fired from catalog, health or topology changes.

