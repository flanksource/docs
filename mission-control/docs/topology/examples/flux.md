---
title: Flux
---

The following configuration creates a topology for Flux CD. The topology will have all the the following 5 direct child components

- **Controllers**: Contains all Kubernetes pods in the "flux-system" namespace as its children
- **Releases**: Contains all helm release config items as its children
- **Repos**: Contains all Helm repository config items as its children
- **Kustomizations**: Contains all Kustomization config items as its children
- **Git**: Contains all Git repository config items as its children

```yaml title="flux.yaml"
apiVersion: canaries.flanksource.com/v1
kind: Topology
metadata:
  name: flux
spec:
  icon: flux
  type: Topology
  schedule: '@every 5m'
  components:
    - name: Controllers
      icon: pod
      selectors:
        - name: pods
          labelSelector: 'namespace=flux-system'
    - name: Releases
      icon: helm
      components:
        - name: HelmReleases Component
          type: lookup
          icon: helm
          lookup:
            configDB:
              - name: config-db-check
                query: SELECT * FROM config_items WHERE config_class = 'HelmRelease'
                display:
                  javascript: |
                    JSON.stringify(results.results.map(function(r) {
                      return {
                        name: r.name,
                        icon: 'helm',
                        namespace: r.namespace,
                        status: r.status,
                        status_reason: r.description,
                        selectors: [{
                          name: 'pods',
                          labelSelector: 'app.kubernetes.io/instance='+r.name,
                        }],
                        configs: [
                          {
                            name: r.name,
                            type: "HelmRelease",
                          }
                        ],
                        properties: [
                          {
                            'name': 'Message',
                            text: r.config.status.conditions[0].message,
                          },
                          {
                            'name': 'Version',
                            text: r.config.status.lastAppliedRevision,
                            headline: true,
                          },
                          {
                            'name': 'Last attempted version',
                            text: r.config.status.lastAttemptedRevision,
                          }
                        ]
                      }
                    }))
    - name: Kustomizations
      icon: kustomize
      components:
        - name: Kustomizations Component
          type: lookup
          icon: kustomize
          lookup:
            configDB:
              - name: config-db-check
                query: SELECT * FROM config_items WHERE config_class = 'Kustomization'
                display:
                  javascript: |
                    JSON.stringify(results.results.map(function(r) {
                      return {
                        name: r.name,
                        icon: 'kustomize',
                        namespace: r.namespace,
                        status: r.status,
                        status_reason: r.description,
                        selectors: [{
                          name: 'pods',
                          labelSelector: 'kustomize.toolkit.fluxcd.io/name='+r.name + ',kustomize.toolkit.fluxcd.io/namespace='+r.config.metadata.namespace
                        }],
                        configs: [
                          {
                            name: r.name,
                            type: "Kustomization",
                          }
                        ],
                        properties: [
                          {
                            name: 'Message',
                            text: r.config.status.conditions[0].message,
                          },
                          {
                            name: 'State',
                            text: r.config.status.conditions[0].type,
                          }
                        ]
                      }
                    }))
    - name: Repos
      icon: helm
      components:
        - name: HelmRepo Component
          type: lookup
          icon: group
          lookup:
            configDB:
              - name: config-db-check
                query: SELECT * FROM config_items WHERE config_class = 'HelmRepository'
                display:
                  javascript: |
                    JSON.stringify(results.results.map(function(r) {
                      var status = r.config.status.conditions[0].status === "True" ? "healthy" : "unhealthy"
                      return {
                        name: r.name,
                        icon: 'helm',
                        namespace: r.namespace,
                        status: r.status,
                        status_reason: r.description,
                        configs: [
                          {
                            name: r.name,
                            type: "HelmRepository",
                          }
                        ],
                        properties: [
                          {
                            name: 'Message',
                            text: r.config.status.conditions[0].message,
                          },
                          {
                            name: 'State',
                            text: r.config.status.conditions[0].type,
                          }
                        ]
                      }
                    }))
    - name: Git
      icon: git
      components:
        - name: GitRepo Component
          type: lookup
          icon: group
          lookup:
            configDB:
              - name: config-db-check
                query: SELECT * FROM config_items WHERE config_class = 'GitRepository'
                display:
                  javascript: |
                    JSON.stringify(results.results.map(function(r) {
                      var status = r.config.status.conditions[0].status === "True" ? "healthy" : "unhealthy"
                      return {
                        name: r.name,
                        icon: 'git',
                        namespace: r.namespace,
                        status: r.status,
                        status_reason: r.description,
                        configs: [
                          {
                            name: r.name,
                            type: "GitRepository",
                          }
                        ],
                        properties: [
                          {
                            name: 'Message',
                            text: r.config.status.conditions[0].message,
                          },
                          {
                            name: 'State',
                            text: r.config.status.conditions[0].type,
                          }
                        ]
                      }
                    }))
```
