## <img src='https://raw.githubusercontent.com/flanksource/flanksource-ui/main/src/icons/smb.svg' style='height: 32px'/> Smb

The Smb check connects to the given Samba server to check folder freshness. 
The check:
* Verifies the most recently modified file that fulfills the `minAge` and `maxAge` constraints. (each an optional bound)
* Verifies files present in the mount is more than `minCount`.

??? example
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
| **`auth`** | username and password value, configMapKeyRef or SecretKeyRef for SMB server | [***Authentication***](#authentication) | Yes |
| `description` | Description for the check | *string* |  |
| `display` | Template to display the result in | [*Template*](#template) |  |
| `domain` | Specify domain member | *string* |  |
| `filter` | Used to filter the objects | [*FolderFilter*](#folderfilter) |  |
| `icon` | Icon for overwriting default icon on the dashboard | *string* |  |
| `maxAge` | MaxAge the latest object should be younger than defined age | *Duration* |  |
| `maxCount` | MaxCount the Maximum number of files inside the searchPath | *int* |  |
| `maxSize` | MaxSize of the files inside the searchPath | *Size* |  |
| `minAge` | MinAge the latest object should be older than defined age | *Duration* |  |
| `minCount` | MinCount the minimum number of files inside the searchPath | *int* |  |
| `minSize` | MinSize of the files inside the searchPath | *Size* |  |
| `name` | Name of the check | *string* |  |
| `port` | Port on which smb server is running. Defaults to 445 | *int* |  |
| `searchPath` | SearchPath sub-path inside the mount location | *string* |  |
| **`server`** | Server location of smb server. Can be `hostname/ip` or in `\\server\e$\a\b\c` syntax
Where server is the `hostname` `e$`` is the sharename and `a/b/c` is the searchPath location | *string* | Yes |
| `sharename` | Sharename to mount from the samba server | *string* |  |
| `test` | Template to test the result against | [*Template*](#template) |  |
| `workstation` | Workstation... | *string* |  |

---
# Scheme Reference
## Authentication

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| **`password`** |  | [*kommons.EnvVar*](https://pkg.go.dev/github.com/flanksource/kommons#EnvVar) | Yes |
| **`username`** |  | [*kommons.EnvVar*](https://pkg.go.dev/github.com/flanksource/kommons#EnvVar) | Yes |

## FolderFilter

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `maxAge` | MaxAge the latest object should be younger than defined age | *Duration* |  |
| `maxSize` | MaxSize of the files inside the searchPath | *Size* |  |
| `minAge` | MinAge the latest object should be older than defined age | *Duration* |  |
| `minSize` | MinSize of the files inside the searchPath | *Size* |  |
| `regex` | Filter files based on regular expression  | *string* |  |

## Template

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `jsonPath` | Specify path to JSON element for use in template | *string* |  |
| `template` | Specify Go template for use | *string* |  |
| `expr` | Specify expression for use in template  | *string* |  |
| `javascript` | Specify javascript syntax for template | *string* |  |
