import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CognitoLoginPage } from './cognito-login.page';

const routes: Routes = [
  {
    path: '',
    component: CognitoLoginPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CognitoLoginPageRoutingModule {}
