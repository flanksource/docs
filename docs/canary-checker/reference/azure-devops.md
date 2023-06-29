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

| Field                     | Description                                                  | Scheme                                            | Required |
| ------------------------- | ------------------------------------------------------------ | ------------------------------------------------- | -------- |
| **`organization`**        | Name of the Azure Organization.                              | `string`                                          | true     |
| **`project`**             | The name or ID of the project.                               | `string`                                          | true     |
| **`pipeline`**            | Name/Regexp to select the interested pipeline.               | `string`                                          | true     |
| `variables`               | Only match those runs that match these variables             | `map[string]string`                               |          |
| `branch`                  | Only match those runs that are run on these branch.          | `[]string`                                        |          |
| `thresholdMillis`         | Maximum duration of a run after which it's considered unhealthy. | `int`                                             |          |
| `*`                       | All other commons field                                      | [*Common*](../common)                             |          |
| **Connection**            |                                                              |                                                   |          |
| `connection`              | Connection Name e.g. `connection://azuredevops/org` Mutually exclusive with `personalAccessToken` | `string`                                          |          |
| **`personalAccessToken`** | Mutually exclusive with `connection`, See [Creating ADO PAT's](https://learn.microsoft.com/en-us/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops&tabs=Windows) | [*EnvVar*](../../concepts/authentication/#envvar) | true     |
