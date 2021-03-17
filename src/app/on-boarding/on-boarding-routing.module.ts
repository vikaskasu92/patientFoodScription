import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnBoardingPage } from './on-boarding.page';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {
    path: '',
    component: OnBoardingPage
  },
  {
    path: 'new-info',
    loadChildren: () => import('./new-info/new-info.module').then( m => m.NewInfoPageModule)
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },
  {
    path: 'onboarding-part2',
    loadChildren: () => import('./onboarding-part2/onboarding-part2.module').then( m => m.OnboardingPart2PageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnBoardingPageRoutingModule {}
