# External PostgreSQL

Use a dedicated, empty database for Mission Control. Run the following commands
as your database administrator, replacing the role, database, and password:

```sql
CREATE ROLE "mission-control" LOGIN PASSWORD '<password>' CREATEROLE;

GRANT CONNECT, CREATE, TEMPORARY
ON DATABASE mission_control
TO "mission-control";

\connect mission_control

GRANT USAGE, CREATE
ON SCHEMA public
TO "mission-control";
```

The `CREATEROLE` attribute lets startup migrations create the `postgrest_api`
and `postgrest_anon` roles. `CREATE` on the database lets migrations install the
trusted `hstore` and `pgcrypto` extensions. Mission Control owns the schema
objects that it creates, so it does not need preemptive table privileges.

If the database already contains Mission Control objects, ensure that the
Mission Control role owns them before running migrations.
