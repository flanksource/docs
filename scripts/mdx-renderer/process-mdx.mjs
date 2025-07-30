#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const { unified } = require('unified');
const remarkParse = require('remark-parse');
const remarkMdx = require('remark-mdx');
const remarkStringify = require('remark-stringify');
const { visit } = require('unist-util-visit');
const matter = require('gray-matter');

// Component replacements
const componentReplacements = {
	'Fields': (node) => {
		const connection = node.attributes?.find(attr => attr.name === 'connection')?.value || '';
		return '\n### Fields\n\n[Component: Fields' + (connection ? ' connection="' + connection + '"' : '') + ']\n';
	},
	'Step': (node) => {
		const step = node.attributes?.find(attr => attr.name === 'step')?.value?.value || '';
		const name = node.attributes?.find(attr => attr.name === 'name')?.value || '';
		return '\n**Step ' + step + '**: ' + name + '\n';
	},
	'CommonLink': (node) => {
		const to = node.attributes?.find(attr => attr.name === 'to')?.value || '#';
		const text = extractText(node) || 'Link';
		return '[' + text + '](' + to + ')';
	},
	'Tabs': () => '\n### Tabs\n',
	'TabItem': (node) => {
		const label = node.attributes?.find(attr => attr.name === 'label')?.value || '';
		return '\n#### ' + label + '\n';
	},
	'Screenshot': () => '[Screenshot]',
	'Icon': (node) => {
		const name = node.attributes?.find(attr => attr.name === 'name')?.value || 'icon';
		return '[Icon: ' + name + ']';
	},
	'HealthCheck': () => '[Health Check Component]',
	'Lookup': () => '[Lookup Component]',
	'Action': () => '[Action Component]',
	'Scraper': () => '[Scraper Component]',
	'CustomScraper': () => '[Custom Scraper Component]',
	'Helm': () => '[Helm Component]',
	'ConfigTransform': () => '[Config Transform Component]',
	'Asciinema': () => '[Asciinema Component]',
	'Card': () => '[Card Component]',
	'Cards': () => '[Cards Container]',
	'TerminalOutput': () => '[Terminal Output]',
	'Tooltip': (node) => extractText(node) || '[Tooltip]',
	'Menu': () => '[Menu Component]',
	'Tag': (node) => {
		const value = node.attributes?.find(attr => attr.name === 'value')?.value || 'tag';
		return '[Tag: ' + value + ']';
	},
	'Highlight': (node) => '**' + (extractText(node) || '') + '**',
	'Advanced': () => '[Advanced Section]',
	'Commercial': () => '[Commercial Feature]',
	'Standard': () => '[Standard Feature]',
	'Enterprise': () => '[Enterprise Feature]',
	'SkipOSS': () => '[Skip in OSS]',
	'SkipCommercial': () => '[Skip in Commercial]',
	'Healthy': () => '✅',
	'Unhealthy': () => '❌',
	'Warning': () => '⚠️',
	'FullImage': () => '[Full Image]',
	'CustomField': () => '[Custom Field]',
	'IIcon': (node) => {
		const icon = node.attributes?.find(attr => attr.name === 'icon')?.value || 'icon';
		return '[Icon: ' + icon + ']';
	},
};

function extractText(node) {
	if (!node.children) return '';
	
	return node.children.map(child => {
		if (child.type === 'text') return child.value;
		if (child.type === 'mdxJsxTextElement' || child.type === 'mdxJsxFlowElement') {
			return extractText(child);
		}
		if (child.type === 'paragraph' || child.type === 'heading') {
			return extractText(child);
		}
		return '';
	}).join(' ').trim();
}

function mdxToMarkdown() {
	return (tree) => {
		visit(tree, (node, index, parent) => {
			// Remove imports and exports
			if (node.type === 'mdxjsEsm') {
				if (parent && index !== null) {
					parent.children.splice(index, 1);
					return index;
				}
			}

			// Handle JSX elements
			if (node.type === 'mdxJsxTextElement' || node.type === 'mdxJsxFlowElement') {
				const componentName = node.name;
				
				if (componentName && componentReplacements[componentName]) {
					const replacement = componentReplacements[componentName](node);
					
					if (parent && index !== null) {
						// Replace the JSX element with markdown text
						parent.children[index] = {
							type: 'text',
							value: replacement
						};
						
						// If the node had children, try to preserve them
						if (node.children && node.children.length > 0 && !['CommonLink', 'Tooltip', 'Highlight'].includes(componentName)) {
							const childContent = extractText(node);
							if (childContent) {
								parent.children.splice(index + 1, 0, {
									type: 'text',
									value: childContent
								});
							}
						}
					}
				}
			}
		});
	};
}

function resolveCodeImports(baseDir, rootDir) {
	return (tree) => {
		visit(tree, 'code', (node) => {
			if (node.meta && node.meta.includes('file=')) {
				const fileMatch = node.meta.match(/file=["']?([^"'\s]+)["']?/);
				if (fileMatch) {
					let filePath = fileMatch[1];
					
					// Replace <rootDir> with the actual root directory
					if (filePath.includes('<rootDir>')) {
						filePath = filePath.replace('<rootDir>', rootDir);
					}
					
					// Resolve the full path
					if (!path.isAbsolute(filePath)) {
						filePath = path.resolve(baseDir, filePath);
					}
					
					try {
						const content = require('fs').readFileSync(filePath, 'utf8');
						node.value = content;
						// Remove the file= meta
						node.meta = node.meta.replace(/file=["']?[^"'\s]+["']?\s*/, '');
					} catch (err) {
						console.warn('Failed to import file:', filePath, err.message);
						node.value = '# Failed to import: ' + fileMatch[1] + '\n# Error: ' + err.message;
					}
				}
			}
		});
	};
}

async function processFile(filePath, rootDir) {
	try {
		const content = await fs.readFile(filePath, 'utf8');
		const { data: frontmatter, content: mdxContent } = matter(content);
		
		// Process MDX to Markdown
		const processor = unified()
			.use(remarkParse)
			.use(remarkMdx)
			.use(mdxToMarkdown)
			.use(resolveCodeImports, path.dirname(filePath), rootDir)
			.use(remarkStringify);

		const result = await processor.process(mdxContent);
		
		// Reconstruct the file with frontmatter
		let finalContent = '';
		if (Object.keys(frontmatter).length > 0) {
			finalContent = '---\n' + Object.entries(frontmatter)
				.map(([key, value]) => key + ': ' + JSON.stringify(value))
				.join('\n') + '\n---\n\n';
		}
		finalContent += String(result);
		
		return finalContent;
	} catch (error) {
		throw error;
	}
}

// Read arguments from command line
async function main() {
	const [,, filePath, rootDir] = process.argv;
	
	if (!filePath || !rootDir) {
		console.error('Usage: node process-mdx.js <file-path> <root-dir>');
		process.exit(1);
	}
	
	try {
		const result = await processFile(filePath, rootDir);
		// Output to stdout
		process.stdout.write(result);
	} catch (error) {
		console.error('Error:', error.message);
		process.exit(1);
	}
}

main();