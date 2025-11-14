#!/bin/bash
# Script to generate missing fixture and playbook files for the documentation build

set -e

echo "Generating missing fixture files..."

# Create missing permission fixtures
mkdir -p modules/mission-control/fixtures/permissions

cat > modules/mission-control/fixtures/permissions/allow-person-playbook.yaml <<'EOF'
---
# yaml-language-server: $schema=../../config/schemas/permission.schema.json
apiVersion: mission-control.flanksource.com/v1
kind: Permission
metadata:
  name: allow-user-foo-playbook-run
spec:
  description: allow user foo to run playbooks
  subject:
    person: foo@bar.com
  actions:
    - playbook:*
  object:
    playbooks:
      - name: "*" # this is a wildcard selector that matches any playbook
EOF

cat > modules/mission-control/fixtures/permissions/agent-based-permission.yaml <<'EOF'
---
apiVersion: mission-control.flanksource.com/v1
kind: Permission
metadata:
  name: allow-dev-team-agent-access
spec:
  description: Allow development team to access resources from development environment agents
  subject:
    person: dev-team@example.com
  actions:
    - read
    - playbook:*
  object:
    agents:
      - name: dev-*  # Wildcard selector for development agents
EOF

cat > modules/mission-control/fixtures/permissions/tag-based-permission.yaml <<'EOF'
---
apiVersion: mission-control.flanksource.com/v1
kind: Permission
metadata:
  name: allow-production-team-tag-access
spec:
  description: Allow production team to access resources tagged with production environment
  subject:
    person: prod-team@example.com
  actions:
    - read
    - playbook:*
  object:
    tags:
      environment: production
EOF

echo "Creating generated playbooks directory..."
mkdir -p modules/generated/playbooks

cat > modules/generated/playbooks/recommend-playbook.yaml <<'EOF'
apiVersion: mission-control.flanksource.com/v1
kind: Playbook
metadata:
  name: recommend-playbook
spec:
  title: Recommend Playbooks
  description: Diagnoses the health of a resource using AI, and then recommends playbooks to fix the issue, sending the results to Slack
  icon: bot
  category: AI
  configs:
    - types:
        - Kubernetes::Pod
        - Kubernetes::Deployment
  parameters:
    - name: prompt
      label: Prompt
      default: Find out why $(.config.name) is unhealthy
      properties:
        multiline: 'true'
  actions:
    - name: analyse
      ai:
        formats:
          - recommendPlaybook
        recommendPlaybooks:
          selector:
            - name: "*"
        connection: 'connection://mission-control/anthropic'
        systemPrompt: 'You are a helpful assistant that analyzes Kubernetes resources and recommends playbooks to fix issues.'
        playbooks:
          - name: kubernetes-logs
        prompt: '$(.params.prompt)'
        changes:
          since: 24h
        analysis:
          since: 24h
        relationships:
          - depth: 3
            direction: outgoing
            changes:
              since: 24h
            analysis:
              since: 24h
          - depth: 5
            direction: incoming
            changes:
              since: 24h
            analysis:
              since: 24h
    - name: send recommended playbooks
      notification:
        connection: 'connection://mission-control/slack'
        title: Recommended playbooks
        message: '$(getLastAction.result.recommendedPlaybooks)'
EOF

cat > modules/generated/playbooks/kustomize-edit.yaml <<'EOF'
apiVersion: mission-control.flanksource.com/v1
kind: Playbook
metadata:
  name: kustomize-edit
spec:
  title: 'Edit'
  category: Flux
  description: Updates the source of a GitOps managed object by submitting a Git PR
  icon: flux
  parameters:
    - default: 'chore: update $(.config.type)/$(.config.name)'
      label: Commit Message
      name: commit_message

    # Retrieves the JSON configuration for the selected config item, passing it through the `neat` function
    # to strip out runtime information like managedFields and status, and then converts back to YAML
    # for easy editing
    - default: $(.config.config | toJSON | neat | json | toYAML)
      label: "YAML"
      name: yamlInput
      properties:
        size: large
      type: code

    # Lookup the Git repository from Flux source of the Kustomzation that created the select config item
    - default: '$(.git.git.url)'
      label: Git Repo
      name: url

    # Lookup the path of the config item in the Git repository using origin annotations
    - default: '$(.git.git.file)'
      label: File
      name: file

  configs:
    # This playbook can only be run against Kubernetes objects created from a FluxCD Kustomization CRD
    - labelSelector: 'kustomize.toolkit.fluxcd.io/name'

  actions:
    - name: Create Pull Request With Changes
      gitops:
        repo:
          connection: 'connection://mission-control/github'
          url: '$(.params.url)'
          branch: edit-manifest-$(random.Alpha 8)
        commit:
          # Use the user submitting the playbook as the author of the git commits
          author: '$(.user.name)'
          email: '$(.user.email)'
          message: $(.params.commit_message)
        pr:
          title: '$(.params.commit_message)'
        patches:
          - path: '$(.params.file)'
            # patch the file using YQ, finding the document in a multi-doc yaml file using Kind and Name
            yq: |
              select(
                .kind=="$(.config.config | jq `.kind`)" and
                .metadata.name=="$(.config.config | jq `.metadata.name`)"
              ) |= $(.params.yamlInput | yaml | toJSON)
EOF

echo "Generated files created successfully!"
