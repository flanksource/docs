.PHONY: lint
lint:
	vale sync
	vale canary-checker/docs  --glob='!**/{README,CHANGELOG,readme,security,SECURITY,CONTRIBUTING,benchmark,development,LICENSE}.md'
	vale mission-control/docs  --glob='!**/{README,CHANGELOG,readme,security,SECURITY,CONTRIBUTING,benchmark,development,LICENSE}.md'
	markdownlint mission-control/docs
	markdownlint canary-checker/docs

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
