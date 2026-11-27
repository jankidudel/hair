import { careMethodSlugs } from '../frontend/src/app/care-method-guides.ts';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import matter from 'gray-matter';
import {
  articleRegistry,
  type ArticleRegistryEntry,
} from '../frontend/src/app/article-registry.ts';
import { resolveArticleSlugReference } from '../frontend/src/app/article-slug.ts';
import { SitePath } from '../frontend/src/app/site-path.ts';
import {
  isPublishedOn,
  isValidCalendarDate,
} from '../frontend/src/app/publication-date.ts';
import { canonicalComparisons } from '../frontend/src/app/product-comparisons.ts';

const execFileAsync = promisify(execFile);
const hardMinimumWords = 500;
const staticRoutes = new Set([
  '/',
  '/guides',
  '/hair-care',
  '/hair-dryers',
  '/hot-air-brushes',
  '/brushes-combs',
  '/hair-accessories',
  '/tools',
  '/hair-brush-finder',
  '/hair-tool-manual-finder',
  '/hair-dryer-attachment-finder',
  '/hair-tool-size-visualiser',
  '/used-multi-styler-checklist',
  '/flat-iron-finder',
  '/curling-tool-finder',
  '/hair-tool-routine-builder',
  '/products',
  '/about',
  '/privacy',
  '/affiliate-disclosure',
  ...canonicalComparisons.map((comparison) => comparison.path),
]);

export interface StagedGuideInput {
  readonly file: string;
  readonly source: string;
  readonly entry?: ArticleRegistryEntry;
  readonly today: string;
}

