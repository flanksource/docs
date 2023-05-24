
# Installation

Canary Checker can be deployed to a Kubernetes cluster via Helm.

```bash
helm repo add flanksource https://flanksource.github.io/charts
helm repo update flanksource
```

Create a values file based on
[values.yaml](https://github.com/flanksource/canary-checker/blob/master/chart/values.yaml).
You only need to define things that are different from the defaults listed in
that file. After configuring the values.yaml file, install Canary Checker with

```bash
helm install \
    --namespace canary-checker \
    -f values.yaml \
    flanksource/canary-checker
```
