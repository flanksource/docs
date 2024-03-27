# Connections

Connections are an easy way to authenticate against sources. It can be created via a CRD or by adding it in the settings page


A sample connection CRD looks like:
```yaml
apiVersion: mission-control.flanksource.com/v1
kind: Connection
metadata:
  name: payments-database
spec:
  type: postgres
  url:
    value: 'postgres://$(username):$(password)@postgres.host.com/payments'
  username:
    valueFrom:
      secretKeyRef:
        name: payments-database-credentials
        key: POSTGRES_USER
  password:
    valueFrom:
      secretKeyRef:
        name: payments-database-credentials
        key: POSTGRES_PASSWORD
```

Eventually, the URL that gets templated is used for establishing connections. This can be used for any datasource that authenticates via URL (PostgreSQL, MySQL, MSSQL, Redis, Opensearch, Elasticsearch etc.)

A connection string can be represented in the form of `type/connection_name` or `type/namespace/connection_name`

It can then be used in Health Checks via `connection` attribute or during Topology creation in `component.lookup`

```yaml

apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: postgres-check
spec:
  postgres:
    - name: postgres schemas check
      connection: connection://postgres/payments-database
      query: SELECT COUNT(*) FROM payments where state = 'pending'
```

This allows us a safe and reusable way to handle authentication

:::tip

If the entire URL is in the secrets and cannot be constructed like `scheme://$(username):$(password)@<host>:<port>` you can fetch that directly like

```yaml
kind: Connection
metadata:
  name: opensearch-global
spec:
  type: opensearch
  url:
    value: $(password)
  password:
    valueFrom:
      secretKeyRef:
        name: opensearch-credentials
        key: OPENSEARCH_URL
```
:::

## Schema

| **Field**    | **Description**                                       | **Scheme**                                     | **Required** |
|--------------|-------------------------------------------------------|------------------------------------------------|--------------|
| url          | URL in templatable form                               | <CommonLink to="secrets">*EnvVar*</CommonLink> | yes          |
| port         | Port number                                           | <CommonLink to="secrets">*EnvVar*</CommonLink> |              |
| type         | Type of datasource (postgres,mysql,elasticsearch ...) | string                                         |              |
| username     | Username                                              | <CommonLink to="secrets">*EnvVar*</CommonLink> |              |
| password     | Password                                              | <CommonLink to="secrets">*EnvVar*</CommonLink> |              |
| certificate  | Certificate for verification                          | <CommonLink to="secrets">*EnvVar*</CommonLink> |              |
| properties   | Property fields                                       | map[string]string                              |              |
| insecure_tls | Allow insecure tls                                    | bool                                           |              |

