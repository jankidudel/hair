import { describe, expect, it } from 'vitest';
import { recommendRoundBrushSize } from './round-brush-size-recommendation';

describe('recommendRoundBrushSize', () => {
  it('waits for meaningful inputs before showing a recommendation', () => {
    expect(recommendRoundBrushSize('', '', '')).toBeNull();
    expect(recommendRoundBrushSize('bob', 'smooth', '')).toBeNull();
  });
  it('uses length and shape, without increasing diameter solely for density', () => {
    const low = recommendRoundBrushSize('long', 'smooth', 'fine');
    const high = recommendRoundBrushSize('long', 'smooth', 'thick');
    expect(low?.size).toBe(high?.size);
    expect(high?.adjustment).toContain('narrower sections');
  });
  it('keeps short face-framing sections in a smaller starting category', () => {
    expect(recommendRoundBrushSize('short', 'curl', 'medium')?.size).toContain(
      'small barrel',
    );
    expect(recommendRoundBrushSize('long', 'smooth', 'medium')?.size).toContain(
      'broader barrel',
    );
  });
});
