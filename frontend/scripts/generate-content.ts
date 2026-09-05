import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import matter from 'gray-matter';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeSanitize, { defaultSchema, type Options } from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import prettier from 'prettier';
import { articleGroups, articleRegistry } from '../src/app/article-registry.ts';
import {
  isPublishedOn,
  isValidCalendarDate,
} from '../src/app/publication-date.ts';

type Faq = { question: string; answer: string };
type ContentType = 'buying-guide' | 'comparison' | 'how-to' | 'explainer';
type SearchIntent = 'informational' | 'commercial-investigation';
type ContentArticle = {
  title: string;
  description: string;
  slug: string;
  eyebrow: string;
  heading: string;
  faq: Faq[];
  publishDate: string;
  updatedDate?: string;
  contentType: ContentType;
  primaryQuery: string;
  secondaryQueries: string[];
  searchIntent: SearchIntent;
  cluster: string;
  author?: string;
  heroImage?: string;
  reviewMethod?: string;
  affiliateDisclosure?: boolean;
  html: string;
};
const root = join(import.meta.dirname, '..');
const contentDirectory = join(root, 'content');
const output = join(root, 'src', 'app', 'content.generated.ts');
const suppliedDate = process.argv.find((argument) =>
  argument.startsWith('--date='),
);
const currentUtcDate = suppliedDate
  ? suppliedDate.slice('--date='.length)
  : new Date().toISOString().slice(0, 10);
if (!isValidCalendarDate(currentUtcDate))
  throw new Error(
    `--date must be a real UTC calendar date, received '${currentUtcDate}'.`,
  );
const articleHtmlSchema: Options = {
  ...defaultSchema,
  tagNames: [
    'p',
    'h2',
    'h3',
    'ul',
    'ol',
    'li',
    'strong',
    'em',
    'a',
    'img',
    'figure',
    'figcaption',
    'table',
    'thead',
    'tbody',
    'tr',
    'th',
    'td',
    'details',
    'summary',
    'blockquote',
    'code',
    'pre',
    'sup',
    'sub',
  ],
  attributes: {
    p: ['className'],
    a: ['href', 'title'],
    img: ['src', 'alt', 'title', 'width', 'height'],
    details: ['open'],
    th: ['abbr', 'colSpan', 'rowSpan'],
    td: ['colSpan', 'rowSpan'],
  },
  protocols: {
    href: ['http', 'https', 'mailto'],
    src: ['http', 'https'],
  },
  strip: ['script', 'iframe', 'object', 'embed', 'form'],
};
const htmlToSafeHtml = (html: string) =>
  unified()
    .use(rehypeParse, { fragment: true })
    .use(rehypeSanitize, articleHtmlSchema)
    .use(rehypeStringify)
    .process(html);

function requiredString(
  data: Record<string, unknown>,
  field: string,
  file: string,
): string {
  const value = data[field];
  if (typeof value !== 'string' || value.trim() === '')
    throw new Error(`${file}: front matter '${field}' is required.`);
  return value;
}

function faqs(data: Record<string, unknown>, file: string): Faq[] {
  if (!('faq' in data)) return [];
  if (!Array.isArray(data.faq) || data.faq.length === 0)
    throw new Error(`${file}: front matter 'faq' must be a non-empty list.`);
  return data.faq.map((value, index) => {
    if (!value || typeof value !== 'object' || Array.isArray(value))
      throw new Error(`${file}: faq[${index}] must be an object.`);
    const entry = value as Record<string, unknown>;
    return {
      question: requiredString(entry, 'question', `${file}: faq[${index}]`),
      answer: requiredString(entry, 'answer', `${file}: faq[${index}]`),
    };
  });
}

function optionalDate(
  data: Record<string, unknown>,
  field: string,
  file: string,
): string | undefined {
  if (!(field in data)) return undefined;
  const value = requiredString(data, field, file);
  if (!isValidCalendarDate(value))
    throw new Error(`${file}: '${field}' must be a real YYYY-MM-DD date.`);
  return value;
}

