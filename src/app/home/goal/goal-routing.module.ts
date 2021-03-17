import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GoalPage } from './goal.page';

const routes: Routes = [
  {
    path: '',
    component: GoalPage
  },
  {
    path: 'update-weight',
    loadChildren: () => import('./update-weight/update-weight.module').then( m => m.UpdateWeightPageModule)
  },
  {
    path: 'new-goal',
    loadChildren: () => import('./new-goal/new-goal.module').then( m => m.NewGoalPageModule)
  },
  {
    path: 'new-goal-difficulty',
    loadChildren: () => import('./new-goal-difficulty/new-goal-difficulty.module').then( m => m.NewGoalDifficultyPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoalPageRoutingModule {}