function requiredString(
  data: Record<string, unknown>,
  field: string,
): string | undefined {
  const value = data[field];
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function wordCount(html: string): number {
  return (html.replace(/<[^>]+>/g, ' ').match(/[\p{L}\p{N}'’-]+/gu) ?? [])
    .length;
}

export function validateStagedGuide(input: StagedGuideInput): string[] {
  const errors: string[] = [];
  const prefix = input.file;
  let parsed: matter.GrayMatterFile<string>;
  try {
    parsed = matter(input.source);
  } catch (error) {
    return [`${prefix}: invalid front matter (${String(error)}).`];
  }
  const data = parsed.data as Record<string, unknown>;
  const title = requiredString(data, 'title');
  const description = requiredString(data, 'description');
  const slugReference = requiredString(data, 'slug');
  const slug = slugReference
    ? resolveArticleSlugReference(slugReference)
    : undefined;
  const heading = requiredString(data, 'heading');
  const isLegacyArticle = !('eyebrow' in data) && !('heading' in data);
  if (!title || !description || !slug || (!isLegacyArticle && !heading))
    errors.push(
      `${prefix}: title, description, slug, and heading are required.`,
    );
  if (slugReference && !slug)
    errors.push(`${prefix}: slug must use an ArticleSlug reference.`);
  if (slug && input.file !== `frontend/content/${slug}.html`)
    errors.push(`${prefix}: filename must match slug '${slug}'.`);
  if (!input.entry)
    errors.push(`${prefix}: missing article-registry.ts entry.`);
  else if (slug && input.entry.slug !== slug)
    errors.push(`${prefix}: registry slug does not match front matter.`);
  if (input.entry && !isValidCalendarDate(input.entry.publishDate))
    errors.push(`${prefix}: registry publishDate is invalid.`);
  if (!isLegacyArticle && /<h1\b/i.test(parsed.content))
    errors.push(
      `${prefix}: article HTML must not include H1; heading generates the page H1.`,
    );
  if (/<(?:script|iframe|object|embed|form|style)\b/i.test(parsed.content))
    errors.push(`${prefix}: contains an unsafe HTML element.`);
  if (/\son[a-z]+\s*=/i.test(parsed.content))
    errors.push(`${prefix}: contains an unsafe HTML event handler.`);
  if (/href\s*=\s*["']\s*(?:javascript|data|file):/i.test(parsed.content))
    errors.push(`${prefix}: contains an unsafe link protocol.`);
  if (
    !input.entry ||
    !isPublishedOn(input.entry.enabled, input.entry.publishDate, input.today)
  )
    return errors;
  if (
    (input.entry.publishDate >= '2026-09-05' ||
      (slug && careMethodSlugs.includes(slug))) &&
    wordCount(parsed.content) < hardMinimumWords
  )
    errors.push(
      `${prefix}: body is too short (${wordCount(parsed.content)}; minimum ${hardMinimumWords}).`,
    );
  const publishedSlugs = new Set(
    articleRegistry
      .filter((entry) =>
        isPublishedOn(entry.enabled, entry.publishDate, input.today),
      )
      .map((entry) => entry.slug),
  );
  for (const href of parsed.content.matchAll(/href=["']([^"']+)["']/gi)) {
    const sitePathReference = /^\{\{SitePath\.([A-Za-z][A-Za-z0-9]*)\}\}$/.exec(
      href[1],
    );
    const path = sitePathReference
      ? SitePath[sitePathReference[1] as keyof typeof SitePath]
      : href[1];
    if (!path)
      errors.push(`${prefix}: references an unknown SitePath '${href[1]}'.`);
    if (!path) continue;
    if (!path.startsWith('/')) continue;
    // Validate the route only; a #fragment or ?query does not change it.
    const [route, fragment] = path.split(/[?#]/, 2);
    const guideSlugReference = route.match(/^\/guides\/([^/#?]+)$/)?.[1];
    const guideSlug = guideSlugReference
      ? (resolveArticleSlugReference(guideSlugReference) ?? guideSlugReference)
      : undefined;
    const comparisonSlugReference = route.match(/^\/products\/([^/#?]+)$/)?.[1];
    const comparisonSlug = comparisonSlugReference
      ? (resolveArticleSlugReference(comparisonSlugReference) ??
        comparisonSlugReference)
      : undefined;
    if (guideSlug && !publishedSlugs.has(guideSlug))
      errors.push(
        `${prefix}: links to unpublished or unknown guide '${path}'.`,
      );
    else if (
      comparisonSlug &&
      !canonicalComparisons.some(
        (comparison) => comparison.path === `/products/${comparisonSlug}`,
      )
    )
      errors.push(`${prefix}: links to unknown product comparison '${path}'.`);
    else if (!guideSlug && !comparisonSlug && !staticRoutes.has(route))
      errors.push(`${prefix}: links to unknown internal route '${path}'.`);
    // A same-page jump link must point at a heading anchor in this article
    // (the generator prefixes heading ids with `user-content-`).
    if (
      guideSlug &&
      guideSlug === slug &&
      fragment?.startsWith('user-content-') &&
      !parsed.content.includes(`id="${fragment.slice('user-content-'.length)}"`)
    )
      errors.push(`${prefix}: jump link '${path}' has no matching heading id.`);
  }
  return errors;
}

async function stagedFiles(): Promise<string[]> {
  const { stdout } = await execFileAsync('git', [
    'diff',
    '--cached',
    '--name-only',
    '--diff-filter=ACMR',
    '--',
    'frontend/content',
  ]);
  return stdout.split('\n').filter((file) => file.endsWith('.html'));
}

async function stagedSource(file: string): Promise<string> {
  const { stdout } = await execFileAsync('git', ['show', `:${file}`]);
  return stdout;
}

if (import.meta.main) {
  const today = new Date().toISOString().slice(0, 10);
  const entries = new Map(articleRegistry.map((entry) => [entry.slug, entry]));
  const errors = (
    await Promise.all(
      (await stagedFiles()).map(async (file) => {
        const source = await stagedSource(file);
        const slugReference = requiredString(
          matter(source).data as Record<string, unknown>,
          'slug',
        );
        const slug = slugReference
          ? resolveArticleSlugReference(slugReference)
          : undefined;
        return validateStagedGuide({
          file,
          source,
          entry: slug ? entries.get(slug) : undefined,
          today,
        });
      }),
    )
  ).flat();
  if (errors.length) {
    console.error('Staged content validation failed:');
    for (const error of errors) console.error(`- ${error}`);
    process.exitCode = 1;
  } else console.log('Staged content validation passed.');
}
