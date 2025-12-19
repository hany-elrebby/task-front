import {ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import {provideHttpClient, withFetch} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';

export const appConfig: ApplicationConfig = {
  providers: [
      provideHttpClient(withFetch()),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
      importProvidersFrom(MatSnackBarModule)
  ]
};
