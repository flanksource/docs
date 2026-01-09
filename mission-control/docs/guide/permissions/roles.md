---
title: Roles
sidebar_position: 6
sidebar_custom_props:
  icon: lock
---

Mission Control uses Role-Based Access Control (RBAC) to manage access to resources based on the roles assigned to users.
Mission Control provides a collection of built-in roles to accommodate common organizational needs and security requirements.
Users receive a role when joining the system, which sets their base access level.

| Role     | Description                                                                                                           |
| -------- | --------------------------------------------------------------------------------------------------------------------- |
| `admin`  | Provides full system access, including the ability to manage users, roles, and all resources.                         |
| `editor` | Allows creation and modification of resources but does not permit managing users or system settings.                  |
| `viewer` | Grants read-only access to resources.                                                                                 |
| `guest`  | Offers minimal access with highly restricted viewing capabilities.<br></br> _([See Multi-Tenancy](multi-tenancy.md))_ |
| `agent`  | Designed for agents, enabling them to fetch playbooks and push specific resources.                                    |

While roles establish foundational permissions, users can receive more specific permissions.
This system enables precise control over who views, modifies, and manages resources like catalogs, playbooks, components, job histories, etc.

## Custom Roles

If you require more specialized access configurations, [Permission Groups](./groups) offer functionality similar to custom roles.
