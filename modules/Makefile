
OS   ?= $(shell uname -s | tr '[:upper:]' '[:lower:]')
ARCH ?= $(shell uname -m | sed 's/x86_64/amd64/')

.PHONY: all
all: sync manifests

.PHONY: sync
sync:
	git submodule update --remote --recursive && git submodule sync


.PHONY: manifests
manifests: .bin/helm .bin/yq
	rm -rf rendered-manifests
	./make.sh  mission-control-registry/charts/playbooks-ai "--set slack.connection=connection://mission-control/slack --set global.llm_connection=connection://mission-control/anthropic"
	./make.sh  mission-control-registry/charts/playbooks-kubernetes
	./make.sh  mission-control-registry/charts/playbooks-flux "--set git.connection=connection://mission-control/github"


.bin:
	mkdir -p .bin

.bin/helm: .bin
	curl -sL https://get.helm.sh/helm-v3.17.2-$(OS)-$(ARCH).tar.gz -o .bin/helm.tar.gz
	tar -xzf .bin/helm.tar.gz -C .bin --strip-components 1

.bin/yq: .bin
	curl -sL https://github.com/mikefarah/yq/releases/download/v4.45.1/yq_$(OS)_$(ARCH) -o .bin/yq
	chmod +x .bin/yq
