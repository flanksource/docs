.PHONY:
sync:
	rm -f docs/canary-checker/index.md

# run fixes on canary checker docs
canary-fix:
	sed -i 's#(/scripting#(/reference/scripting#g' docs/canary-checker/concepts/display-formatting.md
	sed -i 's#(/scripting#(/reference/scripting#g' docs/canary-checker/concepts/health-evaluation.md

watch: sync
	npm exec -c 'docusaurus start'
