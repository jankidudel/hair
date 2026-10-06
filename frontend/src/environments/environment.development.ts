import siteConfig from './site-config.development.json';
import { SiteConfig } from './site-config';

export const environment = {
  googleAnalyticsMeasurementId: '',
  ...siteConfig,
} as const satisfies SiteConfig & {
  readonly googleAnalyticsMeasurementId: string;
};
