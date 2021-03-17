import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessageDietitianPageRoutingModule } from './message-dietitian-routing.module';

import { MessageDietitianPage } from './message-dietitian.page';
import { SharedModule } from '../sharedFiles/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MessageDietitianPageRoutingModule,
    SharedModule
  ],
  declarations: [MessageDietitianPage]
})
export class MessageDietitianPageModule {}
