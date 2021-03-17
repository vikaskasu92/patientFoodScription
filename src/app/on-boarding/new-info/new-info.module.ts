import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewInfoPageRoutingModule } from './new-info-routing.module';

import { NewInfoPage } from './new-info.page';
import { GenderComponent } from './gender/gender.component';
import { HeightComponent } from './height/height.component';
import { WeightComponent } from './weight/weight.component';
import { DobComponent } from './dob/dob.component';
import { RoutineComponent } from './routine/routine.component';
import { SetGoalComponent } from './set-goal/set-goal.component';
import { MedicalConditionsComponent } from './medical-conditions/medical-conditions.component';
import { DiabeticsComponent } from './medical-conditions/diabetics/diabetics.component';
import { AlergiesComponent } from './alergies/alergies.component';
import { OtherConditionsComponent } from './medical-conditions/other-conditions/other-conditions.component';
import { FemaleLactatingComponent } from './gender/female-lactating/female-lactating.component';
import { FemalePregnantComponent } from './gender/female-pregnant/female-pregnant.component';
import { FemalePregnantDetailsComponent } from './gender/female-pregnant-details/female-pregnant-details.component';
import { CardioVascularComponent } from './medical-conditions/cardio-vascular/cardio-vascular.component';
import { VerifyConditionsComponent } from './verify-conditions/verify-conditions.component';
import { SharedModule } from 'src/app/sharedFiles/shared.module';
import { GastroIntestinalComponent } from './medical-conditions/gastro-intestinal/gastro-intestinal.component';
import { ImmuneSystemComponent } from './medical-conditions/immune-system/immune-system.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewInfoPageRoutingModule,
    SharedModule
  ],
  declarations: [
    NewInfoPage,
    GenderComponent,
    HeightComponent,
    WeightComponent,
    DobComponent,
    RoutineComponent,
    SetGoalComponent,
    MedicalConditionsComponent,
    DiabeticsComponent,
    AlergiesComponent,
    OtherConditionsComponent,
    FemaleLactatingComponent,
    FemalePregnantComponent,
    FemalePregnantDetailsComponent,
    ImmuneSystemComponent,
    GastroIntestinalComponent,
    CardioVascularComponent,
    VerifyConditionsComponent
  ],
  entryComponents:[
    DiabeticsComponent,
    OtherConditionsComponent,
    FemaleLactatingComponent,
    FemalePregnantComponent,
    FemalePregnantDetailsComponent,
    ImmuneSystemComponent,
    GastroIntestinalComponent,
    CardioVascularComponent
  ]
})
export class NewInfoPageModule {}
