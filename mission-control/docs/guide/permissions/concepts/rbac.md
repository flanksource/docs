---
title: RBAC
sidebar_position: 1
---

Role-Based Access Control (RBAC) is a security model that manages access to Mission Control resources based on the roles assigned to users.
Mission Control has a list of predefined built-in roles and every user must fall into one of those roles.

| Role     | Description                                                                                      | Primary Use Case                         |
| -------- | ------------------------------------------------------------------------------------------------ | ---------------------------------------- |
| `admin`  | Full system access with ability to manage users, roles, and all resources                        | System administrators and security teams |
| `editor` | Can create and modify resources but cannot manage users or system settings                       | Development team members                 |
| `viewer` | Read-only access to resources                                                                    | Stakeholders and auditors                |
| `guest`  | Minimal access with highly restricted viewing capabilities<br></br> _(See Tag-Agent based ABAC)_ | External collaborators                   |
| `agent`  | Roles for agents                                                                                 | Push resources from agents               |

This system enables fine-grained control over who can view, modify, and manage resources like catalogs, playbooks, components, job histories, etc
