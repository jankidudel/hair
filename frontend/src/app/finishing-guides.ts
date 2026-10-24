import { ArticleSlug } from './article-slug';

export const finishingGuideDescriptions: Readonly<
  Partial<Record<string, string>>
> = {
  [ArticleSlug.HowToUseHairspray]:
    'Plan the area, follow the container and review coverage.',
  [ArticleSlug.FlexibleVsStrongHoldHairspray]:
    'Read movement and finish alongside the stated hold.',
  [ArticleSlug.SeaSaltSprayVsTexturisingSpray]:
    'Compare actual methods rather than treating names as opposites.',
  [ArticleSlug.HowToUseSeaSaltSpray]:
    'Organise the starting state, sections and finishing method.',
  [ArticleSlug.PomadeVsHairClay]:
    'Compare finish, hold and preparation for the exact jars.',
  [ArticleSlug.HowToApplyHairPomade]:
    'Track distribution before changing the amount.',
};
