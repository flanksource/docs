package main

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
	"regexp"
	"strings"

	"github.com/dop251/goja"
)

type MDXRenderer struct {
	vm *goja.Runtime
}

func NewMDXRenderer() (*MDXRenderer, error) {
	vm := goja.New()
	
	// Set up global object
	vm.Set("global", vm.GlobalObject())
	
	// Set up console for debugging
	vm.Set("console", map[string]interface{}{
		"log": func(args ...interface{}) {
			fmt.Println(args...)
		},
		"error": func(args ...interface{}) {
			fmt.Fprintf(os.Stderr, "JS Error: %v\n", args...)
		},
	})
	
	// Enhanced React component rendering using regex patterns
	mdxProcessorJS := `
	// Simple frontmatter parser
	function parseFrontmatter(content) {
		const frontmatterRegex = /^---\n([\s\S]*?)\n---\n/;
		const match = content.match(frontmatterRegex);
		
		if (match) {
			const frontmatterText = match[1];
			const frontmatter = {};
			
			// Simple key-value parser
			frontmatterText.split('\n').forEach(line => {
				const colonIndex = line.indexOf(':');
				if (colonIndex > 0) {
					const key = line.substring(0, colonIndex).trim();
					let value = line.substring(colonIndex + 1).trim();
					
					// Remove quotes if present
					if ((value.startsWith('"') && value.endsWith('"')) || 
					    (value.startsWith("'") && value.endsWith("'"))) {
						value = value.slice(1, -1);
					}
					
					// Try to parse JSON objects/arrays
					if (value.startsWith('{') || value.startsWith('[')) {
						try {
							value = JSON.parse(value);
						} catch (e) {
							// Keep as string if not valid JSON
						}
					}
					
					frontmatter[key] = value;
				}
			});
			
			return {
				frontmatter: frontmatter,
				content: content.substring(match[0].length)
			};
		}
		
		return {
			frontmatter: {},
			content: content
		};
	}

	// Enhanced component processing using proper React rendering
	function processComponents(content) {
		let processed = content;
		
		// Remove imports/exports
		processed = processed.replace(/^import\s+.*$/gm, '');
		processed = processed.replace(/^export\s+.*$/gm, '');
		
		// Fields component - render to proper markdown table
		processed = processed.replace(/<Fields\s+connection="aws"\s*\/>/g, () => {
			return '\n| Field | Description | Scheme |\n' +
				   '|-------|-------------|--------|\n' +
				   '| ' + String.fromCharCode(96) + 'connection' + String.fromCharCode(96) + ' | The connection url to use, mutually exclusive with accessKey and secretKey | Connection |\n' +
				   '| ' + String.fromCharCode(96) + 'accessKey' + String.fromCharCode(96) + ' | Access Key ID | EnvVar |\n' +
				   '| ' + String.fromCharCode(96) + 'secretKey' + String.fromCharCode(96) + ' | Secret Access Key | EnvVar |\n' +
				   '| ' + String.fromCharCode(96) + 'region' + String.fromCharCode(96) + ' | The AWS region | string |\n';
		});
		
		// Handle Fields components with rows attribute
		processed = processed.replace(/<Fields[^>]*rows=\{([\s\S]*?)\}\s*\/>/g, (match, rowsContent) => {
			let result = '\n### Fields\n\n';
			result += '| Field | Description | Scheme | Required |\n';
			result += '|-------|-------------|--------|----------|\n';
			
			// Parse the rows array similar to HealthCheck
			try {
				// Clean up the JSX fragments
				const cleanRows = rowsContent
					.replace(/<>/g, '')
					.replace(/<\/>/g, '')
					.replace(/<br\s*\/>/g, ' ')
					.replace(/<code>/g, '`')
					.replace(/<\/code>/g, '`')
					.replace(/&lt;/g, '<')
					.replace(/&gt;/g, '>')
					.replace(/[\n\r]/g, ' ')
					.trim();
				
				// Extract field objects using regex
				const fieldRegex = /\{[^}]*field:\s*"([^"]+)"[^}]*\}/g;
				let fieldMatch;
				const fields = [];
				
				while ((fieldMatch = fieldRegex.exec(cleanRows)) !== null) {
					const fieldBlock = fieldMatch[0];
					const field = fieldMatch[1];
					
					// Extract description
					const descMatch = fieldBlock.match(/description:\s*"([^"]+)"/);
					const description = descMatch ? descMatch[1] : '';
					
					// Extract scheme
					const schemeMatch = fieldBlock.match(/scheme:\s*"([^"]+)"/);
					const scheme = schemeMatch ? schemeMatch[1] : 'string';
					
					// Extract required
					const requiredMatch = fieldBlock.match(/required:\s*(true|false)/);
					const required = requiredMatch && requiredMatch[1] === 'true' ? 'Yes' : '';
					
					// Extract default
					const defaultMatch = fieldBlock.match(/default:\s*"?([^",}]+)"?/);
					const defaultValue = defaultMatch ? ' (default: `' + defaultMatch[1] + '`)' : '';
					
					fields.push({
						field: field,
						description: description + defaultValue,
						scheme: scheme,
						required: required
					});
				}
				
				// Generate table rows
				fields.forEach(fieldInfo => {
					result += '| `' + fieldInfo.field + '` | ' + fieldInfo.description + ' | ' + fieldInfo.scheme + ' | ' + fieldInfo.required + ' |\n';
				});
				
			} catch (e) {
				result += '| | [Complex Fields component - see source] | | |\n';
			}
			
			return result;
		});

		processed = processed.replace(/<Fields\s*\/>/g, '\n### Fields\n\n[Component: Fields]\n');
		
		// Step components - parse attributes properly
		processed = processed.replace(/<Step\s+step=\{(\d+)\}\s+name="([^"]+)"[^>]*>([\s\S]*?)<\/Step>/g, 
			(match, step, name, content) => {
				return '\n**Step ' + step + '**: ' + name + '\n' + content.trim() + '\n';
			}
		);
		
		// CommonLink
		processed = processed.replace(/<CommonLink\s+to="([^"]+)">([^<]*)<\/CommonLink>/g, '[$2]($1)');
		
		// Other simple components
		processed = processed.replace(/<Icon\s+name="([^"]+)"\s*\/>/g, '[Icon: $1]');
		processed = processed.replace(/<Screenshot[^>]*\/?>/g, '[Screenshot]');
		processed = processed.replace(/<Healthy[^>]*\/?>/g, '✅');
		processed = processed.replace(/<Unhealthy[^>]*\/?>/g, '❌');
		processed = processed.replace(/<Warning[^>]*\/?>/g, '⚠️');
		processed = processed.replace(/<Commercial[^>]*\/?>/g, '[Commercial Feature]');
		processed = processed.replace(/<Enterprise[^>]*\/?>/g, '[Enterprise Feature]');
		processed = processed.replace(/<Standard[^>]*\/?>/g, '[Standard Feature]');
		processed = processed.replace(/<Highlight>([^<]*)<\/Highlight>/g, '**$1**');
		processed = processed.replace(/<Tooltip[^>]*>([^<]*)<\/Tooltip>/g, '$1');
		
		// Handle HealthCheck components with rows attribute
		processed = processed.replace(/<HealthCheck[^>]*rows=\{([\s\S]*?)\}\s*\/>/g, (match, rowsContent) => {
			// Extract the component name and connection if present
			const nameMatch = match.match(/name="([^"]+)"/);
			const connectionMatch = match.match(/connection="([^"]+)"/);
			
			let result = '\n### ' + (nameMatch ? nameMatch[1].toUpperCase() + ' ' : '') + 'Fields\n\n';
			result += '| Field | Description | Scheme | Required |\n';
			result += '|-------|-------------|--------|----------|\n';
			
			// Parse the rows array - this is a simplified parser for the common patterns
			try {
				// Clean up the JSX fragments and extract field information
				const cleanRows = rowsContent
					.replace(/<>/g, '')
					.replace(/<\/>/g, '')
					.replace(/<br\s*\/>/g, ' ')
					.replace(/<code>/g, '`')
					.replace(/<\/code>/g, '`')
					.replace(/&lt;/g, '<')
					.replace(/&gt;/g, '>')
					.replace(/[\n\r]/g, ' ')
					.trim();
				
				// Extract field objects using regex
				const fieldRegex = /\{[^}]*field:\s*"([^"]+)"[^}]*\}/g;
				let fieldMatch;
				const fields = [];
				
				while ((fieldMatch = fieldRegex.exec(cleanRows)) !== null) {
					const fieldBlock = fieldMatch[0];
					const field = fieldMatch[1];
					
					// Extract description
					const descMatch = fieldBlock.match(/description:\s*"([^"]+)"/);
					const description = descMatch ? descMatch[1] : '';
					
					// Extract scheme
					const schemeMatch = fieldBlock.match(/scheme:\s*"([^"]+)"/);
					const scheme = schemeMatch ? schemeMatch[1] : 'string';
					
					// Extract required
					const requiredMatch = fieldBlock.match(/required:\s*(true|false)/);
					const required = requiredMatch && requiredMatch[1] === 'true' ? 'Yes' : '';
					
					// Extract default
					const defaultMatch = fieldBlock.match(/default:\s*"?([^",}]+)"?/);
					const defaultValue = defaultMatch ? ' (default: `' + defaultMatch[1] + '`)' : '';
					
					fields.push({
						field: field,
						description: description + defaultValue,
						scheme: scheme,
						required: required
					});
				}
				
				// Generate table rows
				fields.forEach(fieldInfo => {
					result += '| `' + fieldInfo.field + '` | ' + fieldInfo.description + ' | ' + fieldInfo.scheme + ' | ' + fieldInfo.required + ' |\n';
				});
				
			} catch (e) {
				result += '| | [Complex HealthCheck component - see source] | | |\n';
			}
			
			return result;
		});
		
		// Handle simple HealthCheck components
		processed = processed.replace(/<HealthCheck[^>]*\/>/g, '[Health Check Component]');
		processed = processed.replace(/<HealthCheck[^>]*>[\s\S]*?<\/HealthCheck>/g, '[Health Check Component]');
		
		// Tabs and TabItems
		processed = processed.replace(/<Tabs[^>]*>/g, '\n### Tabs\n');
		processed = processed.replace(/<\/Tabs>/g, '');
		processed = processed.replace(/<TabItem\s+value="[^"]*"\s+label="([^"]+)"[^>]*>/g, '\n#### $1\n');
		processed = processed.replace(/<\/TabItem>/g, '');
		
		return processed;
	}

	// Main processing function
	global.processMDX = function(content) {
		try {
			// Parse frontmatter
			const { frontmatter, content: mdxContent } = parseFrontmatter(content);
			
			// Process components
			const processedContent = processComponents(mdxContent);
			
			// Reconstruct with frontmatter
			let result = '';
			if (Object.keys(frontmatter).length > 0) {
				result = '---\n';
				Object.entries(frontmatter).forEach(([key, value]) => {
					if (typeof value === 'object') {
						result += key + ': ' + JSON.stringify(value) + '\n';
					} else {
						result += key + ': ' + value + '\n';
					}
				});
				result += '---\n\n';
			}
			result += processedContent;
			
			return { success: true, content: result };
		} catch (error) {
			return { success: false, error: error.message };
		}
	};
	`

	_, err := vm.RunString(mdxProcessorJS)
	if err != nil {
		return nil, fmt.Errorf("failed to initialize MDX processor: %w", err)
	}

	return &MDXRenderer{vm: vm}, nil
}

func (r *MDXRenderer) ProcessMDX(content string) (string, error) {
	processMDX, ok := goja.AssertFunction(r.vm.Get("processMDX"))
	if !ok {
		return "", fmt.Errorf("processMDX function not found")
	}

	result, err := processMDX(goja.Undefined(), r.vm.ToValue(content))
	if err != nil {
		return "", fmt.Errorf("error processing MDX: %w", err)
	}

	resultObj := result.ToObject(r.vm)
	success := resultObj.Get("success").ToBoolean()
	
	if !success {
		errorMsg := resultObj.Get("error").String()
		return "", fmt.Errorf("processing failed: %s", errorMsg)
	}

	processedContent := resultObj.Get("content").String()
	return processedContent, nil
}

// Process code imports in the content
func processCodeImports(content string, fileDir string, rootDir string) string {
	// Pattern to match code blocks with file imports
	codeBlockPattern := regexp.MustCompile("(?s)```([a-z]*)(.*?)```")
	
	return codeBlockPattern.ReplaceAllStringFunc(content, func(match string) string {
		// Extract language and metadata
		parts := codeBlockPattern.FindStringSubmatch(match)
		if len(parts) < 3 {
			return match
		}
		
		lang := parts[1]
		meta := parts[2]
		
		// Check for file= in metadata
		filePattern := regexp.MustCompile(`file=["']?([^"'\s]+)["']?`)
		fileMatches := filePattern.FindStringSubmatch(meta)
		if len(fileMatches) < 2 {
			return match
		}
		
		filePath := fileMatches[1]
		
		// Replace <rootDir> with actual root directory
		filePath = strings.ReplaceAll(filePath, "<rootDir>", rootDir)
		
		// Resolve relative paths
		if !filepath.IsAbs(filePath) {
			filePath = filepath.Join(fileDir, filePath)
		}
		
		// Read the file
		fileContent, err := os.ReadFile(filePath)
		if err != nil {
			return fmt.Sprintf("```%s\n# Failed to import: %s\n# Error: %s\n```", lang, fileMatches[1], err.Error())
		}
		
		// Remove file= from metadata
		cleanMeta := filePattern.ReplaceAllString(meta, "")
		cleanMeta = strings.TrimSpace(cleanMeta)
		
		return fmt.Sprintf("```%s%s\n%s\n```", lang, cleanMeta, string(fileContent))
	})
}

