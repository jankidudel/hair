import { InjectionToken } from '@angular/core';
import { environment } from '../../environments/environment';

export interface AnalyticsConfig {
  googleAnalyticsMeasurementId: string;
}

export const ANALYTICS_CONFIG = new InjectionToken<AnalyticsConfig>(
  'ANALYTICS_CONFIG',
  {
    providedIn: 'root',
    factory: () => ({
      googleAnalyticsMeasurementId: environment.googleAnalyticsMeasurementId,
    }),
  },
);
