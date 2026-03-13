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

## GitHub Repository

<!-- Source: modules/config-db/api/v1/github.go#GitHub -->

The GitHub Repository scraper creates `GitHub::Repository` config items and optionally fetches security alerts (Dependabot, code scanning, secret scanning) and OpenSSF Scorecard data as analyses.

```yaml title='github.yaml'

```

| Field                 | Description                                                    | Scheme                                              | Required |
| --------------------- | -------------------------------------------------------------- | --------------------------------------------------- | -------- |
| `repositories`        | List of repositories to scrape                                 | [`[]GitHubRepository`](#githubrepository)            | `true`   |
| `personalAccessToken` | Personal access token for authentication                       | <CommonLink to="secrets">[]_EnvVar_</CommonLink>    |          |
| `connection`          | Connection name for GitHub credential                          | `string`                                            |          |
| `security`            | Enable Dependabot, code scanning, and secret scanning alerts   | `bool`                                              |          |
| `openssf`             | Enable OpenSSF Scorecard data                                  | `bool`                                              |          |
| `securityFilters`     | Filters for security alerts                                    | [`SecurityFilters`](#securityfilters)                |          |

### GitHubRepository

| Field   | Description              | Scheme   | Required |
| ------- | ------------------------ | -------- | -------- |
| `owner` | GitHub repository owner  | `string` | `true`   |
| `repo`  | GitHub repository name   | `string` | `true`   |

### SecurityFilters

| Field      | Description                                      | Scheme     |
| ---------- | ------------------------------------------------ | ---------- |
| `severity` | Filter alerts by severity (e.g. `critical`, `high`) | `[]string` |
| `state`    | Filter alerts by state (e.g. `open`, `fixed`)    | `[]string` |
| `maxAge`   | Only include alerts newer than this duration (e.g. `7d`, `24h`) | `string` |
