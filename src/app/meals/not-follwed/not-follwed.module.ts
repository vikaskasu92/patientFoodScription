import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotFollwedPageRoutingModule } from './not-follwed-routing.module';

import { NotFollwedPage } from './not-follwed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotFollwedPageRoutingModule
  ],
  declarations: [NotFollwedPage],
  exports:[NotFollwedPage]
})
export class NotFollwedPageModule {}
