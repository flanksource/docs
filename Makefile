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

.PHONY:
sync:
	git submodule update --init --recursive

update-submodules:
	git submodule update --remote --merge && git submodule sync
