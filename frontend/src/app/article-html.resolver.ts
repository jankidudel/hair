import { ResolveFn } from '@angular/router';
import { articleBodyLoaders } from './article-bodies.generated';
import type { ArticleBody } from './content-index.generated';

/** Route data key holding the sanitised article body and FAQ for `guides/:slug`. */
export const ARTICLE_BODY_DATA_KEY = 'articleBody';

export const emptyArticleBody: ArticleBody = { html: '', faq: [] };

/**
 * Loads one article's body and FAQ on demand, so the shared bundle carries
 * listing metadata only. Prerendering awaits this resolver, so the static HTML
 * still contains the full article.
 */
export const articleBodyResolver: ResolveFn<ArticleBody> = (route) => {
  const load = articleBodyLoaders[route.paramMap.get('slug') ?? ''];
  return load ? load() : Promise.resolve(emptyArticleBody);
};
