# System Properties

Mission Control uses runtime properties for behavior that should be adjustable
without changing code. Properties are string key/value pairs. They are separate
from resource `properties` fields such as connection settings, topology display
properties, or playbook parameter UI hints.

## Setting Properties

### Helm

For Kubernetes installs, set properties under the chart `properties` map:

```yaml
properties:
  logs.disable: "true"
  ai.disable: "true"
  dashboard.default.view: mission-control-dashboard
```

### Properties File

Mission Control loads `mission-control.properties` when present:

```properties
log.level=debug
query.log=true
topology.query.timeout=45s
```

### Database

Database-backed properties are stored in the `properties` table and are visible
from Settings > Feature Flags when the UI has permission to read that table.

```sql
INSERT INTO properties (name, value)
VALUES ('logs.disable', 'true')
ON CONFLICT (name) DO UPDATE SET value = excluded.value;
```

### CLI

Components that expose the common property flags accept repeated `-P` values:

```sh
mission-control -P log.level=debug -P query.log=true
```

## UI Feature Flags

The UI fetches `/properties` and treats feature flags as properties named
`<feature>.disable`. A feature is disabled only when the value is exactly the
string `true`.

| Property | Effect |
| --- | --- |
| `topology.disable` | Hide or disable topology UI surfaces. |
| `health.disable` | Hide or disable health UI surfaces. |
| `incidents.disable` | Hide or disable incident UI surfaces. |
| `config.disable` | Hide or disable config UI surfaces. |
| `logs.disable` | Hide or disable log UI surfaces. |
| `playbooks.disable` | Hide or disable playbook UI surfaces. |
| `applications.disable` | Hide or disable application UI surfaces. |
| `views.disable` | Hide or disable custom view UI surfaces. |
| `ai.disable` | Hide or disable AI actions and prompts in UI surfaces that check this flag. |
| `agents.disable` | Hide or disable agent UI surfaces. |
| `settings.connections.disable` | Hide or disable connection settings. |
| `settings.users.disable` | Hide or disable user settings. |
| `settings.teams.disable` | Hide or disable team settings. |
| `settings.rules.disable` | Hide or disable rules settings. |
| `settings.config_scraper.disable` | Hide or disable config scraper settings. Also disabled when `config.disable=true`. |
| `settings.topology.disable` | Hide or disable topology settings. Also disabled when `topology.disable=true`. |
| `settings.health.disable` | Hide or disable health settings. Also disabled when `health.disable=true`. |
| `settings.job_history.disable` | Hide or disable job history settings. Also disabled when `health.disable=true`. |
| `settings.feature_flags.disable` | Hide or disable the feature flags settings page. |
| `settings.logging_backends.disable` | Hide or disable logging backend settings. |
| `settings.event_queue_status.disable` | Hide or disable event queue status settings. |
| `settings.organization_profile.disable` | Hide or disable organization profile settings. |
| `settings.notifications.disable` | Hide or disable notification settings. |
| `settings.playbooks.disable` | Hide or disable playbook settings. |
| `settings.integrations.disable` | Hide or disable integration settings. |
| `settings.permissions.disable` | Hide or disable permission settings. |
| `settings.artifacts.disable` | Hide or disable artifact settings. |

Rows with `source=local` are shown read-only in the Feature Flags page.

## Global UI Snippets

`flanksource.ui.snippets` is a local UI property used to inject a global browser
snippet. The value must be a JavaScript function expression. The UI executes it
once after the authenticated user is available and passes `{ user, organization }`.

```js
({ user, organization }) => {
  window.analytics?.identify(user?.id, {
    email: user?.email,
    organization: organization?.name
  });
}
```

Only `flanksource.ui.snippets` properties with `source=local` are executed.
DB-backed rows with this name are visible to the feature-flag API but ignored by
the snippet hook.

## Dashboard Properties

| Property | Effect |
| --- | --- |
| `dashboard.default.view` | Backend `/api/dashboard` view selector. Accepts `namespace/name` or name and defaults to `mission-control-dashboard`. |
| `defaults.dashboard_view` | UI sidebar dashboard navigation selector. Accepts view UUID, `namespace/name`, or name. |

## Proxy Property

| Property | Effect |
| --- | --- |
| `proxy.disable` | In Clerk auth mode, overrides the organization's `direct` metadata. When true, the UI bypasses the proxy and points API clients at the organization's `backend_url`. |

## Debug And Trace

Debug and trace settings are different from debug and trace log levels. Log
levels are used for general service output; the log volume scales with
functionality rather than data volume. Debug and trace are defined on individual
objects such as canaries, scrapers, and playbooks, where volume scales with the
number of resources. Resource-level debug or trace usually uses a property with
the resource name or ID as a prefix.