function stringList(
  data: Record<string, unknown>,
  field: string,
  file: string,
): string[] {
  const value = data[field];
  if (
    !Array.isArray(value) ||
    value.some((item) => typeof item !== 'string' || item.trim() === '')
  )
    throw new Error(
      `${file}: front matter '${field}' must be a non-empty list of strings.`,
    );
  return value as string[];
}

function oneOf<T extends string>(
  data: Record<string, unknown>,
  field: string,
  choices: readonly T[],
  file: string,
): T {
  const value = requiredString(data, field, file) as T;
  if (!choices.includes(value))
    throw new Error(
      `${file}: '${field}' must be one of ${choices.join(', ')}.`,
    );
  return value;
}

const contentBySlug = new Map<string, ContentArticle>();
const registryBySlug = new Map(
  articleRegistry.map((entry) => [entry.slug, entry]),
);
for (const file of (await readdir(contentDirectory))
  .filter((item) => item.endsWith('.html') && item !== 'article-template.html')
  .sort()) {
  const parsed = matter(await readFile(join(contentDirectory, file), 'utf8'));
  const data = parsed.data as Record<string, unknown>;
  const slug = requiredString(data, 'slug', file);
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))
    throw new Error(
      `${file}: slug must use lowercase words separated by hyphens.`,
    );
  if (contentBySlug.has(slug))
    throw new Error(`${file}: duplicate slug '${slug}'.`);
  const registryEntry = registryBySlug.get(slug);
  if (!registryEntry)
    throw new Error(
      `HTML article '${slug}' is missing from the article registry.`,
    );
  if ('publishDate' in data)
    throw new Error(
      `${file}: publishDate belongs in article-registry.ts, not article front matter.`,
    );
  const title = requiredString(data, 'title', file);
  const description = requiredString(data, 'description', file);
  const isLegacyArticle = !('eyebrow' in data) && !('heading' in data);
  if (!isLegacyArticle && /<h1\b/i.test(parsed.content))
    throw new Error(
      `${file}: use front matter for the page H1; article HTML must not contain an H1.`,
    );
  const heading = isLegacyArticle
    ? title
    : requiredString(data, 'heading', file);
  const publishDate = registryEntry.publishDate;
  if (!isValidCalendarDate(publishDate))
    throw new Error(
      `Article registry entry '${slug}' has an invalid publishDate '${publishDate}'.`,
    );
  const updatedDate = optionalDate(data, 'updatedDate', file);
  if (updatedDate && updatedDate < publishDate)
    throw new Error(
      `${file}: 'updatedDate' cannot be earlier than 'publishDate'.`,
    );
  const contentType = (
    'contentType' in data
      ? oneOf(
          data,
          'contentType',
          ['buying-guide', 'comparison', 'how-to', 'explainer'] as const,
          file,
        )
      : 'explainer'
  ) as ContentType;
  const searchIntent = (
    'searchIntent' in data
      ? oneOf(
          data,
          'searchIntent',
          ['informational', 'commercial-investigation'] as const,
          file,
        )
      : 'informational'
  ) as SearchIntent;
  const primaryQuery =
    typeof data.primaryQuery === 'string'
      ? requiredString(data, 'primaryQuery', file)
      : heading;
  const secondaryQueries =
    'secondaryQueries' in data
      ? stringList(data, 'secondaryQueries', file)
      : [];
  const cluster =
    typeof data.cluster === 'string'
      ? requiredString(data, 'cluster', file)
      : 'guides';
  const reviewMethod =
    typeof data.reviewMethod === 'string'
      ? requiredString(data, 'reviewMethod', file)
      : undefined;
  if (
    /\b(?:dyson|shark|revlon|ghd|babyliss)\b/i.test(
      `${title} ${parsed.content}`,
    ) &&
    !reviewMethod
  )
    throw new Error(
      `${file}: named product comparisons or rankings require 'reviewMethod'.`,
    );
  contentBySlug.set(slug, {
    title,
    description,
    slug,
    eyebrow: isLegacyArticle
      ? requiredString(data, 'category', file)
      : requiredString(data, 'eyebrow', file),
    heading,
    faq: faqs(data, file),
    publishDate,
    updatedDate,
    contentType,
    primaryQuery,
    secondaryQueries,
    searchIntent,
    cluster,
    author:
      typeof data.author === 'string'
        ? requiredString(data, 'author', file)
        : undefined,
    heroImage:
      typeof data.heroImage === 'string'
        ? requiredString(data, 'heroImage', file)
        : undefined,
    reviewMethod,
    affiliateDisclosure: data.affiliateDisclosure === true,
    html: String(await htmlToSafeHtml(parsed.content)),
  });
}

