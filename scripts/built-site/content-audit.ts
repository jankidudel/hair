import { cleanText, internalPath, type BuiltPage } from './pages.ts';

/**
 * Editorial-quality signals across built guides. Unlike the checks in
 * site-checks.ts these are judgement calls, so the CLI reports them as warnings
 * unless run with --strict.
 */
export const minimumParagraphLength = 100;
export const nearDuplicateThreshold = 0.78;
export const repeatedHeadingLimit = 4;
export const minimumContextualInlinks = 2;

/** Template headings every guide is expected to share. */
export const sharedTemplateHeadings: ReadonlySet<string> = new Set([
  'Quick answer',
  'Source checks',
  'Sources',
  'Frequently asked questions',
  'Next steps',
]);

/** Article regions whose links count as contextual (in-copy) recommendations. */
const contextualRegions = '.article-body, .article-faq, .article-next-steps';
/** Repeated UI boilerplate that is not editorial copy. */
const boilerplate = '.table-scroll-hint, app-breadcrumbs, .article-byline';

export interface PageSummary {
  readonly path: string;
  readonly guide: boolean;
  readonly title: string;
  readonly words: number;
  readonly paragraphs: readonly string[];
  readonly intro: string;
  readonly ending: string;
  readonly headings: readonly string[];
  readonly tables: number;
  readonly tablesWithoutCaption: number;
  readonly tablesWithoutRowHeaders: number;
  readonly links: ReadonlySet<string>;
  /** Every same-site link in the document, including header and footer. */
  readonly allLinks: ReadonlySet<string>;
  readonly contextualLinks: ReadonlySet<string>;
}

export interface ContentAudit {
  readonly rows: readonly (PageSummary & {
    inlinks: number;
    contextualInlinks: number;
  })[];
  readonly duplicateParagraphs: readonly string[];
  readonly nearDuplicates: readonly string[];
  readonly repeatedHeadings: readonly string[];
  readonly lowContextualInlinks: readonly string[];
  readonly orphans: readonly string[];
  readonly tableSemantics: readonly string[];
}

const normalise = (text: string) =>
  cleanText(text)
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, ' ');

/** Jaccard similarity of the distinct words longer than three letters. */
export function similarity(left: string, right: string): number {
  const words = (text: string) =>
    new Set(
      normalise(text)
        .split(' ')
        .filter((word) => word.length > 3),
    );
  const a = words(left);
  const b = words(right);
  const shared = [...a].filter((word) => b.has(word)).length;
  return shared / Math.max(1, new Set([...a, ...b]).size);
}

export function summarisePage({ path, document }: BuiltPage): PageSummary {
  const main = document.querySelector('main');
  const article = main?.querySelector('article') ?? main;
  const body = [...(article?.querySelectorAll('section.article-body') ?? [])]
    .filter((section) => !section.querySelector('#source-checks-heading'))
    .map((section) => {
      const copy = section.cloneNode(true) as Element;
      copy.querySelectorAll(boilerplate).forEach((node) => node.remove());
      return copy;
    });
  const paragraphs = body
    .flatMap((section) => [...section.querySelectorAll('p')])
    .map((p) => cleanText(p.textContent))
    .filter((text) => text.length >= minimumParagraphLength);
  const tables = [...(main?.querySelectorAll('table') ?? [])];
  const links = (selector: string, scope: ParentNode | null = main) =>
    new Set(
      [...(scope?.querySelectorAll(selector) ?? [])]
        .filter((anchor) => !anchor.closest('app-breadcrumbs'))
        .map((anchor) => internalPath(anchor.getAttribute('href')!, path))
        .filter((target): target is string => !!target && target !== path),
    );
  return {
    path,
    guide: path.startsWith('/guides/'),
    title: cleanText(document.title),
    words: body.reduce(
      (total, section) =>
        total +
        cleanText(section.textContent).split(' ').filter(Boolean).length,
      0,
    ),
    paragraphs,
    intro: cleanText(article?.querySelector('.lede')?.textContent),
    ending: paragraphs.at(-1) ?? '',
    headings: body.flatMap((section) =>
      [...section.querySelectorAll('h2')].map((h) => cleanText(h.textContent)),
    ),
    tables: tables.length,
    tablesWithoutCaption: tables.filter((t) => !t.querySelector('caption'))
      .length,
    tablesWithoutRowHeaders: tables.filter(
      (t) => !t.querySelector('tbody th[scope="row"], tbody th'),
    ).length,
    links: links('a[href]'),
    allLinks: links('a[href]', document),
    contextualLinks: links(
      contextualRegions
        .split(', ')
        .map((region) => `${region} a[href]`)
        .join(', '),
    ),
  };
}

