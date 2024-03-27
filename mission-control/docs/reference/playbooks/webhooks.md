
# Webhook


| Field            | Description                      | Scheme                                | Required |
| ---------------- | -------------------------------- | ------------------------------------- | -------- |
| `path`           | Unique endpoint for the webhook. | `string`                              | `true`   |
| `authentication` |    | [`[]Authentication`](#authentication) |          |

## Authentication

| Field    | Description | Scheme                       | Required |
| -------- | ----------- | ---------------------------- | -------- |
| `basic`  | Basic Auth  | [`Basic`](#basic)   |          |
| `github` | Github Auth | [`Github`](#github) |          |
| `svix`   | Svix Auth   | [`Svix`](#svix)     |          |
| `jwt`    | JWT Auth    | [`JWT`](#jwt)       |          |

### Basic

| Field      | Description | Scheme                                                                        | Required |
| ---------- | ----------- | ----------------------------------------------------------------------------- | -------- |
| `username` | Username    |  <CommonLink to="secrets">*EnvVar*</CommonLink> | `true`   |
| `password` | Path        |  <CommonLink to="secrets">*EnvVar*</CommonLink> | `true`   |

### Github

If the webhook is being called by Github, you can use [GitHub's webhook verification](https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries) to ensure that the webhook calls are really from GitHub.

| Field   | Description                  | Scheme                                                                        | Required |
| ------- | ---------------------------- | ----------------------------------------------------------------------------- | -------- |
| `token` | Secret token for the webhook |  <CommonLink to="secrets">*EnvVar*</CommonLink> | `true`   |

### Svix

| Field             | Description                                          | Scheme                                                                        | Required |
| ----------------- | ---------------------------------------------------- | ----------------------------------------------------------------------------- | -------- |
| `secret`          | Signing secret                                       |  <CommonLink to="secrets">*EnvVar*</CommonLink> | `true`   |
| `verifyTimestamp` | Specify the tolerance for the timestamp verification | `string`                                                                      |          |

### JWT

| Field     | Description | Scheme   | Required |
| --------- | ----------- | -------- | -------- |
| `jwksUri` | JWKS URI    | `string` | `true`   |
