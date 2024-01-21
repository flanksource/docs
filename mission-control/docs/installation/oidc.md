# Single Sign On (SSO)

Mission Control uses [kratos](https://www.ory.sh/kratos/) for identity management. Login via email/password is the default flow but any OIDC provider supported by Kratos can be used

See [Providers](https://www.ory.sh/docs/kratos/social-signin/overview) more details on supported providers.

## Microsoft Entra (Azure AD)

1. Create a new [Azure AD App Registration](https://portal.azure.com/#view/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/~/RegisteredApps)
   * Record the `Client ID` (Application ID) in the Overview page
   * Add an allowed redirect URI of `https://ingress/api/.ory/self-service/methods/oidc/callback/microsoft`
   * Token Configuration
     * Add the email optional claim
     * Add a `groups claim` if you want to map Azure AD Group Membership to roles in Mission Control
   * Certificates & Secrets
     * Create a new `client secret`
1. Get the `Tenant ID` (Directory ID`) from [Directories](https://portal.azure.com/#settings/directory)

1. Create a Jsonnet claims mapper

Jsonnet is used to [map](https://www.ory.sh/docs/kratos/social-signin/data-mapping) the claims provided by Azure AD, to the Kratos [Identity Schema](https://github.com/flanksource/mission-control-chart/blob/main/chart/files/kratos-identity-schema.json)

```javascript
local claims = std.extVar('claims');
{
  identity: {
    traits: {
      name: {
        [if 'given_name' in claims then 'first' else null]: claims.given_name,
        [if 'family_name' in claims then 'last' else null]: claims.family_name,
      },

      [if   'raw_claims' in claims &&
        'groups' in claims.raw_claims then 'groups' else null]: claims.raw_claims.groups,

      [if 'preferred_username' in claims then 'email' else null]: claims.preferred_username,
      [if 'email' in claims then 'email' else null]: claims.email,
    },
  },
}
```

4. Create the `mapper_url` by Base64 encoding the jsonnet file and prefixing it with `base64://`

5. Update the helm values

```yaml title="values.yaml"
kratos:
    kratos:
        config:
            selfservice:
                methods:
                    oidc:
                        enabled: true
                        config:
                            providers:
                                - id: microsoft
                                  provider: microsoft
                                  microsoft_tenant: # The Azure AD Tenant Id
                                  client_id: #...
                                  client_secret: #...
                                  mapper_url: base64:// #base64 encoded mapper_url
                                  scope:
                                    - email
                                    - openid
                                    - profile
```

See [MS Entra ID Tokens](https://learn.microsoft.com/en-us/entra/identity-platform/id-token-claims-reference)

