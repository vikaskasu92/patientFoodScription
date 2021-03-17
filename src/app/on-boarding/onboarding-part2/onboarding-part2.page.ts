import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-onboarding-part2',
  templateUrl: './onboarding-part2.page.html',
  styleUrls: ['./onboarding-part2.page.scss'],
})
export class OnboardingPart2Page implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  navigate(){
    this.router.navigateByUrl('/home/food-preferences');
  }

  closeApp(){
    this.router.navigateByUrl('/auth');
  }

}
