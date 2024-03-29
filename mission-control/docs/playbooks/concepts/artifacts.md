# Artifacts

Artifacts allow you to archive files generated by playbook actions to a file store of your choice.

## Filestores

- AWS S3
- Google Cloud Storage
- SFTP
- SMB
- Local Filesystem

## Setting up artifact store

One of the above filestores can be used as the global artifact store. To setup an artifact store, pass the connection name of the store using the `artifact-connection` flag. If the artifact connection isn't setup, the artifacts are simply ignored.

Example:

```bash
mission-control --artifact-connection='connection://sftp/artifacts'
```

## Archiving artifacts

The following actions support archiving artifacts

- [Exec](../actions/exec.md)
- [Pod](../actions/pod.md)

The only configuration required on the action is to provide the path(s) of the artifacts generated by the actions.

### Ex1. Archiving `/tmp/results/` directory

For the following script in an exec action

```
mkdir -p /tmp/results
curl -sL 'https://example.com' > /tmp/results/example.com
curl -sL 'https://flanksource.com' > /tmp/results/flanksource.com
```

one can provide the artifact paths as follows

```yaml title="archive-websites.yaml"
apiVersion: mission-control.flanksource.com/v1
kind: Playbook
metadata:
  name: archive-websites
spec:
  actions:
    - name: Download example.com and flanksource.com
      exec:
        script: |
          mkdir -p /tmp/results
          curl -sL 'https://example.com' > /tmp/results/example.com
          curl -sL 'https://flanksource.com' > /tmp/results/flanksource.com
        artifacts:
          - path: /tmp/results/example.com
          - path: /tmp/results/flanksource.com
```

or, use a glob as

```yaml
artifacts
  - path: '/tmp/results/*.com'
```

### Ex2. Archiving artifacts from stdout/stderr

The path field accepts two special paths

- `/dev/stdout`
- `/dev/stderr`

```yaml title="archive-website.yaml"
apiVersion: mission-control.flanksource.com/v1
kind: Playbook
metadata:
  name: archive-website
spec:
  actions:
    - name: Archive response of example.com
      exec:
        script: |
          curl -sL 'https://example.com'
        artifacts:
          - path: /dev/stdout
          - path: /dev/stderr
```
