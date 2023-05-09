# <img src='https://raw.githubusercontent.com/flanksource/flanksource-ui/main/src/icons/azure-devops.svg' style='height: 32px'/> Azure Devops

Azure Devops checks for healthy pipeline runs.

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: azure-devops
spec:
  interval: 300
  azureDevops:
    - project: Demo1
      pipeline: ^windows-
      personalAccessToken: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
      organization: flanksource
      variable:
        env: prod
      branch:
        - main
      thresholdMillis: 60000 # 60 seconds
```

| Field                 | Description                                                                  | Scheme                                                                        | Required |
| --------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | -------- |
| `name`                | Name of the check                                                            | `string`                                                                      |          |
| `description`         | Description for the check                                                    | `string`                                                                      |          |
| `icon`                | Icon for overwriting default icon on the dashboard                           | `string`                                                                      |          |
| `labels`              | Labels for check                                                             | `map[string]string`                                                           |          |
| `test`                | Template to test the result against                                          | [`Template`](../concepts/templating.md)                                       |          |
| `display`             | Template to display the result in                                            | [`Template`](../concepts/templating.md)                                       |          |
| `transform`           | Template for transformation                                                  | [`Template`](../concepts/templating.md)                                       |          |
| `connection`          | Name of the connection. It'll be used to populate the personal access token. | `string`                                                                      |          |
| `organization`        | Name of the Azure Organization.                                              | `string`                                                                      | `true`   |
| `personalAccessToken` | Azure personal access token.                                                 | [`types.EnvVar`](https://pkg.go.dev/github.com/flanksource/duty/types#EnvVar) | `true`   |
| `project`             | The name or ID of the project.                                               | `string`                                                                      | `true`   |
| `pipeline`            | Name/Regexp to select the interested pipeline.                               | `string`                                                                      | `true`   |
| `variables`           | Only match those runs that match these variables                             | `map[string]string`                                                           | `false`  |
| `branch`              | Only match those runs that are run on these branch.                          | `[]string`                                                                    | `false`  |
| `thresholdMillis`     | Maximum duration of a run after which it's considered unhealthy.             | `int`                                                                         | `false`  |
