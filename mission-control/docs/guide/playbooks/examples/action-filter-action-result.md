---
title: Reusing Action Output
sidebar_position: 20
---

# Introduction

This example demonstrates how to reuse the output of one action in a playbook to conditionally execute another action. This is useful for creating dynamic workflows based on the results of previous actions.

# Example Explanation

The `check-count.yaml` file contains a playbook that performs the following steps:

1. **Fetch all changes**: This action queries a PostgreSQL database to fetch all changes related to a specific configuration.
2. **Send notification**: This action sends a notification to Slack if the previous action found any changes.

```yaml title="check-count.yaml" file=<rootDir>/modules/mission-control/fixtures/playbooks/action-result.yaml

```
