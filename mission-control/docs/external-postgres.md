# External PostgreSQL

Use a dedicated, empty database owned by the Mission Control login. Run the
following commands as your database administrator, replacing the role and
database names:

```sql
ALTER ROLE "mission-control" CREATEROLE;
CREATE DATABASE mission_control OWNER "mission-control";
```

The `CREATEROLE` attribute lets startup migrations create the `postgrest_api`
and `postgrest_anon` roles. Database ownership provides the privileges needed to
install trusted extensions and create schema objects, so no additional grants
are required with the default `public` schema configuration.

If the database already contains Mission Control objects, ensure that the
Mission Control role owns them before running migrations.
