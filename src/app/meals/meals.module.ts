import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MealsPageRoutingModule } from './meals-routing.module';

import { MealsPage } from './meals.page';
import { MoreInfoComponent } from './more-info/more-info.component';
import { NewPhotoComponent } from './new-photo/new-photo.component';
import { NotFollwedPage } from './not-follwed/not-follwed.page';
import { NotFollwedPageModule } from './not-follwed/not-follwed.module';
import { SharedModule } from '../sharedFiles/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MealsPageRoutingModule,
    NotFollwedPageModule,
    SharedModule
  ],
  declarations: [MealsPage,MoreInfoComponent,NewPhotoComponent],
  entryComponents:[NotFollwedPage,MoreInfoComponent]
})
export class MealsPageModule {}