const registrySlugs = new Set<string>();
const primaryQueries = new Set<string>();
for (const entry of articleRegistry) {
  if (registrySlugs.has(entry.slug))
    throw new Error(`Article registry has duplicate slug '${entry.slug}'.`);
  registrySlugs.add(entry.slug);
  if (!contentBySlug.has(entry.slug))
    throw new Error(
      `Article registry entry '${entry.slug}' has no HTML source file.`,
    );
}
for (const slug of contentBySlug.keys())
  if (!registrySlugs.has(slug))
    throw new Error(
      `HTML article '${slug}' is missing from the article registry.`,
    );

const groupIds = Object.keys(articleGroups);
const articles = articleRegistry
  .filter((entry) => {
    const article = contentBySlug.get(entry.slug);
    return (
      article &&
      isPublishedOn(entry.enabled, article.publishDate, currentUtcDate)
    );
  })
  .sort(
    (first, second) =>
      groupIds.indexOf(first.group) - groupIds.indexOf(second.group) ||
      first.order - second.order,
  )
  .map((entry) => {
    const article = contentBySlug.get(entry.slug);
    if (!article) throw new Error(`Missing article '${entry.slug}'.`);
    return {
      ...article,
      group: entry.group,
      category: articleGroups[entry.group].label,
    };
  });
for (const article of articles) {
  const key = `${article.searchIntent}:${article.primaryQuery.trim().toLowerCase()}`;
  if (primaryQueries.has(key))
    throw new Error(
      `Duplicate primaryQuery '${article.primaryQuery}' for ${article.searchIntent}.`,
    );
  primaryQueries.add(key);
}
const articleIndexGroups = groupIds
  .map((id) => ({
    id,
    label: articleGroups[id as keyof typeof articleGroups].label,
    articles: articles
      .filter((article) => article.group === id)
      .map(({ title, description, slug, heading }) => ({
        title,
        description,
        slug,
        heading,
      })),
  }))
  .filter((group) => group.articles.length > 0);
const source = `// Generated by scripts/generate-content.ts. Do not edit.
export interface ArticleFaq { question: string; answer: string; }
export interface Article { title: string; description: string; slug: string; eyebrow: string; heading: string; faq: ArticleFaq[]; publishDate: string; updatedDate?: string; contentType: string; primaryQuery: string; secondaryQueries: string[]; searchIntent: string; cluster: string; author?: string; heroImage?: string; reviewMethod?: string; affiliateDisclosure: boolean; group: string; category: string; html: string; }
export interface ArticleIndexGroup { id: string; label: string; articles: Pick<Article, 'title' | 'description' | 'slug' | 'heading'>[]; }
export const articles: Article[] = ${JSON.stringify(articles, null, 2)} as const;
export const articleBySlug: Readonly<Record<string, Article>> = Object.fromEntries(articles.map((article) => [article.slug, article]));
export const articleIndexGroups: ArticleIndexGroup[] = ${JSON.stringify(articleIndexGroups, null, 2)} as const;
export const articleSlugs: readonly string[] = articles.map((article) => article.slug);
`;
await writeFile(
  output,
  await prettier.format(source, {
    parser: 'typescript',
    singleQuote: true,
    trailingComma: 'all',
  }),
);
