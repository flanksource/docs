import { promises as fs } from 'fs';
import fsSync from 'fs';
import path from 'path';
import globPkg from 'glob';
const { globSync } = globPkg;
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMdx from 'remark-mdx';
import remarkStringify from 'remark-stringify';
import { visit } from 'unist-util-visit';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const config = {
  baseDir: process.cwd(),
  docsDir: 'docs',
  outputDir: 'rendered-docs',
  componentsToRemove: ['import', 'export'],
  componentReplacements: {
    'Fields': (node) => `\n### Fields\n\n[Component: Fields connection="${node.attributes?.connection}"]\n`,
    'Step': (node) => {
      const step = node.attributes?.step || '';
      const name = node.attributes?.name || '';
      const style = node.attributes?.style || '';
      return `\n**Step ${step}**: ${name}\n`;
    },
    'CommonLink': (node) => {
      const to = node.attributes?.to || '#';
      const text = node.children?.[0]?.value || 'Link';
      return `[${text}](${to})`;
    },
    'Tabs': () => '\n### Tabs\n',
    'TabItem': (node) => {
      const value = node.attributes?.value || '';
      const label = node.attributes?.label || value;
      return `\n#### ${label}\n`;
    },
    'Screenshot': () => '[Screenshot]',
    'Icon': (node) => `[Icon: ${node.attributes?.name || 'icon'}]`,
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
    'Tooltip': (node) => node.children?.[0]?.value || '[Tooltip]',
    'Menu': () => '[Menu Component]',
    'Tag': (node) => `[Tag: ${node.attributes?.value || 'tag'}]`,
    'Highlight': (node) => `**${node.children?.[0]?.value || ''}**`,
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
    'IIcon': (node) => `[Icon: ${node.attributes?.icon || 'icon'}]`,
  }
};

// Helper to extract text content from JSX element
function extractTextContent(node) {
  if (!node.children) return '';
  
  return node.children.map(child => {
    if (child.type === 'text') return child.value;
    if (child.type === 'mdxJsxTextElement' || child.type === 'mdxJsxFlowElement') {
      return extractTextContent(child);
    }
    if (child.type === 'paragraph' || child.type === 'heading') {
      return extractTextContent(child);
    }
    return '';
  }).join(' ');
}

// Plugin to handle MDX components and convert to markdown
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
        
        if (componentName && config.componentReplacements[componentName]) {
          const replacement = config.componentReplacements[componentName](node);
          
          if (parent && index !== null) {
            // Replace the JSX element with markdown text
            parent.children[index] = {
              type: 'text',
              value: replacement
            };
            
            // If the node had children, try to preserve them
            if (node.children && node.children.length > 0) {
              const childContent = extractTextContent(node);
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

// Plugin to resolve code imports
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
            const content = fsSync.readFileSync(filePath, 'utf8');
            node.value = content;
            // Remove the file= meta
            node.meta = node.meta.replace(/file=["']?[^"'\s]+["']?\s*/, '');
          } catch (err) {
            console.warn(`Failed to import file: ${filePath}`, err.message);
            // Add a comment in the code block about the failed import
            node.value = `# Failed to import: ${fileMatch[1]}\n# Error: ${err.message}`;
          }
        }
      }
    });
  };
}

// Main processing function
async function processFile(filePath, outputPath, rootDir) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    const { data: frontmatter, content: mdxContent } = matter(content);
    
    // Process MDX to Markdown
    const processor = unified()
      .use(remarkParse)
      .use(remarkMdx)
      .use(mdxToMarkdown)
      .use(resolveCodeImports, path.dirname(filePath), rootDir)
      .use(remarkStringify, {
        bullet: '-',
        fence: '`',
        fences: true,
        incrementListMarker: false
      });

    const result = await processor.process(mdxContent);
    
    // Reconstruct the file with frontmatter
    let finalContent = '';
    if (Object.keys(frontmatter).length > 0) {
      finalContent = '---\n' + Object.entries(frontmatter)
        .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
        .join('\n') + '\n---\n\n';
    }
    finalContent += String(result);
    
    // Ensure output directory exists
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    
    // Write the processed file
    await fs.writeFile(outputPath, finalContent);
    
    console.log(`✓ Processed: ${path.relative(config.baseDir, filePath)}`);
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
  }
}

// Main function
async function renderDocs() {
  const docsPath = path.join(config.baseDir, config.docsDir);
  const outputPath = path.join(config.baseDir, config.outputDir);
  
  // Find the root directory (parent of the current directory for rootDir replacement)
  const rootDir = path.dirname(config.baseDir);
  
  console.log(`Rendering documentation from ${docsPath} to ${outputPath}...`);
  console.log(`Root directory for imports: ${rootDir}`);
  
  // Find all MDX and MD files
  const files = globSync('**/*.{md,mdx}', {
    cwd: docsPath,
    ignore: ['**/node_modules/**', '**/_*.{md,mdx}']
  });
  
  console.log(`Found ${files.length} files to process`);
  
  // Process each file
  for (const file of files) {
    const inputPath = path.join(docsPath, file);
    const outputFilePath = path.join(outputPath, file.replace(/\.mdx$/, '.md'));
    await processFile(inputPath, outputFilePath, rootDir);
  }
  
  console.log('\nRendering complete!');
}

// Add package.json check and install instructions
async function checkDependencies() {
  try {
    const pkg = JSON.parse(await fs.readFile('package.json', 'utf8'));
    const requiredDeps = [
      'unified',
      'remark-parse',
      'remark-mdx',
      'remark-stringify',
      'unist-util-visit',
      'gray-matter',
      'glob'
    ];
    
    const missingDeps = requiredDeps.filter(dep => 
      !pkg.dependencies?.[dep] && !pkg.devDependencies?.[dep]
    );
    
    if (missingDeps.length > 0) {
      console.error('Missing required dependencies. Please install:');
      console.error(`npm install --save-dev ${missingDeps.join(' ')}`);
      process.exit(1);
    }
  } catch (error) {
    console.error('Could not read package.json:', error.message);
    process.exit(1);
  }
}

// Run the script
checkDependencies().then(() => renderDocs()).catch(console.error);