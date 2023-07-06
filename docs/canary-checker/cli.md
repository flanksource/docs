---
hide:
- toc
---
<!-- /* md-file-format-disable */ -->

# Installation

=== "Linux (amd64)"
    ```bash
    wget  https://github.com/flanksource/canary-checker/releases/latest/download/canary-checker_linux_amd64   \
      -O /usr/bin/canary-checker && \
      chmod +x /usr/bin/canary-checker
    ```

=== "Linux (arm64)"
    ```bash
    wget  https://github.com/flanksource/canary-checker/releases/latest/download/canary-checker_linux_arm64  \
      -O /usr/bin/canary-checker && \
      chmod +x /usr/bin/canary-checker
    ```


=== "MacOSX (amd64)"

    ```bash
    wget https://github.com/flanksource/canary-checker/releases/latest/download/canary-checker_darwin_amd64  \
      -O /usr/local/bin/canary-checker && \
      chmod +x /usr/local/bin/canary-checker
    ```


=== "MacOSX (arm64)"

    ```bash
    wget https://github.com/flanksource/canary-checker/releases/latest/download/canary-checker_darwin_arm64  \
      -O /usr/local/bin/canary-checker && \
      chmod +x /usr/local/bin/canary-checker
    ```


=== "Makefile"
    ```Makefile
    OS = $(shell uname -s | tr '[:upper:]' '[:lower:]')
    ARCH = $(shell uname -m | sed 's/x86_64/amd64/')
    wget -nv -nc https://github.com/flanksource/canary-checker/releases/latest/download/canary-checker_$(OS)_$(ARCH)  \
      -O /usr/local/bin/canary-checker && \
      chmod +x /usr/local/bin/canary-checker
    ```

=== "Windows"
    ```bash
    wget -nv -nc -O https://github.com/flanksource/canary-checker/releases/latest/download/canary-checker.exe

    ```

# Run


```yaml title="canary.yaml"
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: http-check
spec:
  interval: 30
  http:
    - endpoint: http://status.savanttools.com/?code=200
      responseCodes: [200]
```

```bash
canary-checker run canary.yaml
```

