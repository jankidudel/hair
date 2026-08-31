import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import matter from 'gray-matter';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import rehypeSanitize, { defaultSchema, type Options } from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import prettier from 'prettier';
import { articleGroups, articleRegistry } from '../src/app/article-registry.ts';

type Faq = { question: string; answer: string };
type ContentArticle = {
  title: string;
  description: string;
  slug: string;
  eyebrow: string;
  heading: string;
  faq: Faq[];
  published?: string;
  updated?: string;
  affiliateDisclosure?: boolean;
  html: string;
};
const root = join(import.meta.dirname, '..');
const contentDirectory = join(root, 'content');
const output = join(root, 'src', 'app', 'content.generated.ts');
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

const contentBySlug = new Map<string, ContentArticle>();
for (const file of (await readdir(contentDirectory))
  .filter((item) => item.endsWith('.md') && item !== 'article-template.md')
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
  const title = requiredString(data, 'title', file);
  const description = requiredString(data, 'description', file);
  const isLegacyArticle = !('eyebrow' in data) && !('heading' in data);
  if (!isLegacyArticle && /<h1\b/i.test(parsed.content))
    throw new Error(
      `${file}: use front matter for the page H1; article HTML must not contain an H1.`,
    );
  contentBySlug.set(slug, {
    title,
    description,
    slug,
    eyebrow: isLegacyArticle
      ? requiredString(data, 'category', file)
      : requiredString(data, 'eyebrow', file),
    heading: isLegacyArticle ? title : requiredString(data, 'heading', file),
    faq: faqs(data, file),
    published: typeof data.published === 'string' ? data.published : undefined,
    updated: typeof data.updated === 'string' ? data.updated : undefined,
    affiliateDisclosure: data.affiliateDisclosure === true,
    html: String(await htmlToSafeHtml(parsed.content)),
  });
}

const registrySlugs = new Set<string>();
for (const entry of articleRegistry) {
  if (registrySlugs.has(entry.slug))
    throw new Error(`Article registry has duplicate slug '${entry.slug}'.`);
  registrySlugs.add(entry.slug);
  if (!contentBySlug.has(entry.slug))
    throw new Error(
      `Article registry entry '${entry.slug}' has no Markdown file.`,
    );
}
for (const slug of contentBySlug.keys())
  if (!registrySlugs.has(slug))
    throw new Error(
      `Markdown article '${slug}' is missing from the article registry.`,
    );

const groupIds = Object.keys(articleGroups);
const articles = articleRegistry
  .filter((entry) => entry.enabled)
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
export interface Article { title: string; description: string; slug: string; eyebrow: string; heading: string; faq: ArticleFaq[]; published?: string; updated?: string; affiliateDisclosure: boolean; group: string; category: string; html: string; }
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
