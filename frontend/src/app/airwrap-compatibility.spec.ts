import { describe, expect, it } from 'vitest';
import {
  airwrapAttachmentLabels,
  airwrapBodyLabels,
  airwrapFit,
  airwrapMatrixRows,
} from './airwrap-compatibility';
import { ArticleSlug } from './article-slug';
import { articles } from './content.generated';

const strip = (html: string) =>
  html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

describe('Airwrap attachment compatibility', () => {
  it('excludes Co-anda2x pairings in both directions', () => {
    for (const older of ['earlier', 'id'] as const) {
      expect(airwrapFit('co-anda2x', older).status).toBe('excluded');
      expect(airwrapFit(older, 'co-anda2x').status).toBe('excluded');
    }
    expect(airwrapFit('co-anda2x', 'co-anda2x').status).toBe(
      'family-compatible',
    );
  });

  it('keeps earlier/i.d. cross-compatibility at family level only', () => {
    expect(airwrapFit('earlier', 'id').status).toBe('family-compatible');
    expect(airwrapFit('id', 'earlier').status).toBe('family-compatible');
    expect(airwrapFit('earlier', 'id').nextCheck).toMatch(/exact part/i);
  });

  it('never approves third-party parts and routes unknowns to identification', () => {
    for (const body of ['earlier', 'id', 'co-anda2x'] as const)
      expect(airwrapFit(body, 'third-party').status).toBe('not-established');
    expect(airwrapFit('unknown', 'id').status).toBe('identify-first');
    expect(airwrapFit('id', 'unknown').status).toBe('identify-first');
  });

  it('matches every row of the static matrix in the published guide', () => {
    const article = articles.find(
      (entry) => entry.slug === ArticleSlug.DysonAirwrapAttachmentCompatibility,
    );
    expect(article).toBeDefined();
    const rows = [...article!.html.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map(
      (match) =>
        [...match[1].matchAll(/<td>([\s\S]*?)<\/td>/g)].map((cell) =>
          strip(cell[1]),
        ),
    );
    for (const { body, attachment } of airwrapMatrixRows) {
      const row = rows.find(
        (cells) =>
          cells[0] === airwrapBodyLabels[body] &&
          cells[1] === airwrapAttachmentLabels[attachment],
      );
      expect(row, `${body} + ${attachment}`).toBeDefined();
      expect(row![2]).toBe(airwrapFit(body, attachment).statusLabel);
    }
  });
});
