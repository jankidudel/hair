import { describe, expect, it } from 'vitest';
import { articleBodyLoaders } from './article-bodies.generated';
import { articles as fullArticles } from './content.generated';
import { articles as indexedArticles } from './content-index.generated';
import { articleHtmlResolver } from './article-html.resolver';
import {
  convertToParamMap,
  type ActivatedRouteSnapshot,
} from '@angular/router';

const routeFor = (slug: string) =>
  ({ paramMap: convertToParamMap({ slug }) }) as ActivatedRouteSnapshot;

describe('per-article body split', () => {
  it('keeps article bodies out of the browser metadata index', () => {
    expect(indexedArticles.map((article) => article.slug)).toEqual(
      fullArticles.map((article) => article.slug),
    );
    for (const article of indexedArticles)
      expect(Object.hasOwn(article, 'html')).toBe(false);
  });

  it('loads exactly the generated body for every published article', async () => {
    expect(Object.keys(articleBodyLoaders).sort()).toEqual(
      fullArticles.map((article) => article.slug).sort(),
    );
    for (const article of fullArticles)
      expect(await articleBodyLoaders[article.slug]()).toBe(article.html);
  });

  it('resolves a body by route slug and an empty body for an unknown slug', async () => {
    const [first] = fullArticles;
    const resolve = (slug: string) =>
      articleHtmlResolver(routeFor(slug), {} as never) as Promise<string>;
    expect(await resolve(first.slug)).toBe(first.html);
    expect(await resolve('not-a-published-guide')).toBe('');
  });
});
