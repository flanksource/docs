# <img src='https://raw.githubusercontent.com/flanksource/flanksource-ui/main/src/icons/git.svg' style='height: 32px'/> Git

Execute as SQL style query against a github repo using [mergestat-lite](https://github.com/mergestat/mergestat-lite).

```

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: github-check
spec:
  schedule: "@every 1m"
  github:
    - githubToken: <toke>
    	query: SELECT count(*) FROM commits WHERE author_email = 'user@email.com'
```

| Field          | Description                                                  | Scheme                                            | Required |
| -------------- | ------------------------------------------------------------ | ------------------------------------------------- | -------- |
| **`query`**    | Query to be executed.<br>See [mergestat-lite](https://github.com/mergestat/mergestat-lite).for more details regarding syntax. | `string`                                          |          |
| `*`            | All other common fields                                      | [*Common*](../common)                             |          |
| **Connection** |                                                              |                                                   |          |
| `connection`   | Path of an existing connection e.g. `connection://github/org`. Mutually exclusive with `credentials` | [Connection](../../concepts/connections)          |          |
| `githubToken`  | Github access token. Mutually exclusive with `connection`    | [*EnvVar*](../../concepts/authentication/#envvar) | Yes      |
