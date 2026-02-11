---
title: Distributed Canaries
sidebar_custom_props:
  icon: network
sidebar_position: 6
---

Distributed canaries allow you to define a check once and have it automatically run on multiple agents. This is useful for monitoring services from different locations, clusters, or network segments.

:::info
This feature is only available in [Mission Control](https://flanksource.com/docs) since Canary Checker does not support agents
:::

:::tip
For a step-by-step tutorial and real-world examples, see the [Distributed Canaries blog post](/blog/distributed-canaries-tutorial).
:::

## How It Works

When you specify an `agentSelector` on a canary:

1. The canary does **not** run locally on the server
2. A copy of the canary is created for each matched agent
3. Each agent runs the check independently and reports results back
4. The copies are kept in sync with the parent canary

A background job syncs agent selector canaries every 5 minutes. When agents are added or removed, the derived canaries are automatically created or cleaned up.

## Agent Selector Patterns

The `agentSelector` field accepts a list of patterns to match agent names:

| Pattern             | Description                          |
| ------------------- | ------------------------------------ |
| `agent-1`           | Exact match                          |
| `eu-west-*`         | Prefix match (glob)                  |
| `*-prod`            | Suffix match (glob)                  |
| `!staging`          | Exclude agents matching this pattern |
| `team-*`, `!team-b` | Match all `team-*` except `team-b`   |

## Example: HTTP Check on All Agents

This example creates an HTTP check for a Kubernetes service that runs on every agent matching the pattern:

```yaml title="distributed-http-check.yaml"
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: api-health
  namespace: monitoring
spec:
  schedule: '@every 1m'
  http:
    - name: api-endpoint
      url: http://api-service.default.svc.cluster.local:8080/health
      responseCodes: [200]
      test:
        expr: json.status == 'healthy'
  agentSelector:
    - '*' # Run on all agents
```

When this canary is created:

1. The check is executed locally only when `local` agent is provided in selector
2. A derived canary is created for each registered agent
3. Each agent executes the HTTP check against `api-service.default.svc.cluster.local:8080/health` in its own cluster
4. Results from all agents are aggregated and visible in the UI

## Example: Regional Monitoring

Monitor an external API from specific regions:

```yaml title="regional-monitoring.yaml"
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: external-api-latency
spec:
  schedule: '@every 5m'
  http:
    - name: payment-gateway
      url: https://api.payment-provider.com/health
      responseCodes: [200]
      maxResponseTime: 500
  agentSelector:
    - 'eu-*' # All EU agents
    - 'us-*' # All US agents
    - '!us-test' # Exclude test agent
    - 'local' # Run on local instance as well
```

## Example: Exclude Specific Agents

Run checks on all agents except those in a specific environment:

```yaml title="production-only.yaml"
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: production-checks
spec:
  schedule: '@every 2m'
  http:
    - name: internal-service
      url: http://internal.example.com/status
  agentSelector:
    - '!*-dev' # Exclude all dev agents
    - '!*-staging' # Exclude all staging agents
```
