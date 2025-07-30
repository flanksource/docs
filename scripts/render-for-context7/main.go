package main

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
	"regexp"
	"strings"
)

type ComponentReplacement struct {
	Pattern     *regexp.Regexp
	Replacement func(matches []string) string
}

var componentReplacements = []ComponentReplacement{
	// Remove imports
	{
		Pattern:     regexp.MustCompile(`(?m)^import\s+.*$`),
		Replacement: func(matches []string) string { return "" },
	},
	// Remove exports
	{
		Pattern:     regexp.MustCompile(`(?m)^export\s+.*$`),
		Replacement: func(matches []string) string { return "" },
	},
	// Fields component
	{
		Pattern: regexp.MustCompile(`<Fields\s+connection="([^"]+)"\s*/>`),
		Replacement: func(matches []string) string {
			if len(matches) > 1 {
				return fmt.Sprintf("\n### Fields\n\n[Component: Fields connection=\"%s\"]\n", matches[1])
			}
			return "\n### Fields\n\n[Component: Fields]\n"
		},
	},
	// Step component - handle multiline
	{
		Pattern: regexp.MustCompile(`(?s)<Step\s+step=\{(\d+)\}\s+name="([^"]+)"[^>]*>(.*?)</Step>`),
		Replacement: func(matches []string) string {
			if len(matches) > 2 {
				content := strings.TrimSpace(matches[3])
				return fmt.Sprintf("\n**Step %s**: %s\n%s", matches[1], matches[2], content)
			}
			return "\n**Step**: \n"
		},
	},
	// CommonLink component
	{
		Pattern: regexp.MustCompile(`<CommonLink\s+to="([^"]+)">([^<]*)</CommonLink>`),
		Replacement: func(matches []string) string {
			if len(matches) > 2 {
				return fmt.Sprintf("[%s](%s)", matches[2], matches[1])
			}
			return "[Link](#)"
		},
	},
	// Fields component without attributes
	{
		Pattern:     regexp.MustCompile(`<Fields\s*/>`),
		Replacement: func(matches []string) string { return "\n### Fields\n\n[Component: Fields]\n" },
	},
	// Tabs component
	{
		Pattern:     regexp.MustCompile(`<Tabs[^>]*>`),
		Replacement: func(matches []string) string { return "\n### Tabs\n" },
	},
	{
		Pattern:     regexp.MustCompile(`</Tabs>`),
		Replacement: func(matches []string) string { return "" },
	},
	// TabItem component
	{
		Pattern: regexp.MustCompile(`<TabItem\s+value="([^"]+)"\s+label="([^"]+)"[^>]*>`),
		Replacement: func(matches []string) string {
			if len(matches) > 2 {
				return fmt.Sprintf("\n#### %s\n", matches[2])
			}
			return "\n#### Tab\n"
		},
	},
	{
		Pattern:     regexp.MustCompile(`</TabItem>`),
		Replacement: func(matches []string) string { return "" },
	},
	// Simple components - handle multiline
	{
		Pattern:     regexp.MustCompile(`(?s)<Screenshot[^>]*>.*?</Screenshot>`),
		Replacement: func(matches []string) string { return "[Screenshot]" },
	},
	{
		Pattern:     regexp.MustCompile(`<Icon\s+name="([^"]+)"\s*/>`),
		Replacement: func(matches []string) string { return fmt.Sprintf("[Icon: %s]", matches[1]) },
	},
	{
		Pattern:     regexp.MustCompile(`(?s)<HealthCheck[^>]*>.*?</HealthCheck>`),
		Replacement: func(matches []string) string { return "[Health Check Component]" },
	},
	{
		Pattern:     regexp.MustCompile(`(?s)<Lookup[^>]*>.*?</Lookup>`),
		Replacement: func(matches []string) string { return "[Lookup Component]" },
	},
	{
		Pattern:     regexp.MustCompile(`(?s)<Action[^>]*>.*?</Action>`),
		Replacement: func(matches []string) string { return "[Action Component]" },
	},
	{
		Pattern:     regexp.MustCompile(`(?s)<Scraper[^>]*>.*?</Scraper>`),
		Replacement: func(matches []string) string { return "[Scraper Component]" },
	},
	{
		Pattern:     regexp.MustCompile(`(?s)<CustomScraper[^>]*>.*?</CustomScraper>`),
		Replacement: func(matches []string) string { return "[Custom Scraper Component]" },
	},
	{
		Pattern:     regexp.MustCompile(`(?s)<Helm[^>]*>.*?</Helm>`),
		Replacement: func(matches []string) string { return "[Helm Component]" },
	},
	{
		Pattern:     regexp.MustCompile(`(?s)<ConfigTransform[^>]*>.*?</ConfigTransform>`),
		Replacement: func(matches []string) string { return "[Config Transform Component]" },
	},
	{
		Pattern:     regexp.MustCompile(`(?s)<Asciinema[^>]*>.*?</Asciinema>`),
		Replacement: func(matches []string) string { return "[Asciinema Component]" },
	},
	{
		Pattern:     regexp.MustCompile(`(?s)<Card[^>]*>.*?</Card>`),
		Replacement: func(matches []string) string { return "[Card Component]" },
	},
	{
		Pattern:     regexp.MustCompile(`(?s)<Cards[^>]*>.*?</Cards>`),
		Replacement: func(matches []string) string { return "[Cards Container]" },
	},
	{
		Pattern:     regexp.MustCompile(`(?s)<TerminalOutput[^>]*>.*?</TerminalOutput>`),
		Replacement: func(matches []string) string { return "[Terminal Output]" },
	},
	{
		Pattern:     regexp.MustCompile(`<Tooltip[^>]*>([^<]*)</Tooltip>`),
		Replacement: func(matches []string) string { return matches[1] },
	},
	{
		Pattern:     regexp.MustCompile(`(?s)<Menu[^>]*>.*?</Menu>`),
		Replacement: func(matches []string) string { return "[Menu Component]" },
	},
	{
		Pattern:     regexp.MustCompile(`<Tag\s+value="([^"]+)"\s*/>`),
		Replacement: func(matches []string) string { return fmt.Sprintf("[Tag: %s]", matches[1]) },
	},
	{
		Pattern:     regexp.MustCompile(`<Highlight>([^<]*)</Highlight>`),
		Replacement: func(matches []string) string { return fmt.Sprintf("**%s**", matches[1]) },
	},
	{
		Pattern:     regexp.MustCompile(`(?s)<Advanced[^>]*>.*?</Advanced>`),
		Replacement: func(matches []string) string { return "[Advanced Section]" },
	},
	{
		Pattern:     regexp.MustCompile(`<Commercial[^>]*/?>`),
		Replacement: func(matches []string) string { return "[Commercial Feature]" },
	},
	{
		Pattern:     regexp.MustCompile(`<Standard[^>]*/?>`),
		Replacement: func(matches []string) string { return "[Standard Feature]" },
	},
	{
		Pattern:     regexp.MustCompile(`<Enterprise[^>]*/?>`),
		Replacement: func(matches []string) string { return "[Enterprise Feature]" },
	},
	{
		Pattern:     regexp.MustCompile(`<SkipOSS[^>]*/?>`),
		Replacement: func(matches []string) string { return "[Skip in OSS]" },
	},
	{
		Pattern:     regexp.MustCompile(`<SkipCommercial[^>]*/?>`),
		Replacement: func(matches []string) string { return "[Skip in Commercial]" },
	},
	{
		Pattern:     regexp.MustCompile(`<Healthy[^>]*/?>`),
		Replacement: func(matches []string) string { return "✅" },
	},
	{
		Pattern:     regexp.MustCompile(`<Unhealthy[^>]*/?>`),
		Replacement: func(matches []string) string { return "❌" },
	},
	{
		Pattern:     regexp.MustCompile(`<Warning[^>]*/?>`),
		Replacement: func(matches []string) string { return "⚠️" },
	},
	{
		Pattern:     regexp.MustCompile(`<FullImage[^>]*/?>`),
		Replacement: func(matches []string) string { return "[Full Image]" },
	},
	{
		Pattern:     regexp.MustCompile(`<CustomField[^>]*/?>`),
		Replacement: func(matches []string) string { return "[Custom Field]" },
	},
	{
		Pattern:     regexp.MustCompile(`<IIcon\s+icon="([^"]+)"\s*/>`),
		Replacement: func(matches []string) string { return fmt.Sprintf("[Icon: %s]", matches[1]) },
	},
}

