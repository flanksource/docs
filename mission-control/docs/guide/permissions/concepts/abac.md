---
title: ABAC
sidebar_position: 2
---

Attribute-Based Access Control (ABAC) is another security model you can use in Mission Control when RBAC falls short.
It is a security model that conditionally grants access to resources based on attributes.
In Mission Control, these attributes relate to the resource being accessed: eg:

- the tags
- the namespace
- name patterns (eg: begins with test-)

:::info
The models are not mutually exclusive. Mission Control supports both RBAC and ABAC.
:::

Example use cases:

- Allow a person to run a playbook but only if the playbook is on a certain namespace
- Deny a person from running a playbook in the Kubernetes category
- Allow a notification to run a particular playbook.

```yaml title="deny-person-playbook.yaml" file=<rootDir>/modules/mission-control/fixtures/permissions/deny-person-playbook.yaml

```
