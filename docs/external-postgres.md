```
CREATE ROLE "canary-checker" LOGIN PASSWORD 'r03wYPFDSdMc3aaJ';
ALTER ROLE  "canary-checker"  SUPERUSER;
 GRANT CREATE, SELECT, UPDATE, DELETE, INSERT ON ALL TABLES IN SCHEMA public TO "canary-checker";
  GRANT CREATE ON SCHEMA public TO "canary-checker";
 ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT CREATE, SELECT, UPDATE, DELETE, INSERT ON TABLES TO "canary-checker";
 
 
ALTER SCHEMA public OWNER TO "canary-checker";
```

```
-- Create an event trigger function
CREATE OR REPLACE FUNCTION public.pgrst_watch()
RETURNS event_trigger AS $$
BEGIN
    NOTIFY pgrst, 'reload schema';
END
$$ LANGUAGE plpgsql;
```

mission-control-55f5cb65d5-vlpcd

CREATE EXTENSION IF NOT EXISTS hstore;

GRANT "canary-checker" to postgrest_anon;

GRANT "canary-checker" to postgrest_api;