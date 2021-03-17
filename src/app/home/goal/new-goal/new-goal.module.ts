import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewGoalPageRoutingModule } from './new-goal-routing.module';

import { NewGoalPage } from './new-goal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewGoalPageRoutingModule
  ],
  declarations: [NewGoalPage],
  exports:[
    NewGoalPage
  ]
})
export class NewGoalPageModule {}
