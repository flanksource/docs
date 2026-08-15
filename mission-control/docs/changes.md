---
title: "What's New"
hide_title: true
---

# What's New

## March 2026

### Features
- **Playbooks**: Scheduled playbook execution support
- **Playbooks**: Scoped impersonation for playbook runs
- **API**: Facet connection type and rendering support
- **API**: Report action and scheduled playbook triggers
- **API**: CRD status conditions for Application, Team, IncidentRule, Notification, Scope, Permission
- **API**: CRD ready-condition status lifecycle for Connection
- **API**: ObservedGenerationSetter for all CRD types
- **Config DB**: Merge external entities with overlapping aliases
- **Config DB**: User/group alias support for external_user_groups
- **Config DB**: Unified fixture framework with e2e DB test runner
- **Duty**: Config access summary by user and by config views
- **Duty**: Grouping and deduplication of log lines
- **Duty**: ClientOption pattern with HAR collector support
- **Duty**: Stored procedures for external entity merge and upsert
- **Duty**: Include config path in changes view
- **Duty**: Case insensitive resource selector search

### Fixes
- **Kubernetes**: Use dynamic informer factory to support CRD watches
- **CloudTrail**: Add adaptive retry
- **Notifications**: Add SMTP context to shoutrrr send errors
- **Metrics**: Remove last login query against users view
- **Config DB**: Fix FK errors on external entities
- **Config DB**: Recognize `id` as alias for `external_id` in applyConfigRefDefaults
- **Duty**: Honor DisableRLS for generated view tables
- **Duty**: Use check_id instead of id in check event trigger
- **Duty**: Drop notification_update_enqueue trigger
- **Duty**: Add event_id to event_queue index
- **Duty**: Remove custom JSON marshaler from HTTPConnection

### Improvements
- **Views**: Add config_access_summary views

## February 2026

### Features
- **Playbooks**: Scrub secret params from action output
- **Playbooks**: Template HTTP method and headers in actions
- **Connections**: Add Elasticsearch/Redis CRD types, align AWS/GCP/HTTP with duty
- **RBAC**: Sync playbook permissions to config_access table
- **Config DB**: GitHub/OpenSSF scrapers
- **Config DB**: HTTP pagination support for scraper
- **Config DB**: Create config access logs for IAM assume role
- **Config DB**: Scrape playbooks, people, teams and playbook roles
- **Config DB**: RBAC config access
- **Duty**: Shell sandbox with flanksource/sandbox-runtime
- **Duty**: AWS SigV4 signing and Azure/AWS HTTP connection types
- **Duty**: HTTP query support in dataquery package
- **Duty**: Add user type in config access summary
- **Duty**: Add source column to config_access table
- **Duty**: Kubernetes apiVersion/Kind format in QueryResources
- **Canary Checker**: Support templating path for folder check
- **Canary Checker**: Handle Secret Lookup Rate Limit errors
- **Canary Checker**: Add apiVersion field to KubernetesCheck
- **Canary Checker**: ARM matrix build with container self-tests

### Fixes
- **Playbooks**: Keep playbook notification body authoritative
- **Playbooks**: Add connection permission checks to log actions
- **Playbooks**: Record CRD validation failures in status
- **Playbooks**: Notification connection should be templatable
- **Application**: Deduplicate users list and populate missing fields
- **Application**: Skip scraper generation for non-azure scrapers
- **Config DB**: Restore kubernetes scraper tags lost in refactor
- **Duty**: Split suppressed count into suppressed and in_progress
- **Duty**: Allow empty connection type in NewHTTPConnection
- **Duty**: Preserve inline fields during connection hydration
- **Duty**: Add missing FK indexes and constraints
- **Duty**: Skip duty auth wrapper for tokenFile auth
- **Duty**: Send POST/PUT/PATCH body in HTTP dataquery
- **Duty**: Include Go comments in generated schemas
- **Canary Checker**: Improve error output in canary-checker run

### Improvements
- **Duty**: Connection merge headers instead of replacing on override
- **Duty**: Ordered playbook actions by scheduled_time
