# Artifacts

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
