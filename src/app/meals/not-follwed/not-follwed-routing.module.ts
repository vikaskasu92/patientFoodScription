import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFollwedPage } from './not-follwed.page';

const routes: Routes = [
  {
    path: '',
    component: NotFollwedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotFollwedPageRoutingModule {}
