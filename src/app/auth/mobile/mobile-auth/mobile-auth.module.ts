import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MobileAuthPageRoutingModule } from './mobile-auth-routing.module';

import { MobileAuthPage } from './mobile-auth.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MobileAuthPageRoutingModule
  ],
  declarations: [MobileAuthPage]
})
export class MobileAuthPageModule {}
