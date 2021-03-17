import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateWeightPage } from './update-weight.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateWeightPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateWeightPageRoutingModule {}
