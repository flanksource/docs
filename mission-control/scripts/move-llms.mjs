#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdx from 'remark-mdx';
import remarkStringify from 'remark-stringify';
import codeImport from 'remark-code-import';
import { visit, SKIP } from 'unist-util-visit';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BUILD_DIR = path.join(__dirname, '..', 'build');
const DOCS_DIR = path.join(__dirname, '..', 'docs');
const ROOT_DIR = path.join(__dirname, '..', '..');
const CANARY_CHECKER_SCRIPTING = path.join(__dirname, '..', '..', 'canary-checker', 'docs', 'scripting');
const BASE_URL = 'https://flanksource.com';

const SECTIONS = [
  { urlPath: '/docs', srcDir: 'docs', name: 'Documentation', description: 'Mission Control documentation' },
  { urlPath: '/docs/guide', srcDir: 'docs/guide', name: 'User Guide', description: 'User guides for Mission Control' },
  { urlPath: '/docs/guide/config-db', srcDir: 'docs/guide/config-db', name: 'Config DB Guide', description: 'Configuration database guide' },
  { urlPath: '/docs/guide/notifications', srcDir: 'docs/guide/notifications', name: 'Notifications Guide', description: 'Notifications guide' },
  { urlPath: '/docs/guide/playbooks', srcDir: 'docs/guide/playbooks', name: 'Playbooks Guide', description: 'Playbooks guide' },
  { urlPath: '/docs/guide/views', srcDir: 'docs/guide/views', name: 'Views Guide', description: 'Views and dashboards guide' },
  { urlPath: '/docs/guide/permissions', srcDir: 'docs/guide/permissions', name: 'Permissions Guide', description: 'Permissions and access control guide' },
  { urlPath: '/docs/reference', srcDir: 'docs/reference', name: 'Reference', description: 'API and configuration reference' },
  { urlPath: '/docs/reference/canary-checker', srcDir: 'docs/reference/canary-checker', name: 'Health Checks Reference', description: 'Health checks reference' },
  { urlPath: '/docs/reference/config-db', srcDir: 'docs/reference/config-db', name: 'Config DB Reference', description: 'Config DB reference' },
  { urlPath: '/docs/reference/notifications', srcDir: 'docs/reference/notifications', name: 'Notifications Reference', description: 'Notifications reference' },
  { urlPath: '/docs/reference/playbooks', srcDir: 'docs/reference/playbooks', name: 'Playbooks Reference', description: 'Playbooks reference' },
  { urlPath: '/docs/reference/connections', srcDir: 'docs/reference/connections', name: 'Connections Reference', description: 'Connections reference' },
  { urlPath: '/docs/reference/permissions', srcDir: 'docs/reference/permissions', name: 'Permissions Reference', description: 'Permissions reference' },
  { urlPath: '/docs/integrations', srcDir: 'docs/integrations', name: 'Integrations', description: 'Integration guides' },
  { urlPath: '/docs/installation', srcDir: 'docs/installation', name: 'Installation', description: 'Installation guides' },
];

const SPECIAL_SECTIONS = [
  {
    urlPath: '/docs/reference/scripting/cel',
    srcFile: path.join(CANARY_CHECKER_SCRIPTING, 'cel.mdx'),
    name: 'CEL Reference',
    description: 'CEL expression language reference'
  },
  {
    urlPath: '/docs/reference/scripting/gotemplate',
    srcFile: path.join(CANARY_CHECKER_SCRIPTING, 'gotemplate.mdx'),
    name: 'Go Template Reference',
    description: 'Go template reference'
  },
];

const EXCLUDE_PATTERNS = [
  /^_/,           // Files starting with _
  /\.canary\./,   // .canary.mdx or .canary.md files
];

function remarkStripMdx() {
  return (tree) => {
    tree.children = tree.children.filter(node => node.type !== 'mdxjsEsm');

    visit(tree, (node, index, parent) => {
      if (!parent) return;

      if (node.type === 'containerDirective') {
        const admonitionType = node.name || 'note';
        const label = admonitionType.charAt(0).toUpperCase() + admonitionType.slice(1);
        const blockquote = {
          type: 'blockquote',
          children: [
            { type: 'paragraph', children: [{ type: 'strong', children: [{ type: 'text', value: `${label}:` }] }] },
            ...node.children
          ]
        };
        parent.children[index] = blockquote;
        return [SKIP, index];
      }

      if (node.type === 'mdxJsxFlowElement') {
        parent.children.splice(index, 1);
        return [SKIP, index];
      }

      if (node.type === 'mdxJsxTextElement') {
        parent.children.splice(index, 1);
        return [SKIP, index];
      }

      if (node.type === 'mdxFlowExpression' || node.type === 'mdxTextExpression') {
        parent.children.splice(index, 1);
        return [SKIP, index];
      }
    });

    visit(tree, 'code', (node) => {
      if (node.meta) {
        node.meta = node.meta
          .replace(/title=["'][^"']*["']/g, '')
          .replace(/title=[^\s]*/g, '')
          .replace(/file=[^\s]*/g, '')
          .replace(/\{[^}]*\}/g, '')
          .replace(/\/\/highlight-next-line/g, '')
          .trim();
        if (!node.meta) {
          delete node.meta;
        }
      }
    });
  };
}

