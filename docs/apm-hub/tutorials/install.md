## CLI Installation

=== "Linux (amd64)"

```sh
    wget https://github.com/flanksource/apm-hub/releases/latest/download/apm-hub_linux_amd64 \
      -O /usr/bin/apm-hub && \
      chmod +x /usr/bin/apm-hub
```

=== "MacOS (amd64)"

```sh
    wget https://github.com/flanksource/apm-hub/releases/latest/download/apm-hub_darwin_amd64 \
      -O /usr/local/bin/apm-hub && \
      chmod +x /usr/local/bin/apm-hub
```

=== "Windows"

```sh
wget -nv -nc -O https://github.com/flanksource/apm-hub/releases/latest/download/apm-hub.exe

    // Move the downloaded exe file to a directory in your PATH
```

=== "Build locally"

```sh
    git clone https://github.com/flanksource/apm-hub
    cd apm-hub
    make build
    make install
```

## Verify installation

Once the installation is complete, ensure everything is working by running `Config DB` with the default configuration for scraping.

```sh
> apm-hub serve
2023-03-17T11:22:43.590+0545    INFO    loaded 0 backends in total

   ____    __
  / __/___/ /  ___
 / _// __/ _ \/ _ \
/___/\__/_//_/\___/ v4.6.3
High performance, minimalist Go web framework
https://echo.labstack.com
____________________________________O/_______
                                    O\
⇨ http server started on [::]:8080
```
