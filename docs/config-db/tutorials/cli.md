---
hide:
  - toc
---

### Usage

```bash
config-db [command]
```

### Available Commands:

```
  analyze     Analyze configuration items and report discrepencies/issues.
  completion  Generate the autocompletion script for the specified shell
  go-offline
  help        Help about any command
  operator    Start the kubernetes operator
  run         Run scrapers and return
  serve
  version     Print the version of config-db

Flags:
      --db string             Connection string for the postgres database (default "DB_URL")
      --db-log-level string    (default "warn")
      --db-migrations         Run database migrations
      --db-schema string       (default "public")
  -h, --help                  help for config-db
      --json-logs             Print logs in json format to stderr
  -v, --loglevel count        Increase logging level

Use "config-db [command] --help" for more information about a command.
```
