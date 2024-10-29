---
title: Kubectl Access
---

Mission Control SaaS instances are deployed on dedicated [vCluster](https://www.vcluster.com/) instances.

Mission Control configuration is managed through Kubernetes Custom Resource Definitions (CRDs). Depending on your deployment model, you may need to apply resources directly to the vCluster. To facilitate this, you can download a `kubeconfig` file after authentication.

    <Screenshot img="/img/download-kubeconfig.png" size="400px"/>

The access token provided has role-based permissions limited to either [mission-control-reader](https://github.com/flanksource/mission-control-chart/blob/main/chart/templates/rbac.yaml#L130-L143) or [mission-control-writer](https://github.com/flanksource/mission-control-chart/blob/main/chart/templates/rbac.yaml#L145C1-L169C17), based on your selected role. Use this `kubeconfig` file to interact with your Mission Control SaaS instance via `kubectl`.

:::tip Production
For production environments, it is recommended to use GitOps tools like Argo CD or Flux to manage configurations rather than applying them directly with kubectl. Use the kubeconfig file to configure your GitOps tool to target the Mission Control SaaS instance.
:::

1. Save the kubeconfig to your GitOps cluster:

   ```shell
   kubectl create secret generic mission-control-kubeconfig \
     -n flux-system \
     --from-file=KUBECONFIG=./kubeconfig
   ```

1. Reference the kubeconfig when deploying Mission Control manifests:

   ```yaml
   apiVersion: kustomize.toolkit.fluxcd.io/v1
   kind: Kustomization
   metadata:
     name: mission-control-config
     namespace: flux-system
   spec:
     interval: 10m
     path: ./
     prune: true
     sourceRef:
       kind: GitRepository
       name: mission-control-gitops
     kubeConfig:
       secretRef:
         name: mission-control-kubeconfig
         key: KUBECONFIG
   ```
