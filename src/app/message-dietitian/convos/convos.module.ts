import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConvosPageRoutingModule } from './convos-routing.module';

import { ConvosPage } from './convos.page';
import { OppositeConversationIdPipe } from './opposite-conversation-id.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ConvosPageRoutingModule
  ],
  declarations: [ConvosPage, OppositeConversationIdPipe]
})
export class ConvosPageModule {}
