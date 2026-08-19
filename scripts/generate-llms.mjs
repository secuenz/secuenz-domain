/**
 * Generates /llms.txt and /llms-full.txt from the built site.
 *
 * Reads dist/ rather than a hand-maintained list so new pages are picked up
 * automatically — the pages stay the single source of truth for their own
 * title and description.
 *
 * Spec: https://llmstxt.org
 */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const DIST = 'dist';
const SITE = 'https://secuenz.com';

const SUMMARY =
  'Secuenz builds ChaosEngine, a composable security assessment orchestration platform. ' +
  'ChaosEngine lets AppSec, red-team and penetration-testing teams compose security tools, ' +
  'custom scripts and AI agents into visual DAG workflows, gate execution behind human ' +
  'approvals, run assessments through workers, and centralize the results.';

/** Ordered section definitions; first matching prefix wins. */
const SECTIONS = [
  { title: 'Product', match: (u) => u === '/' || u.startsWith('/chaosengine') || u.startsWith('/use-cases') },
  { title: 'Integrations', match: (u) => u.startsWith('/integrations') },
  { title: 'Writing', match: (u) => u.startsWith('/blog') || u.startsWith('/announcements') || u.startsWith('/changelog') },
  { title: 'Trust & Policies', match: (u) => /^\/(security|privacy|terms|acceptable-use)/.test(u) },
  { title: 'Company', match: (u) => /^\/(about|research|contact|docs)/.test(u) },
];

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (entry.name.endsWith('.html')) yield full;
  }
}

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&copy;/g, '(c)')
    .replace(/&mdash;/g, '—');

const pick = (html, re) => {
  const m = html.match(re);
  return m ? decode(m[1]).trim() : '';
};

/** Strip tags from <main> and collapse whitespace into readable plain text. */
function mainText(html) {
  const m = html.match(/<main[^>]*>([\s\S]*?)<\/main>/);
  if (!m) return '';
  return decode(
    m[1]
      .replace(/<script[\s\S]*?<\/script>/g, '')
      .replace(/<style[\s\S]*?<\/style>/g, '')
      .replace(/<br\s*\/?>/g, '\n')
      // Block-level closers end a line; inline closers just need a separator so
      // adjacent links/spans don't concatenate into one word.
      .replace(/<\/(p|div|li|h[1-6]|section|tr|nav|article|ul|ol|pre|blockquote)>/g, '\n')
      .replace(/<\/(a|span|strong|em|code|time)>/g, ' ')
      .replace(/<li[^>]*>/g, '- ')
      .replace(/<[^>]+>/g, '')
  )
    .split('\n')
    .map((l) => l.replace(/[ \t]+/g, ' ').trim())
    .filter(Boolean)
    .join('\n');
}

const pages = [];
for await (const file of walk(DIST)) {
  const html = await readFile(file, 'utf-8');
  if (/<meta name="robots" content="noindex">/.test(html)) continue;

  const rel = relative(DIST, file).split(sep).join('/');
  const url = '/' + rel.replace(/index\.html$/, '').replace(/\.html$/, '/');

  pages.push({
    url,
    title: pick(html, /<title>([\s\S]*?)<\/title>/),
    description: pick(html, /<meta name="description" content="([^"]*)"/),
    body: mainText(html),
  });
}

pages.sort((a, b) => a.url.localeCompare(b.url));

// ---- llms.txt: the index ----
const lines = ['# Secuenz ChaosEngine', '', `> ${SUMMARY}`, ''];

for (const section of SECTIONS) {
  const inSection = pages.filter((p) => section.match(p.url));
  if (!inSection.length) continue;
  lines.push(`## ${section.title}`, '');
  for (const p of inSection) {
    const label = p.title.split('|')[0].trim() || p.url;
    lines.push(`- [${label}](${SITE}${p.url})${p.description ? `: ${p.description}` : ''}`);
  }
  lines.push('');
}

const uncategorized = pages.filter((p) => !SECTIONS.some((s) => s.match(p.url)));
if (uncategorized.length) {
  lines.push('## Other', '');
  for (const p of uncategorized) {
    lines.push(`- [${p.title.split('|')[0].trim()}](${SITE}${p.url})`);
  }
  lines.push('');
}

await writeFile(join(DIST, 'llms.txt'), lines.join('\n'), 'utf-8');

// ---- llms-full.txt: index + full text of every page ----
const full = [
  '# Secuenz ChaosEngine — full site content',
  '',
  `> ${SUMMARY}`,
  '',
  `Generated from ${pages.length} pages at ${SITE}`,
  '',
  '---',
  '',
];

for (const p of pages) {
  full.push(`# ${p.title}`, '', `URL: ${SITE}${p.url}`, '');
  if (p.description) full.push(`Description: ${p.description}`, '');
  if (p.body) full.push(p.body, '');
  full.push('---', '');
}

await writeFile(join(DIST, 'llms-full.txt'), full.join('\n'), 'utf-8');

console.log(`[llms] wrote llms.txt and llms-full.txt (${pages.length} pages)`);
