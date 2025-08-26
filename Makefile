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

.PHONY: build
build:
	@echo "Building mission-control documentation..."
	@cd modules && make all
	@cd mission-control && npm ci && npm run build

.PHONY: file-ref-check
file-ref-check: ## Check for broken file references in build output
	@echo "Checking for broken files in mission-control/build"
	@cd mission-control/build && \
		echo "Total files: $$(ls -alh . | wc -l)" && \
		echo "Total HTML files: $$(find . -type f -name "*.html" | wc -l)" && \
		if rg 'file=../../../modules' -g '*.html' | grep -q .; then \
			echo "ERROR: Found broken file references:" && \
			rg 'file=../../../modules' -g '*.html' && \
			exit 1; \
		else \
			echo "No broken file references found"; \
		fi

.PHONY:
sync:
	git submodule update --init --recursive

update-submodules:
	git submodule update --remote --merge && git submodule sync
