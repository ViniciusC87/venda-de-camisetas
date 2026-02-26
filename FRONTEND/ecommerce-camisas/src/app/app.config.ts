import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Usando o nome exato que o seu terminal sugeriu para funcionar
    provideZonelessChangeDetection(), 
    provideRouter(routes),
    provideHttpClient()
  ]
};