# SQL

The SQL configuration scraper will execute a SQL query and then create a configuration item for each returned row.

The example below creates a new `MSSQL::Database` configuration for each database on the sql server, and then creates a roles object container the SQL Server login to database role mapping. With change detection this will highlight when new users are added / modified / removed on an individual databases.

```yaml
sql:
  - connection: 'sqlserver://localhost:1433?database=master'
    auth:
      username:
        value: sa
      password:
        value: password
    type: MSSQL::Database
    id: $.name

    transform:
      full: true # transform the entire configuration item, and not just the configuration data (row)
      script:
        javascript: |+
          var dbs = {}
          for (var i = 0; i < config.rows.length; i++) {
            var db = config.rows[i]
            var name = db.DB
            if (dbs[db.DB] == null) {
              {
                config:               dbs[db.DB] = {
                  name: name,
                  roles: {}
                },
                changes: {

                },
                analysis: {

                }

              }
            }
            dbs[name].roles[db.role] = db.name
          }
          JSON.stringify(_.values(dbs))

    query: |
      declare  @mytable table (
        [DB] [nvarchar](128) NULL,
        [name]  [nvarchar](255)  NOT NULL,
        [role]  [nvarchar](255)  NOT NULL
        )


      DECLARE @command varchar(1000)
      SELECT @command =
      'USE ?; SELECT DB_NAME() as DB, DP1.name AS [user],
        isnull (DP2.name, ''No members'') AS [role]
      FROM sys.database_role_members AS DRM
      RIGHT OUTER JOIN sys.database_principals AS DP1
        ON DRM.role_principal_id = DP1.principal_id
      LEFT OUTER JOIN sys.database_principals AS DP2
        ON DRM.member_principal_id = DP2.principal_id
      WHERE DP1.type = ''R'' and DP2.name is not null'

      insert into @mytable  EXEC sp_MSforeachdb @command

      select * from @mytable
```

## SQL

| Field             | Description                                                                                                                                                             | Scheme                                  | Required |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- | -------- |
| `id`              | A static value or JSONPath expression to use as the ID for the resource.                                                                                                | `string`                                | `true`   |
| `name`            | A static value or JSONPath expression to use as the Name for the resource. Default value is the `id`.                                                                   | `string`                                | `false`  |
| `items`           | A JSONPath expression to use to extract individual items from the resource                                                                                              | `string`                                | `false`  |
| `type`            | A static value or JSONPath expression to use as the type for the resource.                                                                                              | `string`                                | `true`   |
| `transform`       | Specify field to transform result                                                                                                                                       | [`Transform`](../concepts/transform) | `false`  |
| `format`          | Format of config item, defaults to JSON, available options are JSON                                                                                                     | `string`                                | `false`  |
| `timestampFormat` | TimestampFormat is a Go time format string used to parse timestamps in createFields and DeletedFields. If not specified, the default is `RFC3339`.                      | `string`                                | `false`  |
| `createFields`    | CreateFields is a list of JSONPath expression used to identify the created time of the config. If multiple fields are specified, the first non-empty value will be used | `[]string`                              | `false`  |
| `deleteFields`    | DeleteFields is a JSONPath expression used to identify the deleted time of the config. If multiple fields are specified, the first non-empty value will be used         | `[]string`                              | `false`  |
| -                 | Specify connection details to the database                                                                                                                              | [Connection](#connection)               |          |
| `driver`          | Specify the name of the driver to use for connecting to the database                                                                                                    | `string`                                | `false`  |
| `query`           | Specify the SQL query to execute                                                                                                                                        | `string`                                | `true`   |
