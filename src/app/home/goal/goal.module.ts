import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GoalPageRoutingModule } from './goal-routing.module';

import { GoalPage } from './goal.page';
import { NewGoalPage } from './new-goal/new-goal.page';
import { NewGoalPageModule } from './new-goal/new-goal.module';
import { NewGoalDifficultyPageModule } from './new-goal-difficulty/new-goal-difficulty.module';
import { NewGoalDifficultyPage } from './new-goal-difficulty/new-goal-difficulty.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoalPageRoutingModule,
    NewGoalPageModule,
    NewGoalDifficultyPageModule
  ],
  declarations: [GoalPage],
  entryComponents:[NewGoalPage,NewGoalDifficultyPage]
})
export class GoalPageModule {}
