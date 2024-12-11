## DesiredState Store

## Reconciliation

Flux and Argo are designed to continuously check a state store (Git, OCI, Bucket, etc.) and apply the desired state to Kubernetes.

Mission Control does not perform low-level reconciliation. It is built for meta-reconciliation loops, e.g.:

- When a webhook is received, create or update a manifest and push it to Git.
- When a resource becomes unhealthy, take steps to mitigate (send notifications, push new scaling parameters to Git, orchestrate failovers).

## Creation / Updates

[Argo](https://argocd-image-updater.readthedocs.io/en/stable/) and [Flux](https://fluxcd.io/flux/components/image/imageupdateautomations/) both can monitor semantic versions and push new image versions back to Git.

Argo also support custom Lua actions that apply changes directly to the Kubernetes API, but lacks the ability to push these back to git.

Mission Control offers a [GitOps](/playbooks/actions/gitops) playbook action for creating new resources (e.g., Scaffolding) and updating existing files in Git repos via Pull Request. This can be used to update YAML files monitored by Flux/Argo or other files managed by Terraform, etc.

## Health

Flux relies on the status of Kubernetes objects or Helm-based pod health checks. Argo supports custom health checks via Lua scripts for many common resources.

Mission Control offers enhanced health tracking using a combination of status, Lua, Go, and active/passive [health checks](/canary-checker/).

Mission Control tracks each catalog item for:

- Health (`Healthy`, `Unhealthy`, `Warning`, `Unknown`)
- Status (resource-specific status such as `Running`, `Terminating`, `Issuing`)
- Readiness (e.g., whether the resource is still reconciling/provisioning or is in its final state)

These combinations enable very fine-grained [notifications](/notifications) and filtering.

## Change / Drift Detection

Argo and Flux provide drift detection, which identifies changes between the desired state and the actual state (e.g. a version number change).

Mission Control offers comprehensive change detection. For example, even if the `latest` image desired state remains the same, it detects changes in the underlying image digest. This includes monitoring changes across all resources in a cluster, such as nodes and statuses. Additionally, Kubernetes and Cloud events are ingested and stored for long-term analysis.

## Relationships

Flux uses annotations (`helm.toolkit.fluxcd.io`, `kustomize.toolkit.fluxcd.io`) to tag resources but does not provide any UI to view these links.

Argo maintains a list of resources created and uses `ownerRef` to build a graph, but it has some limitations:

- No links to resources created outside of an application
- No incoming links from the namespace, kustomization, node, etc.
- No ability to focus on a particular resource, e.g., focus on a pod and walk up the tree to the node, cluster, etc.
- No history of deleted items.

The relationship graph in Mission Control is highly extensible with support for:

- Incoming (From a Namespace -> Pod) and Outgoing (Pod -> PVC) relationships
- Single pane of glass for all resources, including Kubernetes, Cloud, and custom
- Deleted items
- Multi-Cluster, Region, Account, and App views
