import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CancelPreferencePage } from './cancel-preference.page';

const routes: Routes = [
  {
    path: '',
    component: CancelPreferencePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CancelPreferencePageRoutingModule {}
