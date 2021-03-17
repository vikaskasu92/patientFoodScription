import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnboardingPart2Page } from './onboarding-part2.page';

const routes: Routes = [
  {
    path: '',
    component: OnboardingPart2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnboardingPart2PageRoutingModule {}
