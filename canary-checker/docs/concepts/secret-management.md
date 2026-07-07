---
title: Env Vars
sidebar_custom_props:
  icon: shield-lock
sidebar_position: 10
---

import { K8SCustomresourcedefinition } from '@flanksource/icons/mi'
import { K8SConfigmap } from '@flanksource/icons/mi'
import { K8SSecret } from '@flanksource/icons/mi'
import { Helm } from '@flanksource/icons/mi'
import { K8SServiceaccount } from '@flanksource/icons/mi'

Mission Control uses the Kubernetes ValuesFrom pattern to retrieve sensitive values like usernames, password and access keys.

Whenever a field uses the `EnvVar` object type you have the option of specifying the value in multiple ways.

1. Statically in the `value`
1. From a <K8SConfigmap size={16}/> Kubernetes Config Map via `configMapKeyRef`
1. From a <K8SSecret size={16}/> Kubernetes Secret via `secretKeyRef`
1. From a <Helm size={16}/> Helm chart computed `values.yaml` via `helmRef`
1. From a <K8SServiceaccount size={16}/> Kubernetes service account using `serviceAccount`

## Static Values

:::warning
Avoid in-lining secrets, use `valueFrom` and <CommonLink to="authentication">EnvVar</CommonLink>
:::

Using a HTTP health check as an example for static values:

```yaml title="http-basic-auth-static.yaml" file=<rootDir>/modules/canary-checker/fixtures/minimal/http_auth_static_pass.yaml

```

## <K8SConfigmap size={25}/> Kubernetes Config Maps

To use a configmap, we first need to create the configmap:

```bash
kubectl create configmap basic-auth --from-literal=user=hello --from-literal=pass=world -n default
```

```yaml title="http-basic-auth-configmap.yaml" file=<rootDir>/modules/canary-checker/fixtures/minimal/http_auth_from_config_map.yaml

```

## <K8SSecret size={25}/> Kubernetes Secrets

To use a secret, first we create the secret:

```bash
kubectl create secret generic basic-auth --from-literal=user=hello --from-literal=pass=world -n default
```

```yaml title="http-basic-auth-secret.yaml" file=<rootDir>/modules/canary-checker/fixtures/minimal/http_auth_from_secret.yaml

```

## <Helm size={25}/> Helm Values

To use a secret, first we deploy a helm chart

```bash
helm install podinfo  podinfo/podinfo -n podinfo --set ingress.enabled=true
```

```yaml title="http-from-helm.yaml" file=<rootDir>/modules/canary-checker/fixtures/minimal/http_auth_from_helm_ref.yaml

```

## <K8SServiceaccount size={25}/> Kubernetes Service Accounts

Checks can use service accounts for authentication with external services that have existing trust established

```yaml title="http-service-accounts.yaml" file=<rootDir>/modules/canary-checker/fixtures/minimal/http_auth_from_service_account.yaml

```

:::note
To issue service account tokens, grant the `canary-checker-sa` service account access to `serviceaccounts/token`:

```bash
kubectl create clusterrole canary-checker-sa-issuing \
  --verb=create,get \
  --resource=serviceaccounts,serviceaccounts/token

kubectl create clusterrolebinding canary-checker-sa-issuing-rolebinding \
  --clusterrole=canary-checker-sa-issuing \
  --serviceaccount=canary-checker:canary-checker-sa
```

:::
