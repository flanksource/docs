.PHONY:
sync:
	rm -rf docs/canary-checker/
	cp -r ../canary-checker/docs/ docs/canary-checker
	rm docs/canary-checker/index.md
	mkdir -p docs/reference
	cp -r docs/canary-checker/scripting docs/reference
	rm -rf  static/img/icons
	cp -r  ../canary-checker/static/img/icons static/img
	cp docs/canary-checker/concepts/secret-management.md docs/reference/
	cp docs/canary-checker/concepts/connections.md docs/reference/
	cp docs/canary-checker/concepts/connection.md docs/reference/
	cp -r ../canary-checker/src/components src/
	cp -r ../canary-checker/src/theme src/
	cp -r ../canary-checker/src/css src/


watch: sync
	npm exec -c 'docusaurus start'
