---
hide:
- toc
---

# Installation

=== "Linux (amd64)"
    ```bash
    wget https://github.com/flanksource/config-db/releases/latest/download/config-db_linux_amd64 \
      -O /usr/bin/config-db && \
      chmod +x /usr/bin/config-db
    ```

=== "MacOSX (amd64)"
    ```bash
    wget https://github.com/flanksource/config-db/releases/latest/download/config-db_darwin_amd64 \
      -O /usr/local/bin/config-db && \
      chmod +x /usr/local/bin/config-db
    ```

=== "Makefile"
    ```Makefile
    OS = $(shell uname -s | tr '[:upper:]' '[:lower:]')
    ARCH = $(shell uname -m | sed 's/x86_64/amd64/')
    wget -nv -nc https://github.com/flanksource/config-db/releases/latest/download/config-db_$(OS)_$(ARCH) \
      -O /usr/local/bin/config-db && \
      chmod +x /usr/local/bin/config-db
    ```
    
=== "Windows"
    ```bash
    wget -nv -nc -O https://github.com/flanksource/canary-checker/releases/latest/download/config-db.exe
    ```

## Running

View and search the change history of your configuration across multiple dimensions (node, zone, environment, application, technology, etc). As well as compare and view the differences between configurations across environments.

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