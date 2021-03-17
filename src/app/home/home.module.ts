import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { UpdateWeightPageModule } from './goal/update-weight/update-weight.module';
import { GoalCardComponent } from './goal/goal-card/goal-card.component';
import { PreferencesCardComponent } from './preferences-card/preferences-card.component';
import { TodayCardComponent } from './today-card/today-card.component';
import { UpdateWeightPage } from './goal/update-weight/update-weight.page';
import { SharedModule } from '../sharedFiles/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule,
    UpdateWeightPageModule
  ],
  declarations: [
    HomePage,
    GoalCardComponent,
    TodayCardComponent,
    PreferencesCardComponent
  ],
  entryComponents: [UpdateWeightPage]
})
export class HomePageModule {}
