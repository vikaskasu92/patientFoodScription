// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  mealDayApi:'https://fs-api.phrqltest.com/api/meal-day/',
  login:'https://fs-api.phrqltest.com/api/user/login',
  logout:'https://fs-api.phrqltest.com/api/user/logout',
  refreshToken:'https://fs-api.phrqltest.com/api/user/refresh-token',
  userOwnInfo:'http://accounts.phrqltest.com/api/me/profile/',
  userSettings:'https://fs-api.phrqltest.com/api/user-settings/',
  userBulkSettings:'https://fs-api.phrqltest.com/api/user-settings/save-bulk/',
  userFavorites:'https://fs-api.phrqltest.com/api/recipe/?favorites=true',
  ingredientsCategory:'https://fs-api.phrqltest.com/api/recipe-ingredient/by-category',
  searchDisease:'https://fs-api.phrqltest.com/api/disease/search',
  saveUserInfo:'https://fs-api.phrqltest.com/api/user-food-preference/',
  getUserWeights:'https://fs-api.phrqltest.com/api/user-goals/weight',
  environment:"PRODUCTION"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
