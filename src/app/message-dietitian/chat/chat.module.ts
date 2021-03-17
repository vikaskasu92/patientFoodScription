import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatPageRoutingModule } from './chat-routing.module';

import { ChatPage } from './chat.page';
import { ChatCardComponent } from './chat-card/chat-card.component';
import { TimestampPipe } from './chat-card/timestamp.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ChatPageRoutingModule
  ],
  declarations: [ChatPage,ChatCardComponent, TimestampPipe]
})
export class ChatPageModule {}
