---
description: Alternative methods for connecting to the db used for persistence
sidebar_class_name: hidden-mission-control
slug: /installation/database
sidebar_custom_props:
  icon: postgres
---

# Database

To persist history, canary-checker has 3 options:

1. Mount a PVC/Hostpath volume for an embedded postgres database
2. Deploy a postgres database as a statefulset
3. Connect to an external postgres database

## Mounting a persistent volume

```yaml title="values.yaml"
db:
  embedded:
    storageClass: # the name of a PV Storage Class
    storage: 10Gi
# ...
```

:::info Connecting

If you ever need to connect to the embedded database, you can do so by forwarding the port:

```bash
kubectl port-forward canary-checker-0 6432:6432
psql -U postgres localhost -p 6432 canary with password postgres #password will be postgres
```

:::

## Deploying a standalone Statefulset

```yaml title="values.yaml"
db:
  external:
    enabled: true
    create: true # creates a new postgres statefulset
    storageClass: # the name of a PV Storage Class
    storage: 10Gi
# ...
```

The helm chart creates a postgres server statefulset, with a random password and default port, along with a new database.

To specify a username and password for the chart-managed Postgres server, create a secret in the namespace that the chart installs to, named `postgres-connection`, which contains `POSTGRES_USER` and `POSTGRES_PASSWORD` keys.

## Connecting to an existing database

To connect to an existing Postgres server, a database must be created on the server, along with a user that has administrator permissions for the database.

```yaml title="values.yaml"
db:
  external:
    enabled: true
    create: false
    secretKeyRef:
      name: postgres-connection # name of secret that contains a key containging the postgres connection URI
      key: POSTGRES_URL # name of the key in the secret that contains the postgres connection URI. The URI must be in the format 'postgresql://"$user":"$password"@"$host"/"$database"'
# ...
```
