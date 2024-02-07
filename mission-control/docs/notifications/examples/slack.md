# Slack Notification

In this example, we will walk through the process of creating a health check alert notification on slack starting from creating the Slack bot token.

## A. Create a Slack bot

### 1. Create a new app

Visit https://api.slack.com/apps and create a new app. Use the "From an app manifest" option.

![](../../images/slack-app-creation.png)

### 2. Set up necessary permission for oAuth

After creating the app, you should be navigated to the app's homepage. On the left panel menu, go to Features->OAuth & Permissions. Scroll down and you should see the **"Scopes"** section

![](../../images/slack-app-oauth-scope.png)

Set `chat:write` permission

### 3. Install the slack app to your Slack workspace

While still on the same page, scroll up to the "OAuth Tokens for Your Workspace" section. Install the newly created app on your Slack workspace.

![](../../images/slack-app-install-to-workspace.png)

Once you install the app you should see the OAuth token

![](../../images/slack-bot-user-oauth-token.png)

## B. Setting up the notification

### 1. Create the kubernetes secret

We'll create a new kubernetes secret using the OAuth token we just created.

```yaml title="slack-secret.yaml"
---
apiVersion: v1
kind: Secret
metadata:
  name: slack
  namespace: default
stringData:
  token: xoxb-910094966996-6596865117477-n7iujSYWmHtnTLMmITdm8z06
```

### 2. Create a mission control connection for slack

Then, we create a new slack connection using that kubernetes secret. The channel that should receive the notification should go into `spec.username` field.

```yaml title="slack-connection.yaml"
---
apiVersion: mission-control.flanksource.com/v1
kind: Connection
metadata:
  name: flanksource
  namespace: default
spec:
  type: slack
  url:
    value: slack://$(password)@$(username)
  username:
    value: mission-control-notifications # <-- slack channel name
  password:
    valueFrom:
      secretKeyRef:
        name: slack
        key: token
```

### 3. Create the notification

```yaml title="http-check-notification.yaml"
---
apiVersion: mission-control.flanksource.com/v1
kind: Notification
metadata:
  name: http-check-alerts
  namespace: default
spec:
  events:
    - check.passed
    - check.failed
  to:
    # use the slack connection as the recipient for this notification
    connection: connection://slack/flanksource
  filter: check.type == 'http'
```
