export type HairLength = 'short' | 'medium' | 'long';
export type HairTexture = 'straight' | 'wavy' | 'curly-coily';
export type HairThickness = 'fine' | 'medium' | 'thick';
export type BrushUse = 'dry' | 'wet' | 'blow-dry';
export type StylingGoal = 'smooth' | 'volume' | 'detangle' | 'define-curls';

export interface HairBrushAnswers {
  length: HairLength;
  texture: HairTexture;
  thickness: HairThickness;
  use: BrushUse;
  goal: StylingGoal;
}

export type BrushCategory =
  | 'boar-mixed-bristle'
  | 'vent-brush'
  | 'paddle-brush'
  | 'round-brush'
  | 'flexible-detangling-brush'
  | 'wide-tooth-comb';

export interface BrushRecommendation {
  category: BrushCategory;
  name: string;
  bestFor: readonly string[];
  avoidIf?: string;
  guideSlug: string;
}

export interface HairBrushResult {
  primary: BrushRecommendation;
  alternative?: BrushRecommendation;
  rationale: string;
}

const recommendations: Record<BrushCategory, BrushRecommendation> = {
  'boar-mixed-bristle': {
    category: 'boar-mixed-bristle',
    name: 'Boar-bristle or mixed-bristle brush',
    bestFor: [
      'gentle everyday smoothing',
      'short styles',
      'a polished dry finish',
    ],
    avoidIf:
      'You mainly need to work through wet knots; choose a wet-use tool instead.',
    guideSlug: 'boar-bristle-vs-nylon-brush',
  },
  'vent-brush': {
    category: 'vent-brush',
    name: 'Vent brush',
    bestFor: [
      'quick drying with airflow',
      'short styles',
      'lightweight root lift',
    ],
    avoidIf:
      'You want a very smooth, shaped blow-dry; a round or paddle brush gives more control.',
    guideSlug: 'best-hair-brush-for-short-hair',
  },
  'paddle-brush': {
    category: 'paddle-brush',
    name: 'Paddle brush',
    bestFor: [
      'smoothing larger sections',
      'long straight or wavy hair',
      'an everyday straighter finish',
    ],
    avoidIf:
      'You need to detangle wet hair or preserve a curl pattern without dry brushing.',
    guideSlug: 'best-brushes-thick-hair',
  },
  'round-brush': {
    category: 'round-brush',
    name: 'Round brush',
    bestFor: [
      'blow-dry volume',
      'adding bend and shape',
      'controlled styling in sections',
    ],
    avoidIf:
      'You want the quickest everyday detangling; it takes more technique than a paddle or vent brush.',
    guideSlug: 'how-to-choose-hair-brush',
  },
  'flexible-detangling-brush': {
    category: 'flexible-detangling-brush',
    name: 'Flexible detangling brush',
    bestFor: [
      'wet detangling',
      'working in sections',
      'flexible movement around knots',
    ],
    avoidIf:
      'You are after polished blow-dry shape; use a styling brush once hair is detangled.',
    guideSlug: 'best-detangling-brushes',
  },
  'wide-tooth-comb': {
    category: 'wide-tooth-comb',
    name: 'Wide-tooth comb',
    bestFor: [
      'open-spaced wet detangling',
      'curly or coily routines',
      'keeping texture natural',
    ],
    avoidIf:
      'You want a smooth, heat-styled finish; a paddle or round brush is more suitable for that job.',
    guideSlug: 'hair-brush-vs-comb',
  },
};

const pick = (category: BrushCategory) => recommendations[category];
const textureName = (texture: HairTexture) =>
  texture === 'curly-coily' ? 'curly or coily' : texture;

export function recommendHairBrush(answers: HairBrushAnswers): HairBrushResult {
  const hair = `${answers.length}, ${textureName(answers.texture)} hair`;
  if (answers.use === 'wet') {
    if (answers.texture === 'curly-coily')
      return {
        primary: pick('wide-tooth-comb'),
        rationale: `For damp detangling ${hair}, open spacing lets you control each section. A styling-row brush is a separate choice for definition; this result does not imply dryer permission. Trade-off: a comb may take more passes than a broad head.`,
      };
    return {
      primary: pick('flexible-detangling-brush'),
      rationale: `For damp detangling ${hair}, a wet-use flexible-pin format is a starting point. Work in smaller sections if density crowds the head. Trade-off: this is not automatically a brush for dryer styling.`,
    };
  }
  if (answers.use === 'blow-dry') {
    if (answers.goal === 'define-curls' && answers.texture === 'curly-coily')
      return {
        primary: pick('wide-tooth-comb'),
        rationale: `For a texture-focused drying routine with ${hair}, a comb can prepare sections before drying. Trade-off: it does not create a round-brush blowout; choose the exact dryer method separately.`,
      };
    if (answers.length === 'short' && answers.goal !== 'volume')
      return {
        primary: pick('vent-brush'),
        rationale: `For short ${textureName(answers.texture)} hair with a separate dryer, a vented manual head can guide a manageable section. Trade-off: it offers less wrap for bend than a round barrel. Check the exact brush's dryer directions.`,
      };
    if (answers.goal === 'smooth')
      return {
        primary: pick('paddle-brush'),
        rationale: `For a straighter drying path through ${hair}, a paddle head can guide sections. Trade-off: it cannot wrap a section around a barrel for pronounced bend. Check the exact model's dryer directions.`,
      };
    return {
      primary: pick('round-brush'),
      rationale: `For shape or lift with a separate dryer, a manual round brush lets you guide ${hair} in sections. Trade-off: short pieces must reach the curve and release cleanly; high density calls for narrower sections, not automatically a bigger barrel.`,
    };
  }
  if (answers.texture === 'curly-coily' || answers.goal === 'define-curls')
    return {
      primary: pick('wide-tooth-comb'),
      rationale: `For dry ${hair} and a texture-focused goal, a comb can separate selected sections without making dry brushing a required step. Trade-off: it will not produce a polished blowout shape.`,
    };
  if (answers.goal === 'detangle')
    return {
      primary: pick('flexible-detangling-brush'),
      rationale: `For dry detangling ${hair}, a flexible-pin format allows smaller passes. Trade-off: a broader finishing brush may cover more surface once knots are clear.`,
    };
  if (answers.goal === 'volume')
    return {
      primary: pick('vent-brush'),
      rationale: `For dry grooming with a lift preference, a light vent brush is a simple manual format. Trade-off: lasting shaped root lift calls for a separate styling method.`,
    };
  if (answers.length === 'short' || answers.thickness === 'fine')
    return {
      primary: pick('boar-mixed-bristle'),
      rationale: `For dry finishing ${hair}, a compact finishing brush is worth comparing. Trade-off: its bristle layout may not be the right tool for knots or a dryer-led shape; fine strands alone do not prove one brush safer.`,
    };
  return {
    primary: pick('paddle-brush'),
    rationale: `For dry smoothing ${hair}, a paddle head covers a broad section. Trade-off: narrow the section when density crowds it, and use a different tool only if you also want a shaped blowout.`,
  };
}

export const allBrushRecommendations = Object.values(recommendations);
