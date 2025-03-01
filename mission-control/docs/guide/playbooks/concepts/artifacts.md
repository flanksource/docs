---
title: Artifacts
sidebar_custom_props:
  icon: material-symbols-light:archive-outline
---

Artifacts allow you to archive files generated by playbook actions to a file store of your choice.

:::note Prerequisites

- The [artifact store](/installation/artifacts) is configured.
  :::

The following actions support archiving artifacts

- [Exec](../actions/exec)
- [Pod](../actions/pod)

The only configuration required on the action is to provide the path(s) of the artifacts generated by the actions.

## Archiving a directory

For the following script in an exec action

```
mkdir -p /tmp/results
curl -sL 'https://example.com' > /tmp/results/example.com
curl -sL 'https://flanksource.com' > /tmp/results/flanksource.com
```

one can provide the artifact paths as follows

```yaml title="archive-websites.yaml"
apiVersion: mission-control.flanksource.com/v1
kind: Playbook
metadata:
  name: archive-websites
spec:
  actions:
    - name: Download example.com and flanksource.com
      exec:
        script: |
          mkdir -p /tmp/results
          curl -sL 'https://example.com' > /tmp/results/example.com
          curl -sL 'https://flanksource.com' > /tmp/results/flanksource.com
        artifacts:
          - path: /tmp/results/example.com
          - path: /tmp/results/flanksource.com
```

or, use a glob as

```yaml
artifacts
  - path: '/tmp/results/*.com'
```

## Archiving output from stdout/stderr

The path field accepts two special paths

- `/dev/stdout`
- `/dev/stderr`

```yaml title="archive-website.yaml"
apiVersion: mission-control.flanksource.com/v1
kind: Playbook
metadata:
  name: archive-website
spec:
  actions:
    - name: Archive response of example.com
      exec:
        script: |
          curl -sL 'https://example.com'
        artifacts:
          - path: /dev/stdout
          - path: /dev/stderr
```
