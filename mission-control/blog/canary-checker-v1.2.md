---
title: "Canary Checker v1.2: Chained Checks, Generated Checks and TLS Everywhere"
date: 2026-06-23
slug: canary-checker-v1.2
tags: [release, canary-checker]
authors: [yash]
hide_table_of_contents: false
---

# Canary Checker v1.2: Chained Checks, Generated Checks and TLS Everywhere

It's been a busy seven months since v1.1.2. The headline of this release isn't a single
marquee feature — it's that Canary Checker got noticeably more **composable**, more
**secure**, and considerably more **correct** in the numbers it reports. We also
took the opportunity to clean house by deprecating a lot of unused check types and dead code.

Here's what's worth knowing:

## Checks that build on other checks

Two features in this release move Canary Checker from "a list of independent probes" toward
"a small workflow engine for health checks."

**Request chaining** lets a check depend on another and reuse its output. The classic example
is an authenticated API: one check logs in and *exports* the token, and a downstream check
references it directly in its template:

```yaml
http:
  - name: login
    url: https://api.example.com/login
    export:
      token: .json.access_token
  - name: get-profile
    dependsOn: [login]
    url: https://api.example.com/me
    headers:
      - name: Authorization
        value: "Bearer {{.responses.login.token}}"
```

Behind the scenes a topological sort guarantees `login` runs before `get-profile`. And because
we promoted `dependsOn` to the shared check spec, this isn't HTTP-only — any check type can
depend on any other. (SQL checks also picked up a `timeout` in the same change, so a slow query
no longer hangs a check indefinitely.)

