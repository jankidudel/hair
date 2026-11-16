import siteConfig from './site-config.development.json';
import { SiteConfig } from './site-config';

export const environment = {
  googleAnalyticsMeasurementId: '',
  contactFormPreview: true,
  ...siteConfig,
} as const satisfies SiteConfig & {
  readonly googleAnalyticsMeasurementId: string;
  readonly contactFormPreview: boolean;
};
