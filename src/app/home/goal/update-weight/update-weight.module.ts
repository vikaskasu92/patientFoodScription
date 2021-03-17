import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateWeightPageRoutingModule } from './update-weight-routing.module';

import { UpdateWeightPage } from './update-weight.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateWeightPageRoutingModule
  ],
  declarations: [UpdateWeightPage],
  exports:[
    UpdateWeightPage
  ]
})
export class UpdateWeightPageModule {}
