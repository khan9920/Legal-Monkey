// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiURL: 'https://www.api.legalhamster.com',
  firebaseConfig: {
    apiKey: "AIzaSyDCBXWIV-qjUMTEHgYwfomIvAx1xFdImFQ",
    authDomain: "legalhamster-dev.firebaseapp.com",
    projectId: "legalhamster-dev",
    storageBucket: "legalhamster-dev.appspot.com",
    messagingSenderId: "625568000488",
    appId: "1:625568000488:web:96c2f788894c722d541c5d"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
