# <img src='https://raw.githubusercontent.com/flanksource/flanksource-ui/main/src/icons/github.svg' style='height: 32px'/> Github Check

This check will execute a SQL style query against a github repo using [github.com/askgitdev/askgit](https://github.com/askgitdev/askgit).

```
SELECT count(*) from commits
SELECT count(*) FROM commits WHERE author_email = 'user@email.com'
```

??? example

    ```yaml
    apiVersion: canaries.flanksource.com/v1
    kind: Canary
    metadata:
      name: github-check
    spec:
      schedule: "@every 1m"
      github:
        - githubToken: b20c55f6bfac8828690ec2f4e2da29790c80aa3d7801a119f0ea6b045d2d2da1
    ```

| Field         | Description                                                                                                   | Scheme                                                                       | Required |
| ------------- | ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | -------- |
| `name`        | Name of the check.                                                                                            | `string`                                                                     |          |
| `description` | Description for the check.                                                                                    | `string`                                                                     |          |
| `icon`        | Icon for overwriting default icon on the dashboard.                                                           | `string`                                                                     |          |
| `labels`      | Labels for check.                                                                                             | `map[string]string`                                                          |          |
| `test`        | Template to test the result against.                                                                          | [`Template`](#template)                                                      |          |
| `display`     | Template to display the result in.                                                                            | [`Template`](#template)                                                      |          |
| `transform`   | Template for transformation.                                                                                  | [`Template`](#template)                                                      |          |
| `query`       | Query to be executed.<br> Read [here](https://github.com/askgitdev/askgit) for more details regarding syntax. | `string`                                                                     |          |
| `githubToken` | Expected digest of the pulled image.                                                                          | [`kommons.EnvVar`](https://pkg.go.dev/github.com/flanksource/kommons#EnvVar) |          |

## Scheme Reference

### Template

| Field        | Description                                      | Scheme   | Required |
| ------------ | ------------------------------------------------ | -------- | -------- |
| `jsonPath`   | Specify path to JSON element for use in template | `string` |          |
| `template`   | Specify Go template for use                      | `string` |          |
| `expr`       | Specify expression for use in template           | `string` |          |
| `javascript` | Specify javascript syntax to run for template    | `string` |          |
