# Render for Context7 Script

This script renders Docusaurus documentation into clean Markdown files suitable for parsing by [Upstash Context7](https://github.com/upstash/context7).

## What it does

1. Resolves all MDX imports and components to plain Markdown
2. Converts JSX components to readable text representations
3. Resolves code imports from external files (using `file=` syntax)
4. Preserves frontmatter metadata
5. Outputs clean Markdown files without MDX-specific syntax

## Usage

### For Canary Checker

```bash
cd canary-checker
npm install  # Install dependencies
npm run render-for-context7
```

### For Mission Control

```bash
cd mission-control
npm install  # Install dependencies
npm run render-for-context7
```

## Output

The rendered documentation will be saved to a `rendered-docs` directory within each project folder, maintaining the same directory structure as the source docs.

## Component Mappings

The script converts MDX components to readable Markdown:

- `<Fields>` → Section header with connection info
- `<Step>` → Numbered step with name
- `<CommonLink>` → Standard Markdown link
- `<Tabs>/<TabItem>` → Section headers
- `<Icon>` → Icon name in brackets
- Other components → Descriptive placeholders

## Code Import Resolution

The script resolves code imports in two formats:

1. Regular paths: `file="../examples/config.yaml"`
2. Root paths: `file=<rootDir>/modules/examples/config.yaml"`

Failed imports will be noted in the output with error messages.