---
title: Azure DevOps Pipeline Action
---

# <Icon name="azure-devops"/> Azure DevOps Pipeline Action

This action allows you to invoke pipelines in your Azure DevOps project.

```yaml title="invoke-azure-devops-pipeline.yaml"
apiVersion: mission-control.flanksource.com/v1
kind: Playbook
metadata:
  name: invoke-azure-devops-pipeline
  namespace: default
spec:
  parameters:
    - name: project
      label: Project name
    - name: pipeline
      label: Pipeline ID
  actions:
    - name: Invoke pipeline
      azureDevopsPipeline:
        org: flanksource
        project: "{{.params.project}}"
        token:
          valueFrom:
            secretKeyRef:
              name: azure-devops
              key: token
        pipeline:
          id: "{{.params.pipeline}}"
```

| Field        | Description                                                   | Scheme                                         | Required | Templatable |
| ------------ | ------------------------------------------------------------- | ---------------------------------------------- | -------- | ----------- |
| `org`        | Org is the name of the Azure DevOps organization.             | `string`                                       | `true`   | `true`      |
| `project`    | Project ID or project name                                    | `string`                                       | `true`   | `true`      |
| `token`      | Token is the personal access token.                           | <CommonLink to="secrets">_EnvVar_</CommonLink> | `true`   | `true`      |
| `pipeline`   | Pipeline is the azure pipeline to invoke.                     | [`AzureDevopsPipeline`](#pipeline)             | `true`   | `true`      |
| `parameters` | Parameteres are the settings that influence the pipeline run. | [`AzureDevopsPipelineParameters`](#parameters) | `false`  | `true`      |

## Pipeline

| Field     | Description       | Scheme   | Required | Templatable |
| --------- | ----------------- | -------- | -------- | ----------- |
| `id`      | Pipeline ID.      | `string` | `true`   | `true`      |
| `version` | Pipeline version. | `string` | `false`  | `true`      |

## Parameters

| Field                | Description                               | Scheme           | Required | Templatable |
| -------------------- | ----------------------------------------- | ---------------- | -------- | ----------- |
| `resources`          | The resources the run requires.           | `map[string]any` | `false`  | `true`      |
| `templateParameters` | The template parameters the run requires. | `map[string]any` | `false`  | `true`      |
| `variables`          | The variables the run requires.           | `map[string]any` | `false`  | `true`      |
| `stagesToSkip`       | The stages to skip.                       | `[]string`       | `false`  | `true`      |

## Templating

The fields that are marked as `templatable` receives a environment variable that contain details about the corresponding config, check or component and the parameter(if applicable).

| Field       | Description                              | Schema                                       |
| ----------- | ---------------------------------------- | -------------------------------------------- |
| `config`    | Config passed to the playbook            | [`ConfigItem`](./reference/config-db/config-item) |
| `component` | Component passed to the playbook         | [`Component`](../references/component.md)    |
| `check`     | Canary Check passed to the playbook      | [`Check`](/reference/canary-checker/checl)            |
| `params`    | User provided parameters to the playbook | `map[string]string`                          |
