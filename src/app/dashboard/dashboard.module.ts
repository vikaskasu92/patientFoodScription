import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { SharedModule } from '../sharedFiles/shared.module';
import { PlanTargetComponent } from './plan-target/plan-target.component';
import { SpeedoViewComponent } from './speedo-view/speedo-view.component';
import { TimelineDayComponent } from './timeline-day/timeline-day.component';
import { TimelineMealComponent } from './timeline-meal/timeline-meal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    Ng2GoogleChartsModule,
    SharedModule
  ],
  declarations: [DashboardPage,
    SpeedoViewComponent,
    PlanTargetComponent,
    TimelineDayComponent,
    TimelineMealComponent]
})
export class DashboardPageModule {}
