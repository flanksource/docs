---
title: Helm
description: Recommended method for installing canary-checker
image: /static/img/icons/helm.svg
---
# Quick Start

The recommended method for installing Canary Checker is using [helm](https://helm.sh/)

## 1. Add the Flanksource helm repository

```bash
helm repo add flanksource https://flanksource.github.io/charts
helm repo update
```

## 2. Deploy Canary Checker using Helm

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
