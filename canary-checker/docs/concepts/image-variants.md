---
title: Image Variants
sidebar_custom_props:
  icon: docker
---

Canary checker comes with 3 image variants:

## [Slim](https://github.com/flanksource/canary-checker/blob/master/build/slim/Dockerfile)

- [arkade](https://github.com/alexellis/arkade)
- jq
- yq
- python3

## [Minimal](https://github.com/flanksource/canary-checker/blob/master/build/minimal/Dockerfile)

- [arkade](https://github.com/alexellis/arkade)
- kubectl
- [stern](https://github.com/stern/stern)
- [fblog](https://github.com/brocode/fblog)
- jq
- yq
- [sops](https://github.com//mozilla/sops)
- PowerShell 7
  - powershell-yaml
- python3
- [azure-cli](https://learn.microsoft.com/en-us/cli/azure/)
- [gcloud-cli](https://cloud.google.com/sdk/gcloud)
  - kubectl-oidc
  - gke-gcloud-auth-plugin
- [aws-cli](https://aws.amazon.com/cli/)

## [Full](https://github.com/flanksource/canary-checker/blob/master/build/full/Dockerfile)

Everything in the minimal image plus:

- [k6](https://github.com/grafana/k6)
- OpenJDK Temurin 21
- [JMeter](https://jmeter.apache.org/)
- [Robot Framework](https://robotframework.org/)
- [benthos](https://benthos.dev)
- [dsq](https://github.com/multiprocessio/dsq)
- [restic](https://restic.net/)

You can choose which variant to use in the helm chart using:

```bash
helm install flanksource/canary-checker --set image.type=full
```
