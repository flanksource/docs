
The Azure Devops  scanner will create a new configuration item for each unique pipeline (combination of name and variables).

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
