---
title: Security
sidebar_class_name: hidden-mission-control
---

Canary checker is essentially a remote command execution platform, which from a security perspective can be challenging

## Threat Model

## Hardening

You can take following steps to harden your installation.

Set the following helm values:

| Path                       | Value   | Impact                                                                                    |
| -------------------------- | ------- | ----------------------------------------------------------------------------------------- |
| `image.type`               | minimal | The full image includes a java installation and other test execution frameworks           |
| `dockerSocket`             | false   | Attaching to the host docker socket gives access to all containers running on the machine |
| `containerSocket`          | false   |                                                                                           |
| `ingress.enabled`          | false   | If possible disable the ingress to limit any attach surface                               |
| `allowPrivilegeEscalation` | false   |                                                                                           |
