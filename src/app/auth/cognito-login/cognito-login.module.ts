import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CognitoLoginPageRoutingModule } from './cognito-login-routing.module';

import { CognitoLoginPage } from './cognito-login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CognitoLoginPageRoutingModule
  ],
  declarations: [CognitoLoginPage]
})
export class CognitoLoginPageModule {}
