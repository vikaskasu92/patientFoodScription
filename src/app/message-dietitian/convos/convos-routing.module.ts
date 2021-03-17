import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConvosPage } from './convos.page';

const routes: Routes = [
  {
    path: '',
    component: ConvosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConvosPageRoutingModule {}
