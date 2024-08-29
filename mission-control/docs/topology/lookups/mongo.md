---
title: Mongo
---

# <Icon name="mongo" /> MongoDB

The Mongo component lookup allows you to form components from the records in a Postgres database.

In this example below, we form components from all the tables in the `incident_commander` database.

```yaml title="mongo-check.yml"
apiVersion: canaries.flanksource.com/v1
kind: Topology
metadata:
  name: mongo-collections
  namespace: default
spec:
  schedule: '@every 30s'
  components:
    - name: MongoDB
      type: Table
      icon: mongodb
      // highlight-start
      lookup:
        mongodb:
          - connection: mongodb://username:password@localhost:27017/incident_commander
            query: |
              db.getCollectionNames().map(function(collectionName) {
                const stats = db.getCollection(collectionName).stats();
                return {
                  name: collectionName,
                  numRows: stats.count
                };
              });
            display:
              expr: |
                results.map(result, {
                  'name': result.name,
                  'type': "Collection",
                  'properties': [{
                    "name": "Documents",
                    "headline": true,
                    "value": double(result.numRows),
                  }]
                }).toJSON()
      // highlight-end
```

| Field            | Description                                                                     | Scheme                                         | Required |
| ---------------- | ------------------------------------------------------------------------------- | ---------------------------------------------- | -------- |
| **`connection`** | Connection string to connect to the Mongo server                                | _string_                                       | Yes      |
| **`password`**   | Set password for authentication using string, configMapKeyRef, or SecretKeyRef. | <CommonLink to="secrets">_EnvVar_</CommonLink> | Yes      |
| **`username`**   | Set username for authentication using string, configMapKeyRef, or SecretKeyRef. | <CommonLink to="secrets">_EnvVar_</CommonLink> | Yes      |
