import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { SafariViewController } from '@ionic-native/safari-view-controller/ngx';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor(private authService:AuthService,
              private router:Router){}

  showContent:boolean;
  

  ngOnInit() {
   this.login();
  }

  ionViewWillEnter(){
    this.showContent = true;
  }

  ionViewWillLeave(){
    this.showContent = false;
  }

  login(){
    //if(this.authService.appPlatform === "web"){
     // window.location.href="https://accounts.phrqltest.com/userpool/login/?origin=http://local.phrqltest.com:4200";
      //return;
   // }else{
      this.router.navigateByUrl("/auth/login");
   // }
  }

}
