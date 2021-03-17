import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoodPreferencesPageRoutingModule } from './food-preferences-routing.module';

import { FoodPreferencesPage } from './food-preferences.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoodPreferencesPageRoutingModule
  ],
  declarations: [FoodPreferencesPage]
})
export class FoodPreferencesPageModule {}
