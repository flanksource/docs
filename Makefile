.PHONY: serve-docs
serve-docs:
	docker run --rm -it -p 8000:8000 -v $(PWD):/docs -w /docs squidfunk/mkdocs-material

.PHONY: build-docs
build-docs:
	pip3 install $(MKDOCS_INSIDERS)
	mkdocs build -d build/docs

.PHONY: deploy-docs
deploy-docs:
	which netlify 2>&1 > /dev/null || sudo npm install -g netlify-cli
	netlify deploy --site cfe8c6b7-79b7-4a88-9e13-ff792126717f --prod --dir build/docs
