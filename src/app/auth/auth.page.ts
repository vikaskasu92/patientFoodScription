import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { FoodscriptionCommonService } from '../sharedFiles/foodscription-common.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor(private authService:AuthService,
              private router:Router,
              private fpCommon:FoodscriptionCommonService){}

  showContent:boolean;
  domain:string = "accounts-phrqltest";
  region:string = "us-west-2";
  appClientIdBrowser:string = "6ft9a1rrj34mmcmrrqd9ec7sdo";
  userPoolId:string = "us-west-2_chPPnHOzM";

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
    if(this.authService.appPlatform === "web"){
      this.checkCookie();
      return;
    }else{
      this.redirectToLogin();
    }
  }

  checkCookie() {
    let token= this.fpCommon.getCookie("csrftoken");
    if (token != "") {
      this.router.navigateByUrl("/tabs");
    } else {
      window.location.href=environment.cookieAuth;
    }
  }

  redirectToLogin(){
    this.router.navigateByUrl("/auth/login");
  }

}


