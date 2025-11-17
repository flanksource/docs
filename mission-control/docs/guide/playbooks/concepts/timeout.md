---
title: Timeouts
sidebar_custom_props:
  icon: timer
---

Set timeouts on playbooks to automatically cancel their execution after a specified duration. This helps prevent playbooks from running for too long and consuming resources.

#### Default timeout

Mission Control sets a default timeout of **30 minutes** for all playbooks. You can change this default globally by setting the `playbook.run.timeout` property in your Mission Control configuration.

The timeout accepts any valid [duration](/docs/reference/types#duration) format. This global timeout setting serves as the fallback for all playbooks that don't define their own specific timeout value.

## Playbook-level timeout

You can set a timeout for the entire playbook using the `timeout` field in the playbook spec:

```yaml
apiVersion: mission-control.flanksource.com/v1
kind: Playbook
metadata:
  name: example-playbook
spec:
  timeout: 1h
  actions:
    - name: Long running task
      exec:
        script: |
          ... # long running task
```

## Action-level timeout

Individual actions within a playbook can also have their own timeouts:

```yaml
apiVersion: mission-control.flanksource.com/v1
kind: Playbook
metadata:
  name: example-playbook
spec:
  actions:
    - name: Quick task
      timeout: 5m
      exec:
        script: |
          ... # quick task
    - name: Longer task
      timeout: 30m
      exec:
        script: |
          ... # longer task
```

If an action specifies a timeout longer than the playbook's timeout, the playbook timeout takes precedence. Mission Control stops the action when it reaches the playbook timeout.
