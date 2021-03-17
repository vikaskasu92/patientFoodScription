import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnboardingPart2PageRoutingModule } from './onboarding-part2-routing.module';

import { OnboardingPart2Page } from './onboarding-part2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnboardingPart2PageRoutingModule
  ],
  declarations: [OnboardingPart2Page]
})
export class OnboardingPart2PageModule {}
