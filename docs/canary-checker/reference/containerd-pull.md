# <img src='https://raw.githubusercontent.com/flanksource/flanksource-ui/main/src/icons/containerdPull.svg' style='height: 32px'/> ContainerdPull

This check will try to pull a Docker image from specified registry using containerd and then verify its checksum and size.

??? example

    ```yaml
    apiVersion: canaries.flanksource.com/v1
    kind: Canary
    metadata:
      name: containerd-pull-check
    spec:
      interval: 30
      containerd:
        - image: docker.io/library/busybox:1.31.1
          expectedDigest: sha256:95cf004f559831017cdf4628aaf1bb30133677be8702a8c5f2994629f637a209
          expectedSize: 764556

    ```

| Field            | Description                                                               | Scheme                              | Required |
| ---------------- | ------------------------------------------------------------------------- | ----------------------------------- | -------- |
| `auth`           | Username and password value, configMapKeyRef or SecretKeyRef for registry | [_Authentication_](#authentication) |          |
| `description`    | Description for the check                                                 | string                              |          |
| `expectedDigest` | Expected digest of the pulled image                                       | _string_                            | Yes      |
| `expectedSize`   | Expected size of the pulled image                                         | _int64_                             | Yes      |
| `icon`           | Icon for overwriting default icon on the dashboard                        | _string_                            |          |
| **`image`**      | Full path to image, including registry                                    | _string_                            | Yes      |
| `name`           | Name of the check                                                         | string                              |          |

---

# Scheme Reference

## Authentication

| Field          | Description                                                                     | Scheme                                                                       | Required |
| -------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | -------- |
| **`password`** | Set password for authentication using string, configMapKeyRef, or SecretKeyRef. | [_kommons.EnvVar_](https://pkg.go.dev/github.com/flanksource/kommons#EnvVar) | Yes      |
| **`username`** | Set username for authentication using string, configMapKeyRef, or SecretKeyRef. | [_kommons.EnvVar_](https://pkg.go.dev/github.com/flanksource/kommons#EnvVar) | Yes      |
