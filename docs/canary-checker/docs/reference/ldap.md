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
| `*` | All other common fields | [*Common*](common) |  |
| **Connection** |  |  | |
| `connection` | Path of existing connection e.g. `connection://alertmanager/instance`/ Mutually exclusive with `username`, `password`, `url`  <br/> <Commercial/> | [Connection](../../concepts/connections) | |
| `url` | e.g. `ldap://apacheds.ldap.svc:10389` <br/>*Mutually exclusive with `connection`* | `string` | |
| `username` | *Mutually exclusive with `connection`* | [*EnvVar*](../../concepts/authentication/#envvar) | |
| `password` | *Mutually exclusive with `connection`* | [*EnvVar*](../../concepts/authentication/#envvar) | |
| `skipTLSVerify` | Skip check of LDAP server TLS certificates | *bool* | |
