import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShoppingcartPageRoutingModule } from './shoppingcart-routing.module';

import { ShoppingcartPage } from './shoppingcart.page';
import { SharedModule } from '../sharedFiles/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShoppingcartPageRoutingModule,
    SharedModule
  ],
  declarations: [ShoppingcartPage]
})
export class ShoppingcartPageModule {}
