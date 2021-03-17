import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewGoalDifficultyPage } from './new-goal-difficulty.page';

const routes: Routes = [
  {
    path: '',
    component: NewGoalDifficultyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewGoalDifficultyPageRoutingModule {}
