import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { provideRouter, withComponentInputBinding, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { baseHttpInterceptor } from './security/http.interceptor';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding(),
      withEnabledBlockingInitialNavigation(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
      })),
    provideHttpClient(withInterceptors([baseHttpInterceptor])),
    provideStore(),
    provideEffects()
  ],
};

// "prestart": "node aspnetcore-https",
// "start:windows": "ng serve --ssl --ssl-cert \"%APPDATA%\\ASP.NET\\https\\%npm_package_name%.pem\" --ssl-key \"%APPDATA%\\ASP.NET\\https\\%npm_package_name%.key\" --host=127.0.0.1",
// "start:default": "ng serve --ssl --ssl-cert \"$HOME/.aspnet/https/${npm_package_name}.pem\" --ssl-key \"$HOME/.aspnet/https/${npm_package_name}.key\" --host=127.0.0.1"
