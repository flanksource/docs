---
title: Playbooks
---
# <Icon name="flux"/> Flux Playbooks

import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import Git from '@site/docs/partials/\_git_all.mdx';

Mission control enhances a [flux](https://fluxcd.io/flux) deployment with:

1. An Argo style graph between Flux resources and the objects they create
2. A playbook library that includes a GUI for both day 2 operations with `flux` cli and a GitOps Approach
3. Health checks on all flux resources based on `status.conditions`
4. Alert silencing based on Flux hierarchy - that is, silence all alerts for objects created by a `Kustomization` or `HelmRlease`

The following playbooks work by calling the `flux` CLI directly

| Playbook                                                               | <Icon name="kustomize"/> Kustomization                  | <Icon name="helm"/> HelmRelease                         |
| ---------------------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- |
| <Icon name="flux">Suspend</Icon><Tooltip>Runs `flux suspend`</Tooltip> | <IoIosCheckmarkCircleOutline color='green' size={24} /> | <IoIosCheckmarkCircleOutline color='green' size={24} /> |
| <Icon name="flux">Resume</Icon><Tooltip>Runs`flux resume`</Tooltip>    | <IoIosCheckmarkCircleOutline color='green' size={24} /> | <IoIosCheckmarkCircleOutline color='green' size={24} /> |
| <Icon name="flux">Reconcile</Icon><Tooltip>Runs`flux resume`</Tooltip> | <IoIosCheckmarkCircleOutline color='green' size={24} /> | <IoIosCheckmarkCircleOutline color='green' size={24} /> |

### ClickOps

The following playbooks enable a ClickOps style of working, but with all changes implemented using standard pull request workflows, giving developers self-service, guardrail driven access to make changes without direct git access or expertise.

| Playbook                                                                                                                                                           | <Icon name="kustomize" > Kustomization</Icon>           | <Icon name="helm"> HelmRelease</Icon>                   | <Icon name="k8s-namespace"> Namespace</Icon>            | <Icon name="k8s-deployment"> Deployment</Icon>          |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------- |
| <Icon name="kustomize"> Edit </Icon> <Tooltip>Updates the YAML of a resource</Tooltip>                                                                             | <IoIosCheckmarkCircleOutline color='green' size={24} /> | <IoIosCheckmarkCircleOutline color='green' size={24} /> | <IoIosCheckmarkCircleOutline color='green' size={24} /> | <IoIosCheckmarkCircleOutline color='green' size={24} /> |
| <Icon name="kustomize"/> Create Kustomization<Tooltip>Creates a new `Kustomization` and inserts it into the file containing the selected `Kustomization`</Tooltip> | <IoIosCheckmarkCircleOutline color='green' size={24} /> |                                                         |                                                         |                                                         |
| <Icon name="k8s-namespace"/> Create Namespace<Tooltip>Creates a new folder with a `kustomization.yaml` and `namespace.yaml` and then adds it the `bases`</Tooltip> | <IoIosCheckmarkCircleOutline color='green' size={24} /> |                                                         |                                                         |                                                         |
| <Icon name="k8s-deployment"/> Create Deployment<Tooltip>Creates a new `Deployment` and inserts it into the `Kustomization` that created the namespace</Tooltip>    |                                                         |                                                         | <IoIosCheckmarkCircleOutline color='green' size={24} /> |                                                         |
| <Icon name="helm"/> Create Helm Chart<Tooltip>Creates a new `HelmRelease` and inserts it into the `Kustomization` that created the namespace</Tooltip>             |                                                         |                                                         | <IoIosCheckmarkCircleOutline color='green' size={24} /> |                                                         |
| <Icon name="helm"/> Update Values <Tooltip>Updates `.spec.values`</Tooltip>                                                                                        |                                                         | <IoIosCheckmarkCircleOutline color='green' size={24} /> |                                                         |                                                         |
| <Icon name="helm"/> Update Chart Version <Tooltip>Updates `.spec.chart.spec.version`</Tooltip>                                                                     |                                                         | <IoIosCheckmarkCircleOutline color='green' size={24} /> |                                                         |                                                         |
| <Icon name="scale-out" className="h-5 w-auto"/> Scale<Tooltip>Updates `.spec.replicas`</Tooltip>                                                                   |                                                         |                                                         |                                                         | <IoIosCheckmarkCircleOutline color='green' size={24} /> |
| <Icon name="scale-up" className="h-5 w-auto"/> Update Resources <Tooltip>Updates `containers[0].resources`</Tooltip>                                               |                                                         |                                                         |                                                         | <IoIosCheckmarkCircleOutline color='green' size={24} /> |
| <Icon name="docker"/> Update Image <Tooltip>Updates `containers[0].image`</Tooltip>                                                                                |                                                         |                                                         |                                                         | <IoIosCheckmarkCircleOutline color='green' size={24} /> |

### Just In Time (JIT) Access

Just In Time playbooks provide a mechnism to grant users access to a namespace for a short space of time, this works by creating a new `Rolebinding` resource and inserting it into the kustomization resources, and then after the expiry window deleting the resources from git.

This approach provides a single audit trail of who has received access, and limits the need for the control plane to have direct access to update permissions.

| Playbook                                                                                                             | <Icon name="k8s-namespace"/> Namespace                  |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| <Icon name="k8s-rolebinding"/> Request Access <Tooltip>Creates a new `RoleBinding` with an optional expiry</Tooltip> | <IoIosCheckmarkCircleOutline color='green' size={24} /> |

## Getting Started

:::info Prerequisites
To enable the Flux integration you need

- Mission Control [installed](/installation/)
- [kubectl](/installation/saas/kubectl) access to the Mission Control instance
  :::

1. Create a github connection
   <p/>
   :::note Optional
   This step is optional if you do not plan to use the ClickOps playbooks.
   :::

   <Git/>

2. Install the [mission-control-playbooks-flux](https://artifacthub.io/packages/helm/flanksource/mission-control-playbooks-flux) chart

   <Helm chart="mission-control-flux"
   createNamespace={false}
   createRepo={false}
   values={{
     "git.type": "github",
     "git.connection": "connection://mission-control/github",
   }}/>

3. Annotate resources with `config.kubernetes.io/origin`

   The annotation is added by kustomize when the `originAnnotations` build flag is set:

   ```yaml title='kustomization.yaml'
   apiVersion: kustomize.config.k8s.io/v1beta1
   kind: Kustomization
   // highlight-next-line
   buildMetadata: [originAnnotations]
   ```

## Best Practises

- Don't provide the service account user who is submitting Pull Requests direct access to commit to `main`.
- Use branch protection policies to require pull requests, passing tests and selective approval
- Implement PR based integration tests that ensure changes:
  - Compile using
    ```shell
    kustomization build
    ```
  - Are compatible with your kubernetes API versions and CRD's with:
    ```shell
    kustomization build | kubectl apply -f - --dry-run=service
    ```
  - Passes all compliance and governance rule
- Auto Merge PR's that are safe

## Learn More

- Playbook [exec](/playbooks/actions/exec) and [gitops](/playbooks/actions/gitops) actions
- [<iconify-icon icon="lets-icons:external"/> Auto Merging PRs](https://jhale.dev/posts/auto-merging-prs/) by @jhale, has a run-down of using Github Actions to automerge, with some gotchas
- [<iconify-icon icon="lets-icons:external"/> trivy](https://trivy.dev/) - A mis-configuration, secrets and compliance scanner with good support for Kubernetes
- [<iconify-icon icon="lets-icons:external"/> bulldozer](https://github.com/palantir/bulldozer) and [<iconify-icon icon="lets-icons:external"/> policy-bot](https://github.com/palantir/policy-bot) for auto-merging PR's using customizable rules and policies
