---
title: Github Action
---

# <Icon name="github"/> Github Action

Github Acion allows you to invoke GitHub workflows from the playbooks.

:::note
You must configure your GitHub Actions workflow to run when the [workflow_dispatch](https://docs.github.com/en/webhooks/webhook-events-and-payloads#workflow_dispatch) webhook event occurs
:::

```yaml title="invoke-release-workflow.yaml"
---
apiVersion: mission-control.flanksource.com/v1
kind: Playbook
metadata:
  name: invoke-release-workflow
  namespace: default
spec:
  parameters:
    - name: repo
      label: Repository
      description: The name of the repository without the .git extension
      default: duty
    - name: branch
      label: Branch to run the workflow on
      default: main
    - name: environment
      label: Environment to run tests against
      default: production
      type: text
    - name: logLevel
      label: Log level
      type: list
      properties:
        options:
          - label: info
            value: info
          - label: warning
            value: warning
          - label: error
            value: error
      default: warning
    - name: tags
      label: Should tag or not
      type: checkbox
      default: 'false'
  actions:
    - name: Invoke github workflow
      github:
        username: flanksource
        repo: '{{.params.repo}}'
        token:
          valueFrom:
            secretKeyRef:
              name: github
              key: token
        workflows:
          - id: release.yaml
            ref: '{{.params.branch}}'
            input: |
              {
                "environment": "{{.params.environment}}",
                "logLevel": "{{.params.logLevel}}",
                "tags": "{{.params.tags}}"
              }
```

| Field       | Description                                             | Scheme                                           | Required | Templatable |
| ----------- | ------------------------------------------------------- | ------------------------------------------------ | -------- | ----------- |
| `username`  | The account owner of the repository (case insensitive)  | _string_                                         | `true`   | `true`      |
| `repo`      | The name of the repository without the `.git` extension | _string_                                         | `true`   | `true`      |
| `token`     | Github personal access token                            | <CommonLink to="secrets">[]_EnvVar_</CommonLink> | `true`   |             |
| `workflows` | List of workflows to invoke                             | [`[]Workflow`](#github-workflow)                 |          |             |

### Github Workflow

| Field   | Description                                             | Type     | Required | Templatable |
| ------- | ------------------------------------------------------- | -------- | -------- | ----------- |
| `id`    | Workflow id or the workflow file name (eg release.yaml) | `string` | `true`   |             |
| `ref`   | Branch name of the tag name                             | `string` |          | `true`      |
| `input` | Azure connection                                        | `json`   |          | `true`      |

## Templating

Scripts can be templated. The script template receives a environment variable that contain details about the corresponding config, check or component and the parameter(if applicable).

| Field       | Description                              | Schema                                       |
| ----------- | ---------------------------------------- | -------------------------------------------- |
| `config`    | Config passed to the playbook            | [`ConfigItem`](../references/config_item.md) |
| `component` | Component passed to the playbook         | [`Component`](../references/component.md)    |
| `check`     | Canary Check passed to the playbook      | [`Check`](../references/check.md)            |
| `params`    | User provided parameters to the playbook | `map[string]string`                          |
