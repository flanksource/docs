---
title: Webhook
---


| Field            | Description                      | Scheme                                | Required |
| ---------------- | -------------------------------- | ------------------------------------- | -------- |
| `path`           | Unique endpoint for the webhook. | `string`                              | `true`   |
| `authentication[].basic`  | Basic Auth  | [`Basic`](#basic)   |          |
| `authentication[].github` | Github Auth | [`Github`](#github) |          |
| `authentication[].svix`   | Svix Auth   | [`Svix`](#svix)     |          |
| `authentication[].jwt`    | JWT Auth    | [`JWT`](#jwt)       |          |

### Basic

| Field      | Description | Scheme                                                                        | Required |
| ---------- | ----------- | ----------------------------------------------------------------------------- | -------- |
| `username` | Username    |  <CommonLink to="secrets">*EnvVar*</CommonLink> | `true`   |
| `password` | Path        |  <CommonLink to="secrets">*EnvVar*</CommonLink> | `true`   |

### Github

Use GitHub [webhook verification](https://docs.github.com/en/webhooks/using-webhooks/validating-webhook-deliveries) to authenticate requests.

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
