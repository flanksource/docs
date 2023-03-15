The SQL configuration scraper will execute a SQL query and then create a configuration item for each returned row.

The example below creates a new `MSSQL::Database` configuration for each database on the sql server, and then creates a roles object container the SQL Server login to database role mapping. With change detection this will highlight when new users are added / modified / removed on an individual databases.

```yaml
sql:
  - connection: "sqlserver://localhost:1433?database=master"
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
