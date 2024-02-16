.PHONY:
sync:
	rm -rf docs/canary-checker/
	cp -r ../canary-checker/docs/ docs/canary-checker
	rm docs/canary-checker/index.md
	rm -rf  static/img/icons
	cp -r  ../canary-checker/static/img/icons static/img
	cp -r ../canary-checker/src/components src/
	cp -r ../canary-checker/src/theme src/
	cp -r ../canary-checker/src/css src/


watch: sync
	npm exec -c 'docusaurus start'
