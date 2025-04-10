---
title: Kubernetes
---

# <Icon name="k8s" /> Kubernetes

The Kubernetes component lookup fetches kubernetes resources to be used as components.

```yaml title="kube-configmap-components.yaml"  file=<rootDir>/modules/canary-checker/fixtures/topology/kubernetes-lookup.yaml {14-22}

```

<Fields connection="kubernetes" rows={[
  {
    field: "display",
    description: "Template to display query results in text (overrides default bar format for UI)",
    scheme: "[Template](/guide/topology/concepts/templating)",
  },
  {
    field: "ignore",
    description: "Ignore the specified resources from the fetched resources. Can be a glob pattern.",
    scheme: "[]string",
  },
  {
    field: "kind",
    description: "Specifies the kind of Kubernetes object for interaction",
    scheme: "string",
    required: true,
  },
  {
    field: "labels",
    description: "Labels for the check",
    scheme: "map[string]string",
  },
  {
    field: "namespace",
    description: "Specifies namespace for Kubernetes object",
    scheme: "ResourceSelector",
  },
  {
    field: "ready",
    description: "Boolean value of true or false to query and display resources based on availability",
    scheme: "bool",
  },
  {
    field: "resource",
    description: "Queries resources related to specified Kubernetes object",
    scheme: "ResourceSelector",
  },
  {
    field: "transform",
    description: "Template to transform results to",
    scheme: "[Template](/guide/topology/concepts/templating)",
  }
]}/>

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

```yaml title="remote-cluster.yaml"  file=<rootDir>/modules/canary-checker/fixtures/topology/kubernetes-lookup-kubeconfig-from-secrets.yaml {23-27}

```

### Kubeconfig inline

```yaml title="remote-cluster.yaml"  file=<rootDir>/modules/canary-checker/fixtures/topology/kubernetes-lookup-inline-configmap.yaml {22-48}

```

### From local filesystem

```yaml title="remote-cluster.yaml"  file=<rootDir>/modules/canary-checker/fixtures/topology/kubernetes-lookup-kubeconfig-from-file.yaml {22-23}

```
