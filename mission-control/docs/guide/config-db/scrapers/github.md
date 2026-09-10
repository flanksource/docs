---
title: GitHub
show_title: false
sidebar_position: 9
sidebar_custom_props:
  icon: github
---

# <Icon name="github"/> GitHub

## GitHub Actions

<!-- Source: modules/config-db/api/v1/github.go#GitHubActions -->

The GitHub Actions scraper creates configuration items from GitHub Actions workflows. Specify the `owner`, `repository`, and `branch` to scrape.

```yaml title='github-actions.yaml' file=<rootDir>/modules/config-db/fixtures/github-actions.yaml

```

By default the last 7 days of workflow runs are fetched. Change that with the `scrapers.githubactions.maxAge` [system property](/docs/system-properties).

| Field                 | Description                                                                                                                     | Scheme                                           | Required |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | -------- |
| `owner`               | GitHub repository owner                                                                                                         | `string`                                         | `true`   |
| `repository`          | GitHub repository name                                                                                                          | `string`                                         | `true`   |
| `personalAccessToken` | Personal access token for authentication                                                                                        | <CommonLink to="secrets">_EnvVar_</CommonLink>   |          |
| `connection`          | Connection name used to populate `personalAccessToken`                                                                          | `string`                                         |          |
| `workflows`           | Workflows to scrape. When empty, all workflows are scraped                                                                      | `[]string`                                       |          |
| `status`              | Only return workflow runs with this check run status or conclusion e.g. `success`, `in_progress`                                | `string`                                         |          |
| `actor`               | Only return workflow runs for this user. Use the login of the user who created the push associated with the run                  | `string`                                         |          |
| `branch`              | Only return workflow runs associated with this branch                                                                           | `string`                                         |          |

## GitHub Repository

<!-- Source: modules/config-db/api/v1/github.go#GitHub -->

The GitHub Repository scraper creates `GitHub::Repository` config items and optionally fetches security alerts (Dependabot, code scanning, secret scanning) and OpenSSF Scorecard data as analyses.

```yaml title='github.yaml' file=<rootDir>/modules/config-db/fixtures/github.yaml

```

| Field                 | Description                                                          | Scheme                                           | Required |
| --------------------- | -------------------------------------------------------------------- | ------------------------------------------------ | -------- |
| `repositories`        | List of repositories to scrape                                       | [`[]GitHubRepository`](#githubrepository)        | `true`   |
| `organizations`       | Organizations to scrape for settings, installed apps and membership  | [`[]GitHubOrganization`](#githuborganization)    |          |
| `personalAccessToken` | Personal access token for authentication                             | <CommonLink to="secrets">[]_EnvVar_</CommonLink> |          |
| `connection`          | Connection name for GitHub credential                                | `string`                                         |          |
| `security`            | Enable Dependabot, code scanning, and secret scanning alerts         | `bool`                                           |          |
| `openssf`             | Enable OpenSSF Scorecard data                                        | `bool`                                           |          |
| `permissions`         | Collect repository collaborator and team access                      | [`Permissions`](#permissions)                    |          |
| `commits`             | Collect commit metadata from each repository's default branch        | [`Commits`](#commits)                            |          |
| `securityFilters`     | Filters for security alerts                                          | [`SecurityFilters`](#securityfilters)            |          |

### GitHubRepository

| Field    | Description                                                                                                               | Scheme                | Required |
| -------- | ------------------------------------------------------------------------------------------------------------------------- | --------------------- | -------- |
| `owner`  | GitHub repository owner                                                                                                   | `string`              | `true`   |
| `repo`   | Exact repository name or comma-separated `collections.MatchItems` patterns. Pattern selectors skip archived repositories. | `string`              | `true`   |
| `topics` | Filter repositories by GitHub topic. A repository is included when at least one positive pattern matches; negated patterns take precedence. If all patterns are negated, a repository is included when none of its topics match an exclusion | `MatchExpressions` |          |

### GitHubOrganization

Repository owners are always attached to their organization, but only organizations listed here are scraped beyond their name.

| Field      | Description                                                                                                                                                                                                                         | Scheme   | Required |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------- |
| `name`     | Organization login e.g. `acme`                                                                                                                                                                                                      | `string` | `true`   |
| `settings` | Collect organization security and policy settings: 2FA requirement, default repository permission, member repository and page creation policy, Advanced Security / Dependabot / secret scanning defaults, Actions permissions, custom organization roles and code security configurations | `bool` |          |
| `rulesets` | Collect organization repository rulesets                                                                                                                                                                                            | `bool`   |          |
| `apps`     | Collect installed GitHub App installations                                                                                                                                                                                          | `bool`   |          |
| `members`  | Collect organization members and their organization role, teams, team membership and team to repository grants                                                                                                                      | `bool`   |          |

:::note Required token scopes
`settings` and `apps` require organization administration **read** access, `rulesets` requires organization administration **write** access (even though the API operation is read-only), and `members` requires organization members read access.
:::

### Permissions

| Field     | Description                                                                                                    | Scheme |
| --------- | -------------------------------------------------------------------------------------------------------------- | ------ |
| `enabled` | Map effective collaborators and repository teams to external users, groups, roles, and config access records   | `bool` |

### Commits

| Field     | Description                                     | Scheme   |
| --------- | ----------------------------------------------- | -------- |
| `enabled` | Enable commit collection                        | `bool`   |
| `maxAge`  | Only collect commits newer than this duration. Defaults to `30d` | `string` |

### Repository selectors

Use repository selectors when you want one GitHub scraper to discover multiple repositories for the same owner. The `repo` field supports exact names, `*` wildcards, comma-separated patterns, and `!` exclusions from `collections.MatchItems`.

The following example discovers matching repositories for `flanksource`, mixes selector and exact entries, and deduplicates overlapping matches per GitHub scraper config.

```yaml title='github-repo-selectors.yaml' file=<rootDir>/modules/config-db/fixtures/github-repo-selectors.yaml

```

### SecurityFilters

| Field      | Description                                                     | Scheme     |
| ---------- | --------------------------------------------------------------- | ---------- |
| `severity` | Filter alerts by severity (e.g. `critical`, `high`)             | `[]string` |
| `state`    | Filter alerts by state (e.g. `open`, `fixed`)                   | `[]string` |
| `maxAge`   | Only include alerts newer than this duration (e.g. `7d`, `24h`) | `string`   |
