import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewGoalDifficultyPageRoutingModule } from './new-goal-difficulty-routing.module';

import { NewGoalDifficultyPage } from './new-goal-difficulty.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewGoalDifficultyPageRoutingModule
  ],
  declarations: [NewGoalDifficultyPage],
  exports:[NewGoalDifficultyPage]
})
export class NewGoalDifficultyPageModule {}
