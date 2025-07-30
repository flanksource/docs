package main

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"

	"github.com/dop251/goja"
	"github.com/dop251/goja_nodejs/console"
	"github.com/dop251/goja_nodejs/require"
)

type MDXProcessor struct {
	vm *goja.Runtime
}

func NewMDXProcessor(workDir string) (*MDXProcessor, error) {
	vm := goja.New()
	
	// Set up require first with the correct working directory
	registry := require.NewRegistry(
		require.WithGlobalFolders(workDir, filepath.Join(workDir, "node_modules")),
	)
	registry.Enable(vm)
	
	// Enable console for debugging after require is set up
	console.Enable(vm)
	
	// Load the MDX processing script
	mdxScript := `
		const fs = require('fs');
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
								const content = fs.readFileSync(filePath, 'utf8');
								node.value = content;
								// Remove the file= meta
								node.meta = node.meta.replace(/file=["']?[^"'\s]+["']?\s*/, '');
							} catch (err) {
								console.warn('Failed to import file:', filePath, err.message);
								node.value = '# Failed to import: ' + fileMatch[1] + '\\n# Error: ' + err.message;
							}
						}
					}
				});
			};
		}

		async function processFile(filePath, rootDir) {
			try {
				const content = fs.readFileSync(filePath, 'utf8');
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
					finalContent = '---\\n' + Object.entries(frontmatter)
						.map(([key, value]) => key + ': ' + JSON.stringify(value))
						.join('\\n') + '\\n---\\n\\n';
				}
				finalContent += String(result);
				
				return { success: true, content: finalContent };
			} catch (error) {
				return { success: false, error: error.message };
			}
		}

		// Make processFile available globally
		global.processFile = processFile;
	`

	_, err := vm.RunString(mdxScript)
	if err != nil {
		return nil, fmt.Errorf("failed to load MDX script: %w", err)
	}

	return &MDXProcessor{vm: vm}, nil
}

func (p *MDXProcessor) ProcessFile(filePath string, rootDir string) (string, error) {
	// Call the JavaScript processFile function
	processFunc, ok := goja.AssertFunction(p.vm.Get("processFile"))
	if !ok {
		return "", fmt.Errorf("processFile function not found")
	}

	result, err := processFunc(goja.Undefined(), p.vm.ToValue(filePath), p.vm.ToValue(rootDir))
	if err != nil {
		return "", fmt.Errorf("error calling processFile: %w", err)
	}

	// Parse the result
	resultObj := result.ToObject(p.vm)
	success := resultObj.Get("success").ToBoolean()
	
	if !success {
		errorMsg := resultObj.Get("error").String()
		return "", fmt.Errorf("processing failed: %s", errorMsg)
	}

	content := resultObj.Get("content").String()
	return content, nil
}

func findMarkdownFiles(root string) ([]string, error) {
	var files []string
	
	err := filepath.Walk(root, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		
		// Skip directories
		if info.IsDir() {
			// Skip node_modules and hidden directories
			if strings.HasPrefix(info.Name(), ".") || info.Name() == "node_modules" {
				return filepath.SkipDir
			}
			return nil
		}
		
		// Check for markdown files
		ext := filepath.Ext(path)
		if ext == ".md" || ext == ".mdx" {
			// Skip files starting with underscore
			if !strings.HasPrefix(info.Name(), "_") {
				files = append(files, path)
			}
		}
		
		return nil
	})
	
	return files, err
}

func main() {
	// Get current working directory
	scriptDir, err := os.Getwd()
	if err != nil {
		log.Fatal("Failed to get current directory:", err)
	}
	
	// The actual project directory is passed via PWD environment variable by npm
	projectDir := os.Getenv("INIT_CWD")
	if projectDir == "" {
		// Fallback: assume we're being run from mission-control or canary-checker
		projectDir = filepath.Dir(filepath.Dir(scriptDir))
	}
	
	// Configuration
	docsDir := filepath.Join(projectDir, "docs")
	outputDir := filepath.Join(projectDir, "rendered-docs")
	rootDir := filepath.Dir(projectDir)
	
	fmt.Printf("Rendering documentation from %s to %s...\n", docsDir, outputDir)
	fmt.Printf("Root directory for imports: %s\n", rootDir)
	
	// Create MDX processor with mdx-renderer directory as working directory
	mdxRendererDir := filepath.Join(filepath.Dir(projectDir), "scripts", "mdx-renderer")
	processor, err := NewMDXProcessor(mdxRendererDir)
	if err != nil {
		log.Fatal("Failed to create MDX processor:", err)
	}
	
	// Find all markdown files
	files, err := findMarkdownFiles(docsDir)
	if err != nil {
		log.Fatal("Failed to find files:", err)
	}
	
	fmt.Printf("Found %d files to process\n", len(files))
	
	// Process each file
	successCount := 0
	for _, inputPath := range files {
		// Calculate output path
		relPath, _ := filepath.Rel(docsDir, inputPath)
		outputPath := filepath.Join(outputDir, relPath)
		
		// Change .mdx to .md
		if filepath.Ext(outputPath) == ".mdx" {
			outputPath = strings.TrimSuffix(outputPath, ".mdx") + ".md"
		}
		
		// Process the file
		content, err := processor.ProcessFile(inputPath, rootDir)
		if err != nil {
			fmt.Printf("✗ Error processing %s: %v\n", relPath, err)
			continue
		}
		
		// Ensure output directory exists
		outputDirPath := filepath.Dir(outputPath)
		if err := os.MkdirAll(outputDirPath, 0755); err != nil {
			fmt.Printf("✗ Error creating directory for %s: %v\n", relPath, err)
			continue
		}
		
		// Write the processed file
		if err := os.WriteFile(outputPath, []byte(content), 0644); err != nil {
			fmt.Printf("✗ Error writing %s: %v\n", relPath, err)
			continue
		}
		
		fmt.Printf("✓ Processed: %s\n", relPath)
		successCount++
	}
	
	fmt.Printf("\nRendering complete! Successfully processed %d/%d files.\n", successCount, len(files))
}