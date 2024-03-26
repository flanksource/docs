# SQL

The SQL configuration scraper will execute a SQL query and then create a configuration item for each returned row.

The example below creates a new `MSSQL::Database` configuration for each database on the sql server, and then creates a roles object container the SQL Server login to database role mapping. With change detection this will highlight when new users are added / modified / removed on an individual databases.

```yaml title='sql-scraper.yaml'
apiVersion: configs.flanksource.com/v1
kind: ScrapeConfig
metadata:
  name: sql-scraper
spec:
  schedule: '@every 30s'  
  sql:
    - connection: 'sqlserver://sa:password@172.18.5.55:1433?database=master'
      type: MSSQL::Database
      id: $.id
      transform:
        expr: |+
          dyn(config).map(e,{ "id": e.DB, 
                              "roles": e.Roles.map(er,
                                      {er.role : er.Principals.map(ep,ep.name)})
                            }).toJSON()
      query: |
        declare @mytable table (
          [DB] [nvarchar](128) NULL,
          [name] [nvarchar](255) NOT NULL,
          [role] [nvarchar](255) NOT NULL
            )
        DECLARE @command varchar(1000)
        SELECT @command = 'USE ?; SELECT DB_NAME() as DB, DP1.name AS [user],
            isnull (DP2.name, ''No members'') AS [role]
          FROM sys.database_role_members AS DRM
          RIGHT OUTER JOIN sys.database_Principals AS DP1
            ON DRM.role_principal_id = DP1.principal_id
          LEFT OUTER JOIN sys.database_Principals AS DP2
            ON DRM.member_principal_id = DP2.principal_id
          WHERE DP1.type = ''R'' and DP2.name is not null'
        insert into @mytable EXEC sp_MSforeachdb @command

        select distinct d.DB,Roles.role , Principals.name
        from @mytable d 
        left join @mytable Roles on d.DB = Roles.DB 
        left join @mytable Principals on Roles.name = Principals.name 
        and Roles.DB = Principals.DB FOR JSON AUTO

```

## Scraper

| Field       | Description                                                                        | Scheme                                       | Required |
| ----------- | ---------------------------------------------------------------------------------- | -------------------------------------------- | -------- |
| `logLevel`  | Specify the level of logging.                                                      | `string`                                     |          |
| `schedule`  | Specify the interval to scrape in cron format. Defaults to every 60 minutes.       | `string`                                     |          |
| `full`      | Set to `true` to extract changes from scraped configurations. Defaults to `false`. | `bool`                                       |          |
| `retention` | Settings for retaining changes, analysis and scraped items                         | [`Retention`](/config-db/concepts/retention) |          |
| `sql`       | Specifies the list of SQL configurations to scrape.                                | [`[]SQL`](#sql-1)                            |          |

## Result Variables

| Name    | Description             | Scheme                     |
| ------- | ----------------------- | -------------------------- |
| `config`  |                         | *[]map[string]interface{ }* |
| `result`  |                         | *map[string]interface{ }* |
| `result.config`  |                  | *[]map[string]interface{ }* |
| `result.last_modified`|             | *DateTime*                  |
| `result.last_scraped_time`|         | *DateTime*                  |

## SQL

| Field             | Description                                                                                                                                                             | Scheme                                         | Required |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | -------- |
| `id`              | A static value or JSONPath expression to use as the ID for the resource.                                                                                                | `string`                                       | `true`   |
| `name`            | A static value or JSONPath expression to use as the Name for the resource. Default value is the `id`.                                                                   | `string`                                       |          |
| `items`           | A JSONPath expression to use to extract individual items from the resource                                                                                              | `string`                                       |          |
| `type`            | A static value or JSONPath expression to use as the type for the resource.                                                                                              | `string`                                       | `true`   |
| `format`          | Format of config item, defaults to JSON, available options are JSON                                                                                                     | `string`                                       |          |
| `timestampFormat` | TimestampFormat is a Go time format string used to parse timestamps in createFields and DeletedFields. If not specified, the default is `RFC3339`.                      | `string`                                       |          |
| `createFields`    | CreateFields is a list of JSONPath expression used to identify the created time of the config. If multiple fields are specified, the first non-empty value will be used | `[]string`                                     |          |
| `deleteFields`    | DeleteFields is a JSONPath expression used to identify the deleted time of the config. If multiple fields are specified, the first non-empty value will be used         | `[]string`                                     |          |
| -                 | Specify connection details to the database                                                                                                                              | [Connection](#connection)                      |          |
| `driver`          | Specify the name of the driver to use for connecting to the database                                                                                                    | `string`                                       |          |
| `query`           | Specify the SQL query to execute                                                                                                                                        | `string`                                       | `true`   |
| `properties`      | Custom templatable properties for the scraped config items.                                                                                                             | [`[]ConfigProperty`](../../reference/property) |          |
| `transform`       | Specify field to transform result                                                                                                                                       | [`Transform`](#transform)                      |          |
| `tags`            | set custom tags on the scraped config items                                                                                                                             | `map[string]string`                            |          |

#### Transform

<ConfigTransform></ConfigTransform>
