---
title: LDAP
---

# <Icon name="ldap"/> LDAP

The LDAP check:

* Binds using the provided username and password to the LDAP host. It supports LDAP/LDAPS protocols.
* Searches an object type in the provided `bindDN`.

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: ldap-check
spec:
  interval: 30
  ldap:
    - name: ldap-org
      url: ldap://apacheds.ldap.svc:10389
      username:
        # value: uid=admin,ou=system
        valueFrom:
          secretKeyRef:
            name: ldap-credentials
            key: USERNAME
      password:
        valueFrom:
          secretKeyRef:
            name: ldap-credentials
            key: PASSWORD
      bindDN: ou=users,dc=example,dc=com
      userSearch: "(&(objectClass=organizationalPerson))"
```

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| **`name`** | Name of the check | *string* | Yes |
| **`bindDN`** | BindDN to use in query | *string* | Yes |
| **`userSearch`** | UserSearch to use in query | *string* | Yes |
| **`name`**    | Name of the check, must be unique within the canary         | `string`                                     | Yes      |
| `description` | Description for the check                                   | `string`                                     |          |
| `icon`        | Icon for overwriting default icon on the dashboard          | `string`                                     |          |
| `labels`      | Labels for check                                            | `map[string]string`                          |          |
| `test`        | Evaluate whether a check is healthy                         | [`Expression`](/concepts/health-evaluation)  |          |
| `display`     | Expression to change the formatting of the display          | [`Expression`](/concepts/display-formatting) |          |
| `transform`   | Transform data from a check into multiple individual checks | [`Expression`](/concepts/transforms)          |          |
| `metrics`     | Metrics to export from                                      | [`[]Metrics`](/concepts/metrics-exporter)    |          |
| **Connection** |  |  | |
| `connection` | Path of existing connection e.g. `connection://alertmanager/instance`/ Mutually exclusive with `username`, `password`, `url`  <br/> <Commercial/> | [Connection](../../concepts/connections) | |
| `url` | e.g. `ldap://apacheds.ldap.svc:10389` <br/>*Mutually exclusive with `connection`* | `string` | |
| `username` | *Mutually exclusive with `connection`* | [*EnvVar*](../../concepts/authentication/#envvar) | |
| `password` | *Mutually exclusive with `connection`* | [*EnvVar*](../../concepts/authentication/#envvar) | |
| `skipTLSVerify` | Skip check of LDAP server TLS certificates | *bool* | |
