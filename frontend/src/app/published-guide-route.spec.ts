import { UrlSegment } from '@angular/router';
import { describe, expect, it } from 'vitest';
import { publishedGuideCanMatch } from './published-guide-route';

describe('published guide route matching', () => {
  it('matches a published guide route', () => {
    expect(
      publishedGuideCanMatch({}, [
        new UrlSegment('guides', {}),
        new UrlSegment('cold-water-for-hair', {}),
      ]),
    ).toBe(true);
  });

  it('declines an unknown guide so the normal 404 route handles it', () => {
    expect(
      publishedGuideCanMatch({}, [
        new UrlSegment('guides', {}),
        new UrlSegment('markdown-syntax-example', {}),
      ]),
    ).toBe(false);
  });
});
