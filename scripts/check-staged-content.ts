import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import matter from 'gray-matter';
import {
  articleRegistry,
  type ArticleRegistryEntry,
} from '../frontend/src/app/article-registry.ts';
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
  '/hair-brush-finder',
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
  const slug = requiredString(data, 'slug');
  const heading = requiredString(data, 'heading');
  if (!title || !description || !slug || !heading)
    errors.push(
      `${prefix}: title, description, slug, and heading are required.`,
    );
  if (slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))
    errors.push(
      `${prefix}: slug must use lowercase words separated by hyphens.`,
    );
  if (slug && input.file !== `frontend/content/${slug}.html`)
    errors.push(`${prefix}: filename must match slug '${slug}'.`);
  if (!input.entry)
    errors.push(`${prefix}: missing article-registry.ts entry.`);
  else if (slug && input.entry.slug !== slug)
    errors.push(`${prefix}: registry slug does not match front matter.`);
  if (input.entry && !isValidCalendarDate(input.entry.publishDate))
    errors.push(`${prefix}: registry publishDate is invalid.`);
  if (/<h1\b/i.test(parsed.content))
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
    input.entry.publishDate >= '2026-09-05' &&
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
    const path = href[1];
    if (!path.startsWith('/')) continue;
    const guideSlug = path.match(/^\/guides\/([^/#?]+)$/)?.[1];
    if (guideSlug && !publishedSlugs.has(guideSlug))
      errors.push(
        `${prefix}: links to unpublished or unknown guide '${path}'.`,
      );
    else if (!guideSlug && !staticRoutes.has(path))
      errors.push(`${prefix}: links to unknown internal route '${path}'.`);
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
        const slug = requiredString(
          matter(source).data as Record<string, unknown>,
          'slug',
        );
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
