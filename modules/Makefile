
OS   ?= $(shell uname -s | tr '[:upper:]' '[:lower:]')
ARCH ?= $(shell uname -m | sed 's/x86_64/amd64/')

.PHONY: all
all: sync manifests

.PHONY: sync
sync:
	git submodule update --remote --recursive && git submodule sync


LOCALBIN=.bin
DEPS=$(LOCALBIN)/deps

$(DEPS): $(LOCALBIN)

	which $(DEPS) || curl -sSL https://github.com/flanksource/deps/releases/latest/download/deps-$(OS)-$(ARCH).tar.gz |  tar -xz  -C $(LOCALBIN)
	chmod +x $(DEPS)

$(LOCALBIN)/helm: $(DEPS)
	$(DEPS) install helm@3 --bin-dir $(LOCALBIN) --no-progress

$(LOCALBIN)/yq: $(DEPS)
	$(DEPS) install yq --bin-dir $(LOCALBIN) --no-progress


.PHONY: manifests
manifests: $(LOCALBIN)/helm $(LOCALBIN)/yq
	rm -rf rendered-manifests
	./make.sh  mission-control-registry/charts/playbooks-ai "--set slack.connection=connection://mission-control/slack --set global.llm_connection=connection://mission-control/anthropic"
	./make.sh  mission-control-registry/charts/playbooks-kubernetes
	./make.sh  mission-control-registry/charts/playbooks-flux "--set git.connection=connection://mission-control/github"


$(LOCALBIN):
	mkdir -p $(LOCALBIN)
