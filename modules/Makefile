
OS   ?= $(shell uname -s | tr '[:upper:]' '[:lower:]')
ARCH ?= $(shell uname -m | sed 's/x86_64/amd64/')

.PHONY: all
all: sync manifests

.PHONY: sync
sync:
	git submodule update --remote --recursive && git submodule sync


LOCALBIN=.bin
EGET=$(LOCALBIN)/eget
EGET_BIN=$(LOCALBIN)
$(EGET): $(LOCALBIN)
	GOBIN=$(shell pwd)/$(LOCALBIN) go install github.com/zyedidia/eget@v1.3.4

$(LOCALBIN)/helm: 	$(EGET)
	$(EGET) https://get.helm.sh/helm-v3.18.2-$(OS)-$(ARCH).tar.gz --upgrade-only --to $(LOCALBIN) --file helm
$(LOCALBIN)/yq: $(EGET)
	$(EGET) -t v4.45.1 mikefarah/yq --upgrade-only --to $(LOCALBIN) -a "^.tar.gz"


.PHONY: manifests
manifests: $(LOCALBIN)/helm $(LOCALBIN)/yq
	rm -rf rendered-manifests
	./make.sh  mission-control-registry/charts/playbooks-ai "--set slack.connection=connection://mission-control/slack --set global.llm_connection=connection://mission-control/anthropic"
	./make.sh  mission-control-registry/charts/playbooks-kubernetes
	./make.sh  mission-control-registry/charts/playbooks-flux "--set git.connection=connection://mission-control/github"


$(LOCALBIN):
	mkdir -p $(LOCALBIN)
