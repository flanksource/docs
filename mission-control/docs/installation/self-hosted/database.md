---
title: Database
description: Alternative methods for connecting to the db used for persistence
---

Mission Control stores all state in a Postgres Database, by default a Postgres StatefulSet is created.

## Configuring the default Statefulset

```yaml title="values.yaml"
db:
  create: true
  conf: # override postgres.conf settings
  secretKeyRef: # auto-generated if it doesn't exist
    name: incident-commander-postgres
    key: DB_URL
  storageClass: # optional storage class for PVC volume
  storage: 20Gi
  shmVolume: 256Mi # size of shm memory file to be mounted
  resources: # resources to assign to the postgres /guide/canary-checker/reference/database pod
    requests:
      memory: 4Gi
```

The /guide/canary-checker/reference/database password can then be retrieved using

```shell
kubectl get secret incident-commander-postgres -o json | jq -r '.data.POSTGRES_PASSWORD' | base64 -d
```

:::info Connecting

If you ever need to connect to the /guide/canary-checker/reference/database, you can do so by forwarding the port:

```shell
kubectl port-forward svc/postgres 5432:5432
psql -U postgres localhost -p 5432 mission_control
```

:::

### Updating postgres.conf settings

## Using an External Database

In order to connect to an existing /guide/canary-checker/reference/database a secret needs to be created with the following key:

- `DB_URL`

The following keys are required for kratos:

- `DB_HOST`
- `DB_NAME`
- `DB_USERNAME`
- `DB_PASSWORD`

```yaml title="values.yaml"
db:
  create: false
  secretKeyRef: # auto-generated if it doesn't exist
    name: mission-control-postgres
    key: DB_URL
```
