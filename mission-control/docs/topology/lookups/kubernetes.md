---
title: Kubernetes
---

# <Icon name="k8s" /> Kubernetes

The Kubernetes component lookup fetches kubernetes resources to be used as components.

```yaml title="kube-configmap-components.yaml"  file=../../../modules/canary-checker/fixtures/topology/kubernetes-lookup.yaml {14-22}

```

| Field     | Description                                                                         | Scheme                                  | Required |
| --------- | ----------------------------------------------------------------------------------- | --------------------------------------- | -------- |
| display   | Template to display query results in text (overrides default bar format for UI)     | [_Template_](../concepts/templating)    |          |
| ignore    | Ignore the specified resources from the fetched resources. Can be a glob pattern.   | _[]string_                              |          |
| **kind**  | Specifies the kind of Kubernetes object for interaction                             | _string_                                | Yes      |
| labels    | Labels for the check                                                                | _string_                                |          |
| namespace | Specifies namespace for Kubernetes object                                           | [_ResourceSelector_](#resourceselector) |          |
| ready     | Boolean value of true or false to query and display resources based on availability | _bool_                                  |          |
| resource  | Queries resources related to specified Kubernetes object                            | [_ResourceSelector_](#resourceselector) |          |
| transform | Template to transform results to                                                    | [_Template_](../concepts/templating)    |          |

## ResourceSelector

| Field         | Description                                                               | Scheme   | Required |
| ------------- | ------------------------------------------------------------------------- | -------- | -------- |
| name          | Name of Kubernetes resource                                               | _string_ |          |
| labelSelector | Select Kubernetes resource based on label. e.g. app, canary.              | _string_ |          |
| fieldSelector | Select Kubernetes resource based on the value of specified resource field | _string_ |          |

## Results

The `results` variable in the template is itself a list of all the kubernetes resources.

## Remote clusters

A single canary-checker instance can connect to any number of remote clusters via custom kubeconfig.
Either the kubeconfig itself or the path to the kubeconfig can be provided.

### From kubernetes secret

```yaml title="remote-cluster.yaml"  file=../../../modules/canary-checker/fixtures/topology/kubernetes-lookup-kubeconfig-from-secrets.yaml {23-27}

```

### Kubeconfig inline

```yaml title="remote-cluster.yaml"  file=../../../modules/canary-checker/fixtures/topology/kubernetes-lookup-inline-configmap.yaml {22-48}

```

### From local filesystem

```yaml title="remote-cluster.yaml"  file=../../../modules/canary-checker/fixtures/topology/kubernetes-lookup-kubeconfig-from-file.yaml {22-23}

```
