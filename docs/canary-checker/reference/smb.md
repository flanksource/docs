# <img src='https://raw.githubusercontent.com/flanksource/flanksource-ui/main/src/icons/smb.svg' style='height: 32px'/> Smb

The Smb check connects to the given Samba server to check folder freshness.
The check:

* Verifies the most recently modified file that fulfills the `minAge` and `maxAge` constraints. (each an optional bound)
* Verifies files present in the mount is more than `minCount`.

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: sftp-check
spec:
  interval: 30
  folder:
    - path: /tmp
      name: sample smb check
      - server: smb://192.168.1.9
        smbConnection:
          auth:
            username:
              valueFrom:
                secretKeyRef:
                  name: smb-credentials
                  key: USERNAME
            password:
              valueFrom:
                secretKeyRef:
                  name: smb-credentials
                  key: PASSWORD
          sharename: "Some Public Folder"
          searchPath: a/b/c
        minAge: 10h
        maxAge: 20h
        description: "Success SMB server"

      # For server access using path format
      - server: '\\192.168.1.5\Some Public Folder\somedir'
        smbConnection:
          auth:
            username:
              valueFrom:
                secretKeyRef:
                  name: smb-credentials
                  key: USERNAME
            password:
              valueFrom:
                secretKeyRef:
                  name: smb-credentials
                  key: PASSWORD
          sharename: "sharename" #will be overwritten by 'Some Public Folder'
          searchPath: a/b/c #will be overwritten by 'somedir'
        minAge: 10h
        maxAge: 100h
        description: "Success SMB server"
```

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `name` | Name of the check | *string* |  |
| **`auth`** | username and password value, configMapKeyRef or SecretKeyRef for SMB server | [***Authentication***](../concepts/authentication.md) | Yes |
| `description` | Description for the check | *string* |  |
| `display` | Template to display the result in | [*Template*](../concepts/templating.md) |  |
| `filter` | Used to filter the objects | [*FolderFilter*](#folderfilter) |  |
| `icon` | Icon for overwriting default icon on the dashboard | *string* |  |
| `minAge` | The latest object should be older than defined age | *Duration* |  |
| `maxAge` | The latest object should be younger than defined age | *Duration* |  |
| `minCount` | The minimum minimum number of files inside the searchPath | *int* |  |
| `maxCount` | The maximum number of files inside the searchPath | *int* |  |
| `minSize` | The minimum size of the files inside the searchPath | *Size* |  |
| `maxSize` | The max size of the files inside the searchPath | *Size* |  |
| `regex` | Filter files based on regular expression  | *string* |  |
| `test` | Template to test the result against | [*Template*](../concepts/templating.md) |  |
| **`server`** | location of smb server. Can be `hostname/ip` or in `\\server\e$\a\b\c` syntax
Where server is the `hostname` `e$`` is the sharename and`a/b/c` is the searchPath location | *string* | Yes |
| `port` | Port on which smb server is running. Defaults to 445 | *int* |  |
| `sharename` | Sharename to mount from the samba server | *string* |  |
| `workstation` | Workstation... | *string* |  |
| `domain` | Specify domain member | *string* |  |
| `searchPath` | sub-path inside the mount location | *string* |  |
