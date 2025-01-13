---
title: ABAC
sidebar_position: 2
---

Attribute-Based Access Control (ABAC) is another security model you can use in Mission Control when RBAC falls short.
It is a security model that conditionally grants access to resources based on attributes.
In Mission Control, these attributes relate to the resource being accesses: eg: the tags of the config or the namespace
of the playbook.

:::info
The models are not mutually exclusive. Mission Control supports both RBAC and ABAC.
:::

Example use cases:

- Allow a person to run a playbook but only if the playbook is on a certain namespace
- Deny a person from running a playbook in the Kubernetes category
- Allow a notification to run a particular playbook.

## Advanced Use Cases

For advanced use cases, particularly SASS deployments, Mission control has native support to allow permissions
based on tags and agents.

### Agent based permission

A mission control deployment acting as an upstream for multiple agents will receive resources from various agents.
A single UI portal is used to access the catalogs and topologies pushed from those agents.
If you need to allow a user access to only resources pushed by a particular agent, then Agent based ABAC can be useful.

### Tag based permission

This can be useful to allow some users access to resources of just one (or a list of) cluster(s).
