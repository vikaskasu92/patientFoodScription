import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EatingPatternPage } from './eating-pattern.page';

const routes: Routes = [
  {
    path: '',
    component: EatingPatternPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EatingPatternPageRoutingModule {}
