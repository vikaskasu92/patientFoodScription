import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewGoalPage } from './new-goal.page';

const routes: Routes = [
  {
    path: '',
    component: NewGoalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewGoalPageRoutingModule {}
