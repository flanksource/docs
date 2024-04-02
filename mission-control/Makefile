.PHONY:
sync:
	rm -f docs/canary-checker/index.md
	git submodule update --init --recursive

watch: sync
	npm exec -c 'docusaurus start'
