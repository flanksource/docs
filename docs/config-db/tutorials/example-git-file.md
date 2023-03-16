In this guide, you'll see how to run `config-db` to scrape configuration from a sample Git repository on GitHub [github.com/cishiv/sample-configuration](https://github.com/cishiv/sample-configuration), in line with the GitOps philosophy.

The scraped configuration will be branch and environment aware, enabling you to see the differences between those dimensions.

Additionally - you'll see how `config-db` can keep track of configuration changes should there be any modifications to the configuration in your Git repository.

!!! info

    It is recommended that you fork this repository so you can modify it and play with the different features that `config-db` provides.

This repository contains a simple YAML definition (`simple-config.yaml`) for a canary that can be used by `canary-checker`.

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: http-pass-single
  labels:
    canary: http
spec:
  interval: 40
  http:
    - endpoint: http://status.savanttools.com/?code=200
      name: sample-check
      thresholdMillis: 3000
      responseCodes: [201, 200, 301]
      responseContent: ''
      maxSSLExpiry: 7
      test:
        expr: 'code == 200'
```

## Prepare the configuration

To get started, create a simple scraping configuration to let `config-db` scrape the configuration from your GitHub repository.

```yaml
file:
  - type: $.kind
    id: $.metadata.name
    url: github.com/cishiv/sample-configuration
    paths:
      - simple-config.yaml
```

Save this configuration as `scrape-git.yaml`.

**JSONPath Expression**

`config-db` uses JSONPath expressions extensively. In the above `scrape-git.yaml` example, you'll notice that it is used to extract `type` and `id` from the scraped configuration. In this case, those fields should evaluate as follows:

| field | selector          | value              |
| ----- | ----------------- | ------------------ |
| type  | `$.kind`          | `Canary`           |
| id    | `$.metadata.name` | `http-pass-single` |

!!! resource

    Read more about JSONPath expressions [here](../../concepts/templating.md#jsonpath)

**URL**

`config-db` supports scraping configuration from several protocols

- Local files
- Git
- Mercurial
- HTTP
- Amazon S3
- Google GCP

In this case, we're scraping configuration from a Github repository. The contents of the URL is downloaded in a local cache directory and then scraped.

**Paths**

Once the git repository is cached locally, `config-db` will scrape the configuration from the specified paths.

## Run the scraper

That's all you need to get started with scraping configuration from a Git repository. You can run the scraper as a one-off command or run it on a schedule.

For the purpose of this example we'll use the environment variable approach to pass in the database connection URL.

### Running on a schedule

To run on a schedule you'll need to use the `serve` command. Run the following command in your terminal:

```sh
config-db serve scrape-git.yaml --default-schedule=’@every 20s’
```

This will start `config-db` and run the scraper you've defined every 20 seconds.

!!! info

    If a schedule isn't specified, the scraper will run every 60 minutes by default.

Make a change to your configuration and push it to your remote repository. `config-db` will detect that configuration change and reflect it on the next scraper run.

Change the `interval` field in your configuration from `40` to `30`.

```yaml
...
  canary: http
spec:
  interval: 30
...
```

Once `config-db` detects your change, you should see the log output as follows:

We can easily view the output of the configuration changes using the HTTP API provided by `config-db`.

You can access the API for configuration changes by executing the following curl request:

```console
curl -s http://localhost:3000/config_changes | jq
[
  {
    "id": "0183cd72-c66f-6c48-f066-709ab9a8725a",
    "config_id": "0183cd5e-b709-d6e7-2478-5b0c6a89d51e",
    "external_change_id": "",
    "external_created_by": null,
    "change_type": "diff",
    "severity": "",
    "source": "",
    "summary": null,
    "patches": {
      "spec": {
        "interval": 30
      }
    },
    "details": {},
    "created_by": null,
    "created_at": "2022-10-12T20:26:34.735881"
  },
  {
    "id": "0183cd85-4cd9-aeca-8c4b-dc7663dbf9da",
    "config_id": "0183cd5e-b709-d6e7-2478-5b0c6a89d51e",
    "external_change_id": "",
    "external_created_by": null,
    "change_type": "diff",
    "severity": "",
    "source": "",
    "summary": null,
    "patches": {
      "spec": {
        "interval": 40
      }
    },
    "details": {},
    "created_by": null,
    "created_at": "2022-10-12T20:46:48.793886"
  }
]
```

You can see that all changes to your configuration have been detected and stored as patches by `config-db`.

Additionally, you can view your full configuration via the `config_items` API. Accessible via `http://localhost:3000/config_items`.

### One-off scraping

To run the scraper as a one-off command, you'll continue to use your `scrape-git.yaml` scraper configuration, but instead of using the `serve` command, you'll use the `run` command as follows:

```sh
> config-db run scrape-git.yaml

INFO[0000] Loaded 7 config rules
2022-10-12T20:53:44.453+0200  INFO  Scrapping [scrape-git.yaml]
2022-10-12T20:53:44.496+0200  INFO  Initialized DB: localhost:5432/config (7959 kB)
2022-10-12 20:53:44.513877 I | goose: no migrations to run. current version: 99
2022-10-12T20:53:44.535+0200  INFO  Scraping files from (PWD: /Users/shiv/personal/flanksource/config-db)
2022-10-12T20:53:47.341+0200  INFO  Exporting 1 resources to DB
```

We can see that our scraper executed once, fetching our configuration from our repository, and then exited.

This can be useful for quickly updating configuration and verifying diffs.
