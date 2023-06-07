# <img src='https://raw.githubusercontent.com/flanksource/flanksource-ui/main/src/icons/ldap.svg' style='height: 32px'/> LDAP

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
      host: ldap://apacheds.ldap.svc:10389
      auth:
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
    - name: ldap-group
      host: ldap://apacheds.ldap.svc:10389
      auth:
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
      bindDN: ou=groups,dc=example,dc=com
      userSearch: "(&(objectClass=groupOfNames))"

```

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `name` | Name of the check | *string* |  |
| **`auth.username`** | LDAP bind username | [*Authentication*](../concepts/authentication.md) | Yes |
| **`auth.password`** | LDAP bind password | [*Authentication*](../concepts/authentication.md) | Yes |
| **`bindDN`** | BindDN to use in query | *string* | Yes |
| description | Description for the check | *string* |  |
| **`host`** | URL of LDAP server to be qeuried | *string* | Yes |
| `icon` | Icon for overwriting default icon on the dashboard | *string* |  |
| `skipTLSVerify` | Skip check of LDAP server TLS certificates | *bool* |  |
| `userSearch` | UserSearch to use in query | *string* |  |
