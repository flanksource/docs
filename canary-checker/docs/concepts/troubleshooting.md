# Troubleshooting

## Increase the log verbosity of a Canary using `trace` annotation

To add detailed debug information related to a specific Canary to the log output, add a `debug: true` or `trace: true` annotation to the Canary resource:

```yaml trace.yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: http-check
  annotations:
    trace: 'true'
spec:
  http:
    - url: https://httpbin.demo.aws.flanksource.com/headers
```

![](/img/trace-screenshot.png)

:::danger Sensitive Data & Excessive Logging
Trace level logging will return the HTTP response body which may contain sensitive data (The authorization headers will be sanitized)
:::

### Trace Levels

| Level   | Logs                                                                                |
| ------- | ----------------------------------------------------------------------------------- |
| `debug` | - HTTP Request and Response Header                                                  |
| `trace` | - HTTP Request and Response Header <br/>- HTTP Response Body <br />- Custom Metrics |

## Run a Canary immediately using `next-runtime` annotation

To run a canary outside of its normal schedule add the annotation:

```bash
 kubectl annotate canary <canary> next-runtime=$(date -Iseconds)
```

## Temporarily pause a Canary using `suspend` annotation

```bash
 kubectl annotate canary <canary> supend=true
```

## Run a Canary from the CLI

The easiest method of troubleshooting is to run the `canary-checker run` command with a copy of the canary resource locally. This increases velocity of troubleshooting iteration, and also prevents the possibility of sensitive information in verbose output being leaked to logging systems by the canary pod.

### Local permissions

The local canary-checker execution may need to be provided with the permissions required to run the check.
Depending on the check this might include:

- The ability to read secrets or other objects in the cluster
- Access to cloud APIs, such as AWS, GCP or Azure API interfaces
- Locally installed binaries invoked by `exec` scripts

The following local settings will affect the permissions available for use by the canary-checker executable:

- The active kubectl context as specified in `KUBECONFIG`
- The AWS profile specified in `AWS_DEFAULT_PROFILE` or `AWS_PROFILE`, or the AWS credentials specified by `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`
- The GCP credentials configured through `gcloud auth application-default login`
- The `$PATH` configuration

### Local Canary execution

Install the CLI as per the [Installation instructions](../cli)
Generate a local resource file with the trace annotation enabled:

```bash
    kubectl get canary test-canary -n test-namespace -o yaml | yq '.metadata.annotations.trace = "true"' > test-canary.yaml
```

Or generate a resource file by hand, then run the canary-checker CLI:

```bash
    canary-checker run -v test-canary.yaml
```

## Logging Levels

Logging levels can be set using `-v` `--db-log-level` and e.g. `-vvv` which is equivalent to `-v=3`

| Level       | Description                                      |
| :---------- | :----------------------------------------------- |
| `info` (0)  | Startup and informational messages               |
| `debug` (1) |                                                  |
| `trace` (2) |                                                  |
| `trace` (3) | Prints all canary failures                       |
| `trace` (4) | Prints all canary passes                         |
| `trace` (5) | Enables canary level debug for all canaries      |
| `trace` (6) | Enables canary level trace for all canaries      |
| `trace` (7) | Kubernetes API calls                             |
| `trace` (8) | Kubernetes API calls with responses              |
| `trace` (9) | Kubernetes API calls with requests and responses |

Database level logging can be enabled using `--db-log-level`

| Level       | Description                             |
| :---------- | :-------------------------------------- |
| `debug` (1) | Print SQL statements without parameters |
| `trace` (2) | Print SQL statements with parameters    |

And Kubernetes Operator loggined with ``--k8s-log-level`

| Level       | Description                             |
| :---------- | :-------------------------------------- |
| `warn` (-1) | Print SQL statements without parameters |
| `info` (0)  | Prints events                           |
| `debug` (1) |                                         |
| `trace` (2) |                                         |
