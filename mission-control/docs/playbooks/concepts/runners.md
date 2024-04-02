---
title: Runners
---

Playbook runners offer the flexibility to designate where actions are executed. By default, actions run on the main instance, but a set of agents can also be provided and one of them will be chosen at random.
This enables a playbook action to access environment specific information such as kubernetes secrets, connection details, environment variables, without having to share those to the main instance.

Runners can be set at the playbook or action level.

## Runs On

```yaml title='delete-namespace.yaml'
apiVersion: mission-control.flanksource.com/v1
kind: Playbook
metadata:
  name: delete-namespace
spec:
  runsOn:
    - local # Main instance
    - aws # agent 1
    - azure # agent 2
  description: Deletes namespace from all the agents and the host
  configs:
    - type: Kubernetes::Namespace
  actions:
    - name: Delete the namespace on the host
      exec:
        script: kubectl delete namespace {{.config.name}}
    - name: Delete the namespace on the AWS agent
      runsOn:
        - 'aws'
      exec:
        script: kubectl delete namespace {{.config.name}}
    - name: Delete the namespace on the Azure agent
      runsOn:
        - 'azure'
      exec:
        script: kubectl delete namespace {{.config.name}}
    - name: Send notification
      if: 'success()'
      notification:
        connection: connection://slack/flanksource
        title: Namespace {{.config.name}} deleted successfully
```

## Templates On

Actions are templated by the host before it's sent to the runner for execution. This setup permits the runner to execute actions that are templated with resources exclusively available on the host, such as config items or components, checks, ... etc.

However, this configuration also inhibits the runner from templating actions with its own resources. To enable templating on the agent, you can set `templatesOn: agent`.

```yaml title='heartbeat.yaml'
apiVersion: mission-control.flanksource.com/v1
kind: Playbook
metadata:
  name: heartbeat
spec:
  parameters:
    - name: check_id
      type: config
      properties:
        filter: heartbeat
  description: Call a heartbeat endpoint
  actions:
    - name: send heartbeat from the agent
      runsOn:
        - 'aws'
      templatesOn: 'agent'
      exec:
        # environment variables from cluster the agent is running on
        env:
          - name: HEARTBEAT_TOKEN
            valueFrom:
              secretKeyRef:
                name: canary-checker-heartbeat
                key: token
        script: |
          curl -H "Authorization: $HEARTBEAT_TOKEN"  https://httpbin.demo.aws.flanksource.com/bearer
```
