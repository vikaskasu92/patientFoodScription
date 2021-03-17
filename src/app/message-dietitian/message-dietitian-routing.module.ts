import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessageDietitianPage } from './message-dietitian.page';

const routes: Routes = [
  {
    path: '',
    component: MessageDietitianPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessageDietitianPageRoutingModule {}
