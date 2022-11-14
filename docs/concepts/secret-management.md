# Secret Management with Kubernetes Secrets
[Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/) are secure objects which store sensitive data, such as passwords, tokens, or keys. This information can be attached to a Pod or container image that may require the information to operate. With Kubernetes Secrets, it provides a means to attach confidential data into your application.
In this guide, you will see how to create a Kubernetes secret, attach it to your application or service you want to run.
## Create Sample Kubernetes Secret
For this section, to experience Kubernetes secrets management in action you'll create a sample Kubernetes Secret which contains your AWS credentials such as `AccessKey` and `SecretAccessKey`. See the [AWS documentation](https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/getting-your-credentials.html) for more information on obtaining AWS credentials.
With your credentials obtained, perform the following commands to create a Kubernetes secret containing your AWS credentials:
```bash
kubectl create secret generic <secret-name> \ 
--from-literal=AWS_ACCESS_KEY_ID="<aws_access_key_id>" \ 
--from-literal=AWS_SECRET_ACCESS_KEY="<aws_secret_access_key>"
```
View the contents of your generated secret with the following command:
```bash
# Get content for secret
kubectl get secret <secret-name> -o jsonpath='{.data}'

# Decode secret
kubectl get secret <secret-name> -o jsonpath='{.data.AWS_ACCESS_KEY_ID}' | base64 --decode
kubectl get secret <secret-name> -o jsonpath='{.data.AWS_SECRET_ACCESS_KEY}' | base64 --decode
```
Output:
```
{"AWS_ACCESS_KEY_ID":"<base-64-encoded-aws_access_key_id>","AWS_SECRET_ACCESS_KEY":"<base-64-encoded-aws_secret_access_key>"}
```
The steps above can be used to create Kubernetes secrets for other credentials, such as ElasticSearch, Docker, Helm, and more.
## Recommendations
Kubernetes Secrets are, by default, stored unencrypted in the API server's underlying data store (etcd). Anyone with API access can retrieve or modify a Secret, and so can anyone with access to etcd. With this in mind, it is recommended to implement some level of security to prevent unauthorized access to your Kubernetes secrets. 
You may consider the following for your encryption and security needs:

- [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/getting-started/)
- [Bitnami Sealed Secrets](https://www.youtube.com/watch?v=xd2QoV6GJlc&ab_channel=DevOpsToolkit)
- [KSOPS](https://blog.oddbit.com/post/2021-03-09-getting-started-with-ksops/)
- [Enable Encryption at Rest](https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/)
- [Enable or configure RBAC rules](https://kubernetes.io/docs/reference/access-authn-authz/authorization/)