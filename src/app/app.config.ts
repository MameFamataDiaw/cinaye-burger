import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { routes } from './app.routes';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Importer ReactiveFormsModule
import { RouterModule } from '@angular/router'; // Importer RouterModule
import { AuthInterceptor } from './auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(ReactiveFormsModule), // Ajouter Re`  activeFormsModule ici
    importProvidersFrom(RouterModule), // Ajouter RouterModule ici
    importProvidersFrom ( FormsModule ),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
};
