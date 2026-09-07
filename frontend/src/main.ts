import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

const dynamicImportRecoveryKey = 'combreport-dynamic-import-recovery';

window.addEventListener('unhandledrejection', (event) => {
  if (
    !isDynamicImportFailure(event.reason) ||
    sessionStorage.getItem(dynamicImportRecoveryKey)
  ) {
    return;
  }
  sessionStorage.setItem(dynamicImportRecoveryKey, 'attempted');
  event.preventDefault();
  window.location.reload();
});

bootstrapApplication(AppComponent, appConfig)
  .then(() => sessionStorage.removeItem(dynamicImportRecoveryKey))
  .catch((error: unknown) => console.error(error));

function isDynamicImportFailure(reason: unknown): boolean {
  const message = reason instanceof Error ? reason.message : String(reason);
  return /failed to fetch dynamically imported module|importing a module script failed/i.test(
    message,
  );
}
