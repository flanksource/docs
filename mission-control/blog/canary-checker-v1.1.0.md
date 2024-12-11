---
title: Canary Checker v1.1.0 Release
slug: canary-checker-v1.1.0
authors: [moshe]
tags: [release, canary-checker]
hide_table_of_contents: false
---


<!--truncate-->
We are happy to announce the latest release of canary-checker, the highlight of which is Kubernetes resource checker that enables continuous testing of Crossplane, Helm, Flux and other K8s resources.

## Checks

- ⛰️`kubernetes`, `kubernetesResource` - Added support for external `kubeconfig`
- ⛰️ `kubernetesResource` - Improved the speed of deleting Kubernetes resources
- ⛰️ `http`, `prometheus`  - Added OAuth and TLS Client options
- ⛰️ `http` - Support templating `url` from env vars
- ⛰️ `aws*` - Added support for assumeRole
- 🐛 `webhook` - Fixed webhook handling and added 📚 example for githubstatus.com
- 🐛 `kubernetes` - Fixed health handling
- 📚 `kubernetesResource` - Added [crossplane example](https://canarychecker.io/reference/kubernetes-resource#examples)

## Docker Image

- ⛰️ Added ARM64 support
- ⛰️ Added Powershell
- ⚡Reduced image size by trimming AWS, Azure and gcloud installations

## Chart

- ⚙️ Added `global.imageRegistry`
- ⚙️ Added `otel.labels`
- 🛡️ Added `serviceAccount.rbac.clusterRole: false` to run canary-checker without cluster roles
- 🛡️ Added `serviceAccount.rbac.*` flags to enable least privilege RBAC configuration
- ⚙️ Added `podAnnotations`, `volumes`, `tolerations`, `affinity`, `nodeSelector`
- ⚙️ Added `values.schema.json` and `values.schema.deref.json` (A JSON schema with all upstream K8S definitions inlined)

## Templating

- ⛰️ Added [`k8s.isHealthy`](/reference/scripting/cel#k8sishealthy)
- ⛰️ Added [`jq`](/reference/scripting/cel#jq)
- ⛰️ Added support for custom delimiters using `# gotemplate: left-delim=$[[ right-delim=]]`


## Breaking

- Removed `configDb`  check,  Use `catalog` (Config DB) instead
- Removed `ec2` check, Use `kubernetesResource` with Crossplane or ACK instead


## New Contributors ❤️


Big thanks to our contributors: [@nalshamaajc](https://github.com/nalshamaajc), [@bosunski](https://github.com/bosunski), [@DanielCastronovo](https://github.com/DanielCastronovo), [@dmorrowjc](https://github.com/dmorrowjc), [@RaymiiOrg](https://github.com/RaymiiOrg), [@fullykubed](https://github.com/fullykubed), [@krohrsb](https://github.com/krohrsb), [@sosheskaz](https://github.com/sosheskaz), [@PrestonCS](https://github.com/PrestonCS), [@miry](https://github.com/miry), [@oc-christopher-billett](https://github.com/oc-christopher-billett), [@LarsFronius](https://github.com/LarsFronius), [@christianshub](https://github.com/christianshub), [@EugeneBad](https://github.com/EugeneBad)

    <img src="https://contrib.rocks/image?repo=flanksource/canary-checker" className="pt-10" />



