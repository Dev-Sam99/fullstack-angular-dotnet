import { enableProdMode, ApplicationConfig } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

import { App } from './app/app';
import { environment } from './environments/environment';
import { loadConfig } from './app/config/load-config'; // Make sure this returns a Promise<void>
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

if (environment.production) {
  enableProdMode();
}

const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    {
      provide: 'APP_INITIALIZER', // symbolic token
      useFactory: () => loadConfig(), // ✅ FIXED
      multi: true
    }
  ]
};

bootstrapApplication(App, appConfig).catch(err => console.error(err));
