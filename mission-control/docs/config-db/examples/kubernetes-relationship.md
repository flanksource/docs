# Kubernetes Relationship

Kubernetes scraper offers a more tailored relationship selector in addition to the [general relationship selector](../concepts/transform.md#relationshipconfig).

```yaml title="kubernetes-relationship.yaml"
kubernetes:
  - clusterName: 'eks'
    relationships:
      # If object has spec.claimRef field, use its kind, name and namespace
      - kind:
          expr: "has(spec.claimRef) ? spec.claimRef.kind : ''"
        name:
          expr: "has(spec.claimRef) ? spec.claimRef.name : ''"
        namespace:
          expr: "has(spec.claimRef) ? spec.claimRef.namespace : ''"

      # If object flux kustomize labels, link it to the parent Kustomization object
      - kind:
          value: Kustomization
        name:
          label: kustomize.toolkit.fluxcd.io/name
        namespace:
          label: kustomize.toolkit.fluxcd.io/namespace

      # If object helm kustomize labels, link it to the parent HelmRelease object
      - kind:
          value: HelmRelease
        name:
          label: helm.toolkit.fluxcd.io/name
        namespace:
          label: helm.toolkit.fluxcd.io/namespace
```
