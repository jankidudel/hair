import { ArticleSlug } from './article-slug';

export interface GuideSource {
  readonly label: string;
  readonly model: string;
  readonly market: string;
  readonly url: string;
  readonly checkedDate: string;
  readonly scope: string;
}

export interface GuideEvidence {
  readonly breadcrumbLabel?: string;
  readonly summary: string;
  readonly sources: readonly GuideSource[];
}

const checkedDate = '18 October 2026';

export const guideEvidence: Readonly<Record<string, GuideEvidence>> = {
  [ArticleSlug.HowToUseFlexiRods]: {
    summary:
      'This guide combines a conservative editorial sequence with directions published for identifiable roller sets. Product-specific preparation and timing remain with the exact set instructions.',
    sources: [
      {
        label: 'Annie Silky Satin Flexi Rods product directions',
        model: 'Annie 01291 Silky Satin Flexi Rods, 9/16 inch, 5 count',
        market: 'United States',
        url: 'https://www.annieinc.com/products/annie-silky-satin-flexi-rods-9-16-inch-5-count-blue',
        checkedDate,
        scope:
          'The maker describes wrapping and folding the ends inward. Its preparation advice applies to this set; no curl outcome or universal rod count is inferred.',
      },
      {
        label: 'Kitsch Velvet XL Flexi Rods product directions',
        model: 'Kitsch Eucalyptus Velvet XL Flexi Rods, 4-piece set',
        market: 'United States',
        url: 'https://www.mykitsch.com/collections/heatless-hair-1/products/eucalyptus-velvet-xl-flexi-rods-4pc-set',
        checkedDate,
        scope:
          'The maker describes dry-hair wrapping and separately allows damp hair. It also describes a scrunchie fastening step, which belongs to this set rather than every flexi rod.',
      },
    ],
  },
  [ArticleSlug.HowToUseSnapClosureFoamRollers]: {
    summary:
      'This guide combines a conservative editorial sequence with directions published for identifiable roller sets. Product-specific preparation and timing remain with the exact set instructions.',
    sources: [
      {
        label: 'Annie Jumbo Foam Hair Rollers product directions',
        model: 'Annie 01065 Foam Hair Rollers, 1 1/2 inch Jumbo, 6 count',
        market: 'United States',
        url: 'https://www.annieinc.com/products/annie-01065',
        checkedDate,
        scope:
          'The listing identifies a tab closure and gives product-specific preparation advice. Its promotional longevity and universal-fit claims are not adopted here.',
      },
      {
        label: 'RED by KISS Hair Foam Roller product details',
        model: 'RED by KISS HRS06 Hair Foam Roller',
        market: 'United States',
        url: 'https://ivyusa.com/shop/hair-foam-roller-2792',
        checkedDate,
        scope:
          'The official indexed product description identifies a snap closure and foam construction. Detailed preparation and removal directions are sparse; the sequence above is editorial workflow guidance. The full page could not be retrieved during this check.',
      },
    ],
  },
  [ArticleSlug.HowToCleanHairStraightenerPlates]: {
    breadcrumbLabel: 'How to clean straightener plates',
    summary:
      'This guide summarizes conservative external-care boundaries. The exact model manual controls permitted cloths, moisture and cleaning products; visible structural or electrical damage is not treated as a cleaning task.',
    sources: [
      {
        label: 'Conair CS225 instruction booklet',
        model: 'Conair Double Ceramic Flat Iron CS225',
        market: 'United States',
        url: 'https://www.conair.com/on/demandware.static/-/Library-Sites-usConairShared/default/dwe8198bd7/Instructional%20Booklets/CS225.pdf',
        checkedDate,
        scope:
          'The model manual directs disconnection from power, cooling and an exterior cloth wipe. It does not establish a site-wide cleaning substance.',
      },
      {
        label: 'BaBylissPRO BNT137 instruction booklet',
        model: 'BaBylissPRO Nano Titanium Mini Flat Iron BNT137',
        market: 'United States',
        url: 'https://babylisspro.com/on/demandware.static/-/Sites-master-us-babylisspro/default/dwfb4a73ed/manuals/BNT137.pdf',
        checkedDate,
        scope:
          'The model manual directs disconnection from power, cooling and an exterior cloth wipe; abnormal conditions require authorized service.',
      },
      {
        label: 'ghd Unplugged cleaning support',
        model: 'ghd Unplugged cordless straightener',
        market: 'United States',
        url: 'https://help.ghdhair.com/hc/en-us/articles/4403030589074-What-steps-do-you-recommend-in-cleaning-my-ghd-unplugged',
        checkedDate,
        scope:
          'This model-specific support page requires switching off, removing the charging source and cooling, then permits a damp cloth followed by wiping dry. That permission stays with this model.',
      },
    ],
  },
  [ArticleSlug.HowToCleanACurlingIronOrWand]: {
    summary:
      'This guide summarizes conservative external-care boundaries. The exact model manual controls permitted cloths, moisture and cleaning products; visible structural or electrical damage is not treated as a cleaning task.',
    sources: [
      {
        label: 'Conair CD851 instruction booklet',
        model: 'Conair Frizz Defense Curling Iron CD851',
        market: 'United States and Canada',
        url: 'https://www.conair.com/on/demandware.static/-/Library-Sites-usConairShared/default/dwbfca27c7/Instructional%20Booklets/CD851.pdf',
        checkedDate,
        scope:
          'The model manual describes disconnecting, cooling and wiping the exterior with a cloth, with immediate stop-use guidance for visible cord damage.',
      },
      {
        label: 'Conair CD123 instruction booklet',
        model: 'Conair You Curl Curling Wand CD123',
        market: 'United States',
        url: 'https://www.conair.com/on/demandware.static/-/Library-Sites-usConairShared/default/dw35d3b126/Instructional%20Booklets/CD123NN.pdf',
        checkedDate,
        scope:
          'The wand manual describes disconnecting, cooling and wiping the exterior with a cloth. It also prohibits consumer repairs.',
      },
      {
        label: 'BaBylissPRO Nano Titanium curling-iron instructions',
        model: 'BaBylissPRO BABNT75SN(MN) series curling irons',
        market: 'United States',
        url: 'https://babylisspro.com/on/demandware.static/-/Sites-master-us-babylisspro/default/dw219c7cd1/manuals/BABNT75SN%28MN%29%20series%20IB-10252D.pdf',
        checkedDate,
        scope:
          'The series manual describes disconnecting, cooling and wiping the exterior with a cloth; it directs abnormal conditions to authorized service.',
      },
    ],
  },
};
