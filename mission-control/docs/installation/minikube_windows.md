# Self host Mission Control using Minikube

## Env details/prerequisites

1. Docker
2. Helm
3. kubectl
4. `minikube` [https://minikube.sigs.k8s.io/docs/start/](https://minikube.sigs.k8s.io/docs/start/)
5. `mkcert` [https://github.com/FiloSottile/mkcert](https://github.com/FiloSottile/mkcert)

## Start Minikube

1. `minikube start`

## Create Flanksource namespace & Secret

1. `kubectl create namespace flanksource`
2. `kubectl -n flanksource create secret generic incident-commander-smtp`

## [Custom TLS certificate with ingress addon](https://minikube.sigs.k8s.io/docs/tutorials/custom_cert_ingress/)

```shell
mkcert -install
mkcert incident-manager-ui.local localhost 127.0.0.1
kubectl -n flanksource create secret tls mission-control-tls --key incident-manager-ui.local-key.pem --cert incident-manager-ui.local.pem
minikube addons configure ingress
minikube addons enable ingress
```

## Install Mission Control

```yaml title="values.yaml"
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

```shell
helm repo add flanksource https://flanksource.github.io/charts
helm repo update
helm install flanksource flanksource/mission-control -n flanksource --create-namespace -f values.yaml
```

## Access Mission Control UI

1. Add line similar to the following one to the bottom of the `/etc/hosts` file on your computer (you will need administrator access) *C:\Windows\System32\drivers\etc*

   `127.0.0.1        incident-manager-ui.local`

2. `minikube tunnel`
3. [https://incident-manager-ui.local/login](https://incident-manager-ui.local/login)
4. Username: **admin@local**
   Pass: **admin**
