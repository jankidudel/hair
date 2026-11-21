// Post-build crawl of every sitemap page: site-wide metadata uniqueness, DOM
// ids, unrendered placeholders, structured-data types and the 404 document.
// Per-page canonical/H1/sitemap checks live in frontend/scripts/check-generated-seo.ts.
import { join } from 'node:path';
import {
  builtSiteRoot,
  loadPage,
  loadSitemapPages,
} from './built-site/pages.ts';
import {
  duplicateMetadataErrors,
  notFoundErrors,
  pageErrors,
} from './built-site/site-checks.ts';

const root = builtSiteRoot();
const pages = await loadSitemapPages(root);
const notFound = await loadPage(root, '/404');
const errors = [
  ...(pages.some((page) => page.path === '/404')
    ? ['sitemap.xml: lists the not-found page.']
    : []),
  ...pages.flatMap(pageErrors),
  ...duplicateMetadataErrors(pages),
  ...notFoundErrors(notFound.document),
];
if (errors.length) {
  console.error(`Built-site crawl failed (${errors.length} issues):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(
  `Built-site crawl passed for ${pages.length} sitemap pages (${join(root)}).`,
);
