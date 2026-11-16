import siteConfig from './site-config.production.json';
import { SiteConfig } from './site-config';

export const environment = {
  googleAnalyticsMeasurementId: 'G-MMB1X66GHC',
  contactFormPreview: false,
  ...siteConfig,
} as const satisfies SiteConfig & {
  readonly googleAnalyticsMeasurementId: string;
  readonly contactFormPreview: boolean;
};