export function auditContent(pages: readonly PageSummary[]): ContentAudit {
  const guides = pages.filter((page) => page.guide);

  const owners = new Map<string, { text: string; paths: string[] }>();
  for (const page of guides)
    for (const paragraph of page.paragraphs) {
      const key = normalise(paragraph);
      const entry = owners.get(key) ?? { text: paragraph, paths: [] };
      if (!entry.paths.includes(page.path)) entry.paths.push(page.path);
      owners.set(key, entry);
    }
  const duplicateParagraphs = [...owners.values()]
    .filter((entry) => entry.paths.length > 1)
    .map(
      (entry) => `${entry.paths.join(', ')}: “${entry.text.slice(0, 110)}…”`,
    );

  const nearDuplicates: string[] = [];
  for (let i = 0; i < guides.length; i++)
    for (let j = i + 1; j < guides.length; j++) {
      const [a, b] = [guides[i], guides[j]];
      if (a.intro && similarity(a.intro, b.intro) >= nearDuplicateThreshold)
        nearDuplicates.push(`Similar introductions: ${a.path}, ${b.path}`);
      if (a.ending && similarity(a.ending, b.ending) >= nearDuplicateThreshold)
        nearDuplicates.push(`Similar closing paragraphs: ${a.path}, ${b.path}`);
    }

  const headingOwners = new Map<string, string[]>();
  for (const page of guides)
    for (const heading of new Set(page.headings))
      if (!sharedTemplateHeadings.has(heading))
        headingOwners.set(heading, [
          ...(headingOwners.get(heading) ?? []),
          page.path,
        ]);
  const repeatedHeadings = [...headingOwners]
    .filter(([, paths]) => paths.length >= repeatedHeadingLimit)
    .sort((a, b) => b[1].length - a[1].length)
    .map(([heading, paths]) => `“${heading}” on ${paths.length} guides`);

  const rows = pages.map((page) => ({
    ...page,
    inlinks: pages.filter((source) => source.links.has(page.path)).length,
    contextualInlinks: pages.filter((source) =>
      source.contextualLinks.has(page.path),
    ).length,
  }));
  const lowContextualInlinks = rows
    .filter(
      (row) => row.guide && row.contextualInlinks < minimumContextualInlinks,
    )
    .map((row) => `${row.path} (${row.contextualInlinks})`);
  const orphans = rows
    .filter(
      (row) =>
        row.path !== '/' &&
        !pages.some((source) => source.allLinks.has(row.path)),
    )
    .map((row) => row.path);
  const tableSemantics = rows
    .filter((row) => row.tablesWithoutCaption || row.tablesWithoutRowHeaders)
    .map(
      (row) =>
        `${row.path}: ${row.tablesWithoutCaption}/${row.tables} without <caption>, ${row.tablesWithoutRowHeaders}/${row.tables} without row headers`,
    );

  return {
    rows,
    duplicateParagraphs,
    nearDuplicates,
    repeatedHeadings,
    lowContextualInlinks,
    orphans,
    tableSemantics,
  };
}

const cell = (text: string | number) => String(text).replaceAll('|', '\\|');
const list = (items: readonly string[], empty = 'None found.') =>
  items.length ? items.map((item) => `- ${item}`).join('\n') : empty;

export function contentAuditReport(audit: ContentAudit): string {
  const table = audit.rows
    .map(
      (row) =>
        `| ${row.path} | ${cell(row.title)} | ${row.words} | ${row.tables} | ${row.inlinks} | ${row.contextualInlinks} | ${row.contextualLinks.size} |`,
    )
    .join('\n');
  return `# Built content audit

Generated from the local production build, not from production. Word counts and
duplicate checks use the article body only (no FAQ, sources, breadcrumbs, related
cards or table hints). Inlinks count other pages linking anywhere in \`<main>\`;
contextual inlinks count links inside article bodies, FAQs and next steps.

| URL | Title | Body words | Tables | Inlinks | Contextual inlinks | Contextual outlinks |
|---|---|---:|---:|---:|---:|---:|
${table}

## Orphan pages (no internal links anywhere, including navigation)

${list(audit.orphans)}

## Duplicate paragraphs (${minimumParagraphLength}+ characters)

${list(audit.duplicateParagraphs)}

## Near-duplicate introductions or closing paragraphs

${list(audit.nearDuplicates, `None at similarity ≥ ${nearDuplicateThreshold}.`)}

## Section headings repeated on ${repeatedHeadingLimit}+ guides

Shared template headings are excluded: ${[...sharedTemplateHeadings].join(', ')}.

${list(audit.repeatedHeadings)}

## Guides with fewer than ${minimumContextualInlinks} contextual inlinks

${list(audit.lowContextualInlinks)}

## Tables without a caption or row headers

${list(audit.tableSemantics)}
`;
}
