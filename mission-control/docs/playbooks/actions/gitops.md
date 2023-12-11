---
title: GitOps Action
---

# <Icon name="git"/> GitOps Action

GitOps action allows you to make commits and push to a remote repository.

```yaml title="update-pod-namespace.yaml"
apiVersion: mission-control.flanksource.com/v1
kind: Playbook
metadata:
  name: update-pod-namespace
spec:
  parameters:
    - name: namespace
      label: The new namespace
  configs:
    - type: Kubernetes::Pod
  actions:
    - name: Modify namespace
      gitops:
        repo:
          url: https://github.com/example/repo
          connection: connection://github/example
          base: master
          branch: playbooks-branch-{{.params.namespace}}
        commit:
          email: john@doe.com
          author: John Doe
          message: |
            Modifying namespace from {{.config.namespace}} to {{.params.namespace}}
        pr:
          title: 'chore: Update namespace to {{.params.namespace}}'
          tags:
            - low
        patches:
          - path: navidrome.yaml
            yq: '.metadata.namespace = "{{.params.namespace}}"'
        files:
          - path: { { .config.namespace } }
            content: $delete
          - path: '{{.params.namespace}}/namespace.yaml'
            content: |
              apiVersion: v1
              kind: Namespace
              metadata:
                name:  {{.params.namespace}}
```

:::info
On Github and Azure Devops, it's possible to create Pull Requests as well.
:::

| Field     | Description                                                   | Scheme                                   | Required |
| --------- | ------------------------------------------------------------- | ---------------------------------------- | -------- |
| `repo`    | Repository details                                            | [`RepositoryDetail`](#repository-detail) | `true`   |
| `commit`  | Commit details                                                | [`Commit`](#commit-detail)               | `true`   |
| `pr`      | Pull Request details _(Valid only for GitHub & Azure Devops)_ | [`PullRequest`](#pull-request)           |          |
| `patches` | List of patches to apply                                      | [`[]Patch`](#patch)                      |          |
| `files`   | List of files to create                                       | [`[]File`](#file)                        |          |

:::note
At least a patch or files config is required.
:::

### Repository Detail

| Field        | Description                                                           | Scheme   | Required | Templated |
| ------------ | --------------------------------------------------------------------- | -------- | -------- | --------- |
| `connection` | Connection name to use the credentials for the git repo               | `string` |          |           |
| `url`        | URL of the git repository                                             | `string` |          |           |
| `base`       | Branch to clone. _(Defaults to "main")_                               | `string` |          | `true`    |
| `branch`     | The new branch to create. _(Defaults to base branch specified above)_ | `string` |          | `true`    |

:::note
Either the `connection` or the `url` is required
:::

### Commit Detail

| Field     | Description    | Scheme   | Required | Templated |
| --------- | -------------- | -------- | -------- | --------- |
| `author`  | Author name    | `string` | `true`   | `true`    |
| `email`   | Author email   | `string` | `true`   |           |
| `message` | Commit message | `string` | `true`   |           |

### Pull Request

| Field   | Description               | Scheme     | Required | Templated |
| ------- | ------------------------- | ---------- | -------- | --------- |
| `title` | Title of the Pull request | `string`   | `true`   | `true`    |
| `tags`  | Tags to add to the PR     | `[]string` |          | `true`    |

### Patch

Patches modify existing files on the git repo. You can either use `yq` to modify yaml files or `jq` to modify json files.

| Field  | Description   | Scheme   | Required | Templated |
| ------ | ------------- | -------- | -------- | --------- |
| `path` | Path to patch | `string` | `true`   | `true`    |
| `yq`   | yq query      | `string` | `false`  | `true`    |
| `jq`   | jq query      | `string` | `false`  | `true`    |

### File

Files create or delete existing files on the git repo.

| Field     | Description                                                               | Scheme   | Required | Templated |
| --------- | ------------------------------------------------------------------------- | -------- | -------- | --------- |
| `path`    | Path to file                                                              | `string` | `true`   | `true`    |
| `content` | Content of the file. Use the `$delete` keyword to delete an existing file | `string` | `true`   | `true`    |

## Templating

The following fields are templatable

- `commit.message`
- `files.content`
- `files.path`
- `patches.jq`
- `patches.path`
- `patches.yq`
- `pr.tags`
- `pr.title`
- `repo.base`
- `repo.branch`

The template receives a environment variable that contain details about the corresponding config, check or component and the parameter(if applicable).

:::info
See the [reference](.md) to see what fields are templatable
:::

| Field       | Description                              | Schema                                       |
| ----------- | ---------------------------------------- | -------------------------------------------- |
| `config`    | Config passed to the playbook            | [`ConfigItem`](../references/config_item.md) |
| `component` | Component passed to the playbook         | [`Component`](../references/component.md)    |
| `check`     | Canary Check passed to the playbook      | [`Check`](../references/check.md)            |
| `params`    | User provided parameters to the playbook | `map[string]string`                          |
