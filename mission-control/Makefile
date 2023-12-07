.PHONY:
sync:
	rm -rf docs/canary-checker/
	cp -r ../canary-checker/docs/ docs/canary-checker
	rm docs/canary-checker/index.md
	mkdir -p docs/reference
	cp -r docs/canary-checker/scripting docs/reference
	cp docs/canary-checker/concepts/authentication.md docs/reference/
	cp docs/canary-checker/concepts/connections.md docs/reference/
