---
title: Git
---

Git connections are used for [GitOps](/playbooks/actions/gitops) playbook actions and [Health Checks](/canary-checker/reference/git)

```yaml
apiVersion: mission-control.flanksource.com/v1
kind: Connection
metadata:
  name: github
spec:
  git:
    username:
      valueFrom:
        secretKeyRef:
          name: secret-name
          key: username
    password:
      valueFrom:
        secretKeyRef:
          name: secret-name
          key: password
```

:::info
The `git` connection type does not support opening pull requests, use a `github`, `gitlab` or `azureDevops` type instead
:::

## Github

```yaml
apiVersion: mission-control.flanksource.com/v1
kind: Connection
metadata:
  name: github
spec:
  github:
    organization: flanksoure
    personalAccessToken:
      valueFrom:
        secretKeyRef:
          name: secret-name
          key: pat
```

:::tip Classic PAT

In order to create pull requests it is advised to use a [classic](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-personal-access-token-classic) token with the `repo` OAuth scope.

:::
