In order to facilitate storing credentials for your backends, `apm-hub` supports Kuberenetes Secrets. Alternatively, you can also store those credentials right into the config file itself.

## A. Credentials in Kubernetes Secrets

[Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/) are secure objects which store sensitive data, such as passwords, tokens, or keys. It provides a means to attach confidential data into your application. This information can be attached to a Pod or container image that may require the information to operate.

### Create Sample Kubernetes Secret

Let's take a quick look at creating Kubernetes secrets for your Elastic Search credentials.

```sh
kubectl create secret generic <secret-name> \
--from-literal=ES_USERNAME='<YOUR_ELASTIC_SEARCH_USERNAME>' \
--from-literal=ES_PASSWORD='<YOUR_ELASTIC_SEARCH_PASSWORD>'
```

View the contents of your generated secret with the following command:

```bash
# Get content for secret
kubectl get secret <secret-name> -o jsonpath='{.data}' | jq

# Output
# {
#   "ES_USERNAME":"<base-64-encoded-YOUR_ELASTIC_SEARCH_USERNAME>",
#   "ES_PASSWORD":"<base-64-encoded-YOUR_ELASTIC_SEARCH_PASSWORD>"
# }
```

The secret is base64 encoded. To decode the secret, you can use the following command:

```sh
kubectl get secret <secret-name> -o jsonpath='{.data.ES_USERNAME}' | base64 --decode
kubectl get secret <secret-name> -o jsonpath='{.data.ES_PASSWORD}' | base64 --decode
```

### Recommendations

Kubernetes Secrets are, by default, stored unencrypted in the API server's underlying data store (etcd). Anyone with API access can retrieve or modify a Secret, and so can anyone with access to etcd. With this in mind, it is recommended to implement some level of security to prevent unauthorized access to your Kubernetes secrets.
You may consider the following for your encryption and security needs:

- [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/getting-started/)
- [Bitnami Sealed Secrets](https://www.youtube.com/watch?v=xd2QoV6GJlc&ab_channel=DevOpsToolkit)
- [KSOPS](https://blog.oddbit.com/post/2021-03-09-getting-started-with-ksops/)
- [Enable Encryption at Rest](https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/)
- [Enable or configure RBAC rules](https://kubernetes.io/docs/reference/access-authn-authz/authorization/)

## B. Credentials in config file

If you're not using Kubernetes Secrets, you can store the credentials right into the config file itself.

```yaml
backends:
  - elasticsearch:
      ...
      address: 'https://logs.example.com'
      username:
        value: 'elastic'
      password:
        value: 'mystrongpassword'
      ...
```
