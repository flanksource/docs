---
description: Alternative methods for connecting to the db used for persistence
---
# Database

Mission Control stores all state in a Postgres Database, by default a Postgres StatefulSet is created.

## Update the Postgres Statefulset

```yaml title="values.yaml"
db:
  create: true
  conf: # override postgres.conf settings
  secretKeyRef: # auto-generated if it doesn't exist
    name: incident-commander-postgres
    key: DB_URL
  jwtSecretKeyRef: # auto generated key for postgrest to validate tokens from users
    name: incident-commander-postgrest-jwt
    key: PGRST_JWT_SECRET
  storageClass: # optional storage class for PVC volume
  storage: 20Gi
  shmVolume: 256Mi # size of shm memory file to be mounted
  resources: # resources to assign to the postgres database pod
    requests:
      memory: 4Gi
```

The database password can then be retrieved using

```shell
kubectl get secret incident-commander-postgres -o json | jq -r '.data.POSTGRES_PASSWORD' | base64 -d
```

:::info Connecting

If you ever need to connect to the embedded database, you can do so by forwarding the port:

```shell
kubectl port-forward svc/postgres 5432:5432
psql -U postgres localhost -p 5432 mission_control
```
:::

## Connecting to an external db

In order to connect to an existing Postgres server, a database must be created on the server, along with a user that has administrator permissions for the database.

```yaml title="values.yaml"
db:
  create: true
  conf: # override postgres.conf settings
  secretKeyRef: # auto-generated if it doesn't exist
    name: incident-commander-postgres
    key: DB_URL
  jwtSecretKeyRef: # auto generated key for postgrest to validate tokens from users
    name: incident-commander-postgrest-jwt
    key: PGRST_JWT_SECRET
  storageClass: # optional storage class for PVC volume
  storage: 20Gi
  shmVolume: 256Mi # size of shm memory file to be mounted
  resources: # resources to assign to the postgres database pod
    requests:
      memory: 4Gi
```
