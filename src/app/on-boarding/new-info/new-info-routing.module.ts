import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewInfoPage } from './new-info.page';
import { GenderComponent } from './gender/gender.component';
import { HeightComponent } from './height/height.component';
import { WeightComponent } from './weight/weight.component';
import { DobComponent } from './dob/dob.component';
import { RoutineComponent } from './routine/routine.component';
import { SetGoalComponent } from './set-goal/set-goal.component';
import { MedicalConditionsComponent } from './medical-conditions/medical-conditions.component';
import { AlergiesComponent } from './alergies/alergies.component';
import { VerifyConditionsComponent } from './verify-conditions/verify-conditions.component';

const routes: Routes = [
  {
    path: '',
    component: NewInfoPage
  },
  {
    path:'gender',
    component:GenderComponent
  },
  {
    path:'height',
    component:HeightComponent
  },
  {
    path:'weight',
    component:WeightComponent
  },
  {
    path:'dob',
    component:DobComponent
  },
  {
    path:'routine',
    component:RoutineComponent
  },
  {
    path:'set-goal',
    component:SetGoalComponent
  },
  {
    path:'medical-conditions',
    component:MedicalConditionsComponent
  },
  {
    path:'food-allergies',
    component:AlergiesComponent
  },
  {
    path:'verify-conditions',
    component:VerifyConditionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewInfoPageRoutingModule {}
