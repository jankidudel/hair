import { ResolveFn } from '@angular/router';
import { articleBodyLoaders } from './article-bodies.generated';

/** Route data key holding the sanitised article body for `guides/:slug`. */
export const ARTICLE_HTML_DATA_KEY = 'articleHtml';

/**
 * Loads one article body on demand, so the shared bundle carries metadata only.
 * Prerendering awaits this resolver, so the static HTML still contains the
 * full article.
 */
export const articleHtmlResolver: ResolveFn<string> = (route) => {
  const load = articleBodyLoaders[route.paramMap.get('slug') ?? ''];
  return load ? load() : Promise.resolve('');
};
