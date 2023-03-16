## Database Configuration

`config-db` needs a backing PostgreSQL database to run its migrations against.

You'll use the PostgreSQL command line utility `createdb` to create our database.

Run the following command in your terminal:

```bash
createdb -h localhost -p 5432 -U postgres config
```

Where `config` is the name of the database we’re creating.

You can then simply export the connection URL for the database as an environment variable for `config-db` to use by running the following in our terminal:

```bash
export DB_URL=postgres://postgres@localhost:5432/config
```

You also have the option to pass in the database connection url via the `--db` flag.

```sh
config-db --db='postgres://postgres@localhost:5432/config'
```

## Verify installation

Once the installation is complete, ensure everything is working by running `config-db` with the default configuration for scraping.

```console
% .bin/config-db serve
INFO[0000] Loaded 7 config rules
2022-10-12T19:08:14.962+0200  INFO  Initialized DB: localhost:5432/config (7503 kB)
2022-10-12 19:08:14.984859 I | goose: no migrations to run. current version: 99

   ____    __
  / __/___/ /  ___
 / _// __/ _ \/ _ \
/___/\__/_//_/\___/ v4.6.3
High performance, minimalist Go web framework
https://echo.labstack.com
____________________________________O/_______
                                    O\
⇨ http server started on [::]:8080
12/Oct/2022:19:08:15 +0200: Attempting to connect to the database...
12/Oct/2022:19:08:15 +0200: Connection successful
12/Oct/2022:19:08:15 +0200: Listening on port 3000
12/Oct/2022:19:08:15 +0200: Listening for notifications on the pgrst channel
12/Oct/2022:19:08:15 +0200: Config re-loaded
12/Oct/2022:19:08:15 +0200: Schema cache loaded
```

Once you've verified that you can start `config-db`, you can now move on to scraping configurations from a Git repository.