func processFile(renderer *MDXRenderer, inputPath string, outputPath string, rootDir string) error {
	// Read the file
	content, err := os.ReadFile(inputPath)
	if err != nil {
		return fmt.Errorf("failed to read file: %w", err)
	}
	
	// Process code imports first
	contentStr := string(content)
	fileDir := filepath.Dir(inputPath)
	contentStr = processCodeImports(contentStr, fileDir, rootDir)
	
	// Process MDX
	processed, err := renderer.ProcessMDX(contentStr)
	if err != nil {
		return fmt.Errorf("failed to process MDX: %w", err)
	}
	
	// Ensure output directory exists
	outputDir := filepath.Dir(outputPath)
	if err := os.MkdirAll(outputDir, 0755); err != nil {
		return fmt.Errorf("failed to create output directory: %w", err)
	}
	
	// Write the processed file
	if err := os.WriteFile(outputPath, []byte(processed), 0644); err != nil {
		return fmt.Errorf("failed to write output file: %w", err)
	}
	
	return nil
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
	
	// Create MDX renderer
	renderer, err := NewMDXRenderer()
	if err != nil {
		log.Fatal("Failed to create MDX renderer:", err)
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
		if err := processFile(renderer, inputPath, outputPath, rootDir); err != nil {
			fmt.Printf("✗ Error processing %s: %v\n", relPath, err)
		} else {
			fmt.Printf("✓ Processed: %s\n", relPath)
			successCount++
		}
	}
	
	fmt.Printf("\nRendering complete! Successfully processed %d/%d files.\n", successCount, len(files))
}