function remarkStripFrontmatter() {
  return (tree) => {
    tree.children = tree.children.filter(node => node.type !== 'yaml' && node.type !== 'toml');
  };
}

const processor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter, ['yaml', 'toml'])
  .use(remarkMdx)
  .use(codeImport, { rootDir: ROOT_DIR, allowImportingFromOutside: true })
  .use(remarkStripMdx)
  .use(remarkStripFrontmatter)
  .use(remarkStringify, { bullet: '-', emphasis: '_', strong: '*' });

function findMdxFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (EXCLUDE_PATTERNS.some(pattern => pattern.test(entry.name))) {
      continue;
    }

    if (entry.isDirectory()) {
      results.push(...findMdxFiles(fullPath));
    } else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) {
      results.push(fullPath);
    }
  }

  return results;
}

function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};

  const frontmatter = {};
  const lines = match[1].split('\n');
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      frontmatter[key] = value;
    }
  }
  return frontmatter;
}

function stripHtmlComments(content) {
  return content.replace(/<!--[\s\S]*?-->/g, '');
}

function cleanupOutput(content) {
  return content
    .replace(/&#x20;/g, ' ')
    .replace(/^(#+)\s+\s+/gm, '$1 ')
    .replace(/^(#+\s.*?)\s+$/gm, '$1');
}

async function processMdxFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const frontmatter = extractFrontmatter(content);
  const title = frontmatter.title || path.basename(filePath, path.extname(filePath));

  // Strip HTML comments before processing (MDX doesn't support them)
  content = stripHtmlComments(content);

  try {
    const file = await processor.process({ value: content, path: filePath });
    const processed = cleanupOutput(String(file));

    const relativePath = path.relative(path.join(__dirname, '..'), filePath);
    return `## ${title}\n\n_Source: ${relativePath}_\n\n${processed}\n\n---\n`;
  } catch (err) {
    console.error(`Error processing ${filePath}: ${err.message}`);
    return `## ${title}\n\n_Error processing file_\n\n---\n`;
  }
}

async function generateSectionLlms(section) {
  const srcDir = path.join(__dirname, '..', section.srcDir);
  const destDir = path.join(BUILD_DIR, section.urlPath.substring(1));
  const destFile = path.join(destDir, 'llms.txt');

  const mdxFiles = findMdxFiles(srcDir);
  if (mdxFiles.length === 0) {
    console.log(`No MDX files found in ${section.srcDir}`);
    return;
  }

  const header = [
    `# ${section.name}`,
    '',
    `> ${section.description}`,
    '',
    'This file contains the full documentation content following the llmstxt.org standard.',
    '',
    `- Source: ${section.urlPath}`,
    `- Files: ${mdxFiles.length}`,
    '',
    '---',
    ''
  ].join('\n');

  const processedFiles = await Promise.all(mdxFiles.map(processMdxFile));
  const content = header + processedFiles.join('\n');

  fs.mkdirSync(destDir, { recursive: true });
  fs.writeFileSync(destFile, content);
  console.log(`Generated ${section.urlPath}/llms.txt (${mdxFiles.length} files)`);
}

async function generateSpecialSectionLlms(section) {
  const destDir = path.join(BUILD_DIR, section.urlPath.substring(1));
  const destFile = path.join(destDir, 'llms.txt');

  if (!fs.existsSync(section.srcFile)) {
    console.error(`Source file not found: ${section.srcFile}`);
    return;
  }

  let content = fs.readFileSync(section.srcFile, 'utf-8');
  content = stripHtmlComments(content);

  const header = [
    `# ${section.name}`,
    '',
    `> ${section.description}`,
    '',
    'This file contains the full documentation content following the llmstxt.org standard.',
    '',
    `- Source: ${section.urlPath}`,
    ''
  ].join('\n');

  try {
    const file = await processor.process({ value: content, path: section.srcFile });
    const llmsContent = header + cleanupOutput(String(file));

    fs.mkdirSync(destDir, { recursive: true });
    fs.writeFileSync(destFile, llmsContent);
    console.log(`Generated ${section.urlPath}/llms.txt`);
  } catch (err) {
    console.error(`Error processing ${section.srcFile}: ${err.message}`);
    process.exit(1);
  }
}

function parseSitemap() {
  const sitemapPath = path.join(BUILD_DIR, 'sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    console.error('sitemap.xml not found');
    return [];
  }

  const content = fs.readFileSync(sitemapPath, 'utf-8');
  const urls = [];
  const regex = /<loc>([^<]+)<\/loc>/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    urls.push(match[1]);
  }

  return urls;
}

function generateRootLlmsTxt() {
  const urls = parseSitemap();
  const docsUrls = urls.filter(u => u.includes('/docs/'));

  const sections = {};
  for (const url of docsUrls) {
    const urlPath = url.replace(BASE_URL, '').replace(/\/$/, '');
    const parts = urlPath.split('/').filter(Boolean);

    if (parts.length >= 2 && parts[0] === 'docs') {
      const section = parts.length > 2 ? parts.slice(0, 3).join('/') : parts.slice(0, 2).join('/');
      if (!sections[section]) {
        sections[section] = [];
      }
      sections[section].push(urlPath);
    }
  }

  const lines = [
    '# Flanksource Mission Control',
    '',
    '> Internal Developer Platform for Kubernetes',
    '',
    'Mission Control is an internal developer platform that helps teams manage, monitor, and automate their Kubernetes infrastructure.',
    '',
    '## Documentation Sections',
    '',
  ];

  const allSections = [...SECTIONS, ...SPECIAL_SECTIONS];
  for (const section of allSections) {
    const llmsPath = `${section.urlPath}/llms.txt`;
    const buildLlmsPath = path.join(BUILD_DIR, llmsPath.substring(1));

    if (fs.existsSync(buildLlmsPath)) {
      lines.push(`- [${section.name}](${BASE_URL}${llmsPath}): ${section.description}`);
    } else {
      lines.push(`- [${section.name}](${BASE_URL}${section.urlPath}): ${section.description}`);
    }
  }

  lines.push('');
  lines.push('## All Documentation Pages');
  lines.push('');

  const topLevelSections = {};
  for (const sectionPath of Object.keys(sections)) {
    const parts = sectionPath.split('/').filter(Boolean);
    const topLevel = parts.length > 1 ? parts[1] : parts[0];
    if (!topLevelSections[topLevel]) {
      topLevelSections[topLevel] = {};
    }
    topLevelSections[topLevel][sectionPath] = sections[sectionPath];
  }

  const sortedTopLevel = Object.keys(topLevelSections).sort();
  for (const topLevel of sortedTopLevel) {
    const topLevelName = topLevel.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    const subSections = topLevelSections[topLevel];
    const subSectionKeys = Object.keys(subSections).sort();

    const allUrls = [];
    for (const key of subSectionKeys) {
      allUrls.push(...subSections[key]);
    }
    const uniqueUrls = [...new Set(allUrls)].sort();

    if (uniqueUrls.length === 1) {
      const urlPath = uniqueUrls[0];
      const pageName = urlPath.split('/').pop()
        .replace(/-/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase()) || topLevelName;
      lines.push(`- [${pageName}](${BASE_URL}${urlPath})`);
    } else {
      lines.push(`- ${topLevelName}`);
      for (const urlPath of uniqueUrls) {
        const pageName = urlPath.split('/').slice(2).join(' / ')
          .replace(/-/g, ' ')
          .replace(/\b\w/g, c => c.toUpperCase()) || 'Overview';
        lines.push(`  - [${pageName}](${BASE_URL}${urlPath})`);
      }
    }
  }

  const llmsTxtPath = path.join(BUILD_DIR, 'llms.txt');
  fs.writeFileSync(llmsTxtPath, lines.join('\n'));
  console.log(`Generated root llms.txt with ${docsUrls.length} documentation pages`);
}

async function main() {
  if (!fs.existsSync(BUILD_DIR)) {
    console.error('Build directory does not exist. Run `yarn build` first.');
    process.exit(1);
  }

  console.log('Generating llms.txt files from source MDX...\n');

  // Generate llms.txt for each section from source MDX files
  for (const section of SECTIONS) {
    await generateSectionLlms(section);
  }

  // Generate special sections (scripting docs from canary-checker)
  for (const section of SPECIAL_SECTIONS) {
    await generateSpecialSectionLlms(section);
  }

  // Generate root index
  generateRootLlmsTxt();

  console.log('\nDone!');
}

main();
