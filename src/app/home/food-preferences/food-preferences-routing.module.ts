import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodPreferencesPage } from './food-preferences.page';

const routes: Routes = [
  {
    path: '',
    component: FoodPreferencesPage
  },
  /*{
    path: 'eating-pattern',
    loadChildren: () => import('./eating-pattern/eating-pattern.module').then( m => m.EatingPatternPageModule)
  },*/
  {
    path: 'cancel-preference',
    loadChildren: () => import('./cancel-preference/cancel-preference.module').then( m => m.CancelPreferencePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodPreferencesPageRoutingModule {}
