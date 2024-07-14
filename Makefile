.PHONY: lint
lint:
	vale sync
	vale canary-checker/docs
	vale mission-control/docs
	markdownlint mission-control/docs
	markdownlint canary-checker/docs


.PHONY:
sync:
	git submodule update --init --recursive

update-submodules:
	git submodule update --remote --merge && git submodule sync
