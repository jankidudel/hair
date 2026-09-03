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
    guideSlug: 'best-hair-brush-for-thick-hair',
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
        alternative: pick('flexible-detangling-brush'),
        rationale: `For ${hair} and wet detangling, open spacing gives you controlled passes through sections while keeping your preferred texture in mind.`,
      };
    if (answers.thickness === 'fine')
      return {
        primary: pick('flexible-detangling-brush'),
        rationale: `For fine ${textureName(answers.texture)} hair, a flexible wet-use brush is a practical way to detangle in small, controlled passes.`,
      };
    return {
      primary: pick('flexible-detangling-brush'),
      alternative: pick('wide-tooth-comb'),
      rationale: `For ${hair} and wet detangling, flexible pins make it easier to work through sections without relying on a styling brush.`,
    };
  }

  if (answers.use === 'blow-dry') {
    if (answers.texture === 'curly-coily')
      return {
        primary: pick('wide-tooth-comb'),
        rationale: `For ${hair}, a wide-tooth comb can help with gentle sectioning before drying. Brushing is not required for curls; diffuser-oriented styling may better suit the finish you want.`,
      };
    if (answers.goal === 'volume')
      return {
        primary: pick('round-brush'),
        rationale: `For ${hair} and a volume-focused blow-dry, a round brush gives you the most control to lift and shape each section.`,
      };
    if (answers.length === 'short')
      return {
        primary: pick('vent-brush'),
        alternative: pick('round-brush'),
        rationale: `For short ${textureName(answers.texture)} hair, a vent brush keeps blow-drying quick and manageable; use a small round brush when you want more shape.`,
      };
    return {
      primary: pick('round-brush'),
      alternative: pick('paddle-brush'),
      rationale: `For ${hair}, a round brush adds controlled shape during a blow-dry, while a paddle brush is a simpler alternative for smoother sections.`,
    };
  }

  if (answers.texture === 'curly-coily' || answers.goal === 'define-curls')
    return {
      primary: pick('wide-tooth-comb'),
      rationale: `For ${hair} and a texture-focused goal, a wide-tooth comb is a practical alternative to dry brushing, which can create unwanted frizz for many people.`,
    };
  if (answers.goal === 'volume')
    return {
      primary: pick('vent-brush'),
      alternative: pick('round-brush'),
      rationale: `For ${hair} and everyday volume, a light vent brush offers quick lift without making your routine feel like a full blow-dry.`,
    };
  if (answers.goal === 'detangle')
    return {
      primary: pick('flexible-detangling-brush'),
      alternative: pick('wide-tooth-comb'),
      rationale: `For ${hair} and gentle everyday detangling, flexible pins are a useful starting point for working through small sections.`,
    };
  if (answers.length === 'short')
    return {
      primary: pick('boar-mixed-bristle'),
      alternative: pick('vent-brush'),
      rationale: `For short ${textureName(answers.texture)} hair and everyday grooming, a boar or mixed-bristle brush gives a neat, controlled finish without needing heat.`,
    };
  if (answers.thickness === 'fine')
    return {
      primary: pick('boar-mixed-bristle'),
      alternative: pick('vent-brush'),
      rationale: `For fine ${textureName(answers.texture)} hair, gentle mixed bristles or a light vent brush are usually easier to control than a heavy, dense paddle brush.`,
    };
  if (answers.length === 'long' && answers.thickness === 'thick')
    return {
      primary: pick('paddle-brush'),
      rationale: `For long, thick ${textureName(answers.texture)} hair used for everyday grooming, a paddle brush covers larger sections for practical smoothing.`,
    };
  return {
    primary: pick('paddle-brush'),
    alternative: pick('boar-mixed-bristle'),
    rationale: `For ${hair} used mainly for everyday grooming, a paddle brush gives quick smoothing without needing heat.`,
  };
}

export const allBrushRecommendations = Object.values(recommendations);
