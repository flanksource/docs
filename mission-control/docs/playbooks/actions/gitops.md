---
title: GitOps Action
---

# <Icon name="git"/> GitOps Action

GitOps action allows you to make commits and push to a remote repository.

```yaml title="update-pod-namespace.yaml"
apiVersion: mission-control.flanksource.com/v1
kind: Playbook
metadata:
  name: edit-kubernetes-manifests-gitops
spec:
  title: 'Edit Kustomize Resource'
  icon: flux
  parameters:
    - default: 'chore: update $(.config.type)/$(.config.name)'
      label: Commit Message
      name: commit_message
    - default: $(.config.config | toJSON | neat | json | toYAML)
      label: ""
      name: yamlInput
      properties:
        size: large
      type: code

  configs:
    - labelSelector: 'kustomize.toolkit.fluxcd.io/name'

  env:
    - name: file_path
      value: {{ .config.config | jq `.metadata.annotations["config.kubernetes.io/origin"]` | yaml).path }}
    - name: kustomization_path
      value:  {{ (catalog_traverse .config.id  "Kubernetes::Kustomization").Config | json | jq `.spec.path` }}
    - name: git_url
      value:  {{ (catalog_traverse .config.id  "Kubernetes::Kustomization/Kubernetes::GitRepository").Config | json | jq `.spec.url` }}
    - name: git_branch
      value:  {{ (catalog_traverse .config.id  "Kubernetes::Kustomization/Kubernetes::GitRepository").Config | json | jq `.spec.ref.branch` }}

  actions:
    - name: Create Pull Request With Changes
      gitops:
        repo:
          url: '$(.env.git_url)'
          connection:
          base: '$(.env.git_branch)'
          branch: edit-manifest-$(random.Alpha 8)
        commit:
          author: '$(.user.name)'
          email: '$(.user.email)'
          message: $(.params.commit_message)
        pr:
          title: $(.params.commit_message)
        patches:
          - path: '$(filepath.Join .env.kustomization_path .env.file_path)'
            yq: |
              select(
                .kind=="$(.config.config | jq `.kind`)" and
                .metadata.name=="$(.config.config | jq `.metadata.name`)"
              ) |= $(.params.yamlInput | yaml | toJSON)

```

:::info
On Github, GitLab and Azure Devops, it's possible to create Pull Requests as well.
:::

| Field     | Description                                                   | Scheme                                   | Required | Templatable |
| --------- | ------------------------------------------------------------- | ---------------------------------------- | -------- | ----------- |
| `repo`    | Repository details                                            | [`RepositoryDetail`](#repository-detail) | `true`   | `true`      |
| `commit`  | Commit details                                                | [`Commit`](#commit-detail)               | `true`   | `true`      |
| `pr`      | Pull Request details _(Valid only for GitHub & Azure Devops)_ | [`PullRequest`](#pull-request)           |          | `true`      |
| `patches` | List of patches to apply                                      | [`[]Patch`](#patch)                      |          | `true`      |
| `files`   | List of files to create                                       | [`[]File`](#file)                        |          | `true`      |

:::note
At least a patch or files config is required.
:::

### Repository Detail

| Field        | Description                                                               | Scheme   | Required | Templatable |
| ------------ | ------------------------------------------------------------------------- | -------- | -------- | ----------- |
| `connection` | Connection name to use the credentials for the git repo                   | `string` |          |             |
| `url`        | URL of the git repository                                                 | `string` |          |             |
| `base`       | Branch to clone. _(Defaults to "main")_                                   | `string` |          | `true`      |
| `branch`     | The new branch to create. _(Defaults to base branch specified above)_     | `string` |          | `true`      |
| `type`       | Specify the service the repository is hosted on (eg: github, gitlab, etc) | `string` |          |             |

:::note
Either the `connection` or the `url` is required.

For private GitLab repositories, please sepcify the type as "gitlab"
:::

### Commit Detail

| Field     | Description    | Scheme   | Required | Templatable |
| --------- | -------------- | -------- | -------- | ----------- |
| `author`  | Author name    | `string` | `true`   | `true`      |
| `email`   | Author email   | `string` | `true`   |             |
| `message` | Commit message | `string` | `true`   |             |

### Pull Request

| Field   | Description               | Scheme     | Required | Templatable |
| ------- | ------------------------- | ---------- | -------- | ----------- |
| `title` | Title of the Pull request | `string`   | `true`   | `true`      |
| `tags`  | Tags to add to the PR     | `[]string` |          | `true`      |

### Patch

Patches modify existing files on the git repo. You can either use `yq` to modify yaml files or `jq` to modify json files.

| Field  | Description   | Scheme   | Required | Templatable |
| ------ | ------------- | -------- | -------- | ----------- |
| `path` | Path to patch | `string` | `true`   | `true`      |
| `yq`   | yq query      | `string` | `false`  | `true`      |
| `jq`   | jq query      | `string` | `false`  | `true`      |

### File

Files create or delete existing files on the git repo.

| Field     | Description                                                               | Scheme   | Required | Templatable |
| --------- | ------------------------------------------------------------------------- | -------- | -------- | ----------- |
| `path`    | Path to file                                                              | `string` | `true`   | `true`      |
| `content` | Content of the file. Use the `$delete` keyword to delete an existing file | `string` | `true`   | `true`      |

## Templating

The template receives a environment variable that contain details about the corresponding config, check or component and the parameter(if applicable).

| Field       | Description                              | Schema                                       |
| ----------- | ---------------------------------------- | -------------------------------------------- |
| `config`    | Config passed to the playbook            | [`ConfigItem`](./reference/config-db/config-item) |
| `component` | Component passed to the playbook         | [`Component`](../references/component.md)    |
| `check`     | Canary Check passed to the playbook      | [`Check`](/reference/canary-checker/checl)            |
| `params`    | User provided parameters to the playbook | `map[string]string`                          |
