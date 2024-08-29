# Authentication

Mission Control uses the Kubernetes ValuesFrom pattern to retrieve sensitive values like usernames, password and access keys.

In this example we show how to use a Kubernetes secret, to retrieve an elasticsearch username and password

1. First we create the secret:

```console
kubectl create secret generic es-secret \
--from-literal=ES_USERNAME='<YOUR_ELASTIC_SEARCH_USERNAME>' \
--from-literal=ES_PASSWORD='<YOUR_ELASTIC_SEARCH_PASSWORD>'
```

2. Then map the secrets into the config

```yaml title="http-basic-auth-secret.yaml"
apiVersion: apm-hub.flanksource.com/v1
kind: LoggingBackend
metadata:
  name: k8s-backend
spec:
  backends:
    - elasticsearch:
      ...
      username:
        valueFrom:
          secretKeyRef:
            name: es-secret
            key: ES_USERNAME
      password:
        valueFrom:
          secretKeyRef:
            name: es-secret
            key: ES_PASSWORD

```

For more details see [connections](/connections)
