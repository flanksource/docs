## <img src='https://raw.githubusercontent.com/flanksource/flanksource-ui/main/src/icons/kubernetes.svg' style='height: 32px'/> Kubernetes

The Kubernetes check performs requests on Kubernetes resources such as Pods to get the desired information.

??? example
     ```yaml
      apiVersion: canaries.flanksource.com/v1
      kind: Canary
      metadata:
        name: kube-check
      spec:
        interval: 30
        spec:
          kubernetes:
            - namespace:
                name: default
              name: k8s-ready pods
              kind: Pod
              resource:
                labelSelector: app=k8s-ready
            - namespace:
                name: default
              kind: Pod
              name: k8s-ready pods
              ready: false
              resource:
                labelSelector: app=k8s-not-ready
     ```

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `description` | Description for the check | string |  |
| `display` | Template to display query results in text (overrides default bar format for UI) | [*Template*](#template) |  |
| `icon` | Icon for overwriting default icon on the dashboard | *string* |  |
| `ignore` | Ignore the specified resources from the fetched resources. Can be a glob pattern. | *\[\]string* |  |
| **`kind`** | Specifies the kind of Kubernetes object for interaction | *string* | Yes |
| `labels` | Labels for the check | *string* |  |
| **`name`** | Name of the check | *string* | Yes |
| `namespace` | Specifies namespce for Kubernetes object | [*ResourceSelector*](#resourceselector) |  |
| `ready` | Boolean value of true or false to query and display resources based on availability | *bool* |  |
| `resource` | Queries resources related to specified Kubernetes object | [*ResourceSelector*](#resourceselector) |  |
| `test` | Template to test the result against | [*Template*](#template) |  |
| `transform` | Template to transform results to | [*Template*](#template) |  |

---
# Scheme Reference

## ResourceSelector

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `name` | Name of Kubernetes resource | *string* |  |
| `labelSelector` | Select Kubernetes resource based on label. e.g. app, canary. | *string* |
| `fieldSelector` | Select Kubernetes resource based on the value of specified resource field | *string* |

## Template

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `jsonPath` | Specify path to JSON element for use in template | *string* |  |
| `template` | Specify Go template for use | *string* |  |
| `expr` | Specify expression for use in template  | *string* |  |
| `javascript` | Specify javascript syntax for template | *string* |  |
