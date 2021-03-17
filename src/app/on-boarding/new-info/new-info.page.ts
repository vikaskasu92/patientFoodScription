import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-info',
  templateUrl: './new-info.page.html',
  styleUrls: ['./new-info.page.scss'],
})
export class NewInfoPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  navigate(){
    this.router.navigateByUrl('/on-boarding/new-info/gender');
  }

  closeApp(){
    this.router.navigateByUrl('/auth');
  }
  
}
