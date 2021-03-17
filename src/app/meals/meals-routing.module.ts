import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MealsPage } from './meals.page';

const routes: Routes = [
  {
    path: '',
    component: MealsPage
  },
  {
    path: 'not-follwed',
    loadChildren: () => import('./not-follwed/not-follwed.module').then( m => m.NotFollwedPageModule)
  },
  {
    path: 'meal/:mealId/:date',
    loadChildren: () => import('./meal/meal.module').then( m => m.MealPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealsPageRoutingModule {}
