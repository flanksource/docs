This repository contains documentation for multiple Flanksource projects built with Docusaurus.

## Guidelines for Contributors

- Follow the [Google Technical Documentation Style Guide](https://developers.google.com/style/) and the project's `CONTRIBUTING.md` and `CONVENTIONS.md` files.
- Run formatting and linting before committing changes:
  - `make fmt` formats Markdown with Prettier.
  - `make lint` runs Vale and markdownlint on the docs.
- Use `yarn start` to run the Docusaurus development server within each site (`mission-control` or `canary-checker`).
- Add new names of tools / acronymns in `styles/ignore/words-with-suggestions.txt`

## PR instructions

- use conventional commit syntax

**Repository summary**

- Docs for "canary-checker", "mission-control" and shared components under `common`.
- Style enforced by Vale, markdownlint, and Prettier via Makefile targets.
- Documentation follows Google style, second person, active voice, and present tense.
