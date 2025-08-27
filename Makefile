## Tool Binaries
LOCALBIN ?= $(shell pwd)/.bin
VALE ?= $(LOCALBIN)/vale
OS   = $(shell uname -s | tr '[:upper:]' '[:lower:]')
ARCH = $(shell uname -m | sed 's/x86_64/64-bit/' | sed 's/arm64/ARM64/')

$(LOCALBIN):
	mkdir -p $(LOCALBIN)

.PHONY: vale
vale: $(VALE) ## Download vale locally if necessary
$(VALE): $(LOCALBIN)
	@if ! test -s $(LOCALBIN)/vale; then \
		echo "Downloading vale for $(OS)-$(ARCH)..."; \
		if [ "$(OS)" = "darwin" ]; then \
			curl -sfL https://github.com/errata-ai/vale/releases/download/v3.1.0/vale_3.1.0_macOS_$(ARCH).tar.gz | tar -xz -C $(LOCALBIN) vale; \
		else \
			curl -sfL https://github.com/errata-ai/vale/releases/download/v3.1.0/vale_3.1.0_Linux_$(ARCH).tar.gz | tar -xz -C $(LOCALBIN) vale; \
		fi \
	fi

.PHONY: lint
lint: vale
	$(VALE) sync
	$(VALE) canary-checker/docs  --glob='!**/{README,CHANGELOG,readme,security,SECURITY,CONTRIBUTING,benchmark,development,LICENSE}.md'
	$(VALE) mission-control/docs  --glob='!**/{README,CHANGELOG,readme,security,SECURITY,CONTRIBUTING,benchmark,development,LICENSE}.md'
	markdownlint mission-control/docs
	markdownlint canary-checker/docs

.PHONY: vale-changed
vale-changed: vale ## Run vale on markdown files changed in current branch
	$(VALE) sync
	@files=$$(git diff --name-only main...HEAD | grep -E '\.(md|mdx)$$'); \
	if [ -n "$$files" ]; then \
		echo "Running vale on changed files: $$files"; \
		$(VALE) $$files --glob='!**/{README,CHANGELOG,readme,security,SECURITY,CONTRIBUTING,benchmark,development,LICENSE}.md'; \
	else \
		echo "No markdown/mdx files changed"; \
	fi

.PHONY: fmt
fmt:
	npx prettier --write "**/*.md"

.PHONY: fmt-check
fmt-check:
	npx prettier --check --log-level=debug "**/*.md"

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
