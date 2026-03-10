# Feature: Audit Report Guide

## Overview

A comprehensive guide that shows platform engineers and compliance officers how to use Mission Control to build audit-ready infrastructure reporting. Covers application/config access tracking, backup monitoring, change tracking & drift detection, and infrastructure inventory.

**Audience**: Platform engineers setting up Mission Control for audit readiness AND compliance officers reviewing audit data.

**Location**: Top-level guide at `guide/audit/` since it spans config-db scrapers, health checks, views, and notifications.

## Functional Requirements

### FR-1: Application & Config Access Tracking
**Description**: Document how to scrape and report on who has access to which applications, configs, IAM roles, and group memberships.
**Acceptance Criteria**:
- [ ] Explains access log scraping with `full: true`
- [ ] Shows AWS IAM access scraper example
- [ ] Shows Kubernetes RBAC scraper example
- [ ] Shows PostgreSQL user/role scraper example
- [ ] Includes view YAML for access summary dashboard
- [ ] Links to existing access-logs and config_access reference docs

### FR-2: Backup Monitoring
**Description**: Document how to monitor backup health, track backup locations/regions, verify retention, and test restores.
**Acceptance Criteria**:
- [ ] Backup health checks (canary checks verifying backups run on schedule)
- [ ] Backup location/region tracking (scraping backup configs for S3 buckets, regions, cross-region replication)
- [ ] Backup events from changes (tracking backup-related config changes)
- [ ] Backup restore testing (playbooks or checks that verify restore capability)
- [ ] View YAML for backup status dashboard

### FR-3: Change Tracking & Drift Detection
**Description**: Document how to track config changes over time, identify who changed what, and detect drift.
**Acceptance Criteria**:
- [ ] Explains how config changes are captured (diff and event-based)
- [ ] Shows CloudTrail integration for AWS change tracking
- [ ] Shows Kubernetes event tracking
- [ ] View YAML for change audit dashboard
- [ ] Notification config for critical changes

### FR-4: Infrastructure Inventory
**Description**: Document how to maintain a complete catalog of infrastructure resources with health status and relationships.
**Acceptance Criteria**:
- [ ] Shows AWS scraper for complete infrastructure inventory
- [ ] Shows Kubernetes scraper for cluster inventory
- [ ] Shows database scraper for database inventory
- [ ] View YAML for infrastructure inventory dashboard
- [ ] Explains health status and relationships for audit context

### FR-5: Notifications for Audit Events
**Description**: Configure alerts for audit-relevant events.
**Acceptance Criteria**:
- [ ] Notification for failed backups
- [ ] Notification for critical config changes
- [ ] Notification for access anomalies (e.g., access without MFA)

## Infrastructure Types Covered
- AWS (RDS, S3, EC2, IAM)
- Kubernetes (RBAC, resources, events)
- Databases (PostgreSQL users, roles, connection logs)

## Document Structure
- Top-level guide at `guide/audit/index.mdx`
- End-to-end YAML examples inline
- Links to existing reference docs
- Framework-agnostic (not tied to specific compliance frameworks)

## Success Criteria
- [ ] Guide covers all 4 audit areas with working YAML examples
- [ ] Both engineers and compliance officers can follow the guide
- [ ] Links correctly to existing reference documentation
- [ ] Follows existing doc format (frontmatter, MDX components, code blocks)
