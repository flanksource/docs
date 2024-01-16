# Quick Start

How to Install Mission control with helm

## Prerequisites

To install and run the Mission Control chart on your Kubernetes Cluster, you need to have the following prerequisites;

- A Kubernetes installation of version 1.26 or higher.

## Install Chart

```console
helm install [RELEASE_NAME] flanksource/mission-control
```

To set custom values file for your mission-control helm chart installation to override existing values in [`mission-control-chart`](https://github.com/flanksource/mission-control-chart/blob/main/chart/values.yaml).

```bash
cat > myvalues.yaml << EOT
canary-checker:
  debug: true
  db:
    enabled: true
    external:
      create: false
config-db:
  db:
    enabled: false
    external:
      create: false
flanksource-ui:
  ingress:
    enabled: true
    annotations:
      kubernetes.io/ingress.class: nginx
      kubernetes.io/tls-acme: "true"
    host: mission-control.canary.lab.flanksource.com
    tls:
      - secretName: mission-control-tls
        hosts:
          - mission-control.canary.lab.flanksource.com
db:
  storageClass: gp2
  storage: 50Gi
EOT

helm install [RELEASE_NAME] -f myvalues.yaml flanksource/mission-control
```

_See [configuration](#configuration) below._

_See [helm install](https://helm.sh/docs/helm/helm_install/) for command documentation._

## Uninstall Chart

```console
helm uninstall [RELEASE_NAME]
```

This removes all the Kubernetes components associated with the chart and deletes the release.

_See [helm uninstall](https://helm.sh/docs/helm/helm_uninstall/) for command documentation._

## Upgrading Chart

```console
helm upgrade [RELEASE_NAME] [CHART] --install
```

_See [helm upgrade](https://helm.sh/docs/helm/helm_upgrade/) for command documentation._

## Configuration

See [Customizing the Chart Before Installing](https://helm.sh/docs/intro/using_helm/#customizing-the-chart-before-installing). To see all configurable options with detailed comments, visit the chart's [values.yaml](https://github.com/flanksource/config-db/blob/main/chart/values.yaml), or run these configuration commands:

```console
helm show values flanksource/mission-control
```

### OIDC Integration

We use [kratos](https://www.ory.sh/kratos/) for identity management. Login via email/password is the default flow but we can integrate any OIDC provider with in.

**Steps:**

**1. Update helm values file to add the provider data**

```yaml
kratos:
  kratos:
    config:
      selfservice:
        oidc:
          enabled: true
          providers:
            - id: <provider-id> # Used in Authorization callback URL. DO NOT CHANGE IT ONCE SET!
              provider: <provider-type> # Can be google, github, microsoft, gitlab, slack etc
              client_id: ...
              client_secret: ...
              mapper_url: "base64://{YOUR_BASE64_ENCODED_JSONNET_HERE}"
              <Provider specific metdata>
```

The provider metadata varies per provider and the relevant documentation can be found at [https://www.ory.sh/docs/kratos/social-signin/overview](https://www.ory.sh/docs/kratos/social-signin/overview)

??? note "Example:"

    ```yaml title="Values.yaml"
    kratos:
      kratos:
        config:
          selfservice:
            oidc:
              enabled: true
              config:
                providers:
                  - id: microsoft
                    provider: microsoft
                    microsoft_tenant: ...
                    client_id: ...
                    client_secret: ...
                    mapper_url: base64://{{ (.Files.Get "files/microsoft.jsonnet") | b64enc }}
                    scope:
                      - email
                      - openid
                      - profile
                      - Group.Read.All
    ```

**2. Generate mapper URL**

We need to map user data from provider to our kratos instance. We do this by creating a jsonnet file to map the data

```jsonnet
// claims contains all the data sent by the upstream.
local claims = std.extVar('claims');

{
  identity: {
    traits: {
      email: claims.email,
      name: {
        first: claims.<mapping>,
        last: claims.<mapping>,
    },
  },
}
```

In our case, `traits.email`, `traits.name.first` and `traits.name.last` are used. If the provider only provides name, `traits.name.last` can be left blank.

??? note "Example:"

    ```jsonnet title="microsoft.jsonnet"
    local claims = std.extVar('claims');
    // Reference: https://learn.microsoft.com/en-us/entra/identity-platform/id-token-claims-reference

    {
      identity: {
        traits: {
          name: {
            [if 'given_name' in claims then 'first' else null]: claims.given_name,
            [if 'family_name' in claims then 'last' else null]: claims.family_name,
          },

          [if 'raw_claims' in claims && 'groups' in claims.raw_claims then 'groups' else null]: claims.raw_claims.groups,

          // Preferred username has the email for org accounts. Although it's also not reliable as it can container phone number
          [if 'preferred_username' in claims then 'email' else null]: claims.preferred_username,
        },
      },
    }
    ```

**3. Update the provider URL and callback URL, follow [the guide](https://www.ory.sh/docs/kratos/social-signin/generic) for provider specific steps**