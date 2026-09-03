import siteConfig from './site-config.development.json';
import { SiteConfig } from './site-config';

export const environment = {
  googleAnalyticsMeasurementId: 'G-G954QBJ8F2',
  ...siteConfig,
} as const satisfies SiteConfig & {
  readonly googleAnalyticsMeasurementId: string;
};
