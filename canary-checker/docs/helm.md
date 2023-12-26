---
title: Helm
description: Recommended method for installing canary-checker
image: /static/img/icons/helm.svg
---
# Quick Start

The recommended method for installing Canary Checker is using [helm](https://helm.sh/)

## 1. Deploy Canary Checker

### Using Helm

Add the Flanksource helm repository

```bash
helm repo add flanksource https://flanksource.github.io/charts
helm repo update
```

To install into a new `canary-checker` namespace, run

```bash
helm install \
  canary-checker \
  flanksource/canary-checker \
 -n canary-checker \
 --create-namespace \
 --wait \
 -f values.yaml
```

```yaml title="values.yaml"
flanksource-ui:
  ingress:
    host: canary-checker.127.0.0.1.nip.io
    annotations:
      kubernetes.io/ingress.class: nginx
      kubernetes.io/tls-acme: "true"
    tls:
      - secretName: canary-checker-tls
        hosts:
        - canary-checker.127.0.0.1.nip.io
```

### Using Flux CD

```yaml title=helmrelease.yaml
apiVersion: v1
kind: Namespace
metadata:
  name: canary-checker
---
apiVersion: source.toolkit.fluxcd.io/v1beta2
kind: HelmRepository
metadata:
  name: flanksource
  namespace: canary-checker
spec:
  interval: 5m
  url: https://flanksource.github.io/charts
---
apiVersion: helm.toolkit.fluxcd.io/v2beta1
kind: HelmRelease
metadata:
  name: canary-checker
  namespace: canary-checker
spec:
  interval: 5m
  chart:
    spec:
      chart: canary-checker
      sourceRef:
        kind: HelmRepository
        name: flanksource
      interval: 1m
  values:
    flanksource-ui:
      ingress:
        host: canary-checker.127.0.0.1.nip.io
        annotations:
          kubernetes.io/ingress.class: nginx
          kubernetes.io/tls-acme: "true"
        tls:
          - secretName: canary-checker-tls
            hosts:
            - canary-checker.127.0.0.1.nip.io
```

```yaml title=canary-checker-kustomization.yaml
apiVersion: kustomize.toolkit.fluxcd.io/v1
kind: Kustomization
metadata:
  name: canary-checker
  namespace: flux-system
spec:
  interval: 5m
  sourceRef:
    kind: GitRepository
    name: <Flux Gitrepo Name>
  path: path/to/canary-checker/helmrelease/folder
  prune: true
  healthChecks: # wait for the HelmRelease to be reconciled with
    - apiVersion: helm.toolkit.fluxcd.io/v2beta1
      kind: HelmRelease
      name: canary-checker
      namespace: canary-checker
```

:::info
Note the default installation of canary-checker uses an embedded postgres database and does not persist history, see: [Database](database)
:::

## 3. Create a canary

```bash
cat <<EOF | kubectl apply -f -
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: http-check
spec:
  interval: 30
  http:
    - name: http pass response 200 status code
      url: https://httpbin.demo.aws.flanksource.com/status/200
EOF
```

## 4. Check the results via the [CLI](./cli)

```bash
kubectl get canary
```

```shell-session
NAME       INTERVAL     STATUS   LAST CHECK   UPTIME 1H       LATENCY 1H   LAST TRANSITIONED
http-check   30         Passed   13s          18/18 (100.0%)   480ms        13s
```

## 5. Access the dashboard

You can access the web dashboard by forwarding the port:

```bash
kubectl  -n canary-checker port-forward  svc/canary-checker-ui 8080:80
```
![](./images/http-checks.png)
[http://localhost:8080](http://localhost:8080)


To deploy an ingress for the dashboard, update the `values.yaml`:

```yaml
flanksource-ui:
  enabled: true
  ingress:
    annotations:
      kubernetes.io/tls-acme: "true"
    host: <DOMAIN>
    tls:
      - hosts:
          - <DOMAIN>
        secretName: ingress-tls
```
