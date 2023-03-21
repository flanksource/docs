## <img src='https://raw.githubusercontent.com/flanksource/flanksource-ui/main/src/icons/database2.svg' style='height: 32px'/> DatabaseBackup

This check performs regular backups for you CloudSQL instance at specified intervals. 

??? example
     ```yaml
     apiVersion: canaries.flanksource.com/v1
     kind: Canary
     metadata:
       name: database-backup-check
     spec:
       interval: 60
       databaseBackup:
         - maxAge: 6h
           gcp:
             project: google-project-name
             instance: cloudsql-instance-name
     ```        

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `description` | Description for the check | *string* |  |
| `display` | Template to display server response in text (overrides default bar format for UI) | [*Template*](#template) |  |
| `gcp` | Connect to GCP project and instance | [*GCPDatabase*](#gcpdatabase) |  |
| `icon` | Icon for overwriting default icon on the dashboard | *string* |  |
| `labels` | Labels for the check | *Labels* |  |
| `maxAge` | Max age for backup allowed, eg. 5h30m | *Duration* |  |
| **`name`** | Name of the check | *string* | Yes |
| `test` | Template to test the result against | [*Template*](#template) |  |
| `transform` | Template to transform results to | [*Template*](#template) |  |

---
# Scheme Reference

## GCPDatabase

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `project` | Specify GCP project | *string* | Yes |
| `instance` | Specify GCP instance | *string* | Yes |
| `gcpConnection` | Set up gcpConnection with GCP `endpoint` and `credentials` | [GCPConnection](#gcpconnection) |

## GCPConnection

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| **`credentials`** | Set GCP credentials | [*kommons.EnvVar*](https://pkg.go.dev/github.com/flanksource/kommons#EnvVar) | Yes |
| **`endpoint`** | Specify GCS HTTP endpoint | *string* | Yes |


## Template

| Field | Description | Scheme | Required |
| ----- | ----------- | ------ | -------- |
| `jsonPath` | Specify path to JSON element for use in template | *string* |  |
| `template` | Specify Go template for use | *string* |  |
| `expr` | Specify expression for use in template  | *string* |  |
| `javascript` | Specify javascript syntax for template | *strin*g* |  |
