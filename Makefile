## Makefile aliases for Task commands
## All linting tasks are now managed in Taskfile.yml
## These targets provide backward compatibility

.PHONY: vale
vale: ## Download vale locally if necessary
	task vale:install

.PHONY: lint
lint: ## Run all linting (vale + markdownlint)
	task lint

.PHONY: vale-changed
vale-changed: ## Run vale on markdown files changed in current branch
	task vale:changed

.PHONY: check-files
check-files: ## Check for broken file references in HTML build output
	task check:files

.PHONY: fmt
fmt: ## Format all markdown files with prettier
	task fmt

.PHONY: fmt-check
fmt-check: ## Check markdown formatting without making changes
	task fmt:check

.PHONY: check
check: ## Run all checks (lint + formatting + file references)
	task check

.PHONY:
sync:
	git submodule update --init --recursive

update-submodules:
	git submodule update --remote --merge && git submodule sync

.PHONY: llms.txt
llms.txt:
	claude --model  claude-haiku-4-5 \
		'go through all the cel functions in mission-control/docs/reference/scripting/cel.mdx and document each and every one those functions in @canary-checker/docs/scripting/llms.txt with function signature. Example: - base64.decode(string)'