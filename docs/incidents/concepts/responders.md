# Responders

Responders allow you to link up the incident to an external incident management tool. At the moment, we only support

- MS Planner, and
- Jira

![Adding a Jira responder](../../images/responder-add-jira.png)

Once the responder is linked up, the comments are synced between Flanksource and the responder client.

![Comments in Jira from Flanksource](../../images/responder-jira-comments.png)

## How to add a responder

Responder clients are configured via the team spec.

**Example:**

```yaml
components:
  - name: Flanksource
responder_clients:
  jira:
    url: https://flanksource.atlassian.net
    password:
      value: <Your-jira-api-token>
    username:
      value: <Your-jira-username>
```

## Responder Spec

| Field        | Description              | Scheme                            | Required   |
| ------------ | ------------------------ | --------------------------------- | ---------- |
| `jira`       | Jira client config       | [`Jira`](#jira-client)            | `optional` |
| `ms_planner` | MS Planner client config | [`MSPlanner`](#ms-planner-client) | `optional` |

### Jira Client

| Field      | Description   | Scheme                                                                        | Required |
| ---------- | ------------- | ----------------------------------------------------------------------------- | -------- |
| `url`      | Jira url      | `string`                                                                      | `true`   |
| `username` | Jira username |  <CommonLink to="secrets">*EnvVar*</CommonLink> | `true`   |
| `password` | Jira password |  <CommonLink to="secrets">*EnvVar*</CommonLink> | `true`   |
| `defaults` | Jira defaults | `string`                                                                      | `option` |
| `values`   | Jira values   | `string`                                                                      | `option` |

### MS Planner Client

| Field       | Description          | Scheme                                                                        | Required |
| ----------- | -------------------- | ----------------------------------------------------------------------------- | -------- |
| `tenant_id` | MS Planner tenant id | `string`                                                                      | `true`   |
| `client_id` | MS Planner client id | `string`                                                                      | `true`   |
| `group_id`  | MS Planner group id  | `string`                                                                      | `true`   |
| `username`  | MS Planner username  |  <CommonLink to="secrets">*EnvVar*</CommonLink> | `true`   |
| `password`  | MS Planner password  |  <CommonLink to="secrets">*EnvVar*</CommonLink> | `true`   |
| `defaults`  | MS Planner defaults  | `map[string]string`                                                           | `option` |
| `values`    | MS Planner values    | `map[string]string`                                                           | `option` |
