// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    url: "https://identitytoolkit.googleapis.com/v1/accounts",
    DBurl: "https://netflix-bffb8-default-rtdb.europe-west1.firebasedatabase.app",
  apiKey: "AIzaSyArN_mAfRNEdmBx4V0_dZ4rCbr3OQNVw4U",
  authDomain: "netflix-bffb8.firebaseapp.com",
  projectId: "netflix-bffb8",
  storageBucket: "netflix-bffb8.appspot.com",
  messagingSenderId: "59278338432",
  appId: "1:59278338432:web:006e91365374b74958b965"
},
  movieApiKey: "5b7f91e1ba15c45e5ffb71864f48d30d",
  movieURL: "https://api.themoviedb.org/3/search/movie",
  movieDetailsURL: "https://api.themoviedb.org/3/movie"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
