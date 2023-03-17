To get you setup and running we'll take a quick look at using apm-hub to query nginx access logs. It's likely that you don't have nginx logs but you can use any file for this guide.

This guide involves the following steps:

1. [Create configuration file for nginx](#1-prepare-configuration-file)
2. [Start apm-hub](#2-start-apm-hub)
3. [Make a query](#3-make-a-query)

!!! note

    This guide assumes that you have already installed `apm-hub`. If you haven't, please follow the [installation guide](./install.md).

### 1. Prepare configuration file

Start off by creating a configuration file `(config-nginx.yaml)` for apm-hub. This file will be used to tell apm-hub where to find your logs.

```yaml
backends:
  - file:
      - routes:
          - labels:
              app: nginx
        labels:
          name: acmehost
          type: Nginx
        path:
          - /var/log/nginx/access.log
```

If you don't have `/var/log/nginx/access.log` you can use any file for this guide.

### 2. Start apm-hub

Starting is as simple as running the following command:

```sh
apm-hub serve samples/config-nginx.yaml
```

`apm-hub` will now start to listen on port `8080` for search queries. To use a different port you can use the `httpPort` flag

```sh
apm-hub serve --httpPort 9090 samples/config-nginx.yaml
```

### 3. Make a query

Let's issue a search query using `curl`.

```sh
curl -d '{"limit": 10, "labels":{"app" :"nginx"}}' \
-H "Content-Type: application/json" localhost:8080/search
```

If you notice, the `labels` in the body of the request match the `labels` in the configuration file. This is how apm-hub knows whether the file backend should serve the search query or not. This feature of selecting backends for each queries is called [Routing](./concepts/routing.md).

```json
{
  "total": 3,
  "results": [
    {
      "timestamp": "2020-11-05T09:47:22+05:45",
      "message": "127.0.0.1 - - [05/Nov/2020:09:47:17 +0545] \"GET /the HTTP/1.1\" 304 0 \"-\" \"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36\"",
      "labels": {
        "app": "nginx",
        "path": "/var/log/nginx/access.log"
      }
    },
    {
      "timestamp": "2020-11-05T09:47:22+05:45",
      "message": "127.0.0.1 - - [05/Nov/2020:09:47:17 +0545] \"GET /best HTTP/1.1\" 304 0 \"-\" \"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36\"",
      "labels": {
        "app": "nginx",
        "path": "/var/log/nginx/access.log"
      }
    },
    {
      "timestamp": "2020-11-05T09:47:22+05:45",
      "message": "127.0.0.1 - - [05/Nov/2020:09:47:19 +0545] \"GET /league HTTP/1.1\" 200 612 \"-\" \"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36\"",
      "labels": {
        "app": "nginx",
        "path": "/var/log/nginx/access.log"
      }
    }
  ]
}
```
