---
title: Database
description: Alternative methods for connecting to the db used for persistence
sidebar_custom_props:
  icon: postgres
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
  resources: # resources to assign to the postgres /docs/guide/canary-checker/reference/database pod
    requests:
      memory: 4Gi
```

The /docs/guide/canary-checker/reference/database password can then be retrieved using

```shell
kubectl get secret incident-commander-postgres -o json | jq -r '.data.POSTGRES_PASSWORD' | base64 -d
```

:::info Connecting

If you ever need to connect to the /docs/guide/canary-checker/reference/database, you can do so by forwarding the port:

```shell
kubectl port-forward svc/postgres 5432:5432
psql -U postgres localhost -p 5432 mission_control
```

:::

### Updating postgres.conf settings

## Using an External Database

Use a dedicated, empty database owned by the Mission Control login. Before installing or upgrading Mission Control, configure it as your database administrator:

```sql
ALTER ROLE "mission-control" CREATEROLE;
CREATE DATABASE mission_control OWNER "mission-control";
```

Replace the role and database names with your values. The `CREATEROLE` attribute lets migrations create the `postgrest_api` and `postgrest_anon` roles. On PostgreSQL 16 and later, duty grants the Mission Control login `SET TRUE, INHERIT FALSE` membership in those roles. This lets PostgREST assume them without automatically exposing their privileges to the login. No manual role grants or `createrole_self_grant` setting are required.

Database ownership provides the privileges needed to install trusted extensions and create schema objects, so no additional grants are required with the default `public` schema configuration.

If the database already contains Mission Control objects, ensure that the Mission Control role owns them before running migrations.

Create a secret with the following key:

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
