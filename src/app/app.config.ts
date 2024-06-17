import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireDatabaseModule} from "@angular/fire/compat/database";
import {firebaseConfig} from "./constants/constants";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {MatNativeDateModule} from "@angular/material/core";

import {authInterceptor} from "./auth/interceptor/auth.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(withInterceptors([authInterceptor])), provideRouter(routes), provideAnimationsAsync(), importProvidersFrom([AngularFireModule.initializeApp(firebaseConfig), AngularFireAuthModule, MatNativeDateModule, AngularFireDatabaseModule]), provideAnimationsAsync()]
};
