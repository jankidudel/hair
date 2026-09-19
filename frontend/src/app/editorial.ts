export const ContentMethod = {
  HandsOnTested: 'hands-on-tested',
  ExpertReviewed: 'expert-reviewed',
  SpecificationResearched: 'specification-researched',
  EditorialGuide: 'editorial-guide',
} as const;

export type ContentMethod = (typeof ContentMethod)[keyof typeof ContentMethod];

export interface AuthorProfile {
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly role: string;
  readonly description: string;
}

// This is an intentionally transparent interim editorial identity. A personal
// profile must not be published until the owner supplies real biography details.
export const combReportEditorialTeam: AuthorProfile = {
  id: 'combreport-editorial-team',
  name: 'Comb Report Editorial Team',
  slug: 'combreport-editorial-team',
  role: 'Editorial team',
  description:
    'The Comb Report Editorial Team publishes appearance-focused grooming guides and clearly labels whether a page is an editorial guide or based on published specifications. Individual author profiles will be added only when verified details are available.',
};

export const contentMethodLabel: Readonly<Record<ContentMethod, string>> = {
  [ContentMethod.HandsOnTested]: 'Hands-on tested',
  [ContentMethod.ExpertReviewed]: 'Expert reviewed',
  [ContentMethod.SpecificationResearched]: 'Specification researched',
  [ContentMethod.EditorialGuide]: 'Editorial guide',
};
