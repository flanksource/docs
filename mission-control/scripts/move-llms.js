#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.join(__dirname, '..', 'build');
const DOCS_DIR = path.join(__dirname, '..', 'docs');
const CANARY_CHECKER_SCRIPTING = path.join(__dirname, '..', '..', 'canary-checker', 'docs', 'scripting');
const BASE_URL = 'https://flanksource.com';

const MAPPINGS = [
  { pattern: /^llms-guide-config-db-full\.txt$/, dest: 'docs/guide/config-db' },
  { pattern: /^llms-guide-notifications-full\.txt$/, dest: 'docs/guide/notifications' },
  { pattern: /^llms-guide-playbooks-full\.txt$/, dest: 'docs/guide/playbooks' },
  { pattern: /^llms-guide-views-full\.txt$/, dest: 'docs/guide/views' },
  { pattern: /^llms-guide-permissions-full\.txt$/, dest: 'docs/guide/permissions' },
  { pattern: /^llms-guide-full\.txt$/, dest: 'docs/guide' },
  { pattern: /^llms-reference-canary-checker-full\.txt$/, dest: 'docs/reference/canary-checker' },
  { pattern: /^llms-reference-config-db-full\.txt$/, dest: 'docs/reference/config-db' },
  { pattern: /^llms-reference-notifications-full\.txt$/, dest: 'docs/reference/notifications' },
  { pattern: /^llms-reference-playbooks-full\.txt$/, dest: 'docs/reference/playbooks' },
  { pattern: /^llms-reference-permissions-full\.txt$/, dest: 'docs/reference/permissions' },
  { pattern: /^llms-reference-connections-full\.txt$/, dest: 'docs/reference/connections' },
  { pattern: /^llms-reference-full\.txt$/, dest: 'docs/reference' },
  { pattern: /^llms-integrations-full\.txt$/, dest: 'docs/integrations' },
  { pattern: /^llms-installation-full\.txt$/, dest: 'docs/installation' },
  { pattern: /^llms-full\.txt$/, dest: 'docs' },
];

const SECTIONS_WITH_LLMS = [
  { path: '/docs', name: 'Documentation', description: 'Mission Control documentation' },
  { path: '/docs/guide', name: 'User Guide', description: 'User guides for Mission Control' },
  { path: '/docs/guide/config-db', name: 'Config DB Guide', description: 'Configuration database guide' },
  { path: '/docs/guide/notifications', name: 'Notifications Guide', description: 'Notifications guide' },
  { path: '/docs/guide/playbooks', name: 'Playbooks Guide', description: 'Playbooks guide' },
  { path: '/docs/guide/views', name: 'Views Guide', description: 'Views and dashboards guide' },
  { path: '/docs/guide/permissions', name: 'Permissions Guide', description: 'Permissions and access control guide' },
  { path: '/docs/reference', name: 'Reference', description: 'API and configuration reference' },
  { path: '/docs/reference/canary-checker', name: 'Health Checks Reference', description: 'Health checks reference' },
  { path: '/docs/reference/config-db', name: 'Config DB Reference', description: 'Config DB reference' },
  { path: '/docs/reference/notifications', name: 'Notifications Reference', description: 'Notifications reference' },
  { path: '/docs/reference/playbooks', name: 'Playbooks Reference', description: 'Playbooks reference' },
  { path: '/docs/reference/connections', name: 'Connections Reference', description: 'Connections reference' },
  { path: '/docs/reference/scripting/cel', name: 'CEL Reference', description: 'CEL expression language reference' },
  { path: '/docs/reference/scripting/gotemplate', name: 'Go Template Reference', description: 'Go template reference' },
  { path: '/docs/integrations', name: 'Integrations', description: 'Integration guides' },
  { path: '/docs/installation', name: 'Installation', description: 'Installation guides' },
];

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

