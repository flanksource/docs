---
title: Minikube (Linux)
description: Run Mission Control on Minikube
slug: installation/minikube
---

:::info Prerequisites
To install and run Mission Control you need to have the following prerequisites:

- [minikube](https://minikube.sigs.k8s.io/docs/start/) installed and running
- [mkcert](https://github.com/FiloSottile/mkcert) and [helm](https://helm.sh/docs/intro/install/) installed
- 500-1000m of CPU and 2GB of Memory free
- Persistent Volumes with 20GB+ of storage or an external postgres database
- (Optional) SMTP Server (For sending notifications and invites)
:::

## Create Flanksource namespace & Secret

1. `kubectl create namespace flanksource`
2. `kubectl -n flanksource create secret generic incident-commander-smtp`

##

<Step step={1}  name="Configure Ingress">
```bash
mkcert -install
mkcert incident-manager-ui.local localhost 127.0.0.1
kubectl -n flanksource create secret tls mission-control-tls --key incident-manager-ui.local-key.pem --cert incident-manager-ui.local.pem
minikube addons configure ingress
minikube addons enable ingress
```

See [Custom TLS certificate with ingress addon](https://minikube.sigs.k8s.io/docs/tutorials/custom_cert_ingress/)
</Step>

<Step step={2}  name="Install Mission Control">

</Step >

## Install Mission Control

1. `helm repo add flanksource [https://flanksource.github.io/charts](https://flanksource.github.io/charts)`
2. `helm repo update`
3. `helm install flanksource flanksource/mission-control -n flanksource -v 0.1.21`
[Check the latest chart release here.](https://github.com/flanksource/mission-control-chart/releases?page=1)
4. Create another local-values.yaml file with the following values:

```yaml
kratosURL: http://mission-control:8080/kratos/
flanksource-ui:
  oryKratosURL: http://incident-manager-ui.local/kratos
  backendURL: http://mission-control:8080
  ingress:
    annotations:
      kubernetes.io/tls-acme: "true"
    host: incident-manager-ui.local
    tls:
      - hosts:
          - incident-manager-ui.local
        secretName: mission-control-tls
```

5. `helm upgrade flanksource flanksource/mission-control -n flanksource -f local-values.yaml`

## Access Mission Control UI

1. Add line similar to the following one to the bottom of the `/etc/hosts` file on your computer (you will need administrator access)

   `127.0.0.1        incident-manager-ui.local`

2. `minikube tunnel`
3. [https://incident-manager-ui.local/login](https://incident-manager-ui.local/login)
4. Username: **admin@local**
Pass: **admin**

## Validation steps

TBD
