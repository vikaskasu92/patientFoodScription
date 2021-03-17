import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroceryListPageRoutingModule } from './grocery-list-routing.module';

import { GroceryListPage } from './grocery-list.page';
import { SharedModule } from '../sharedFiles/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroceryListPageRoutingModule,
    SharedModule
  ],
  declarations: [GroceryListPage]
})
export class GroceryListPageModule {}
