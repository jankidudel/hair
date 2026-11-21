import { builtSiteRoot, sitemapPaths } from './built-site/pages.ts';
import { publicRouteErrors } from './built-site/public-routes.ts';

const root = builtSiteRoot();
const paths = await sitemapPaths(root);
const errors = await publicRouteErrors(root, paths);
if (errors.length) {
  console.error(`Public-route export check failed (${errors.length} issues):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(
  `Public-route export check passed: ${paths.length} sitemap URLs through the deployed CloudFront rewrite, slash/apex redirects and 404 fallback.`,
);
