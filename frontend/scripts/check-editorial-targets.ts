import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import matter from 'gray-matter';
import { articleRegistry } from '../src/app/article-registry.ts';
import {
  isPublishedOn,
  isValidCalendarDate,
} from '../src/app/publication-date.ts';

const suppliedDate = process.argv.find((argument) =>
  argument.startsWith('--date='),
);
const today = suppliedDate
  ? suppliedDate.slice(7)
  : new Date().toISOString().slice(0, 10);
if (!isValidCalendarDate(today))
  throw new Error(`--date must be a real YYYY-MM-DD date.`);
const directory = join(import.meta.dirname, '..', 'content');
const registry = new Map(articleRegistry.map((entry) => [entry.slug, entry]));
const published = new Set<string>();
const errors: string[] = [];
const warnings: string[] = [];
const rows: Array<[string, string, string]> = [];
const files = (await readdir(directory))
  .filter((file) => file.endsWith('.html') && file !== 'article-template.html')
  .sort();
const seenSlugs = new Set<string>();
const seenCanonicals = new Set<string>();
const seenTitles = new Set<string>();
const seenDescriptions = new Set<string>();
const sourceBySlug = new Map<string, Record<string, unknown>>();

for (const file of files) {
  const parsed = matter(await readFile(join(directory, file), 'utf8'));
  const data = parsed.data as Record<string, unknown>;
  if (typeof data.slug === 'string') sourceBySlug.set(data.slug, data);
}
for (const [slug, entry] of registry) {
  const data = sourceBySlug.get(slug);
  if (data && isPublishedOn(entry.enabled, entry.publishDate, today))
    published.add(slug);
}

for (const file of files) {
  const parsed = matter(await readFile(join(directory, file), 'utf8'));
  const data = parsed.data as Record<string, unknown>;
  const slug = typeof data.slug === 'string' ? data.slug : '';
  if (!slug) {
    errors.push(`${file}: missing slug.`);
    continue;
  }
  if (seenSlugs.has(slug)) errors.push(`${file}: duplicate slug '${slug}'.`);
  seenSlugs.add(slug);
  const entry = registry.get(slug);
  if (!entry) {
    errors.push(`${file}: missing registry entry.`);
    continue;
  }
  const date = entry.publishDate;
  if (!isValidCalendarDate(date)) errors.push(`${file}: invalid publishDate.`);
  if (!isPublishedOn(entry.enabled, date, today)) continue;
  const title = typeof data.title === 'string' ? data.title.trim() : '';
  const description =
    typeof data.description === 'string' ? data.description.trim() : '';
  const heading =
    typeof data.heading === 'string' ? data.heading.trim() : title;
  const canonical = `/guides/${slug}`;
  const prefix = `${file} (${slug})`;
  // Established articles retain their original editorial contract until they are
  // migrated to the new front matter. New publishing-model sources are strict.
  const modernSource = typeof data.contentType === 'string';
  if (!title || !description || !heading)
    errors.push(`${prefix}: title, description, and heading are required.`);
  if (seenTitles.has(title)) errors.push(`${prefix}: duplicate title.`);
  seenTitles.add(title);
  if (seenDescriptions.has(description))
    errors.push(`${prefix}: duplicate description.`);
  seenDescriptions.add(description);
  if (seenCanonicals.has(canonical))
    errors.push(`${prefix}: duplicate canonical URL.`);
  seenCanonicals.add(canonical);
  const h1 = parsed.content.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi) ?? [];
  if (modernSource && h1.length > 0)
    errors.push(
      `${prefix}: article body must not include H1; generated H1 must match heading.`,
    );
  const words =
    parsed.content.replace(/<[^>]+>/g, ' ').match(/[\p{L}\p{N}'’-]+/gu) ?? [];
  const opening = words.slice(0, 180).length;
  if (modernSource && opening < 80)
    errors.push(
      `${prefix}: opening answer is too thin (${opening} words in first 180).`,
    );
  if (modernSource && words.length < 500)
    errors.push(`${prefix}: body is too short (${words.length}; minimum 500).`);
  else if (words.length < 800)
    warnings.push(
      `${prefix}: body is below the 800-word target (${words.length}).`,
    );
  const h2 = (parsed.content.match(/<h2\b/gi) ?? []).length;
  if (modernSource && h2 < 3)
    errors.push(`${prefix}: needs at least 3 H2 sections (${h2}).`);
  else if (h2 < 4)
    warnings.push(`${prefix}: fewer than 4 H2 sections (${h2}).`);
  const faqs = Array.isArray(data.faq) ? data.faq : [];
  if (faqs.length < 2) warnings.push(`${prefix}: fewer than two FAQs.`);
  if (title.length < 45 || title.length > 65)
    warnings.push(`${prefix}: title should be 45–65 characters.`);
  if (description.length < 120 || description.length > 165)
    warnings.push(`${prefix}: description should be 120–165 characters.`);
  if (!Array.isArray(data.secondaryQueries) || data.secondaryQueries.length < 2)
    warnings.push(`${prefix}: fewer than two secondary queries.`);
  if (typeof data.author !== 'string' || !data.author.trim())
    warnings.push(`${prefix}: no byline/author.`);
  const hrefs = [...parsed.content.matchAll(/href=["']([^"']+)["']/gi)].map(
    (match) => match[1],
  );
  const internal = hrefs.filter((href) => href.startsWith('/'));
  if (
    modernSource &&
    !internal.some(
      (href) =>
        href === '/guides' ||
        href === '/hair-brush-finder' ||
        href === '/hair-care' ||
        href.startsWith('/guides/'),
    )
  )
    errors.push(`${prefix}: needs a contextual internal link.`);
  for (const href of internal.filter((href) => href.startsWith('/guides/'))) {
    const target = href.split(/[?#]/)[0].slice('/guides/'.length);
    if (!published.has(target) && registry.has(target))
      errors.push(`${prefix}: links to unpublished guide '${target}'.`);
  }
  if (
    /\b(?:dyson|shark|revlon|ghd|babyliss)\b/i.test(
      `${title} ${parsed.content}`,
    ) &&
    typeof data.reviewMethod !== 'string'
  )
    errors.push(
      `${prefix}: product ranking or named-product claim needs reviewMethod.`,
    );
  if (
    modernSource &&
    data.affiliateDisclosure === true &&
    !/affiliate/i.test(parsed.content)
  )
    errors.push(`${prefix}: affiliate page needs a visible disclosure.`);
  rows.push([
    slug,
    errors.some((error) => error.startsWith(prefix)) ? 'ERROR' : 'OK',
    `primary: ${String(data.primaryQuery ?? heading)}; secondary: ${((data.secondaryQueries as string[]) ?? []).join(', ') || '—'}`,
  ]);
}
for (const [slug, entry] of registry)
  if (entry.enabled && !files.some((file) => file === `${slug}.html`))
    errors.push(`registry '${slug}': missing HTML source file.`);
console.log('| Guide | Result | Editor terms |\n| --- | --- | --- |');
for (const row of rows) console.log(`| ${row.join(' | ')} |`);
for (const warning of warnings) console.warn(`WARNING: ${warning}`);
for (const error of errors) console.error(`ERROR: ${error}`);
if (errors.length) process.exit(1);
