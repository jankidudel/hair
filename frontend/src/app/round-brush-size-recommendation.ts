export type RoundBrushLength = 'short' | 'bob' | 'medium' | 'long';
export type RoundBrushGoal = 'lift' | 'smooth' | 'bend' | 'curl';
export type RoundBrushDensity = 'fine' | 'medium' | 'thick';

export function recommendRoundBrushSize(
  length: RoundBrushLength | '',
  goal: RoundBrushGoal | '',
  density: RoundBrushDensity | '',
) {
  if (!length || !goal || !density) return null;
  const size =
    length === 'short' || goal === 'curl'
      ? 'A small barrel'
      : length === 'long' && goal !== 'lift'
        ? 'A broader barrel'
        : 'A middle-sized barrel';
  return {
    size: `${size} is a starting point, not a measured personal fit`,
    reason:
      goal === 'smooth'
        ? 'A broader curve can guide a longer section toward a looser shape.'
        : goal === 'lift'
          ? 'A barrel that reaches the root and lets the section release cleanly matters more than a large diameter.'
          : 'Check that the section can follow the barrel curve without trapping its ends.',
    adjustment:
      density === 'thick'
        ? 'With high density, work in narrower sections; density alone does not require a larger barrel. Size down if a short piece cannot reach around the barrel, or consider a broader curve if a long section wraps too tightly for your intended shape.'
        : 'Size down if a short piece cannot reach around the barrel; consider a broader curve when long sections wrap more tightly than your intended shape. Compare maker-defined barrel and outside-bristle diameters separately.',
  };
}