// Process code imports
func processCodeImports(content string, fileDir string, rootDir string) string {
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

// Process a single file
func processFile(inputPath string, outputPath string, rootDir string) error {
	// Read the file
	content, err := os.ReadFile(inputPath)
	if err != nil {
		return fmt.Errorf("failed to read file: %w", err)
	}
	
	// Convert to string
	contentStr := string(content)
	
	// Extract frontmatter
	frontmatter := ""
	mdxContent := contentStr
	
	if strings.HasPrefix(contentStr, "---\n") {
		parts := strings.SplitN(contentStr[4:], "\n---\n", 2)
		if len(parts) == 2 {
			frontmatter = "---\n" + parts[0] + "\n---\n\n"
			mdxContent = parts[1]
		}
	}
	
	// Process code imports
	fileDir := filepath.Dir(inputPath)
	mdxContent = processCodeImports(mdxContent, fileDir, rootDir)
	
	// Apply component replacements
	for _, replacement := range componentReplacements {
		mdxContent = replacement.Pattern.ReplaceAllStringFunc(mdxContent, func(match string) string {
			matches := replacement.Pattern.FindStringSubmatch(match)
			return replacement.Replacement(matches)
		})
	}
	
	// Combine frontmatter and content
	finalContent := frontmatter + mdxContent
	
	// Ensure output directory exists
	outputDir := filepath.Dir(outputPath)
	if err := os.MkdirAll(outputDir, 0755); err != nil {
		return fmt.Errorf("failed to create output directory: %w", err)
	}
	
	// Write the processed file
	if err := os.WriteFile(outputPath, []byte(finalContent), 0644); err != nil {
		return fmt.Errorf("failed to write output file: %w", err)
	}
	
	return nil
}

// Find all markdown files
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
	// Get current working directory (should be the script directory)
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
		if err := processFile(inputPath, outputPath, rootDir); err != nil {
			fmt.Printf("✗ Error processing %s: %v\n", relPath, err)
		} else {
			fmt.Printf("✓ Processed: %s\n", relPath)
			successCount++
		}
	}
	
	fmt.Printf("\nRendering complete! Successfully processed %d/%d files.\n", successCount, len(files))
}