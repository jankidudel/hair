import { ArticleSlug } from './article-slug';
export const handlingGuideDescriptions: Readonly<
  Partial<Record<string, string>>
> = {
  [ArticleSlug.HowToSectionHairForStyling]:
    'Park unused lengths and release the next area deliberately.',
  [ArticleSlug.HowToUseAWideToothComb]:
    'Use a permitted comb from accessible ends without forcing a catch.',
  [ArticleSlug.HowToUseACurlDefiningBrush]:
    'Try a manual defining brush only when you want that styling step.',
  [ArticleSlug.HowToUseAHairPick]:
    'Check a hair pick’s role before treating it as a detangler.',
  [ArticleSlug.HowToPlopHair]:
    'Compare a secured plop with cupping or blotting.',
};
export const handlingGuideCards = [
  {
    label: 'Separate working sections',
    description:
      handlingGuideDescriptions[ArticleSlug.HowToSectionHairForStyling],
    slug: ArticleSlug.HowToSectionHairForStyling,
  },
  {
    label: 'Work through a tangle',
    description: handlingGuideDescriptions[ArticleSlug.HowToUseAWideToothComb],
    slug: ArticleSlug.HowToUseAWideToothComb,
  },
  {
    label: 'Shape a prepared section',
    description:
      handlingGuideDescriptions[ArticleSlug.HowToUseACurlDefiningBrush],
    slug: ArticleSlug.HowToUseACurlDefiningBrush,
  },
  {
    label: 'Adjust the root outline',
    description: handlingGuideDescriptions[ArticleSlug.HowToUseAHairPick],
    slug: ArticleSlug.HowToUseAHairPick,
  },
  {
    label: 'Support lengths in fabric',
    description: handlingGuideDescriptions[ArticleSlug.HowToPlopHair],
    slug: ArticleSlug.HowToPlopHair,
  },
] as const;
