import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { CURRENT_UTC_DATE } from './publication-date';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    {
      provide: CURRENT_UTC_DATE,
      useFactory: () => new Date().toISOString().slice(0, 10),
    },
  ],
};