**Transformed canaries** go a step further: a check can now *generate brand-new checks* from its
output. This grew out of a real request ([#2731](https://github.com/flanksource/canary-checker/issues/2731)) —
select all the Ingresses or HTTPRoutes in a cluster and automatically spin up an HTTP health
check for each endpoint. The generated canaries are persisted as first-class objects, and a
cleanup job prunes orphans every 12 hours (with cascading deletes when the parent goes away).
You describe *what* you want checked once, and Canary Checker keeps the concrete checks in sync
with reality.

```yaml
apiVersion: canaries.flanksource.com/v1
kind: Canary
metadata:
  name: ingress-canary
spec:
  schedule: "@every 5m"
  kubernetes:
    - name: ingress-http-checks
      kind: Ingress
      namespaceSelector:
        name: "*"                       # scan Ingresses in every namespace
      transform:
        expr: |
          {
            'name': 'ingress-http-checks',
            'namespace': 'default',
            'spec': {
              'schedule': '@every 5m',
              'http': dyn(results).map(r,
                r.Object.spec.?rules.orValue([]).map(rule, {
                  'name': r.Object.metadata.namespace + '/' + r.Object.metadata.name + '/' + rule.host,
                  'url': (r.Object.spec.?tls.orValue([]).exists(t, rule.host in t.hosts) ? 'https://' : 'http://') + rule.host
                })
              ).flatten()
            }
          }.toJSON()
```

## Smarter targeting with the agent selector

In multi-agent deployments you often want a canary to run from specific vantage points. The new
**agent selector** ([#2845](https://github.com/flanksource/canary-checker/pull/2845)) lets you
say exactly which agents should execute a canary using glob patterns and negations:

```yaml
spec:
  agentSelector: "eu-west-*, !team-b"
```

Canary Checker creates a derived copy of the canary for each matched agent. Great for "run this
probe from every EU region except the one team B owns" — which is exactly the multi-region use
case the feature was [requested](https://github.com/flanksource/mission-control/issues/2727) for.

:::info
This is for our [Mission Control](https://flanksource.com/docs/) offering since that supports agent mode
:::

## TLS, finally, everywhere

Two checks that previously couldn't speak TLS now can.

The **Redis check** gained an opt-in `TLSConfig` — directly motivated by a user
([#2982](https://github.com/flanksource/canary-checker/issues/2982)) who couldn't health-check
AWS MemoryDB: `redis-cli --tls` connected fine, and other checks like mongo/documentdb already
spoke TLS, but the Redis check had no way to turn it on and `ssl=true` in the URL just failed.
The new config supports the full spectrum: system trust store, a custom CA, mutual TLS with
client certs, or `insecureSkipVerify` for dev. We extracted the TLS-config plumbing into a
reusable helper, so future checks get TLS almost for free, and backed it with a testcontainer
that runs a genuinely TLS-only Redis to prove the negotiation works.

The **Prometheus check** likewise learned to negotiate TLS and mTLS, so scraping a secured
Prometheus no longer requires a sidecar proxy.

## HTTP checks enhanced

The HTTP check was refactored onto Canary Checker's shared connection library, and that unlocked
a cluster of capabilities people have asked for:

- **HTTP Digest auth** and **AWS SigV4 request signing** for talking to signed/legacy endpoints
- **HAR file collection** for capturing the full request/response timeline
- **`maxRedirects`** to control redirect following
- Credentials embedded in URLs (`https://user:pass@host`) are now honoured

## The numbers you see are now the right numbers

This is the unglamorous but important part of the release. A focused pass on the metrics pipeline
fixed several bugs that were quietly distorting dashboards:

- `canary_check_failed_count` was being **incremented twice** on a normal failure, and invalid /
  internal-error outcomes were wrongly counted as failures — inflating failure counts and
  deflating uptime. Each check run now moves exactly one counter.
- The uptime PromQL had an **operator-precedence bug** — `failed/failed + success` parses as
  `1 + success`, which is nonsense. It now correctly computes `(success / (failed + success)) * 100`,
  with guards against nil/empty/NaN so an idle window returns `0` instead of panicking.
- With `--metric-labels-allowlist` configured, a couple of metrics were mismatching label sets
  (causing silently-swallowed Prometheus panics) or emitting label *names* where *values* belonged.

We also caught a sneaky scheduling bug ([#2984](https://github.com/flanksource/canary-checker/pull/2984)):
concurrent `SyncCanaryJob` calls could race and leave an **orphaned cron entry** that survived
every cleanup sweep and fired on every tick — silently doubling check inserts. It's now serialized
per canary. And a self-comparison bug that meant `lastTransitionedTime` was *never* populated
([#3001](https://github.com/flanksource/canary-checker/issues/3001)) is fixed.

One more operational gotcha worth calling out: the controllers emit Kubernetes events through the
v2 EventRecorder, which writes `events.k8s.io/v1` objects — but the shipped RBAC only granted
permissions on core events. Because events are only emitted on the *failure* path, passing
canaries hid the problem entirely. The chart and kustomize RBAC now grant the right permission.
Worth a `helm upgrade`.

## Cleaning house

Canary Checker has accumulated check types over the years, and several have been deprecated for a
long time. This release removes the implementations for `containerd`, `docker`, `helm`, `namespace`,
`pod`, `github`, `gitProtocol` and their push variants — about 1,260 lines of Go and 1,280 lines of
CRD.

They're replaced with stubs that return a clear "this check type was removed, use
`kubernetesResource` or `exec` instead" message, so nothing fails silently. The `git`/`mergestat`
check is now deprecated too, and topology/component jobs and the `karina` dependency were removed.
The result is a leaner, more focused Canary Checker.

## Upgrading

This is a recommended upgrade for everyone, particularly if you:

- You need dynamic check generation
- Run into problems that require chaining of checks
- Depend on accurate uptime/failure metrics
- Have ever wondered why `kubectl get canaries` showed an empty `INTERVAL` column (it's now
- Talk to TLS-only Redis (MemoryDB) or a secured Prometheus
  `SCHEDULE`, and it's populated)

If you use any of the removed check types, migrate them to `kubernetesResource` or `exec` before
upgrading. As always, review the chart RBAC changes — especially the new `events.k8s.io` grant —
and run `helm upgrade` to pick them up.

## Contributors :heart:

- [Mohamed Ragab](https://github.com/mrgb7) contributed the request chaining feature.
- [Immanuel Tikhonov](https://github.com/immanuwell) fixed a duplicate check naming bug.
- [Scott Miller](https://github.com/sam6258) fixed a display issue around error messages for failed checks.

Thanks to everyone who filed issues and sent PRs this cycle. 🐦
