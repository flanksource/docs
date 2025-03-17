.PHONY: all
all: sync manifests

.PHONY: sync
sync:
	    git submodule update --remote --merge && git submodule sync


.PHONY: manifests
manifests:
	rm -rf rendered-manifests
	./make.sh  mission-control-registry/charts/playbooks-ai "--set slack.connection=connection://mission-control/slack --set global.llm_connection=connection://mission-control/anthropic"
	./make.sh  mission-control-registry/charts/playbooks-kubernetes
	./make.sh  mission-control-registry/charts/playbooks-flux "--set git.connection=connection://mission-control/github"
