---
title: Env Vars
---

```yaml title="call-secret-endpoint.yaml" file=<rootDir>/modules/mission-control/fixtures/playbooks/env-secrets.yaml

```

Env Vars are variables that can be used to template playbook actions. In the snippet above, you can see an env var `auth_token` that's pulled in from a kubernetes secret and then used to template the Exec action.

In a way, env vars are like playbook parameters. The difference being that they do not come from users and are not stored anywhere. It's the right place to inject any secrets into a playbook.
