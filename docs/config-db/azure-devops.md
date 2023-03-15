The Azure Devops scanner will create a new configuration item for each unique pipeline (combination of name and variables).

Each time the pipeline is run it will create a change for that configuration item.

```yaml
azureDevops:
  - organization: <Org Name>
    personalAccessToken:
      valueFrom:
        secretKeyRef:
          name: ado-credentials
          key: TOKEN
    projects:
      - <Project Name> # leave empty to select all projects
    pipelines:
      - <Pipeline Name> # leave empty to select all pipelines
    type: Release # the change type the pipeline produces
```

### AzureDevops

| Field                 | Description                                                                     | Scheme                                                                       | Required |
| --------------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | -------- |
| -                     | Specify inline fields, `id`, `name`, `items`, `type`, `transform`, and `format` | [**`BaseScraper`**](#basescraper)                                            |          |
| `organization`        | Specifies the name of the Azure DevOps organization to scrape                   | `string`                                                                     | `true`   |
| `personalAccessToken` | Specifies the personal access token to authenticate with Azure DevOps           | [`kommons.EnvVar`](https://pkg.go.dev/github.com/flanksource/kommons#EnvVar) | `true`   |
| `projects`            | Specifies the Azure DevOps projects to scrape                                   | `[]string`                                                                   | `false`  |
| `pipelines`           | Specifies the Azure DevOps pipelines to scrape                                  | `[]string`                                                                   | `false`  |
