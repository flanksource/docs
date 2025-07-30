package main

import (
	"fmt"
	"log"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
)

func processFile(scriptPath, inputPath, outputPath, rootDir string) error {
	// Run the Node.js script
	cmd := exec.Command("node", scriptPath, inputPath, rootDir)
	output, err := cmd.Output()
	if err != nil {
		if exitError, ok := err.(*exec.ExitError); ok {
			return fmt.Errorf("script failed: %s", string(exitError.Stderr))
		}
		return fmt.Errorf("failed to run script: %w", err)
	}
	
	// Ensure output directory exists
	outputDir := filepath.Dir(outputPath)
	if err := os.MkdirAll(outputDir, 0755); err != nil {
		return fmt.Errorf("failed to create output directory: %w", err)
	}
	
	// Write the processed file
	if err := os.WriteFile(outputPath, output, 0644); err != nil {
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
	scriptPath := filepath.Join(filepath.Dir(projectDir), "scripts", "mdx-renderer", "process-mdx.js")
	
	fmt.Printf("Rendering documentation from %s to %s...\n", docsDir, outputDir)
	fmt.Printf("Root directory for imports: %s\n", rootDir)
	fmt.Printf("Using script: %s\n", scriptPath)
	
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
		if err := processFile(scriptPath, inputPath, outputPath, rootDir); err != nil {
			fmt.Printf("✗ Error processing %s: %v\n", relPath, err)
		} else {
			fmt.Printf("✓ Processed: %s\n", relPath)
			successCount++
		}
	}
	
	fmt.Printf("\nRendering complete! Successfully processed %d/%d files.\n", successCount, len(files))
}