import { ArticleSlug } from './article-slug';
interface ContextualIntegration {
  readonly before: string;
  readonly label: string;
  readonly slug: string;
  readonly after: string;
}
export const guideContextualIntegrations: Readonly<
  Partial<Record<string, ContextualIntegration>>
> = {
  [ArticleSlug.HowToChooseHairSectioningClips]: {
    before: 'Once the clip fits the bundle, use ',
    label: 'how to section hair for styling',
    slug: ArticleSlug.HowToSectionHairForStyling,
    after:
      ' to plan what you release from it. A broad parked bundle does not have to become one large working section.',
  },
  [ArticleSlug.WideToothCombVsDetanglingBrush]: {
    before: 'Already choosing the comb you own? Follow ',
    label: 'the wide-tooth comb method',
    slug: ArticleSlug.HowToUseAWideToothComb,
    after:
      ' for accessible ends, section boundaries and stopping at resistance. This comparison remains the place to choose between contact patterns.',
  },
  [ArticleSlug.CurlDefiningBrushVsDetanglingBrush]: {
    before: 'For the next practical step, use ',
    label: 'how to use a curl-defining brush',
    slug: ArticleSlug.HowToUseACurlDefiningBrush,
    after:
      ' on a prepared section. If the tool catches before shaping, return to preparation rather than increasing tension.',
  },
  [ArticleSlug.DenmanD3VsD4]: {
    before: 'After comparing the row layouts, try ',
    label: 'one prepared section with a curl-defining brush',
    slug: ArticleSlug.HowToUseACurlDefiningBrush,
    after:
      '. The method check is separate from deciding whether another model is worth buying.',
  },
  [ArticleSlug.BestBrushesCurlyHair]: {
    before:
      'A root-level finishing adjustment is a different task from detangling the lengths. See ',
    label: 'how to use a hair pick',
    slug: ArticleSlug.HowToUseAHairPick,
    after:
      ', including the named model’s detangling and heat exclusions, before adding that tool to your routine.',
  },
  [ArticleSlug.HowToUseAMicrofibreHairTowel]: {
    before:
      'If you want to support the lengths rather than twist a general towel wrap, use ',
    label: 'how to plop hair',
    slug: ArticleSlug.HowToPlopHair,
    after:
      '. That guide also distinguishes a secured plop from handling one section at a time with fabric over your hands.',
  },
  [ArticleSlug.MicrofiberHairTowelVsCottonTShirt]: {
    before: 'Once the fabric and coverage suit your routine, compare ',
    label: 'plopping, cupping and blotting',
    slug: ArticleSlug.HowToPlopHair,
    after:
      ' as handling choices. Choosing a material does not require a particular wrapping method.',
  },
  [ArticleSlug.HowToApplyGelToCurlyHair]: {
    before:
      'If neighbouring lengths keep joining the area you are treating, review ',
    label: 'the section-and-release plan',
    slug: ArticleSlug.HowToSectionHairForStyling,
    after:
      '. Clear access is a separate adjustment from increasing the amount of gel.',
  },
};
