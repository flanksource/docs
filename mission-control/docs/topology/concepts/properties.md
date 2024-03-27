# Properties

A topology view can be customized using properties.

```yaml
properties:
  - icon: github
    text: https://github.com/spring-petclinic/spring-petclinic-microservices
    type: url
  - icon: aws
    text: eu-west-1
  - icon: git
    text: vaev6ae (updated 2h ago)
  - headline: true
    name: Pets
    text: '15000'
  - headline: true
    name: Vets
    text: '125'
  - color: green
    headline: true
    name: Visitors
    text: '447'
```

![Properties Displayed](/img/properties-in-mission-control.png)


### Configuration Lookup

Property values can be looked up from configuration items using the `configLookup` field:

```yaml title="config-lookup.yaml"
apiVersion: canaries.flanksource.com/v1
kind: Topology
metadata:
  name: application-config-lookup
spec:
  components:
    - name: Application
      properties:
        - headline: true
          name: Version
          configLookup:
            config:
              labels:
                namespace: ${.properties.namespace}
              name: Configuration.properties
              type: File
            field: $["application.buildversion"]
```

This `config` object is used to find the config item to lookup a value from, if there are multiple matches, the first match is used.