function stripMdxToLlms(content, title, description, sourcePath) {
  const lines = content.split('\n');
  let frontmatterCount = 0;
  const outputLines = [
    `# ${title}`,
    '',
    `> ${description}`,
    '',
    'This file contains the full documentation content following the llmstxt.org standard.',
    '',
    `- Source: ${sourcePath}`,
    ''
  ];

  for (const line of lines) {
    if (line.trim() === '---') {
      frontmatterCount++;
      if (frontmatterCount <= 2) continue;
    }
    if (frontmatterCount < 2) continue;
    if (line.startsWith('import ')) continue;

    let processedLine = line
      .replace(/<[^>]*>/g, '')
      .replace(/:::tip/g, '> **Tip:**')
      .replace(/:::note/g, '> **Note:**')
      .replace(/:::warning/g, '> **Warning:**')
      .replace(/:::/g, '')
      .replace(/```yaml title=[^`]*/g, '```yaml')
      .replace(/```go title=[^`]*/g, '```go')
      .replace(/\/\/highlight-next-line/g, '');

    outputLines.push(processedLine);
  }

  return outputLines.join('\n');
}

function generateScriptingLlms() {
  const scriptingDir = path.join(BUILD_DIR, 'docs', 'reference', 'scripting');

  const files = [
    {
      src: path.join(CANARY_CHECKER_SCRIPTING, 'cel.mdx'),
      dest: path.join(scriptingDir, 'cel', 'llms.txt'),
      title: 'CEL Expression Language Reference',
      description: 'Common Expression Language (CEL) reference for Flanksource Mission Control',
      sourcePath: '/docs/reference/scripting/cel'
    },
    {
      src: path.join(CANARY_CHECKER_SCRIPTING, 'gotemplate.mdx'),
      dest: path.join(scriptingDir, 'gotemplate', 'llms.txt'),
      title: 'Go Template Reference',
      description: 'Go template reference for Flanksource Mission Control',
      sourcePath: '/docs/reference/scripting/gotemplate'
    }
  ];

  for (const file of files) {
    if (!fs.existsSync(file.src)) {
      console.error(`Source file not found: ${file.src}`);
      continue;
    }

    const content = fs.readFileSync(file.src, 'utf-8');
    const llmsContent = stripMdxToLlms(content, file.title, file.description, file.sourcePath);

    fs.mkdirSync(path.dirname(file.dest), { recursive: true });
    fs.writeFileSync(file.dest, llmsContent);
    console.log(`Generated: ${path.relative(BUILD_DIR, file.dest)}`);
  }
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

  for (const section of SECTIONS_WITH_LLMS) {
    const llmsPath = `${section.path}/llms.txt`;
    const buildLlmsPath = path.join(BUILD_DIR, llmsPath.substring(1));

    if (fs.existsSync(buildLlmsPath)) {
      lines.push(`- [${section.name}](${BASE_URL}${llmsPath}): ${section.description}`);
    } else {
      lines.push(`- [${section.name}](${BASE_URL}${section.path}): ${section.description}`);
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

function moveFiles() {
  if (!fs.existsSync(BUILD_DIR)) {
    console.error('Build directory does not exist. Run `yarn build` first.');
    process.exit(1);
  }

  const files = fs.readdirSync(BUILD_DIR).filter(f => f.startsWith('llms') && f.endsWith('.txt'));

  let moved = 0;
  for (const file of files) {
    for (const { pattern, dest } of MAPPINGS) {
      if (pattern.test(file)) {
        const srcPath = path.join(BUILD_DIR, file);
        const destDir = path.join(BUILD_DIR, dest);
        const destPath = path.join(destDir, 'llms.txt');

        fs.mkdirSync(destDir, { recursive: true });
        fs.renameSync(srcPath, destPath);
        console.log(`${file} -> ${dest}/llms.txt`);
        moved++;
        break;
      }
    }
  }

  const nonFullFiles = fs.readdirSync(BUILD_DIR).filter(f => 
    f.startsWith('llms') && f.endsWith('.txt') && !f.includes('-full')
  );
  for (const file of nonFullFiles) {
    fs.unlinkSync(path.join(BUILD_DIR, file));
    console.log(`Removed non-full file: ${file}`);
  }

  console.log(`Moved ${moved} llms files.`);

  generateScriptingLlms();
  generateRootLlmsTxt();
}

moveFiles();
