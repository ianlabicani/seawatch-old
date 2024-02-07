import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { getApp, initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { connectAuthEmulator, getAuth, provideAuth } from '@angular/fire/auth';
import {
  Firestore,
  connectFirestoreEmulator,
  getFirestore,
  initializeFirestore,
  provideFirestore,
} from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    {
      provide: FIREBASE_OPTIONS,
      useValue: environment.firebaseConfig,
    },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebaseConfig))
    ),
    importProvidersFrom(
      provideAuth(() => {
        const auth = getAuth();
        if (environment.useEmulators) {
          connectAuthEmulator(auth, 'http://localhost:9099'),
            {
              disableWarnings: true,
            };
        }
        return auth;
      })
    ),
    importProvidersFrom(
      provideFirestore(() => {
        let firestore: Firestore;
        if (environment.firebaseConfig) {
          firestore = initializeFirestore(getApp(), {
            experimentalAutoDetectLongPolling: true,
          });
          connectFirestoreEmulator(firestore, 'localhost', 8080);
        } else {
          firestore = getFirestore();
        }
        return firestore;
      })
    ),
  ],
});
