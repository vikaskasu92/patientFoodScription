import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-on-boarding',
  templateUrl: './on-boarding.page.html',
  styleUrls: ['./on-boarding.page.scss'],
})
export class OnBoardingPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  navigate(){
    this.router.navigateByUrl('/on-boarding/new-info');
  }

  closeApp(){
    this.router.navigateByUrl('/auth');
  }
}
