import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { SafariViewController } from '@ionic-native/safari-view-controller/ngx';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';
import { FoodscriptionCommonService } from '../sharedFiles/foodscription-common.service';

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
      this.router.navigateByUrl("/auth/login");
    }
  }

  checkCookie() {
    let token= this.fpCommon.getCookie("csrftoken");
    if (token != "") {
      this.router.navigateByUrl("/tabs")
    } else {
      window.location.href="https://accounts.phrqltest.com/userpool/login/?origin=http://local.phrqltest.com:4200";
    }
  }

}
