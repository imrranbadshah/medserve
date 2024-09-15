import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './interceptors/error/error.interceptor';
import { httpInterceptor } from './interceptors/http/http.interceptor';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from './app.component';
import { GoogleLoginProvider, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { environment } from './services/api/endPointsURL';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(
      withFetch(),
      withInterceptors([errorInterceptor, httpInterceptor]),
    ),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      })
    ),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        lang: 'en',
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '191695444510-f0mqq0cc0vscfsf2j0nvmsn2vmppvjre.apps.googleusercontent.com', {
              oneTapEnabled: false,
            } // own acc
            ),

            // provider: new GoogleLoginProvider(
            //   '836629619269-92cv29guqpku6qmp593l0rjs01i7aiu9.apps.googleusercontent.com' // company
            // )
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
    // {
    //   provide: "SocialAuthServiceConfig",
    //   useValue: {
    //     autoLogin: false,
    //     providers: [
    //       {
    //         id: GoogleLoginProvider.PROVIDER_ID,
    //         provider: new GoogleLoginProvider("836629619269-92cv29guqpku6qmp593l0rjs01i7aiu9.apps.googleusercontent.com", {
    //           oneTapEnabled: false,
    //         }),
    //       },
    //     ],
    //     onError: (err) => {
    //       console.error(err);
    //     },
    //   } as SocialAuthServiceConfig,
    // },
  ]
};