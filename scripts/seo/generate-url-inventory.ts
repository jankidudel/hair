import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { articles } from '../../frontend/src/app/content.generated.ts';
import { guideCategories } from '../../frontend/src/app/article-registry.ts';

type InventoryRow = {
  url: string;
  pageType: string;
  indexable: boolean;
  canonical: string | null;
  title: string | null;
  h1: string | null;
  h1Count: number | null;
  primaryIntent: string | null;
  author: string | null;
  publishedDate: string | null;
  modifiedDate: string | null;
  contentMethod: string | null;
  sitemapIncluded: boolean;
  redirectDestination: string | null;
};

const site = 'https://www.combreport.com';
const root = join(import.meta.dirname, '..', '..');
const staticPages = [
  [
    '/',
    'home',
    'Comb Report | Honest Hair Tool and Routine Advice',
    'Everyday routines for hair that feels like you.',
  ],
  [
    '/guides',
    'hub',
    'Hair Tools and Routine Guides | Comb Report',
    'Hair tools and routine guides',
  ],
  [
    '/tools',
    'tool hub',
    'Interactive Hair Tools | Comb Report',
    'Practical help for choosing and using hair tools',
  ],
  [
    '/products',
    'product hub',
    'Hair Tool Comparison Explorer | Combreport',
    'Compare Hair Tools Before You Buy',
  ],
  ['/about', 'policy', 'About | Comb Report', 'About Comb Report'],
  ['/privacy', 'policy', 'Privacy | Comb Report', 'Privacy'],
  [
    '/affiliate-disclosure',
    'policy',
    'Affiliate Disclosure | Comb Report',
    'Affiliate disclosure',
  ],
  [
    '/editorial-policy',
    'policy',
    'Editorial Policy | Comb Report',
    'Editorial policy',
  ],
  [
    '/testing-research-methodology',
    'policy',
    'Testing and Research Methodology | Comb Report',
    'Testing and research methodology',
  ],
  [
    '/corrections-policy',
    'policy',
    'Corrections Policy | Comb Report',
    'Corrections policy',
  ],
  [
    '/authors/combreport-editorial-team',
    'author',
    'Comb Report Editorial Team | Comb Report',
    'Comb Report Editorial Team',
  ],
  ['/contact', 'policy', 'Contact | Comb Report', 'Contact Comb Report'],
] as const;
const rows: InventoryRow[] = [
  ...staticPages.map(([path, pageType, title, h1]) => ({
    url: `${site}${path}`,
    pageType,
    indexable: true,
    canonical: `${site}${path}`,
    title,
    h1,
    h1Count: 1,
    primaryIntent: null,
    author: null,
    publishedDate: null,
    modifiedDate: null,
    contentMethod: null,
    sitemapIncluded: true,
    redirectDestination: null,
  })),
  ...guideCategories.map((category) => ({
    url: `${site}${category.path}`,
    pageType: 'category hub',
    indexable: true,
    canonical: `${site}${category.path}`,
    title: category.title,
    h1: category.heading,
    h1Count: 1,
    primaryIntent: category.label,
    author: null,
    publishedDate: null,
    modifiedDate: null,
    contentMethod: null,
    sitemapIncluded: true,
    redirectDestination: null,
  })),
  ...articles.map((article) => ({
    url: `${site}/guides/${article.slug}`,
    pageType: 'guide',
    indexable: true,
    canonical: `${site}/guides/${article.slug}`,
    title: article.title,
    h1: article.heading,
    h1Count: 1,
    primaryIntent: article.primaryIntent,
    author: article.authorId,
    publishedDate: article.publishDate,
    modifiedDate: article.updatedDate ?? article.publishDate,
    contentMethod: article.contentMethod,
    sitemapIncluded: true,
    redirectDestination: null,
  })),
];
const output = join(root, 'reports', 'seo-url-inventory.json');
await mkdir(dirname(output), { recursive: true });
await writeFile(output, `${JSON.stringify(rows, null, 2)}\n`);
console.log(`SEO URL inventory written (${rows.length} routes): ${output}`);
