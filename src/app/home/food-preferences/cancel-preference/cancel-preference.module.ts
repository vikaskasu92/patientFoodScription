import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CancelPreferencePageRoutingModule } from './cancel-preference-routing.module';

import { CancelPreferencePage } from './cancel-preference.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CancelPreferencePageRoutingModule
  ],
  declarations: [CancelPreferencePage]
})
export class CancelPreferencePageModule {}
