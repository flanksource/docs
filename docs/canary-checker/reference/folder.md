# <img src='https://raw.githubusercontent.com/flanksource/flanksource-ui/main/src/icons/folder.svg' style='height: 32px'/> Folder

Checks the contents of a folder for size, age and count. Folder based checks are useful in a number of scenarios:

* Verifying that backups have been uploaded and are the appropiate size
* Checking that logs or other temporary files are being cleaned up
* For batch processes:
  * Checking if files are being processed (and/or produced)
  * Checking the size of queue processing backlog
  * Checking if any error (`.err` or `.log`) files have been produced.
  

```yaml title="folder-check.yaml"
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: folder-check
spec:
  interval: 30
  folder:
    - path: /etc/
      name: folder-check-min
      description: Checks if there are at least 10 files in the folder
      minCount: 10
```


| Field         | Description                                                  | Scheme                                  | Required |
| ------------- | ------------------------------------------------------------ | --------------------------------------- | -------- |
| **`name`**    | Name of the check                                            | *string*                                | Yes      |
| **`path`**    | A local folder path or a remote folder ([SMB](../smb), [SFTP](../sftp), [S3](../s3-bucket), [GCS](../gcs-bucket)) | string                                  | Yes      |
| `filter`      | Filter objects out before checking if they are valid         | [*FolderFilter*](#folderfilter)         |          |
| `minCount`    | The minimum number of files inside the `path`                | int                                     |          |
| `maxCount`    | The maximum number of files inside the `path`, can be used in conjunction with `filter.regex` to detect error files | *int*                                   |          |
| `minAge`      | The youngest age a file can be                               | [*Duration*](#duration)                 |          |
| `maxAge`      | The oldest age a file can be, often used to check for unprocessed files or files that have not been cleaned up | [*Duration*](#duration)                 |          |
| `minSize`     | The minimum file size, can be used to detect backups that did not upload successfully | [Size](#size)                           |          |
| `maxSize`     | The maximim file size                                        | [Size](#size)                           |          |
| `test`        | Custom script to test the files against, the [FolderResult](#folderResult) object will be available | [*Template*](../concepts/templating.md) |          |
| `icon`        | Icon for overwriting default icon on the dashboard           | *string*                                |          |
| `description` | Description for the check                                    | *string*                                |          |
| `display`     | Custom script to change the display value                    | [*Template*](../concepts/templating.md) |          |

## Duration

Durations are strings with an optional fraction and unit e.g.  `300ms`, `1.5h` or `2h45m`. Valid time units are `ms`, `s`, `m`, `h`.

## Size

Sizes are string with a unit suffix e.g. `100` / `100b`, `10mb`, Valid size units are `kb`, `mb`, `gb`, `tb`

## FolderFilter

| Field     | Description                                                 | Scheme                                               | Required |
| --------- | ----------------------------------------------------------- | ---------------------------------------------------- | -------- |
| `maxAge`  | MaxAge the latest object should be younger than defined age | [*Duration*](#duration)                              |          |
| `maxSize` | MaxSize of the files inside the searchPath                  | [Size](#size)                                        |          |
| `minAge`  | MinAge the latest object should be older than defined age   | [*Duration*](#duration)                              |          |
| `minSize` | MinSize of the files inside the searchPath                  | [Size](#size)                                        |          |
| `regex`   | Filter files based on regular expression                    | *[regex](https://github.com/google/re2/wiki/Syntax)* |          |

e.g. to verify that database backups are being performed

```yaml title="postgres-backup-check.yaml"
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: folder-check
spec:
  interval: 30
  folder:
    - path: /data/backups
      filter:
        regex: "pg-backups-.*.zip"
      maxAge: 1d # require a daily backup
      minSize: 10mb # the backup should be at least 10mb
```

## FolderResult

| Field                 | Scheme                                             |
| --------------------- | -------------------------------------------------- |
| `Oldest`                | [os.FileInfo](https://pkg.go.dev/io/fs#FileInfo)   |
| `Newest`                | [os.FileInfo](https://pkg.go.dev/io/fs#FileInfo)   |
| `MinSize`               | [os.FileInfo](https://pkg.go.dev/io/fs#FileInfo)   |
| `MaxSize`               | [os.FileInfo](https://pkg.go.dev/io/fs#FileInfo)   |
| `SupportsTotalSize` (Only true for SMB folders) | bool                                               |
| `SupportsAvailableSize` (Only true for SMB folders) | bool                                               |
| `TotalSize`             | int64                                              |
| `AvailableSize`         | int64                                              |
| `Files`                 | [[]os.FileInfo](https://pkg.go.dev/io/fs#FileInfo) |

### FolderFilter

| Field     | Description | Scheme                  | Required |
| --------- | ----------- | ----------------------- | -------- |
| `minAge`  |             | [`Duration`](#duration) |          |
| `maxAge`  |             | [`Duration`](#duration) |          |
| `minSize` |             | [`Size`](#size)         |          |
| `maxSize` |             | [`Size`](#size)         |          |
| `regex`   |             | `string`                |          |
