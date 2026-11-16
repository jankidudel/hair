import { InjectionToken } from '@angular/core';
import { currentModelSources } from './current-model-comparison-guides';

interface RetailerOffer {
  readonly product: string;
  readonly label: string;
  readonly url: string;
  readonly affiliateUrl?: string;
}

export const GHD_UK_RETAILER_OFFERS = new InjectionToken<
  readonly RetailerOffer[]
>('ghd UK retailer offers', {
  factory: () => [
    {
      product: 'ghd Speed (Titanium Black)',
      label: 'Check ghd Speed at ghd UK',
      url: currentModelSources.S1.url,
    },
    {
      product: 'ghd Helios (Black)',
      label: 'Check ghd Helios at ghd UK',
      url: currentModelSources.S2.url,
    },
  ],
});
