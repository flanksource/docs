## <img src='https://raw.githubusercontent.com/flanksource/flanksource-ui/main/src/icons/dockerPush.svg' style='height: 32px'/> DockerPush

DockerPush check will try to create and push a Docker image to a specified registry.
/*
??? example
     ```yaml
     apiVersion: canaries.flanksource.com/v1
     kind: Canary
     metadata:
       name: docker-push-check
     spec:
       interval: 30
       dockerPush:
         - image: ttl.sh/flanksource-busybox:1.30
           auth:
             username: 
               valueFrom: 
                 secretKeyRef:
                   name: docker-credentials
                   key: USERNAME
             password: 
               valueFrom: 
                 secretKeyRef:
                   name: docker-credentials
                   key: PASSWORD
     
     ```

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `auth` | Username and password value, configMapKeyRef or SecretKeyRef for elasticsearch server | [*Authentication*](#authentication) |  |
| `description` | Description for the check | *string* |  |
| `icon` | Icon for overwriting default icon on the dashboard | *string* |  |
| **`image`** | Full path to image, including registry | *string* | Yes |
| `name` | Name of the check | *string* |  |

---
# Scheme Reference
## Authentication

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| **`password`** | Set password for authentication using string, configMapKeyRef, or SecretKeyRef. | [*kommons.EnvVar*](https://pkg.go.dev/github.com/flanksource/kommons#EnvVar) | Yes |
| **`username`** | Set username for authentication using string, configMapKeyRef, or SecretKeyRef. | [*kommons.EnvVar*](https://pkg.go.dev/github.com/flanksource/kommons#EnvVar) | Yes | 