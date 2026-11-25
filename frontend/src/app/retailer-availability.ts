import { InjectionToken } from '@angular/core';
import { ArticleSlug } from './article-slug';
import { currentModelSources } from './current-model-comparison-guides';

export type OfferMarket = 'UK' | 'US';

/**
 * How the exact destination was last checked against the compared model or box.
 * Only `verified` offers render. `unverified` keeps a configured destination
 * switched off until someone confirms the exact model, colour and box in a
 * browser; `unavailable` records a confirmed lack of a suitable destination.
 */
export type DestinationCheck = 'verified' | 'unverified' | 'unavailable';

export interface RetailerOffer {
  /** Exact compared product, as the reader sees it in the comparison. */
  readonly product: string;
  /** Model code or kit identifier sent with the click event. */
  readonly model: string;
  readonly merchant: string;
  readonly retailer: string;
  readonly label: string;
  /** Direct destination used until an approved affiliate link exists. */
  readonly url: string;
  /** Network-approved tracked link; rendered with rel="sponsored" and "Ad". */
  readonly affiliateUrl?: string;
  readonly destinationCheck: DestinationCheck;
  readonly checkedDate: string;
}

export type RetailerPlacement =
  | { readonly kind: 'before-heading'; readonly heading: string }
  | { readonly kind: 'after-decision-snapshot' };

export interface RetailerOfferGroup {
  readonly market: OfferMarket;
  readonly intro: string;
  readonly placement: RetailerPlacement;
  /** Analytics label for where the block sits on the page. */
  readonly placementLabel: string;
  readonly offers: readonly RetailerOffer[];
}

const ghdUk = { merchant: 'ghd', retailer: 'ghd UK' } as const;
const sharkUk = { merchant: 'Shark', retailer: 'SharkNinja UK' } as const;
const sharkUs = { merchant: 'Shark', retailer: 'SharkNinja US' } as const;
const dysonUs = { merchant: 'Dyson', retailer: 'Dyson US' } as const;

export const RETAILER_OFFERS = new InjectionToken<
  Readonly<Partial<Record<ArticleSlug, RetailerOfferGroup>>>
>('Retailer offers by comparison', {
  factory: () => ({
    [ArticleSlug.GhdSpeedVsHelios]: {
      market: 'UK',
      intro: 'These links are for the UK models compared above.',
      placement: {
        kind: 'before-heading',
        heading: 'Give setting memory a real job',
      },
      placementLabel: 'after_comparison_table',
      offers: [
        {
          ...ghdUk,
          product: 'ghd Speed (Titanium Black)',
          model: 'ghd Speed Titanium Black',
          label: 'Check ghd Speed at ghd UK',
          url: currentModelSources.S1.url,
          destinationCheck: 'verified',
          checkedDate: '2026-10-31',
        },
        {
          ...ghdUk,
          product: 'ghd Helios (Black)',
          model: 'ghd Helios Black',
          label: 'Check ghd Helios at ghd UK',
          url: currentModelSources.S2.url,
          destinationCheck: 'verified',
          checkedDate: '2026-10-31',
        },
      ],
    },
    [ArticleSlug.GhdChronosVsPlatinumPlus]: {
      market: 'UK',
      intro:
        'These links are for the standard black UK 26 mm models compared here. Check the exact listing and offer before ordering.',
      placement: { kind: 'after-decision-snapshot' },
      placementLabel: 'below_quick_choice',
      offers: [
        {
          ...ghdUk,
          product: 'ghd Chronos, black, 26 mm',
          model: 'ghd Chronos Black 26mm',
          label: 'Check ghd Chronos at ghd UK',
          url: 'https://www.ghdhair.com/hair-straighteners/ghd-chronos-black-styler-p-650',
          // ghdhair.com refused automated checks (HTTP 403) on 2026-11-22 and
          // again on 2026-11-25. Confirm the black 26 mm styler (not Max or a
          // gift set) and that it can be bought, in a browser, before switching on.
          destinationCheck: 'unverified',
          checkedDate: '2026-11-25',
        },
        {
          ...ghdUk,
          product: 'ghd Platinum+, black, 26 mm',
          model: 'ghd Platinum+ Black 26mm',
          label: 'Check ghd Platinum+ at ghd UK',
          url: 'https://www.ghdhair.com/hair-straighteners/ghd-platinum-plus-black-styler-p-453',
          // As above (HTTP 403 on 2026-11-25); if Platinum+ is no longer sold,
          // mark it 'unavailable'.
          destinationCheck: 'unverified',
          checkedDate: '2026-11-25',
        },
      ],
    },
    [ArticleSlug.DysonAirwrapVsSharkFlexstyle]: {
      market: 'US',
      intro:
        'These links are for the US boxes compared here. Check the box list on the retailer page before you buy.',
      placement: { kind: 'after-decision-snapshot' },
      placementLabel: 'below_quick_choice',
      offers: [
        {
          ...dysonUs,
          product: 'Dyson Airwrap i.d. Straight+Wavy',
          model: 'Airwrap i.d. Straight+Wavy US',
          label: 'Check Airwrap i.d. Straight+Wavy at Dyson US',
          url: 'https://www.dyson.com/hair-care/hair-stylers/airwrap-id/straight-wavy-plum-copper',
          // dyson.com refused automated checks (HTTP 403) on 2026-11-22 and
          // again on 2026-11-25. Confirm the Straight+Wavy box contents in a
          // browser before switching on.
          destinationCheck: 'unverified',
          checkedDate: '2026-11-25',
        },
        {
          ...sharkUs,
          product: 'Shark FlexStyle HD430',
          model: 'HD430',
          label: 'Check FlexStyle HD430 at SharkNinja US',
          url: 'https://www.sharkninja.com/shark-flexstyle-air-styling-drying-system/HD430.html',
          destinationCheck: 'verified',
          checkedDate: '2026-11-22',
        },
      ],
    },
    [ArticleSlug.SharkGlamVsFlexstyle]: {
      market: 'UK',
      intro:
        'These links are for the exact UK model codes compared here. Another colour or box can have a different code and contents.',
      placement: {
        kind: 'before-heading',
        heading: 'Separate the body from the jobs in the box',
      },
      placementLabel: 'below_quick_answer',
      offers: [
        {
          ...sharkUk,
          product: 'Shark Glam HD6052SUK, gold, with diffuser',
          model: 'HD6052SUK',
          label: 'Check Glam HD6052SUK at SharkNinja UK',
          url: 'https://www.sharkninja.co.uk/shark-glam-ceramic-air-styling-and-drying-system-with-diffuser-hd6052suk/HD6052SUK.html',
          destinationCheck: 'verified',
          checkedDate: '2026-11-22',
        },
        {
          ...sharkUk,
          product: 'Shark FlexStyle HD446UK, black, with storage case',
          model: 'HD446UK',
          label: 'Check FlexStyle HD446UK at SharkNinja UK',
          url: 'https://www.sharkninja.co.uk/shark-flexstyle-5-in-1-air-styler-hair-dryer-with-storage-case-black-hd446uk/HD446UK.html',
          destinationCheck: 'verified',
          checkedDate: '2026-11-22',
        },
      ],
    },
  }),
});

export function liveOffers(
  group: RetailerOfferGroup | undefined,
): readonly RetailerOffer[] {
  return (
    group?.offers.filter((offer) => offer.destinationCheck === 'verified') ?? []
  );
}
