import { ApplicationConfig } from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { CURRENT_UTC_DATE } from './publication-date';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    // Reuse the prerendered DOM instead of re-rendering every page on startup.
    provideClientHydration(withEventReplay()),
    {
      provide: CURRENT_UTC_DATE,
      useFactory: () => new Date().toISOString().slice(0, 10),
    },
  ],
};
