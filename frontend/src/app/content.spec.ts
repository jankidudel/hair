import { describe, expect, it } from 'vitest';
import { articles } from './content.generated';

describe('generated editorial content', () => {
  it('has one prerenderable route per article', () => {
    expect(articles.map((article) => article.slug)).toEqual([
      'cold-water-for-hair',
      'how-often-should-you-wash-your-hair',
      'how-to-choose-a-hair-brush',
    ]);
  });
});
