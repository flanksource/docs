---
title: Timeouts
sidebar_custom_props:
  icon: timer
---

Playbooks can be configured with timeouts to automatically cancel their execution after a specified duration. This helps prevent playbooks from running indefinitely and consuming resources unnecessarily.

#### Default timeout

Playbooks are configured with a default timeout of **30 minutes** if not otherwise specified. You can modify this default globally by setting the `playbook.run.timeout` property in your Mission Control configuration.

The timeout accepts any valid [duration](/reference/types#duration) format. This global timeout setting serves as the fallback for all playbooks that don't define their own specific timeout value.

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

If an action specifies a timeout longer than the playbook's timeout, the playbook timeout takes precedence. The action will be terminated when the playbook timeout is reached.
