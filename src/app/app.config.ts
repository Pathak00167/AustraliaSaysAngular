import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { customInterceptor } from './custom.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideToastr } from 'ngx-toastr';
import { importProvidersFrom } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from './shared/loader.service';  
import { NgxSpinnerModule } from 'ngx-spinner';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptors([customInterceptor])), 
    provideAnimationsAsync(),
    provideToastr({
      positionClass: 'toast-top-right',
      timeOut: 3000,
      closeButton: false,
      progressBar: true,
    }),
    LoaderService, 
    importProvidersFrom(CommonModule), 
    importProvidersFrom(NgxSpinnerModule.forRoot()) 
  ]
};
