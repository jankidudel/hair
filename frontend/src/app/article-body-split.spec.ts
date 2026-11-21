import { describe, expect, it } from 'vitest';
import { articleBodyLoaders } from './article-bodies.generated';
import { articles as fullArticles } from './content.generated';
import { articles as indexedArticles } from './content-index.generated';
import { articleBodyResolver } from './article-html.resolver';
import {
  convertToParamMap,
  type ActivatedRouteSnapshot,
} from '@angular/router';

const routeFor = (slug: string) =>
  ({ paramMap: convertToParamMap({ slug }) }) as ActivatedRouteSnapshot;

describe('per-article body split', () => {
  it('keeps article bodies, FAQs and unused editorial fields out of the browser metadata index', () => {
    expect(indexedArticles.map((article) => article.slug)).toEqual(
      fullArticles.map((article) => article.slug),
    );
    for (const article of indexedArticles)
      for (const field of ['html', 'faq', 'reviewMethod', 'primaryIntent'])
        expect(Object.hasOwn(article, field)).toBe(false);
  });

  it('loads exactly the generated body for every published article', async () => {
    expect(Object.keys(articleBodyLoaders).sort()).toEqual(
      fullArticles.map((article) => article.slug).sort(),
    );
    for (const article of fullArticles)
      expect(await articleBodyLoaders[article.slug]()).toEqual({
        html: article.html,
        faq: article.faq,
      });
  });

  it('resolves a body by route slug and an empty body for an unknown slug', async () => {
    const [first] = fullArticles;
    const resolve = (slug: string) =>
      articleBodyResolver(routeFor(slug), {} as never) as Promise<{
        html: string;
        faq: unknown[];
      }>;
    expect(await resolve(first.slug)).toEqual({
      html: first.html,
      faq: first.faq,
    });
    expect(await resolve('not-a-published-guide')).toEqual({
      html: '',
      faq: [],
    });
  });
});
