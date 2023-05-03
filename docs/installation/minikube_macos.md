# Self host Mission Control using Minikube  
## Initial Set up

Helm must be installed to use the charts. Refer the Helm documentation to get started.
With Helm installed and running, add the Flanksource Helm repository as shown below:
```console
helm repo add flanksource https://flanksource.github.io/charts
helm repo update
```

## Env details/prerequisites

- Docker Desktop
- Helm
- Kubectl

## Start Minikube

1. Install Minikube: [https://minikube.sigs.k8s.io/docs/start/](https://minikube.sigs.k8s.io/docs/start/)
2. `minikube start --cpus=max --memory=max`

## Create Flanksource namespace + Secret

1. `kubectl create namespace flanksource`
2. `kubectl -n flanksource create secret generic incident-commander-smtp`

## [Custom TLS certificate with ingress addon](https://minikube.sigs.k8s.io/docs/tutorials/custom_cert_ingress/)

1. Install `mkcert` using `brew install mkcert`  or [https://github.com/FiloSottile/mkcert](https://github.com/FiloSottile/mkcert)
2. `mkcert -install`
3. `mkcert incident-manager-ui.local localhost 127.0.0.1`
4. `kubectl -n flanksource create secret tls mission-control-tls --key incident-manager-ui.local-key.pem --cert incident-manager-ui.local.pem`
5. `minikube addons configure ingress`
6. `minikube addons enable ingress`

## Install Mission Control

1. `helm repo add flanksource [https://flanksource.github.io/charts](https://flanksource.github.io/charts)`
2. `helm repo update`
3. `helm install flanksource flanksource/mission-control -n flanksource -v 0.1.21` 
[Check the latest chart release here.](https://github.com/flanksource/mission-control-chart/releases?page=1)
4. Create another tls-values.yaml file with the following values:

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

5. `helm upgrade flanksource flanksource/mission-control -n flanksource -f trial-values.yaml`

## Access Mission Control UI

1. Add line similar to the following one to the bottom of the `/etc/hosts` file on your computer (you will need administrator access) 

   `127.0.0.1        incident-manager-ui.local`

2. `minikube tunnel`
3. [https://incident-manager-ui.local/login](https://incident-manager-ui.local/login)
4. Username: **admin@local**  
Pass: **admin**

## Validation steps

TBD